const foodSystemHtml = document.querySelector(".food-system .food-system-tabs .tabs-content");
if (foodSystemHtml) {
    getDishInfo("monday", "breakfast").then((response) => {
        fillFoodSystem(foodSystemHtml, response);
    });

    const tabsDaysKeys = document.querySelectorAll(".tabs-days-key");
    tabsDaysKeys.forEach(day => {
        day.addEventListener("click", (e) => {
            e.preventDefault();

            tabsDaysKeys.forEach(d => d.classList.remove("current"));
            day.classList.add("current");
            let currentMeal = document.querySelector(".tabs-eatings-key.current");
            getDishInfo(day.getAttribute("data-day"), currentMeal.getAttribute("data-meal")).then((response) => {
                fillFoodSystem(foodSystemHtml, response);
            });
        });
    });

    const tabsMealsKeys = document.querySelectorAll(".tabs-eatings-key");
    tabsMealsKeys.forEach(meal => {
        meal.addEventListener("click", (e) => {
            e.preventDefault();

            tabsMealsKeys.forEach(m => m.classList.remove("current"));
            meal.classList.add("current");
            let currentDay = document.querySelector(".tabs-days-key.current");
            getDishInfo(currentDay.getAttribute("data-day"), meal.getAttribute("data-meal")).then((response) => {
                fillFoodSystem(foodSystemHtml, response);
            });
        });
    });
}

function getDishInfo(day, meal) {
    return fetch("food-system.json")
        .then((response) => {
            return response.json();
        })
        .then((foodSystem) => {
            return foodSystem[day][meal];
        });
}

function fillFoodSystem(foodSystemHtml, dish) {
    let tabsDishImageHtml = foodSystemHtml.querySelector(".tabs-dish-image");
    tabsDishImageHtml.src = dish.dishImage;
    tabsDishImageHtml.alt = dish.dishName;

    let tabsDishNameHtml = foodSystemHtml.querySelector(".tabs-dish-name");
    tabsDishNameHtml.innerHTML = dish.dishName;

    let tabsDishIngredientsHtml = foodSystemHtml.querySelector(".tabs-dish-ingredients");
    tabsDishIngredientsHtml.innerHTML = "";
    for (let i = 0; i < dish.dishIngredients.length; i++) {
        let ingredientHtml = document.createElement("li");
        ingredientHtml.innerHTML = dish.dishIngredients[i];
        tabsDishIngredientsHtml.append(ingredientHtml);
    }

    let tabsDishCpfcHtml = foodSystemHtml.querySelector(".tabs-dish-cpfc");
    tabsDishCpfcHtml.innerHTML = "";
    let caloriesHtml = document.createElement("li");
    caloriesHtml.innerHTML = `Калорійність: ${dish.dishCpfc.calories}`;
    let proteinsHtml = document.createElement("li");
    proteinsHtml.innerHTML = `Білки: ${dish.dishCpfc.proteins}`;
    let fatsHtml = document.createElement("li");
    fatsHtml.innerHTML = `Жири: ${dish.dishCpfc.fats}`;
    let carbohydratesHtml = document.createElement("li");
    carbohydratesHtml.innerHTML = `Вуглеводи: ${dish.dishCpfc.carbohydrates}`;
    tabsDishCpfcHtml.append(caloriesHtml, proteinsHtml, fatsHtml, carbohydratesHtml);

    let tabsDishWeightHtml = foodSystemHtml.querySelector(".tabs-dish-cpfc-weight");
    tabsDishWeightHtml.innerHTML = `Вага: ${dish.dishWeight}`;

    let tabsDishCommentHtml = foodSystemHtml.querySelector(".tabs-dish-comment-text");
    tabsDishCommentHtml.innerHTML = dish.dishComment;

    let tabsDishInstructionsHtml = foodSystemHtml.querySelector(".tabs-dish-instrucions");
    tabsDishInstructionsHtml.innerHTML = "";
    for (let i = 0; i < dish.dishInstructions.length; i++) {
        let instructionHtml = document.createElement("li");
        instructionHtml.innerHTML = dish.dishInstructions[i];
        tabsDishInstructionsHtml.append(instructionHtml);
    }
}

let headerLinks = document.querySelectorAll(".header-signed-in-link");
let footerLinks = document.querySelectorAll(".footer-signed-in-menu li a");
for (let i = 0; i < headerLinks.length; i++) {
    let linkPathname = headerLinks[i].pathname;
    let pathname = window.location.pathname;
    if (linkPathname == pathname) {
        headerLinks[i].classList.add("current");
        footerLinks[i].classList.add("current");
    } else if (pathname == "/dietme/" || pathname == "/") {
        headerLinks[0].classList.add("current");
        footerLinks[0].classList.add("current");
    }
}

const trainingTabs = document.querySelector(".training-tabs");
if (trainingTabs) {
    const trainingTabsKeys = document.querySelectorAll(".training-tabs-key");
    const trainingTabsVideos = document.querySelectorAll(".training-tabs-video");

    for (let i = 0; i < trainingTabsKeys.length; i++) {
        trainingTabsKeys[i].addEventListener("click", (e) => {
            e.preventDefault();

            trainingTabsKeys.forEach(k => k.classList.remove("current"));
            trainingTabsVideos.forEach(v => v.classList.remove("current"));

            trainingTabsKeys[i].classList.add("current");
            trainingTabsVideos[i].classList.add("current");
        });
    }
}

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
    } else {
        mobileMenu.classList.add("active");
    }
});