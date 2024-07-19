document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const hires = parseInt(document.getElementById('hires').value);
    const retained = parseInt(document.getElementById('retained').value);
    const salary = parseInt(document.getElementById('salary').value);
    const tenure = parseInt(document.getElementById('tenure').value);
    const fee = parseInt(document.getElementById('fee').value);
    const onboarding = parseInt(document.getElementById('onboarding').value);
    const searchTime = parseInt(document.getElementById('searchTime').value);
    
    if (isNaN(hires) || isNaN(retained) || isNaN(salary) || isNaN(tenure) || isNaN(fee) || isNaN(onboarding) || isNaN(searchTime)) {
        document.getElementById('result').innerText = 'Please enter valid numbers in all fields.';
        return;
    }
    
    if (hires <= 0 || retained < 0 || salary <= 0 || tenure <= 0 || fee < 0 || onboarding < 0 || searchTime < 0) {
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
    const totalOnboardingCost = left * onboarding;
    const totalSearchCost = left * (salary / 365 * searchTime);
    const totalRecruitmentCost = left * fee;
    const totalSalaryCost = left * (salary * (tenure / 12));
    const costBadHires = totalOnboardingCost + totalSearchCost + totalRecruitmentCost + totalSalaryCost;
    
    let impactRating = 0;
    if (costBadHires > 100000) impactRating = 10;
    else if (costBadHires > 75000) impactRating = 8;
    else if (costBadHires > 50000) impactRating = 6;
    else if (costBadHires > 25000) impactRating = 4;
    else impactRating = 2;

    document.getElementById('result').innerHTML = `
        <p>The total cost of bad hires over 12 months is: $${costBadHires.toLocaleString()}</p>
        <p><strong>Calculation Breakdown:</strong></p>
        <p>Onboarding/Training Costs: $${totalOnboardingCost.toLocaleString()}</p>
        <p>Search, Interview, and Securing Replacements Costs: $${totalSearchCost.toLocaleString()}</p>
        <p>Recruitment Costs: $${totalRecruitmentCost.toLocaleString()}</p>
        <p>Salary Costs: $${totalSalaryCost.toLocaleString()}</p>
        <p><strong>Potential Business Impact:</strong></p>
        <p>Financial Impact: High</p>
        <p>Strategic Setbacks: Significant</p>
        <p>Reputational Impact: Considerable</p>
        <p><strong>Severity Rating: ${impactRating}/10</strong></p>
    `;
});
