<template>
    <div class="p-6 space-y-10">
        <div>
            <h2 class="text-xl font-semibold">Detalle del salario</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border p-4 rounded-lg bg-white shadow-sm">
                <!-- Earnings -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Ingresos</h3>
                    <div class="flex justify-between text-sm">
                        <span>Salario básico</span>
                        <span>{{ formatCurrency(result.grossSalary) }}</span>
                    </div>
                </div>

                <!-- Deductions -->
                <div>
                    <h3 class="text-lg font-medium mb-2">Deducciones</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Aporte jubilatorio (15%)</span>
                            <span>{{ formatCurrency(result.retirement) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Fondo de reconversión laboral (0.1%)</span>
                            <span>{{ formatCurrency(result.trainingFund) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>FONASA (3%)</span>
                            <span>{{ formatCurrency(result.health * 0.6666) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>FONASA (Adicional) (1.5%)</span>
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
                    <span>Salario líquido</span>
                    <span>{{ formatCurrency(result.netSalary) }}</span>
                </div>
            </div>
        </div>

        <!-- IRPF Details -->
        <div>
            <h2 class="text-xl font-semibold">Detalle del IRPF</h2>
            <div class="overflow-x-auto">
                <table class="w-full mt-4 text-sm border border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-left">
                            <th class="border p-2">Rango BPC</th>
                            <th class="border p-2 text-right">Desde ($)</th>
                            <th class="border p-2 text-right">Hasta ($)</th>
                            <th class="border p-2 text-right">Aplicado a</th>
                            <th class="border p-2 text-right">%</th>
                            <th class="border p-2 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(f, index) in result.irpfDetails.brackets" :key="index">
                            <td class="border p-2">
                                <template v-if="f.rangeInBpc.to === Number.MAX_VALUE">
                                    Desde {{ f.rangeInBpc.from }}
                                </template>
                                <template v-else>
                                    Desde {{ f.rangeInBpc.from }} a {{ f.rangeInBpc.to }}
                                </template>
                            </td>
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
                            <td class="border p-2 text-right" colspan="5">IRPF Total</td>
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