document.getElementById("retirementForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const age = Number(document.getElementById("age").value);
    const savings = Number(document.getElementById("savings").value);
    const interestRate = Number(document.getElementById("interestRate").value) / 100;
    const retirementAge = Number(document.getElementById("retirementAge").value);

    const years = retirementAge - age;
    const totalSavings = savings * ((Math.pow(1 + interestRate, years) - 1) / interestRate);

    document.getElementById("retirementResult").innerText = `Total Savings: ₹${totalSavings.toFixed(2)}`;
});
