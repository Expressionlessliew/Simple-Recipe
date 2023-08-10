const database = firebase.database();
const recipeRef = database.ref("recipe");
const searchBtn = document.getElementById("searchbtn");
const breakfastContainer = document.getElementById("breakfast-container");

searchBtn.addEventListener("click", getMeal);

function getMeal() {
  //clear the old data here
  breakfastContainer.innerHTML = "";

  let usersearch = document.getElementById("search").value.trim();
  //api call
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${usersearch}`) //calling the back end here
    .then((response) => response.json()) //parse res into json
    .then((data) => {
      if (data.meals) {
        console.log(data);
        data.meals.forEach((recipe) => {
          const recipeContainer = document.createElement("div");
          recipeContainer.classList.add("breakfastrecipe-container");

          const recipeName = document.createElement("h2");
          recipeName.textContent = recipe.strMeal;

          const recipeDesc = document.createElement("p");
          recipeDesc.textContent = recipe.strMealThumb;


          if (recipe.strMealThumb && typeof recipe.strMealThumb === "string") {
            const recipeImage = document.createElement("img");
            recipeImage.src = recipe.strMealThumb;
            recipeImage.alt = recipe.strMeal;
            recipeContainer.appendChild(recipeImage);
          }

          // Append the other elements to the container
          recipeContainer.appendChild(recipeName);
          // Append the container to the breakfast container
          breakfastContainer.appendChild(recipeContainer);
        });
      } else {
        console.log("error");
      }
    });

  // Loop through each recipe and create elements to display them
}

