<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <button @click="$router.back()"
            class="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center cursor-pointer">
            ← Volver
        </button>

        <div class="text-center border-b border-gray-200 pb-6">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                Calculadora de Salario Líquido - Uruguay <span class="text-blue-600">2025</span>
            </h1>
            <p class="mt-2 text-gray-600 text-base max-w-2xl mx-auto">
                Calculá tu salario líquido luego de impuestos y aportes sociales.
            </p>
        </div>

        <section class="bg-white shadow-sm border border-gray-200 rounded-xl p-6 sm:p-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Ingresá los datos de tu salario</h2>
            <SalaryForm @form-submitted="handleFormSubmitted" />
        </section>

        <div v-if="taxesResult" class="border-t border-gray-200" />

        <section v-if="taxesResult" class="bg-white shadow-sm border border-gray-200 rounded-xl p-6 sm:p-8"
            ref="resultSection">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Resultado del cálculo</h2>
            <SalaryResult :result="taxesResult" />
        </section>
    </div>

    <Footer />
</template>

<script setup lang="ts">
import type { TaxCalculationParameters, TaxCalculationResult } from '@/types/salary';
import SalaryForm from '@/components/salary/SalaryForm.vue';
import Footer from '@/components/footer/Footer.vue';
import SalaryResult from '@/components/salary/SalaryResult.vue';
import calculateTaxes from '@/services/salary';
import { nextTick, ref } from 'vue';

const taxesResult = ref<null | TaxCalculationResult>(null)

const resultSection = ref<HTMLElement | null>(null)

const handleFormSubmitted = async (values: TaxCalculationParameters) => {
    taxesResult.value = calculateTaxes(values)

    await nextTick()
    resultSection.value?.scrollIntoView({ behavior: 'smooth' })
}


</script>