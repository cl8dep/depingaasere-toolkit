<script lang="ts" setup>
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import type { TaxCalculationParameters } from '@/types/salary'

const formSchema = toTypedSchema(z.object({
    grossSalary: z.number().min(0),
    hasChildren: z.boolean(),
    hasSpouse: z.boolean(),
    dependentDeductionFactor: z
        .string()
        .optional()
        .transform((val) => val ? parseFloat(val) : -1)
        .refine(val => val > -1 ? !isNaN(val) : true, {
            message: "Must be a valid number",
        }),
    childrenWithoutDisability: z.number().min(0),
    childrenWithDisability: z.number().min(0),
    solidarityFundContribution: z
        .string()
        .optional()
        .transform((val) => val ? parseFloat(val) : -1)
        .refine(val => val > -1 ? !isNaN(val) : true, {
            message: "Must be a valid number",
        }),
    additionalSolidarityFund: z.boolean(),
    professionalFundContribution: z.number().min(0),
    otherDeductions: z.number().min(0),
}))

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        hasChildren: false,
        hasSpouse: false,
        dependentDeductionFactor: "1",
        childrenWithoutDisability: 0,
        childrenWithDisability: 0,
        solidarityFundContribution: "0",
        additionalSolidarityFund: false,
        professionalFundContribution: 0,
        otherDeductions: 0,
    }
})

const onSubmit = form.handleSubmit((values) => {
    emit('form-submitted', values)
})


const emit = defineEmits<{
    (e: 'form-submitted', payload: TaxCalculationParameters): void
}>()
</script>

<template>
    <div class="flex justify-center w-full px-4 py-8">
        <form @submit="onSubmit" class="w-full max-w-3xl space-y-6">
            <div>
                <FormField v-slot="{ componentField }" name="grossSalary">
                    <FormLabel class="text-sm font-medium text-gray-700">Salario nominal en UYU:</FormLabel>
                    <FormControl>
                        <Input type="number" v-bind="componentField" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormField>
            </div>

            <h2 class="text-lg font-semibold text-gray-900 mt-8 mb-2">Cálculo de aportes al BPS</h2>

            <FormField v-slot="{ value, handleChange }" type="checkbox" name="hasChildren">
                <FormItem class="flex flex-row py-1">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" />
                    </FormControl>
                    <div class="space-y-0 leading-none">
                        <FormLabel>¿Tenés hijos a cargo?</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" type="checkbox" name="hasSpouse">
                <FormItem class="flex flex-row py-1">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" />
                    </FormControl>
                    <div class="space-y-0 leading-none">
                        <FormLabel>¿Tu cónyuge está a cargo?</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <div class="border-t pt-6 mt-6 space-y-2">
                <h2 class="text-lg font-semibold text-gray-900 mt-0 mb-2">Cálculo del IRPF</h2>

                <h3 class="form-subSection">Cantidad de personas a cargo:</h3>

                <FormField v-slot="{ componentField }" name="dependentDeductionFactor">
                    <FormItem>
                        <FormLabel class="text-sm font-medium text-gray-700">Porcentaje de deducción por dependientes:
                        </FormLabel>

                        <Select v-bind="componentField">
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccioná el porcentaje de deducción" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">
                                        Sin deducción
                                    </SelectItem>
                                    <SelectItem value="0.5">
                                        50%
                                    </SelectItem>
                                    <SelectItem value="1">
                                        100%
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="childrenWithoutDisability">
                    <FormLabel class="text-sm font-medium text-gray-700">Cantidad de hijos sin discapacidad:</FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormField>

                <FormField v-slot="{ componentField }" name="childrenWithDisability">
                    <FormLabel class="text-sm font-medium text-gray-700">Cantidad de hijos con discapacidad:</FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormField>
            </div>

            <div class="border-t pt-6 mt-6 space-y-2">
                <h2 class="text-lg font-semibold text-gray-900 mb-2">Si sos profesional:</h2>
                <p class="mt-1 text-sm/6 text-gray-600">Completá esta sección si sos profesional universitario</p>

                <FormField v-slot="{ componentField }" name="solidarityFundContribution">
                    <FormItem>
                        <FormLabel class="text-sm font-medium text-gray-700">¿Contribuís al Fondo de Solidaridad?
                        </FormLabel>

                        <Select v-bind="componentField">
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccioná un monto" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">
                                        No
                                    </SelectItem>
                                    <SelectItem value="0.5">
                                        1/2 BPC
                                    </SelectItem>
                                    <SelectItem value="1">
                                        1 BPC
                                    </SelectItem>
                                    <SelectItem value="2">
                                        2 BPC
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ value, handleChange }" type="checkbox" name="additionalSolidarityFund">
                    <FormItem class="flex flex-row  gap-x-3 py-2">
                        <FormControl>
                            <Checkbox :model-value="value" @update:model-value="handleChange" />
                        </FormControl>
                        <div class="space-y-1 leading-none">
                            <FormLabel>¿Pagás el Adicional al Fondo de Solidaridad?</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="professionalFundContribution">
                    <FormLabel class="text-sm font-medium text-gray-700">Aporte mensual a CJPPU o Caja Notarial:
                    </FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormField>

                <FormField v-slot="{ componentField }" name="otherDeductions">
                    <FormLabel class="text-sm font-medium text-gray-700">Otras deducciones:</FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormField>
            </div>

            <Button type="submit" class="w-full mt-7" variant="default">
                Calcular salario líquido
            </Button>
        </form>
    </div>
</template>
