<script setup lang="ts">
import { ref } from 'vue'
import Footer from "@/components/footer/Footer.vue"
import IrpfCreditForRentForm from "@/components/irpf/IrpfCreditForRentForm.vue"

// Reactive message to show result
const resultMessage = ref<string | null>(null)
const resultType = ref<'success' | 'error' | null>(null)

// Handler for submitted form data
function handleFormSubmission(data: {
    generatedIrpf: boolean
    mainResidence: boolean
    monthlyRent: number
    monthsPaid: number
    irpfWithheld: number
    irpfPayable: number
}) {
    const {
        generatedIrpf,
        mainResidence,
        monthlyRent,
        monthsPaid,
        irpfWithheld,
        irpfPayable
    } = data

    resultMessage.value = null
    resultType.value = null

    // Eligibility checks
    if (!generatedIrpf) {
        resultMessage.value = 'No generaste IRPF en 2024, por lo tanto no corresponde devolución.'
        resultType.value = 'error'
        return
    }

    if (!mainResidence) {
        resultMessage.value = 'El beneficio solo aplica si el alquiler fue por tu vivienda habitual.'
        resultType.value = 'error'
        return
    }

    if (irpfWithheld <= 0) {
        resultMessage.value = 'No se registró IRPF retenido, por lo tanto no hay monto para devolver.'
        resultType.value = 'error'
        return
    }

    if (irpfPayable <= 0) {
        resultMessage.value = 'No se registró IRPF a pagar en 2024, por lo tanto no corresponde devolución.'
        resultType.value = 'error'
        return
    }

    // Credit calculation
    const totalRentPaid = monthlyRent * monthsPaid
    const maxCreditByRent = totalRentPaid * 0.08 // 8%
    const credit = maxCreditByRent

    const withheldMinusPayable = irpfWithheld - irpfPayable

    if (withheldMinusPayable > 0) {
        if (withheldMinusPayable >= credit) {
            resultMessage.value = `Podrías recibir una devolución aproximada de $${credit.toFixed(2)} UYU.`
        } else {
            resultMessage.value = `Podrías recibir una devolución parcial de $${withheldMinusPayable.toFixed(2)} UYU (por retenciones inferiores al crédito máximo).`
        }
    } else {
        const saldoAPagar = irpfPayable - irpfWithheld
        const nuevoSaldo = saldoAPagar - credit

        if (nuevoSaldo <= 0) {
            resultMessage.value = `Tu crédito por arrendamiento cubriría el saldo a pagar de IRPF. No habría devolución, pero tampoco deberías pagar.`
        } else {
            resultMessage.value = `No corresponde devolución. Podrías aplicar el crédito de $${credit.toFixed(2)} UYU para reducir tu saldo a pagar, quedando un monto pendiente de $${nuevoSaldo.toFixed(2)} UYU.`
        }
    }

    resultType.value = 'success'
}
</script>

<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <!-- Go back button -->
        <button @click="$router.back()"
            class="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center cursor-pointer">
            ← Volver
        </button>

        <!-- Header -->
        <div class="text-center border-b border-gray-200 pb-6">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                Calculadora de Devolución IRPF por Alquiler <span class="text-blue-600"></span>
            </h1>
            <p class="mt-2 text-gray-600 text-base max-w-2xl mx-auto">
                Estimá cuánto podrías recuperar del IRPF por pagos de alquiler según la normativa vigente en Uruguay.
            </p>
        </div>

        <!-- Form -->
        <section class="bg-white shadow-sm border border-gray-200 rounded-xl p-6 sm:p-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Ingresá los datos solicitados</h2>

            <IrpfCreditForRentForm @form-submitted="handleFormSubmission" />

            <!-- Result message -->
            <div v-if="resultMessage" class="mt-6 px-4 py-3 rounded-md text-sm" :class="{
                'bg-green-100 text-green-800 border border-green-300': resultType === 'success',
                'bg-red-100 text-red-800 border border-red-300': resultType === 'error'
            }">
                {{ resultMessage }}
            </div>
        </section>

        <div class="mt-8 text-sm text-gray-600 text-center">
            Este cálculo se basa en el <a
                href="https://www.gub.uy/direccion-general-impositiva/comunicacion/publicaciones/credito-fiscal-arrendamiento-inmuebles-irpf"
                target="_blank" class="text-blue-600 underline hover:text-blue-800">
                régimen de crédito fiscal por arrendamiento de inmuebles para IRPF
            </a> según lo establece la Dirección General Impositiva de Uruguay.
        </div>

        <Footer />
    </div>
</template>