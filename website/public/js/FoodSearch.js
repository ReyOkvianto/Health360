const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const APP_ID = "4efc2e33";
const APP_KEY = "6ea8ffb8448b683503561482ba10a609";
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
    fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchInputTxt}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = "";
        if(data.hints.length != 0){
            console.log(data.hints);
            data.hints.forEach(item => {
                if (item.food.image) {
                    html += `
                        <div class = "meal-item" data-id = "${item.food.foodId}">
                            <div class = "meal-img">
                                <img src = "${item.food.image}" alt = "food">
                            </div>
                            <div class = "meal-name">
                                <h3>${item.food.label}</h3>
                                <a class = "recipe-btn">View Nutrition</a>
                                <form method = "POST" action = "/btn_meal_add">
                                    <input class = "recipe-btn" type = "hidden" name = "meal_name" value = "${item.food.label}">
                                    <input class = "recipe-btn" type = "date" name = "meal_day" value = "">
                                    <input class = "recipe-btn" type = "time" name = "start_time" value = "">
                                    <input class = "recipe-btn" type = "time" name = "end_time" value = "">
                                    <input class = "recipe-btn" type = "hidden" name = "currTime" value = "${new Date().toString()}">
                                    <button  class = "recipe-btn">Add to Calendar</button>
                                </form>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class = "meal-item" data-id = "${item.food.foodId}">
                            <div class = "meal-img">
                                <img src = "../images/DefaultFoodSearch.jpg" alt = "food">
                            </div>
                            <div class = "meal-name">
                                <h3>${item.food.label}</h3>
                                <a class = "recipe-btn">View Nutrition</a>
                                
                                <form method = "POST" action = "/btn_meal_add">
                                    <input class = "recipe-btn" type = "hidden" name = "meal_name" value = "${item.food.label}">
                                    <input class = "recipe-btn" type = "date" name = "meal_day" value = "">
                                    <input class = "recipe-btn" type = "time" name = "start_time" value = "">
                                    <input class = "recipe-btn" type = "time" name = "end_time" value = "">
                                    <input class = "recipe-btn" type = "hidden" name = "currTime" value = "${new Date().toString()}">
                                    <button  class = "recipe-btn">Add to Calendar</button>
                                </form>
                            </div>
                        </div>
                    `;
                }
            });
            mealList.classList.remove('notFound');
        } else{
            //console.log("Not found");
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
        //console.log(mealItem);
        fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchInputTxt}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data =>{
            data.hints.forEach(item =>{
                if(item.food.foodId == mealItem) {
                    //console.log(item.food.nutrients);
                    mealRecipeModal(item);
                }
            });
        });
        //.then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(item){
    //console.log(item);
    let html = `
        <h2 class = "recipe-title">${item.food.label}</h2>
        <p class = "recipe-category">${item.food.category}</p>
        <div class = "recipe-instruct">
            <h3>Nutrition Facts (per Serving):</h3>
            <p>Calories: ${Math.ceil(item.food.nutrients.ENERC_KCAL)} cal</p>
            <p>Carbohydrats: ${Math.ceil(item.food.nutrients.CHOCDF)} g</p>
            <p>Fat: ${Math.ceil(item.food.nutrients.FAT)} g</p>
            <p>Protein: ${Math.ceil(item.food.nutrients.PROCNT)} g</p>
            <p>Fiber: ${Math.ceil(item.food.nutrients.FIBTG)} g</p>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    recipeCloseBtn.focus();
}