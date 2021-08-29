const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const APP_ID = "9ea11fc5";
const APP_KEY = "ee52ea7d4c48813ebb4a30dbeb5a1ccc";
let searchInputTxt = "";

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//escape functionality
recipeCloseBtn.addEventListener('keyup', function(e) {
    if (e.keyCode == 27 || e.key == "Escape") {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    }
});

// get meal list that matches with the ingredients
function getMealList(){
    searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.edamam.com/search?q=${searchInputTxt}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.hits != 0){
            console.log(data.hits);
            data.hits.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.recipe.label}">
                        <div class = "meal-img">
                            <img src = "${meal.recipe.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.recipe.label}</h3>
                            <h4>Servings: ${meal.recipe.yield}</h4>
                            <h4>Total Calories: ${Math.ceil(meal.recipe.calories)} cal</h4>
                            <a class = "recipe-btn">View Meal</a>
                            <form method = "POST" action = "/btn_meal_add">
                                <input class = "recipe-btn" type = "hidden" name = "meal_name" value = "${meal.recipe.label}">
                                <input class = "recipe-btn" type = "date" name = "meal_day" value = "">
                                <input class = "recipe-btn" type = "time" name = "start_time" value = "">
                                <input class = "recipe-btn" type = "time" name = "end_time" value = "">
                                <input class = "recipe-btn" type = "hidden" name = "currTime" value = "${new Date().toString()}">
                                <button  class = "recipe-btn">Add to Calendar</button>
                            </form>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement.dataset.id;
        console.log(mealItem);
        fetch(`https://api.edamam.com/search?q=${searchInputTxt}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data =>{
            data.hits.forEach(meal =>{
                if(meal.recipe.label == mealItem) {
                    console.log(meal.recipe);
                    mealRecipeModal(meal);
                }
            });
        });
        // .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    let html = `
        <h2 class = "recipe-title">${meal.recipe.label}</h2>
        <p class = "recipe-category">${meal.recipe.mealType}</p>
        <div class = "recipe-instruct">
            <h3>Nutrition Facts:</h3>
            <p>${meal.recipe.digest[0].label}: ${Math.ceil(meal.recipe.digest[0].total)} g</p>
            <p>${meal.recipe.digest[1].label}: ${Math.ceil(meal.recipe.digest[1].total)} g</p>
            <p>${meal.recipe.digest[2].label}: ${Math.ceil(meal.recipe.digest[2].total)} g</p>
            <p>${meal.recipe.digest[3].label}: ${Math.ceil(meal.recipe.digest[3].total)} mg</p>
            <p>${meal.recipe.digest[4].label}: ${Math.ceil(meal.recipe.digest[4].total)} mg</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.recipe.image}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.recipe.url}" target = "_blank">Get Recipe</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    recipeCloseBtn.focus();
}