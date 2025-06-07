/**
 * BPC value for 2025.
 */
const BPC = 6576;

/**
 * IRPF tax brackets.
 *  - 'from' and 'to' represent the BPC range of each bracket.
 *
 *    The value of 'from' is inclusive, 'to' is exclusive.
 *    The last bracket has 0 as 'to' indicating no upper limit.
 *  - 'rate' is the tax percentage.
 */
const IRPF_BRACKETS = [
    { from: 0, to: 7, rate: 0 },
    { from: 7, to: 10, rate: 10 },
    { from: 10, to: 15, rate: 15 },
    { from: 15, to: 30, rate: 24 },
    { from: 30, to: 50, rate: 25 },
    { from: 50, to: 75, rate: 27 },
    { from: 75, to: 115, rate: 31 },
    { from: 115, to: 0, rate: 36 },
];

/**
 * Percentage of retirement contributions.
 */
const RETIREMENT_CONTRIBUTION_PERCENTAJE = 15;

/**
 * Maximum nominal salary amount subject to retirement contributions.
 */
const RETIREMENT_CONTRIBUTION_CAP = 272564;

/**
 * FONASA contribution rates for income up to 2.5 BPC.
 */
const FONASA_UNDER25BPC = { base: 3, spouse: 2, children: 0 };

/**
 * FONASA contribution rates for income above 2.5 BPC.
 */
const FONASA_OVER25BPC = { base: 4.5, spouse: 2, children: 1.5 };

/**
 * FRL contribution rate.
 */
const FRL_CONTRIBUTION = 0.1;

/**
 * AFAP contribution cap.
 */
const AFAP_CAP = 272564;

/**
 * Additional percentage applied to taxable income if it exceeds 10 BPC.
 */
const TAXABLE_INCOME_SURCHARGE = 6;

/**
 * IRPF deduction rate for income up to 15 BPC.
 */
const DEDUCTION_RATE_UNDER15BPC = 14;

/**
 * IRPF deduction rate for income above 15 BPC.
 */
const DEDUCTION_RATE_OVER15BPC = 8;

/**
 * IRPF deduction amount per child without a disability.
 */
const DEDUCTION_PER_CHILD = (20 * BPC) / 12;

/**
 * IRPF deduction amount per child with a disability.
 */
const DEDUCTION_PER_DISABLED_CHILD = (40 * BPC) / 12;

/**
 * Additional solidarity fund payment required for degree programs lasting five years or more.
 */
const EXTRA_SOLIDARITY_CONTRIBUTION = ((5 / 4) * BPC) / 12;

export {
    BPC,
    IRPF_BRACKETS,
    RETIREMENT_CONTRIBUTION_PERCENTAJE,
    RETIREMENT_CONTRIBUTION_CAP,
    FONASA_UNDER25BPC,
    FONASA_OVER25BPC,
    FRL_CONTRIBUTION,
    AFAP_CAP,
    TAXABLE_INCOME_SURCHARGE,
    EXTRA_SOLIDARITY_CONTRIBUTION,
    DEDUCTION_RATE_OVER15BPC,
    DEDUCTION_RATE_UNDER15BPC,
    DEDUCTION_PER_CHILD,
    DEDUCTION_PER_DISABLED_CHILD,
};