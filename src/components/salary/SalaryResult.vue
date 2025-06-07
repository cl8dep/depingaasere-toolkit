<template>
    <div class="p-6 space-y-10">
        <div>
            <h2 class="text-xl font-semibold">Salary Breakdown</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border p-4 rounded-lg bg-white shadow-sm">
                <!-- Earnings -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Earnings</h3>
                    <div class="flex justify-between text-sm">
                        <span>Basic Salary</span>
                        <span>{{ formatCurrency(result.grossSalary) }}</span>
                    </div>
                </div>

                <!-- Deductions -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Deductions</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Retirement Contribution (15%)</span>
                            <span>{{ formatCurrency(result.retirement) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Labor Reconversion Fund (0.1%)</span>
                            <span>{{ formatCurrency(result.trainingFund) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>FONASA (3%)</span>
                            <span>{{ formatCurrency(result.health * 0.6666) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>FONASA (Additional) (1.5%)</span>
                            <span>{{ formatCurrency(result.health * 0.3334) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>IRPF</span>
                            <span>{{ formatCurrency(result.irpfTotal) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Net Salary -->
                <div class="col-span-1 md:col-span-2 border-t pt-4 flex justify-between font-semibold text-base">
                    <span>Net Salary</span>
                    <span>{{ formatCurrency(result.netSalary) }}</span>
                </div>
            </div>
        </div>

        <!-- IRPF Details -->
        <div>
            <h2 class="text-xl font-semibold">IRPF Details</h2>
            <div class="overflow-x-auto">
                <table class="w-full mt-4 text-sm border border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-left">
                            <th class="border p-2">BPC Range</th>
                            <th class="border p-2 text-right">From ($)</th>
                            <th class="border p-2 text-right">To ($)</th>
                            <th class="border p-2 text-right">Applied To</th>
                            <th class="border p-2 text-right">%</th>
                            <th class="border p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(f, index) in result.irpfDetails.brackets" :key="index">
                            <td class="border p-2">{{ f.range }}</td>
                            <td class="border p-2 text-right">{{ formatCurrency(f.from) }}</td>
                            <td class="border p-2 text-right">
                                {{ f.to !== null ? formatCurrency(f.to) : '—' }}
                            </td>
                            <td class="border p-2 text-right">{{ formatCurrency(f.appliedAmount) }}</td>
                            <td class="border p-2 text-right">{{ f.rate }}%</td>
                            <td class="border p-2 text-right">{{ formatCurrency(f.tax) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="font-semibold">
                            <td class="border p-2 text-right" colspan="5">Total IRPF</td>
                            <td class="border p-2 text-right">{{ formatCurrency(result.irpfTotal) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TaxCalculationResult } from '@/types/salary';

defineProps<{ result: TaxCalculationResult }>();

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UYU',
    }).format(value);
</script>