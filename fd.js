document.getElementById("fdForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const principal = Number(document.getElementById("principal").value);
    const rate = Number(document.getElementById("rate").value) / 100;
    const time = Number(document.getElementById("time").value);

    const maturity = principal * Math.pow(1 + rate, time);
    document.getElementById("fdResult").innerText = `Maturity Amount: ₹${maturity.toFixed(
        2
    )}`;
});
