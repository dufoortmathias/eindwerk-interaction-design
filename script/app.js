//#region ***  DOM references                           ***********
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let htmlSelectCategorieen, htmlSearchButton, htmlList;
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showCategories = function (data) {
  const categories = data.drinks;
  let innerHtmlString = "";
  categories.forEach((category) => {
    if (!category.strCategory.toLowerCase().includes("unknown")) {
      innerHtmlString += `<option value="${category.strCategory}">${category.strCategory}</option>`;
    }
  });
  htmlSelectCategorieen.innerHTML += innerHtmlString;
};

const showCocktails = function (data) {
  const cocktails = data;
  let innerHtmlString = "";
  for (let index = 0; index < cocktails.length; index++) {
    const element = cocktails[index];
    innerHtmlString += `<li>${element.strDrink}</li>`;
  }
  htmlList.innerHTML = innerHtmlString;
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

const getCategoriesFromAPI = async function () {
  const endpoint = baseUrl + "list.php?c=list";
  const data = await getData(endpoint);
  showCategories(data);
};

const getListOfCocktails = async function () {
  console.log("get list");
  let endpoint = baseUrl + "list.php?c=list";
  const data = await getData(endpoint);
  const cocktails = [];
  for (let index = 0; index < data.drinks.length; index++) {
    const element = data.drinks[index];
    endpoint = baseUrl + "filter.php?c=" + element.strCategory;
    const drinks = await getData(endpoint);
    for (let index = 0; index < drinks.drinks.length; index++) {
      const drink = drinks.drinks[index];
      cocktails.push(drink);
    }
  }
  cocktails.sort(function (a, b) {
    var textA = a.strDrink.toUpperCase();
    var textB = b.strDrink.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  console.log(cocktails);
  showCocktails(cocktails);
};

const GetCokctailsByCategorie = async function (categorie) {
  const endpoint = baseUrl + "filter.php?c=" + categorie;
  const data = await getData(endpoint);
  showCocktails(data);
};

const GetListOfCategories = async function () {
  return data;
};
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
const listenToSearchButton = function () {
  htmlSearchButton.addEventListener("click", function () {
    console.log("clicked");
    const categorie = htmlSelectCategorieen.value;
    GetCokctailsByCategorie(categorie);
  });
};
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********

const init = function () {
  console.log("DOM loaded");

  htmlSelectCategorieen = document.querySelector(".js-select-categorie");
  htmlSearchButton = document.querySelector(".js-search-button");
  htmlList = document.querySelector(".js-list");

  getCategoriesFromAPI();
  listenToSearchButton();
  //getListOfCocktails();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
