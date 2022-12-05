//#region ***  DOM references                           ***********
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let htmlRandomButton,
  htmlCocktailImage,
  htmlCocktailTitle,
  htmlCocktailInstructions,
  htmlCocktailGlass,
  htmlCocktailIngredients,
  htmlCocktailGlassText,
  htmlCocktailAlcohol,
  htmlCocktailAlcoholChart,
  htmlCocktailNonAlcohol;

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
  const glassImage = await getPictureData(glass);
  console.log(glassImage.value[0].thumbnailUrl);
  htmlCocktailGlass.src = glassImage.value[0].thumbnailUrl;

  if (data.strAlcoholic == "Alcoholic") {
    showAlcoholData();
  } else {
    showNonAlcoholData();
  }
};

const showAlcoholData = function () {
  htmlCocktailAlcohol.classList.remove("o-hide-accessible");
  htmlCocktailNonAlcohol.classList.add("o-hide-accessible");

  const alcohol = Math.round(Math.random() * 30 * 10) / 10;
  const data = {
    labels: ["Alcohol", "Rest Of Drink"],
    datasets: [
      {
        label: "Alcohol Percentage",
        data: [alcohol, 100 - alcohol],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "pie",
    data: data,
  };
  new Chart(htmlCocktailAlcoholChart, config);
};

const showNonAlcoholData = function () {
  htmlCocktailAlcohol.classList.add("o-hide-accessible");
  htmlCocktailNonAlcohol.classList.remove("o-hide-accessible");
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

const getPictureData = async function (glass) {
  const data = await fetch(
    `https://bing-image-search1.p.rapidapi.com/images/search?q=${glass}&count=1`,
    options
  )
    .then((response) => response.json())
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
  htmlCocktailAlcohol = document.querySelector(".js-cocktail-alcohol");
  htmlCocktailAlcoholChart = document.querySelector(
    ".js-cocktail-alcohol-chart"
  );
  htmlCocktailNonAlcohol = document.querySelector(".js-cocktail-nonalcohol");

  listenToRandomButton();
  getRandomCocktail();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
