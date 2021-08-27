const errorContainer = document.getElementById("error-area");
const errorMessage = document.getElementById("error-message");

/* ---------------------------- Get searched food --------------------------- */
const searchFood = async () => {
  const searchField = document.getElementById("search-input");
  const searchFoodName = searchField.value;

  ///clear search field
  searchField.value = "";
  if (searchFoodName == "") {
    errorContainer.style.display = "block";
    errorMessage.innerText = `Please Enter Your Food Name`;
  } else {
    errorContainer.style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoodName}`;
    const res = await fetch(url);
    const data = await res.json();
    displayFood(data.meals);

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => displayFood(data.meals));
  }
};

/* ---------------------- Display searched food on page --------------------- */
const displayFood = (meals) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.textContent = "";

  if (meals == null) {
    errorContainer.style.display = "block";
    errorMessage.innerText = `No result found`;
  } else if (meals.length != 0) {
    errorContainer.style.display = "none";
    meals.forEach((meal) => {
      const foodImg = meal.strMealThumb;
      const foodTitle = meal.strMeal;
      const foodDescription = meal.strInstructions.slice(0, 200);

      const foodDiv = document.createElement("div");
      foodDiv.classList.add("col");
      foodDiv.innerHTML = `
        <div onclick="getFoodDetails(${meal.idMeal})" class="card h-100 p-4 pb-2">
             <img src="${foodImg}" class="card-img-top" alt="..." />
            <div class="card-body m-0 py-4 px-0">
                <h5 class="card-title">${foodTitle}</h5>
                <p class="card-text">
                   ${foodDescription}
                </p>
            </div>
        
        `;
      foodContainer.appendChild(foodDiv);
    });
  }
};

/* ------------------------ Get searched food details ----------------------- */
const getFoodDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.meals[0]);

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => displayDetails(data.meals[0]));
};

const soloFood = document.getElementById("solo-food");
const div = document.createElement("div");
div.classList.add("card", "mx-auto", "p-4");
div.style.width = "26rem";

/* ----------------------- Display single food on page ---------------------- */
const displayDetails = (meal) => {
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
   <div class="card-body m-0 px-0 py-4">
     <h5 class="card-title">${meal.strMeal}</h5>
     <p class="card-text mb-4">
       ${meal.strInstructions.slice(0, 150)}
     </p>
     <a href="${
       meal.strYoutube
     }" class="btn-brown" target="_blank">Watch Tutorial</a>
   </div>
  `;
  soloFood.appendChild(div);
};
