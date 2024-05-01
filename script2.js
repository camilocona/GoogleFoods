const selectedMeal = localStorage.getItem("selectedMeal");
DisplayData(selectedMeal);

async function InnerQuery(name) {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + name;
    try {
        const respuesta = await axios.get(url);
        return respuesta.data;
    } catch (error) {
        console.error(`API Error: ${error}`);
    }
}

async function DisplayData(nombrep) {
    const data1 = document.querySelector('[id="dataprincipal"]');
    const error1 = document.querySelector('[id="error"]');
    const resultado = await InnerQuery(nombrep);
    if (resultado.meals == null) {
        error1.style.display = "block";
        data1.style.display = "none";
    } else {
        data1.style.display = "block";
        error1.style.display = "none";
        const data = resultado.meals[0];
        let nombrepElement = document.querySelector('[id="meal-name"]');
        nombrepElement.innerHTML = data.strMeal;
        let imagen2 = document.querySelector('[id="meal-image"]');
        imagen2.src = data.strMealThumb;

        for (let i = 1; i <= 20; i++) {
            let mealIngredient = document.querySelector(`[id="ingredient${i}"]`);
            mealIngredient.innerHTML = data[`strIngredient${i}`];
            let ingredientMeasure = data[`strMeasure${i}`];
            if (mealIngredient.textContent === '') {
                mealIngredient.setAttribute("class", 'no-text');
            } else if (mealIngredient.className == 'no-text' && mealIngredient.textContent != '') {
                mealIngredient.setAttribute("class", 'ingre');
            }
        }
        let liElements = document.querySelectorAll('[id^="ingredient"]');
        for (let i in liElements) {
            if (liElements[i].textContent == '') {
                liElements[i].setAttribute("class", 'no-text');
            } else if (liElements[i].className == 'no-text' && liElements[i].textContent != '') {
                liElements[i].setAttribute("class", 'ingre');
            }
        }
        let mealRecipe = document.querySelector('[id="recipe"]');
        mealRecipe.innerHTML = data.strInstructions;
    }
}
