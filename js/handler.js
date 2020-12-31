const plants_service_url = "http://localhost:3000/api/plants";
const user_service_url = "http://localhost:3000/api/users/2";
const weather_url = "http://localhost:3000/api/weather";
//Self invoke  for the button listeners

// logics of the buttons.
(function userOperationsListeners() {
    getMyFavoritesPlants();
    getWeather();
    $("#get-query-search").click(() => {
        const queryValue = $("#query-value").val();
        const query = `?name=${queryValue}`;
        getPlantsBySearch(query);
    });
    $(document.body).on('click', '.btn-light', function(){
        const queryValue = $(this).val();
        const query = `?name=${queryValue}`;
        addToMyFavorites(query, queryValue);
    });
})();

function getPlantsBySearch(query) {
    $.ajax({
        url: plants_service_url + query,
        type: "GET",
        success: function (plants) {
            recreatePlantsTable(plants);
        },
    });
}

function getMyFavoritesPlants() {
    $.ajax({
        url: user_service_url,
        type: "GET",
        success: function (users) {
            favoritesTable(users);
        },
    });
}

function addToMyFavorites(query, name) {
    $.ajax({
        url: user_service_url + query,
        type: "POST",
        data: name,
        success: function(user){
            favoritesTable(user);
        }
    })
}

function getWeather() {
    $.ajax({
        url: weather_url,
        type: "GET",
        success: function(weather) {
            showWeather(weather);
        } 
    })
}

function showWeather(weather){
    const celcius = Math.round(parseFloat(weather.main.temp)-273.15);
    const fahrenheit = Math.round(((parseFloat(weather.main.temp)-273.15)*1.8)+32); 
    
    $('#description').html(weather.weather[0].description); 
    $('#temp').html(celcius +  '&deg;');
    $('#location').html(weather.name); 

    // if( weather.weather[0].description.indexOf('rain') > 0 ) {
    //     document.body.className = 'rainy';
    // } else if( weather.weather[0].description.indexOf('cloud') > 0 ) {
    //     document.body.className = 'cloudy';
    // } else if( weather.weather[0].description.indexOf('sunny') > 0 ) {
    //     document.body.className = 'sunny';
    // }

}

function prepareDivOfCards(section) {
    $(`#show${section}`).append(
        `<div id='multi-item-example-${section}' class='carousel slide carousel-multi-item' data-ride='carousel'>` +
            `<ol class='carousel-indicators'><li data-target='#multi-item-example-${section}' data-slide-to='0' class='active'></li>` +
            `<li data-target='#multi-item-example-${section}' data-slide-to='1'></li></ol><div class='carousel-inner' role='listbox'><div id='${section}-carousel-item-active' class='carousel-item active'></div><div id='${section}-carousel-item' class='carousel-item'></div></div></div>`
    );
}


function favoritesTable(users) {
    const userLen = users.myFavorites.length;
    $("#multi-item-example-favorites").empty().remove();
    if (userLen) {
        $("#showFavorites").append(
            "<div id='multi-item-example-favorites' class='carousel slide carousel-multi-item' data-ride='carousel'>" +
            "<ol class='carousel-indicators'><li data-target='#multi-item-example-favorites' data-slide-to='0' class='active'></li>" +
            "<li data-target='#multi-item-example-favorites' data-slide-to='1'></li></ol><div class='carousel-inner' role='listbox'><div id='favorites-carousel-item-active' class='carousel-item active'></div><div id='favorites-carousel-item' class='carousel-item'></div></div></div>"
        );
        for (let i = 0; i < userLen; i++) {
            let row =
                "<div class='col-md-3' style='float: left'>" +
                "<div class='card mb-2'>" +
                `<img class='card-img-top' src='${users.myFavorites[i].image_url}' alt='Card image cap'/>` +
                `<div class='card-body'> <h4 class='card-title'>${users.myFavorites[i].plant_name}</h4>` +
                "<p class='card-text'>Level: Hard , Location: Indoor</p>" +
                "<div id='btns'><button class='btn btn-info'>Delete</button> " +
                `<button class='btn btn-light' value='${users.myFavorites[i].plant_name}'>Add</button></div></div></div></div>`;
            if (i < 3) {
                $("#favorites-carousel-item-active").append(row);
            } else {
                $("#favorites-carousel-item").append(row);
            }
        }
    } 

}

function recreatePlantsTable(plants) {
    const plantLen = plants.length;
    $("#multi-item-example-search").empty().remove();
    if (plantLen) {
        $("#possible-error").hide();

        $("#table-data").append(
            "<div id='multi-item-example-search' class='carousel slide carousel-multi-item' data-ride='carousel'>" +
            "<ol class='carousel-indicators'><li data-target='#multi-item-example-search' data-slide-to='0' class='active'></li>" +
            "<li data-target='#multi-item-example-search' data-slide-to='1'></li></ol><div class='carousel-inner' role='listbox'><div id='search-carousel-item-active' class='carousel-item active'></div><div id='search-carousel-item' class='carousel-item'></div></div></div>"
        );


        for (let i = 0; i < plantLen; i++) {
            let row =
                "<div class='col-md-3' style='float: left'>" +
                "<div class='card mb-2'>" +
                `<img class='card-img-top' src='${plants[i].image_url}' alt='Card image cap'/>` +
                `<div class='card-body'> <h4 class='card-title'>${plants[i].name}</h4>` +
                "<p class='card-text'>Level: Hard , Location: Indoor</p>" +
                "<div id='btns'><button class='btn btn-info'>View</button> " +
                `<button class='btn btn-light' value= '${plants[i].name}'>Add</button></div></div></div></div>`;
            if (i < 3) {
                $("#search-carousel-item-active").append(row);
            } else {
                $();
                $("#search-carousel-item").append(row);
            }
        }
    } else {
        $("#possible-error").show();
    }
}

