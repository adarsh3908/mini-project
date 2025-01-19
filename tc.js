// Get form and inputs
const taxForm = document.getElementById('tax-form');
const incomeInput = document.getElementById('income');
const financialYearSelect = document.getElementById('financial-year');
const taxAmountDisplay = document.getElementById('tax-amount');
const resultDiv = document.getElementById('result');

// Event listener for form submission
taxForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const income = parseFloat(incomeInput.value);
  const financialYear = financialYearSelect.value;

  // Calculate tax
  const tax = calculateTax(income, financialYear);

  // Update UI
  taxAmountDisplay.textContent = `₹${tax}`;
  resultDiv.style.display = 'block';
});

// Tax calculation logic
function calculateTax(income, financialYear) {
  let tax = 0;

  if (financialYear === '2023-24') {
    // Tax slabs for FY 2023-24 (New Regime Example)
    if (income <= 250000) tax = 0;
    else if (income <= 500000) tax = (income - 250000) * 0.05;
    else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
    else tax = 112500 + (income - 1000000) * 0.3;
  } else if (financialYear === '2022-23') {
    // Tax slabs for FY 2022-23 (Old Regime Example)
    if (income <= 250000) tax = 0;
    else if (income <= 500000) tax = (income - 250000) * 0.05;
    else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
    else tax = 112500 + (income - 1000000) * 0.3;
  }

  return tax.toFixed(2); // Return tax rounded to 2 decimal places
}
