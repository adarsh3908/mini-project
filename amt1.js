document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const calculateButton = form.querySelector('button[type="submit"]');
    
    // Tax calculation elements
    const taxBillElement = document.getElementById('tax_bill');
    const amtBillElement = document.getElementById('amt_bill');
    const taxAmtDeltaElement = document.getElementById('tax_amt_delta');
    const taxTypeElement = document.getElementById('type_of_tax_owed');
    
    // Input elements
    const incomeInput = document.getElementById('inputIncome');
    const deductionsInput = document.getElementById('taxDeductions');
    const rebatesInput = document.getElementById('taxRebates');
    const filingStatusInput = document.getElementById('inputFilingStatus');

    // Tax slabs for FY 2024-25 (Old Regime)
    const taxSlabs = [
        { min: 0, max: 300000, rate: 0, rebate: 25000 },
        { min: 300001, max: 600000, rate: 0.05, rebate: 0 },
        { min: 600001, max: 900000, rate: 0.10, rebate: 0 },
        { min: 900001, max: 1200000, rate: 0.15, rebate: 0 },
        { min: 1200001, max: 1500000, rate: 0.20, rebate: 0 },
        { min: 1500001, max: Infinity, rate: 0.30, rebate: 0 }
    ];

    // AMT rates (simplified example)
    const amtRate = 0.18;

    function calculateConventionalTax(income) {
        let totalTax = 0;
        let remainingIncome = income;

        for (let slab of taxSlabs) {
            if (remainingIncome > 0) {
                const taxableAmount = Math.min(remainingIncome, slab.max - slab.min);
                totalTax += taxableAmount * slab.rate;
                remainingIncome -= taxableAmount;
            }
        }

        return totalTax;
    }

    function calculateAMT(income) {
        return income * amtRate;
    }

    calculateButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Parse input values
        const income = parseFloat(incomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;
        const rebates = parseFloat(rebatesInput.value) || 0;
        const filingStatus = filingStatusInput.value;

        // Calculate taxable income after deductions and rebates
        const taxableIncome = Math.max(0, income - deductions - rebates);

        // Calculate taxes
        const conventionalTax = calculateConventionalTax(taxableIncome);
        const amtTax = calculateAMT(taxableIncome);

        // Determine tax method
        const taxDelta = Math.abs(conventionalTax - amtTax);
        const taxMethod = conventionalTax < amtTax ? 
            'You must pay conventional income tax' : 
            'You must pay Alternate Minimum Tax (AMT)';

        // Update UI elements
        taxBillElement.textContent = `₹${conventionalTax.toFixed(2)}`;
        amtBillElement.textContent = `₹${amtTax.toFixed(2)}`;
        taxAmtDeltaElement.textContent = `₹${taxDelta.toFixed(2)}`;
        taxTypeElement.textContent = taxMethod;
        taxTypeElement.classList.toggle('text-danger', amtTax > conventionalTax);
    });
});