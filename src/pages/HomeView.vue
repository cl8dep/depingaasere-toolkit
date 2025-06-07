<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Main content -->
    <section class="flex-grow">
      <section class="max-w-4xl mx-auto text-center py-12 px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Finance Toolkit
        </h1>
        <p class="text-gray-600">
          Explore useful calculators for workers and professionals in Uruguay. More tools coming soon!
        </p>
      </section>

      <section class="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 px-6 pb-10">
        <!-- Tool 1 -->
        <RouterLink to="/salary"
          class="block p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md bg-white transition">
          <h2 class="text-lg font-semibold text-gray-900 mb-1">Net Salary Calculator</h2>
          <p class="text-sm text-gray-600">
            Calculate your liquid salary in Uruguay for 2025, including BPS and IRPF deductions.
          </p>
        </RouterLink>

        <!-- Tool 2 (Upcoming) -->
        <div class="p-6 rounded-lg border border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed">
          <h2 class="text-lg font-semibold text-gray-700 mb-1">IRPF Refund for Rent</h2>
          <p class="text-sm text-gray-500">
            Estimate your potential income tax return based on rent payments.
          </p>
          <span class="text-xs text-gray-500 mt-2 block">Coming soon</span>
        </div>

        <!-- Tool 3 (Upcoming) -->
        <div class="p-6 rounded-lg border border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed">
          <h2 class="text-lg font-semibold text-gray-700 mb-1">Liquidations for Sole Proprietors</h2>
          <p class="text-sm text-gray-500">
            Calculate tax and retirement contributions for unipersonal businesses.
          </p>
          <span class="text-xs text-gray-500 mt-2 block">Coming soon</span>
        </div>
      </section>
    </section>

    <Footer />
  </main>
</template>