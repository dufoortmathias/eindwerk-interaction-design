//#region ***  DOM references                           ***********
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let htmlRandomButton;
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
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
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
const listenToRandomButton = function () {
  htmlRandomButton.addEventListener("click", function () {
    console.log("clicked");
  });
};
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********

const init = function () {
  console.log("DOM loadedd");

  htmlRandomButton = document.querySelector(".js-random-button");
  listenToRandomButton();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
