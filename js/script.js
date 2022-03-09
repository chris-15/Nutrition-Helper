var bingApiKey = "Ai5n4MIAAGi2oZlEeqeqwzpcluN00BmjulByA70pa5NlqQQUNlQdpBOSZ_lfbiyO";

var inputSearchEl=  document.querySelector("#search");
var searchFormEl =  document.querySelector("#search-form");
var foodCardContainerEl = document.querySelector("#food-card-container");

// function to fetch search request for books with a subject search
var findBooks = function (foodName) {

    //https://api.edamam.com/api/food-database/v2/parser?app_id=d7658b96&app_key=28c3ad5a64730b44c357576febfb2dd9&ingr=fries&nutrition-type=cooking

    var foodApi = "https://api.edamam.com/api/food-database/v2/parser?app_id=d7658b96&app_key=28c3ad5a64730b44c357576febfb2dd9&ingr="+foodName+"&nutrition-type=cooking";

    fetch(foodApi).then(function (response) {
        if (response.ok) {
            console.log("fetch worked");
            response.json().then(function (data) {
                console.log(data);

                //clears search results for next search
                foodCardContainerEl.innerHTML = "";

                // for loop for 5 food cards
                for(i=0; i<5; i++) {
                    //create elements
                    var cardDivEl = document.createElement("div");
                    cardDivEl.className= "flex justify-center";
                    foodCardContainerEl.appendChild(cardDivEl);

                    // div for card content
                    var cardContentDivEl= document.createElement("div");
                    cardContentDivEl.className= "block p-6 rounded-lg shadow-lg bg-white max-w-sm";
                    cardDivEl.appendChild(cardContentDivEl);

                    //card title
                    var cardTitleEl = document.createElement("h5");
                    cardTitleEl.className= "text-gray-900 text-xl leading-tight font-medium mb-2";
                    var foodTitle = data.hints[i].food.label;
                    cardTitleEl.innerHTML= foodTitle;
                    cardContentDivEl.appendChild(cardTitleEl);

                    // unordered list 
                    var cardListEl = document.createElement("ul");
                    cardListEl.className= "text-gray-900";
                    cardContentDivEl.appendChild(cardListEl);

                    //list item calories
                    var calListItemEl = document.createElement("li");
                    calListItemEl.className= "px-6";
                    var calories = data.hints[i].food.nutrients.ENERC_KCAL;
                    calListItemEl.innerHTML= "Calories: " + calories + "g";
                    cardListEl.appendChild(calListItemEl);

                    //list item fat
                    var fatListItemEl = document.createElement("li");
                    fatListItemEl.className= "px-6";
                    var fat = data.hints[i].food.nutrients.FAT;
                    fatListItemEl.innerHTML= "Fat: " + fat + "g";
                    cardListEl.appendChild(fatListItemEl);

                    //list item protein
                    var proteinListItemEl = document.createElement("li");
                    proteinListItemEl.className= "px-6";
                    var protein = data.hints[i].food.nutrients.PROCNT;
                    proteinListItemEl.innerHTML= "Protein: " + fat + "g";
                    cardListEl.appendChild(proteinListItemEl);

                    //list item carbs
                    var carbListItemEl = document.createElement("li");
                    carbListItemEl.className= "px-6";
                    var carb = data.hints[i].food.nutrients.CHOCDF;
                    carbListItemEl.innerHTML= "Carbohydrates: " + carb + "g";
                    cardListEl.appendChild(carbListItemEl);








                }









            })
        } 
    })
}


// fucntion to fetch store search request for stores near location zip
var findStores = function (){

};

//function to handle book form search
var foodFormHandler = function(event) {
    event.preventDefault();

    var foodSearch = inputSearchEl.value.trim();

    if (foodSearch) {
        findBooks(foodSearch);
        inputSearchEl.value= "";
    } else {
        console.log("enter a valid subject")
        // use a modal here for error 
    }
};

searchFormEl.addEventListener("submit", foodFormHandler);