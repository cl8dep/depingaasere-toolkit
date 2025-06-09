<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Contenido principal -->
    <section class="flex-grow">
      <section class="max-w-4xl mx-auto text-center py-12 px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Bienvenido a tu Kit Financiero
        </h1>
        <p class="text-gray-600">
          Explorá calculadoras útiles para trabajadores y profesionales en Uruguay. ¡Más herramientas próximamente!
        </p>
      </section>

      <section class="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 px-6 pb-10">
        <!-- Herramienta 1 -->
        <RouterLink to="/salary"
          class="block p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md bg-white transition">
          <h2 class="text-lg font-semibold text-gray-900 mb-1">Calculadora de Salario Líquido</h2>
          <p class="text-sm text-gray-600">
            Calculá tu salario líquido en Uruguay para 2025, con descuentos de BPS e IRPF.
          </p>
        </RouterLink>

        <RouterLink to="/irpf-credit-for-rent"
          class="block p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md bg-white transition">
          <h2 class="text-lg font-semibold text-gray-700 mb-1">Devolución de IRPF por Alquiler</h2>
          <p class="text-sm text-gray-500">
            Estimá tu posible devolución de impuestos sobre la renta por pago de alquileres.
          </p>
        </RouterLink>

        <!-- Herramienta 3 (Próximamente) -->
        <div class="p-6 rounded-lg border border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed">
          <h2 class="text-lg font-semibold text-gray-700 mb-1">Liquidaciones para Unipersonales</h2>
          <p class="text-sm text-gray-500">
            Calculá impuestos y aportes jubilatorios para tu empresa unipersonal.
          </p>
          <span class="text-xs text-gray-500 mt-2 block">Próximamente</span>
        </div>
      </section>
    </section>

    <Footer />
  </main>
</template>