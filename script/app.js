//#region ***  DOM references                           ***********
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let htmlRandomButton,
  htmlCocktailImage,
  htmlCocktailTitle,
  htmlCocktailInstructions,
  htmlCocktailGlass,
  htmlCocktailIngredients,
  htmlCocktailGlassText;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "afe4d28c66mshd03fa159b24aed9p1c19cbjsn69e8b1d82b82",
    "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
  },
};
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showData = async function (data) {
  console.log(data);
  htmlCocktailTitle.textContent = data.strDrink;
  htmlCocktailImage.src = data.strDrinkThumb;
  htmlCocktailInstructions.textContent = data.strInstructions;
  htmlCocktailGlassText.textContent = data.strGlass;
  htmlingredientsString =
    '<tr class="table-header"><td>Ingredient</td><td>Measure</td></tr>';
  for (let i = 1; i < 16; i++) {
    if (data[`strIngredient${i}`] !== null) {
      htmlingredientsString += `<tr><td>${data[`strIngredient${i}`]}</td>`;
      if (data[`strMeasure${1}`] == null) {
        htmlingredientsString += `<td>Own choise</td></tr>`;
      } else {
        htmlingredientsString += `<td>${data[`strMeasure${i}`]}</td></tr>`;
      }
    }
  }
  htmlCocktailIngredients.innerHTML = htmlingredientsString;
  let glass = data.strGlass;
  glass = glass.replaceAll(" ", "_");
  glass = glass.toLowerCase();
  console.log(glass);
  let glassImage = await getData(
    `https://bing-image-search1.p.rapidapi.com/images/search?q=${glass}&count=1`,
    options
  );
  console.log(glassImage);
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********
//#endregion

//#region ***  Data Access - get___                     ***********
const getData = async function (endpoint) {
  const data = await fetch(endpoint)
    .then((r) => r.json())
    .catch((err) => console.error("an error, " + err));
  return data;
};

const getRandomCocktail = async function () {
  const data = await getData(`${baseUrl}random.php`);
  console.log(data);
  showData(data.drinks[0]);
};
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
const listenToRandomButton = function () {
  htmlRandomButton.addEventListener("click", function () {
    getRandomCocktail();
  });
};
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********

const init = function () {
  console.log("DOM loadedd");

  htmlRandomButton = document.querySelector(".js-random-button");
  htmlCocktailGlass = document.querySelector(".js-cocktail-glass");
  htmlCocktailImage = document.querySelector(".js-cocktail-image");
  htmlCocktailTitle = document.querySelector(".js-cocktail-title");
  htmlCocktailInstructions = document.querySelector(
    ".js-cocktail-instructions"
  );
  htmlCocktailIngredients = document.querySelector(".js-cocktail-ingredients");
  htmlCocktailGlassText = document.querySelector(".js-cocktail-glass-text");
  listenToRandomButton();
  getRandomCocktail();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
