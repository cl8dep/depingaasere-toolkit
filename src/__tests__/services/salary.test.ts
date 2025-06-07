import calculateTaxes, { calculateSocialSecurity, calculateIRPF } from "../../services/salary";
import { describe, test, expect } from "vitest";

// Group of unit tests for BPS contributions
describe("Test BPS contributions calculation", () => {
    test.each([
        [1000, false, false, 150, 30, 1],
        [1000, true, false, 150, 30, 1],
        [1000, false, true, 150, 50, 1],
        [1000, true, true, 150, 50, 1],
        [20000, false, false, 3000, 900, 20],
        [20000, true, false, 3000, 1200, 20],
        [20000, false, true, 3000, 1300, 20],
        [20000, true, true, 3000, 1600, 20],
    ])(
        "Should calculate BPS contributions correctly",
        (grossSalary: number, hasChildren: boolean, hasSpouse: boolean, expectedRetirement: number, expectedFonasa: number, expectedFRL: number) => {
            const result = calculateSocialSecurity(grossSalary, hasChildren, hasSpouse);

            expect(result.retirement).toBeCloseTo(expectedRetirement);
            expect(result.health).toBeCloseTo(expectedFonasa);
            expect(result.trainingFund).toBeCloseTo(expectedFRL);
        }
    );

    test.each([
        [202693, 30404],
        [300000, 40884.6],
    ])("Should apply retirement contribution cap", (grossSalary: number, expectedRetirement: number) => {
        const result = calculateSocialSecurity(grossSalary, false, false);
        expect(result.retirement).toBeCloseTo(expectedRetirement, 1);
    });
});

// Group of unit tests for IRPF calculation
describe("Test IRPF calculation", () => {
    test.each([
        [20000, 1, 0, 0, 3000, 900, 20, 0, false, 0, 0, { impuestoFranja: [0, 0, 0, 0, 0, 0, 0, 0], deducciones: 3920 }, 0],
        [50000, 1, 0, 0, 7500, 2250, 50, 0, false, 0, 0, { impuestoFranja: [0, 397, 0, 0, 0, 0, 0, 0], deducciones: 9800 }, 0],
        [80000, 1, 0, 0, 12000, 3600, 80, 0, false, 0, 0, { impuestoFranja: [0, 1973, 2856, 0, 0, 0, 0, 0], deducciones: 15680 }, 2634],
        [80000, 1, 1, 0, 12000, 3600, 80, 0, false, 0, 0, { impuestoFranja: [0, 1973, 2856, 0, 0, 0, 0, 0], deducciones: 26640 }, 1099],
        [80000, 1, 0, 1, 12000, 3600, 80, 0, false, 0, 0, { impuestoFranja: [0, 1973, 2856, 0, 0, 0, 0, 0], deducciones: 37600 }, 0],
        [80000, 1, 1, 1, 12000, 3600, 80, 0, false, 0, 0, { impuestoFranja: [0, 1973, 2856, 0, 0, 0, 0, 0], deducciones: 48560 }, 0],
    ])(
        "Should calculate IRPF correctly",
        (
            grossSalary: number,
            deductionFactor: number,
            childrenNoDisability: number,
            childrenDisability: number,
            retirement: number,
            fonasa: number,
            frl: number,
            cjppu: number,
            extraSolidarity: boolean,
            solidarity: number,
            otherDeductions: number,
            expectedDetails: { impuestoFranja: number[]; deducciones: number },
            expectedTotal: number
        ) => {
            const result = calculateIRPF(
                grossSalary,
                deductionFactor,
                childrenNoDisability,
                childrenDisability,
                retirement,
                fonasa,
                frl,
                solidarity,
                extraSolidarity,
                cjppu,
                otherDeductions
            );

            result.details.bracketTaxes.forEach((val, idx) => {
                expect(val).toBeCloseTo(expectedDetails.impuestoFranja[idx] || 0, -0.5);
            });
            expect(result.details.deductions).toBeCloseTo(expectedDetails.deducciones, -0.5);
            expect(result.total).toBeCloseTo(expectedTotal, -0.5);
        }
    );
});

// Group of unit tests for full calculation
describe("Test full tax calculation", () => {
    test.each([
        [100, false, false, 1, 0, 0, 0, false, 0, 0, 82],
    ])(
        "Should calculate full net salary correctly",
        (
            grossSalary: number,
            hasChildren: boolean,
            hasSpouse: boolean,
            deductionFactor: number,
            childrenNoDisability: number,
            childrenDisability: number,
            solidarity: number,
            extraSolidarity: boolean,
            cjppu: number,
            otherDeductions: number,
            expectedNet: number
        ) => {
            const result = calculateTaxes(
                grossSalary,
                hasChildren,
                hasSpouse,
                deductionFactor,
                childrenNoDisability,
                childrenDisability,
                solidarity,
                extraSolidarity,
                cjppu,
                otherDeductions
            );

            expect(result.netSalary).toBeCloseTo(expectedNet, -0.5);
        }
    );
});
