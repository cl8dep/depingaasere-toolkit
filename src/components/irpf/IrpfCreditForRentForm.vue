<script lang="ts" setup>
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-vue-next"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Checkbox } from '@/components/ui/checkbox'

// Schema for form validation
const formSchema = toTypedSchema(z.object({
    generatedIrpf: z.boolean(),
    mainResidence: z.boolean(),
    monthlyRent: z.number().min(1, "El alquiler mensual debe ser mayor a 0"),
    monthsPaid: z.number().min(1).max(12),
    irpfWithheld: z.number().min(0),
    irpfPayable: z.number().min(0),
}))

// Initialize form with default values
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        generatedIrpf: false,
        mainResidence: false,
        monthlyRent: 0,
        monthsPaid: 12,
        irpfWithheld: 0,
        irpfPayable: 0,
    }
})

// Emit submitted form values
const emit = defineEmits<{
    (e: 'form-submitted', payload: {
        generatedIrpf: boolean,
        mainResidence: boolean,
        monthlyRent: number,
        monthsPaid: number,
        irpfWithheld: number,
        irpfPayable: number,
    }): void
}>()

const onSubmit = form.handleSubmit((values) => {
    emit('form-submitted', values)
})
</script>

<template>
    <div class="flex justify-center w-full px-4 py-8">
        <form @submit="onSubmit" class="w-full max-w-3xl space-y-6">
            <!-- IRPF generation check -->
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="generatedIrpf">
                <FormItem class="flex flex-row gap-x-3">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" />
                    </FormControl>
                    <div class="space-y-0 leading-none">
                        <FormLabel>¿Generaste IRPF por tu salario en 2024?</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <!-- Main residence check -->
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="mainResidence">
                <FormItem class="flex flex-row gap-x-3">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" />
                    </FormControl>
                    <div class="space-y-0 leading-none">
                        <FormLabel>¿El alquiler fue para vivienda habitual?</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <!-- Monthly rent -->
            <FormField v-slot="{ componentField }" name="monthlyRent">
                <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-700">Alquiler mensual (UYU)</FormLabel>
                    <FormControl>
                        <Input type="number" min="1" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- Months paid -->
            <FormField v-slot="{ componentField }" name="monthsPaid">
                <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-700">¿Cuántos meses pagaste alquiler?
                    </FormLabel>
                    <FormControl>
                        <Input type="number" min="1" max="12" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- IRPF payable -->
            <FormField v-if="form.values.generatedIrpf" v-slot="{ componentField }" name="irpfPayable">
                <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-700 flex items-center gap-1">
                        IRPF a pagar (UYU)
                    </FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- IRPF withheld -->
            <FormField v-if="form.values.generatedIrpf" v-slot="{ componentField }" name="irpfWithheld">
                <FormItem>
                    <FormLabel class="text-sm font-medium text-gray-700">Total de IRPF retenido (UYU)
                    </FormLabel>
                    <FormControl>
                        <Input type="number" min="0" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- Submit button -->
            <Button type="submit" class="w-full mt-6" variant="default">
                Calcular devolución
            </Button>
        </form>
    </div>
</template>