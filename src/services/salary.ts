import type { IRPFBracketDetail, IRPFResult, SocialSecurityContributions, TaxCalculationParameters, TaxCalculationResult } from "@/types/salary";
import {
    BPC,
    RETIREMENT_CONTRIBUTION_PERCENTAJE,
    RETIREMENT_CONTRIBUTION_CAP,
    FONASA_UNDER25BPC,
    FONASA_OVER25BPC,
    FRL_CONTRIBUTION,
    IRPF_BRACKETS,
    TAXABLE_INCOME_SURCHARGE,
    EXTRA_SOLIDARITY_CONTRIBUTION,
    DEDUCTION_RATE_OVER15BPC,
    DEDUCTION_RATE_UNDER15BPC,
    DEDUCTION_PER_CHILD,
    DEDUCTION_PER_DISABLED_CHILD,
} from "../data/salary";

/**
 * Calculates social security contributions in Uruguay based on gross salary and dependents.
 *
 * @param grossSalary - Monthly gross salary in UYU.
 * @param hasChildren - Indicates if the worker has children as dependents.
 * @param hasSpouse - Indicates if the worker has a spouse as a dependent.
 * @returns An object containing the amounts for retirement, health, and training fund contributions.
 */
export const calculateSocialSecurity = (
    grossSalary: number,
    hasChildren: boolean,
    hasSpouse: boolean
): SocialSecurityContributions => {
    const salaryInBPC = grossSalary / BPC;
    const rates = salaryInBPC > 2.5 ? FONASA_OVER25BPC : FONASA_UNDER25BPC;

    let healthRate = rates.base;
    if (hasChildren) healthRate += rates.children;
    if (hasSpouse) healthRate += rates.spouse;

    const retirement = Math.min(RETIREMENT_CONTRIBUTION_CAP, grossSalary) * RETIREMENT_CONTRIBUTION_PERCENTAJE / 100;
    const health = grossSalary * healthRate / 100;
    const trainingFund = grossSalary * FRL_CONTRIBUTION / 100;

    return { retirement, health, trainingFund };
};

/**
 * Calculates the IRPF (Impuesto a la Renta de las Personas Físicas) tax based on income and deductions.
 *
 * @param grossSalary - Gross salary in UYU (may be adjusted for surcharge).
 * @param dependentFactor - Deduction percentage (0, 0.5 or 1) for dependents.
 * @param nonDisabledChildren - Number of children without disability.
 * @param disabledChildren - Number of children with disability.
 * @param retirement - Monthly retirement contribution.
 * @param health - Monthly health insurance (FONASA) contribution.
 * @param trainingFund - Monthly training fund (FRL) contribution.
 * @param solidarityFund - Contribution to Solidarity Fund (in BPC).
 * @param addSolidarityFund - Whether additional Solidarity Fund applies.
 * @param professionalFund - Contribution to CJPPU or Caja Notarial.
 * @param otherDeductions - Any other deductible amounts.
 * @returns The calculated IRPF result, including detailed brackets and total tax.
 */
export const calculateIRPF = (
    grossSalary: number,
    dependentFactor: number,
    nonDisabledChildren: number,
    disabledChildren: number,
    retirement: number,
    health: number,
    trainingFund: number,
    solidarityFund: number,
    addSolidarityFund: boolean,
    professionalFund: number,
    otherDeductions: number
): IRPFResult => {
    const salaryInBPC = grossSalary / BPC;
    const deductionRate = salaryInBPC > 15 ? DEDUCTION_RATE_OVER15BPC : DEDUCTION_RATE_UNDER15BPC;

    if (salaryInBPC > 10) {
        grossSalary *= 1 + TAXABLE_INCOME_SURCHARGE / 100;
    }

    const childDeductions = dependentFactor * (
        nonDisabledChildren * DEDUCTION_PER_CHILD +
        disabledChildren * DEDUCTION_PER_DISABLED_CHILD
    );

    const additionalSolidarity = addSolidarityFund ? EXTRA_SOLIDARITY_CONTRIBUTION : 0;
    const totalDeductions =
        childDeductions +
        retirement +
        health +
        trainingFund +
        (solidarityFund * BPC) / 12 +
        additionalSolidarity +
        professionalFund +
        otherDeductions;

    const brackets: IRPFBracketDetail[] = [];

    IRPF_BRACKETS.forEach(({ from, to, rate }) => {
        const fromAmount = from * BPC;
        const toAmount = to !== 0 ? to * BPC : Infinity;
        const applicableAmount = Math.max(0, Math.min(toAmount, grossSalary) - fromAmount);
        const tax = applicableAmount * rate / 100;

        brackets.push({
            rangeInBpc: {
                from: from,
                to: to !== 0 ? to : Number.MAX_VALUE
            },
            from: fromAmount,
            to: to !== 0 ? toAmount : null,
            appliedAmount: applicableAmount,
            rate,
            tax
        });
    });

    const totalBracketTax = brackets.reduce((acc, curr) => acc + curr.tax, 0);
    const totalTax = Math.max(0, totalBracketTax - totalDeductions * deductionRate / 100);

    return {
        details: {
            brackets,
            deductions: totalDeductions,
            deductionRate
        },
        total: totalTax
    };
};

/**
 * Calculates all tax and contribution details for a given salary and profile.
 *
 * @param params - All input values required to calculate net salary.
 * @returns A detailed breakdown of all deductions and the final net salary.
 */
const calculateTaxes = (
    params: TaxCalculationParameters
): TaxCalculationResult => {
    const {
        grossSalary,
        hasChildren,
        hasSpouse,
        dependentDeductionFactor,
        childrenWithoutDisability,
        childrenWithDisability,
        solidarityFundContribution,
        additionalSolidarityFund,
        professionalFundContribution,
        otherDeductions
    } = params


    const { retirement, health, trainingFund } = calculateSocialSecurity(
        grossSalary,
        hasChildren,
        hasSpouse
    );

    const { details, total } = calculateIRPF(
        grossSalary,
        dependentDeductionFactor,
        childrenWithoutDisability,
        childrenWithDisability,
        retirement,
        health,
        trainingFund,
        solidarityFundContribution,
        additionalSolidarityFund,
        professionalFundContribution,
        otherDeductions
    );

    const netSalary =
        grossSalary - retirement - health - trainingFund - total;

    return {
        grossSalary: grossSalary,
        netSalary: +netSalary.toFixed(2),
        retirement: +retirement.toFixed(2),
        health: +health.toFixed(2),
        trainingFund: +trainingFund.toFixed(2),
        irpfDetails: {
            brackets: details.brackets,
            deductions: +details.deductions.toFixed(2),
            deductionRate: details.deductionRate,
        },
        irpfTotal: +total.toFixed(2),
    };
};

export default calculateTaxes;