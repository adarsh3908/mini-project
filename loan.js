document.getElementById("loanForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const income = Number(document.getElementById("income").value);
    const loanAmount = Number(document.getElementById("loanAmount").value);
    const creditScore = Number(document.getElementById("creditScore").value);

    if (income >= 30000 && loanAmount <= income * 10 && creditScore >= 650) {
        document.getElementById("result").innerText = "You are eligible for a loan!";
    } else {
        document.getElementById("result").innerText = "Sorry, you are not eligible.";
    }
});
