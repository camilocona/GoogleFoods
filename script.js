
async function consultarData(option, text) {
    let url = '';
    try {
        switch (option) {
            case 'Name':
                url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + text;
                break;
            case 'Category':
                url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + text;
                break;
            case 'Ingredient':
                url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + text;
                break;
            case 'Area':
                url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + text;
                break;
            default:
                url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + text;
                break;
        }
        const respuesta = await axios.get(url);
        return respuesta.data;
    } catch (error) {
        console.error(`API Error: ${error}`);
    }
}

async function DisplayResults(option, text) {
    const data1 = document.querySelector('[id="dataprincipal"]');
    const error1 = document.querySelector('[id="error"]');
    const data2 = document.querySelector('[id="contenedor3"]');
    const resultado = await consultarData(option, text);
    if (resultado.meals == null || text == '') {
        error1.style.display = "block";
        data1.style.display = "none";
        data2.style.display = "none";
    } else {
        if (option == 'Name') {
            data1.style.display = "block";
            error1.style.display = "none";
            data2.style.display = "none";
            const data = resultado.meals[0];
            document.querySelector('[id="meal-name"]').innerHTML = data.strMeal;
            document.querySelector('[id="meal-image"]').src = data.strMealThumb;

            for (let i = 1; i <= 20; i++) {
                const ingredient = document.querySelector(`[id="ingredient${i}"]`);
                ingredient.innerHTML = data[`strIngredient${i}`];
                if (ingredient.textContent === '') {
                    ingredient.setAttribute("class", 'no-text');
                } else if (ingredient.className === 'no-text' && ingredient.textContent !== '') {
                    ingredient.setAttribute("class", 'ingre');
                }
            }
            document.querySelector('[id="recipe"]').innerHTML = data.strInstructions;
        } else {
            data2.style.display = "block";
            data1.style.display = "none";
            error1.style.display = "none";
            [...document.querySelectorAll('[class="card"]')].forEach((x) => x.remove());
            const data = resultado.meals;
            const contenedormain = document.querySelector('[id="contenedor4"]');
            let resultsFlag = 1;
            for (let meal of data) {
                const card = document.createElement("div");
                card.setAttribute("class", "card");
                const imagen1 = document.createElement("div");
                imagen1.setAttribute("class", "image-container");
                const imagen2 = document.createElement("img");
                imagen2.setAttribute("src", meal.strMealThumb);
                const nombrep = document.createElement("a");
                nombrep.setAttribute("class", "nombre-plato");
                nombrep.setAttribute("href", "result.html");
                nombrep.innerHTML = meal.strMeal;
                imagen1.appendChild(imagen2);
                card.appendChild(imagen1);
                card.appendChild(nombrep);
                contenedormain.appendChild(card);
                resultsFlag++;
                if (resultsFlag > 18) break;
            }
            let mealClicked = document.querySelectorAll('[class="nombre-plato"]');
            for (let element of mealClicked) {
                element.addEventListener("click", (clickedAnchor) => {
                    let selectedMeal = clickedAnchor.target.innerText;
                    localStorage.setItem("selectedMeal", selectedMeal);
                });
            }
        }
    }
}


const buscar = document.querySelector('[id="busqueda-lupa"]');
buscar.addEventListener("click", () => {
    const op1 = document.querySelector('[id="menuabajo"]').value;
    const input1t = document.querySelector('[id="barra-busqueda"]').value;
    DisplayResults(op1, input1t);
});
