document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const hires = parseInt(document.getElementById('hires').value);
    const retained = parseInt(document.getElementById('retained').value);
    const salary = parseInt(document.getElementById('salary').value);
    const tenure = parseInt(document.getElementById('tenure').value);
    const fee = parseInt(document.getElementById('fee').value);
    
    if (isNaN(hires) || isNaN(retained) || isNaN(salary) || isNaN(tenure) || isNaN(fee)) {
        document.getElementById('result').innerText = 'Please enter valid numbers in all fields.';
        return;
    }
    
    if (hires <= 0 || retained < 0 || salary <= 0 || tenure <= 0 || fee < 0) {
        document.getElementById('result').innerText = 'Please enter positive numbers for all fields.';
        return;
    }
    
    if (retained > hires) {
        document.getElementById('result').innerText = 'The number of retained employees cannot be greater than the number of hires.';
        return;
    }
    
    const retentionRate = retained / hires;
    const expectedRetained = hires * retentionRate;
    const left = hires - expectedRetained;
    const costBadHires = left * (salary * (tenure / 12) + fee);
    
    document.getElementById('result').innerText = `The total cost of bad hires over 2 years is: $${costBadHires.toLocaleString()}`;
});
