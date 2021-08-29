document.getElementById('calorie-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';
  
    document.getElementById('loading').style.display = 'block';
  
    setTimeout(calculateCalories, 2000);
  
    e.preventDefault();
  });
  
  function calculateCalories(e) {
    
    const age = document.getElementById('age');
    const gender = document.querySelector('input[name="customRadioInline1"]:checked');
    const weight = document.getElementById('Weight2');
    const height = document.getElementById('Height2');
    const activity = document.getElementById('list').value;
    const totalCalories = document.getElementById('total-calories');
    
    
    if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
      errorMessage('Please make sure the values you entered are correct')
    } else if(gender.id === 'male' && activity === "1") {
      totalCalories.value = Math.floor(1.2 * (66 + (6.3 * parseFloat(weight.value)) + (12.9 * parseFloat(height.value)) - (6.8 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "2") {
      totalCalories.value = Math.floor(1.375 * (66 + (6.3 * parseFloat(weight.value)) + (12.9 * parseFloat(height.value)) - (6.8 * parseFloat(age.value))));
    } else if (gender.id === 'male' && activity === "3") {
      totalCalories.value = Math.floor(1.55 * (66 + (6.3 * parseFloat(weight.value)) + (12.9 * parseFloat(height.value)) - (6.8 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "4") {
      totalCalories.value = Math.floor(1.725 * (66 + (6.3 * parseFloat(weight.value)) + (12.9 * parseFloat(height.value)) - (6.8 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "5") {
      totalCalories.value = Math.floor(1.9 * (66 + (6.3 * parseFloat(weight.value)) + (12.9 * parseFloat(height.value)) - (6.8 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "1") {
      totalCalories.value = Math.floor(1.2 * (655 + (4.3 * parseFloat(weight.value)) + (4.7 * parseFloat(height.value)) - (4.7 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "2") {
      totalCalories.value = Math.floor(1.375 * (655 + (4.3 * parseFloat(weight.value)) + (4.7 * parseFloat(height.value)) - (4.7 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "3") {
      totalCalories.value = Math.floor(1.55 * (655 + (4.3 * parseFloat(weight.value)) + (4.7 * parseFloat(height.value)) - (4.7 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "4") {
      totalCalories.value = Math.floor(1.725* (655 + (4.3 * parseFloat(weight.value)) + (4.7 * parseFloat(height.value)) - (4.7 * parseFloat(age.value))));
    } else {
      totalCalories.value = Math.floor(1.9 * (655 + (4.3 * parseFloat(weight.value)) + (4.7 * parseFloat(height)) - (4.7 * parseFloat(age.value))));
    } 
  
    document.getElementById('results').style.display = 'block';
  
    document.getElementById('loading').style.display = 'none';
  }
  
  function errorMessage(error) {
    document.getElementById('results').style.display = 'none';
  
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
  
    card.insertBefore(errorDiv, heading);
  
    setTimeout(clearError, 4000);
  }
  
  function clearError() {
    document.querySelector('.alert').remove();
  }
  
  