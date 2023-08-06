const database = firebase.database();
const recipeRef = database.ref("recipe");


// Function to display the recipes
function displayRecipes(recipes) {
  const breakfastContainer = document.getElementById("breakfast-container");

  // Loop through each recipe and create elements to display them
  recipes.forEach((recipe) => {
    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("breakfastrecipe-container");

    const recipeName = document.createElement("h2");
    recipeName.textContent = recipe.name;

    const recipeDesc = document.createElement("p");
    recipeDesc.textContent = recipe.desc;

    const recipeTime = document.createElement("p");
    recipeTime.textContent = "Time: " + recipe.Time;

    const recipetype = document.createElement("p");
    recipetype.textContent = "Type: " + recipe.type;

    const recipelink = document.createElement("a");
    recipelink.textContent = recipe.link;


    if (recipe.img && typeof recipe.img === "string") {
      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.img;
      recipeImage.alt = recipe.name;
      recipeContainer.appendChild(recipeImage);
    }

    // Append the other elements to the container
    recipeContainer.appendChild(recipeName);
    recipeContainer.appendChild(recipeDesc);
    recipeContainer.appendChild(recipeTime);
    recipeContainer.appendChild(recipetype);
    recipeContainer.appendChild(recipelink);


    // Append the container to the breakfast container
    breakfastContainer.appendChild(recipeContainer);
  });
}

// Fetch the recipe data from the Realtime Database
recipeRef.once("value", (snapshot) => {
  const recipesData = snapshot.val();
  if (recipesData && Array.isArray(recipesData)) {
    displayRecipes(recipesData);
  }
});
