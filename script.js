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
    
    document.getElementById('result').innerHTML = `
        <p>The total cost of bad hires over 12 months is: $${costBadHires.toLocaleString()}</p>
        <p>Breakdown:</p>
        <ul>
            <li>Number of hires: ${hires}</li>
            <li>Number expected to leave within 12 months: ${left}</li>
            <li>Average salary per hire: $${salary.toLocaleString()}</li>
            <li>Average length of time in business: ${tenure} months</li>
            <li>Average recruitment fee per hire: $${fee.toLocaleString()}</li>
            <li>Cost due to salary and tenure: $${(salary * (tenure / 12)).toLocaleString()}</li>
            <li>Total cost of bad hires: $${costBadHires.toLocaleString()}</li>
        </ul>
        <p>Business Impact:</p>
        <p>High turnover rates result in significant financial loss not only due to recruitment fees but also because of the lost productivity and the resources spent on training new hires who leave prematurely. Addressing retention issues can lead to improved stability, productivity, and overall morale within the company.</p>
    `;
});
