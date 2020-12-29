const service_url = 'http://localhost:3000/api/plants';
//Self invoke  for the button listeners

// logics of the buttons.
(function userOperationsListeners() {
    $("#get-query-search").click(() => {
        const queryValue = $("#query-value").val();
        const query = `?name=${queryValue}`;
        getAllPlantsBySearch(query);
    });
}())


function getAllPlantsBySearch(query) {
    // alert('getAll');
    // console.log(service_url + query);
    $.ajax({
        url: service_url + query,
        type: 'GET',
        success: function (plants) {
            recreatePlantsTable(plants);
        }
    });

}


//Need to allocate the cards
function recreatePlantsTable(plants) {
    const plantLen = plants.length;
    if (plantLen) {
        $("#table-data").append("<div id='multi-item-example' class='carousel slide carousel-multi-item' data-ride='carousel'>" +
            "<ol class='carousel-indicators'><li data-target='#multi-item-example' data-slide-to='0' class='active'></li>" +
            "<li data-target='#multi-item-example' data-slide-to='1'></li></ol><div class='carousel-inner-search' role='listbox'></div></div>");

        for (let i = 0; i < plantLen; i++) {
            let row = "<div class='carousel-item active'><div id='card-location' class='col-md-3' style='float: left'>" +
                "<div class='card mb-2'>" +
                "<img class='card-img-top' src='$imgDb' alt='Card image cap'/>" +
                "<div class='card-body'> <h4 class='card-title'>$nameDb</h4>" +
                "<p class='card-text'>Level: Hard , Location: Indoor</p>" +
                "<div id='btns'><a class='btn btn-light'>View</a>" +
                "<a class='btn btn-light'>Add</a></div></div></div></div></div>"
            row = row.replace("$imgDb", plants[i].image_url);
            row = row.replace("$nameDb", plants[i].name);
            $(".carousel-inner-search").append(row);
        }
    }

}