//#region ***  DOM references                           ***********
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let htmlSelectCategorieen, htmlSeachButton;
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
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
const listenToSearchButton = function () {
  htmlSeachButton.addEventListener("click", function () {
    console.log("clicked");
    const categorie = htmlSelectCategorieen.value;
    console.log(categorie);
  });
};
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********

const init = function () {
  console.log("DOM loaded");

  htmlSelectCategorieen = document.querySelector(".js-select-categorie");
  htmlSeachButton = document.querySelector(".js-search-button");

  getCategoriesFromAPI();
  listenToSearchButton();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
