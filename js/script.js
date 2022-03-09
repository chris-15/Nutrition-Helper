var bingApiKey = "Ai5n4MIAAGi2oZlEeqeqwzpcluN00BmjulByA70pa5NlqQQUNlQdpBOSZ_lfbiyO";

var inputSearchEl=  document.querySelector("#search");
var searchFormEl =  document.querySelector("#search-form");
var foodCardContainerEl = document.querySelector("#food-card-container");
var zipSearchFormEl = document.querySelector("#search-zip-form");
var inputZipSearchEl = document.querySelector("#search-zip");
var storeCardContainerEl= document.querySelector("#store-card container");
var historyButtonContainerEl = document.querySelector("#history-button-container")


// array for searches stored in local storage
var historyFoodList= localStorage.getItem("userSearchTerm")?JSON.parse(localStorage.getItem("userSearchTerm")):[];

// function to fetch search request for books with a subject search
var findFood = function (foodName) {

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
};

// function that creates new buttons for each search history when a new search is conducted
var newHistoryButton = function() {
    var newHistoryButtonEl =  document.createElement("button");
    newHistoryButtonEl.setAttribute("type", "click");
    newHistoryButtonEl.textContent= inputSearchEl.value.trim();
    // add classes here for styling
    historyButtonContainerEl.appendChild(newHistoryButtonEl);
}

// function to load the local storage so history stays on page if page is left or refreshed
var loadHistory = function() {
    for (i=0; i < historyFoodList.length; i++) {
        var historyFoodItemEl = document.createElement("button");
        historyFoodItemEl.setAttribute("type", "click");
        // add classes here for styling
        historyFoodItemEl.textContent= (historyFoodList[i]);
        historyButtonContainerEl.appendChild(historyFoodItemEl);
    }
}


// fucntion to fetch store search request for stores near location zip
var findStores = function (zipCode) {
    // bingApiUrlOne = "http://dev.virtualearth.net/REST/v1/Locations/US/zipCode/?&key=Ai5n4MIAAGi2oZlEeqeqwzpcluN00BmjulByA70pa5NlqQQUNlQdpBOSZ_lfbiyO"

    var bingApiUrlOne = "http://dev.virtualearth.net/REST/v1/Locations/US/CT/" +zipCode + "/?&key=Ai5n4MIAAGi2oZlEeqeqwzpcluN00BmjulByA70pa5NlqQQUNlQdpBOSZ_lfbiyO";

    fetch(bingApiUrlOne).then(function (response) {
        if (response.ok) {
            console.log("bing fetch worked");
            response.json().then(function (data) {
                //console.log(data);
                var cityLat = data.resourceSets[0].resources[0].point.coordinates[0];
                var cityLong= data.resourceSets[0].resources[0].point.coordinates[1];

                bingApiUrlTwo= "https://dev.virtualearth.net/REST/v1/LocalSearch/?type=Grocers&userLocation="+cityLat+", "+cityLong+ "&key=Ai5n4MIAAGi2oZlEeqeqwzpcluN00BmjulByA70pa5NlqQQUNlQdpBOSZ_lfbiyO";

                fetch(bingApiUrlTwo).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    console.log(data)
                })

            })
        } else {
            console.log("fetch didnt work")
        }
    })
};

//function to handle book form search
var foodFormHandler = function(event) {
    event.preventDefault();

    var foodSearch = inputSearchEl.value.trim();

    // pushes value to array only if it has a value, no blanks
    if (foodSearch) {
        historyFoodList.push(foodSearch)
    };

    // sets local storage
    localStorage.setItem("userSearchTerm", JSON.stringify(historyFoodList));

    if (foodSearch) {
        findFood(foodSearch);
        newHistoryButton(foodSearch);
        inputSearchEl.value= ""
    } else {
        console.log("enter a valid food")
        // use a modal here for error
    }
};

//function to handle store search 
var storeSearchHandler = function(event) {
    event.preventDefault();
    var zipSearch = inputZipSearchEl.value.trim();

    if (zipSearch) {
        findStores(zipSearch);
        inputZipSearchEl.value = "";
    } else {
        console.log("enter a valid zip")
        // use a modal here for error 
    }
};

// function to handle history button clicks
var historyButtonHandler = function(event) {
    console.log(event.target)
    var foodBtn = event.target.textContent;
    findFood(foodBtn);
}

searchFormEl.addEventListener("submit", foodFormHandler);

zipSearchFormEl.addEventListener("submit", storeSearchHandler);

historyButtonContainerEl.addEventListener("click", historyButtonHandler);

loadHistory();
