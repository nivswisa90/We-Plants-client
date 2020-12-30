const plants_service_url = "http://localhost:3000/api/plants";
const user_service_url = "http://localhost:3000/api/users/2";
//Self invoke  for the button listeners

// logics of the buttons.
(function userOperationsListeners() {
  $("#get-query-search").click(() => {
    const queryValue = $("#query-value").val();
    const query = `?name=${queryValue}`;
    getAllPlantsBySearch(query);
  });
  $(".btn-light").click(() => {
    const queryValue = $(".card-title").val();
    console.log("HOI");
  });
})();

function getAllPlantsBySearch(query) {
  $.ajax({
    url: plants_service_url + query,
    type: "GET",
    success: function (plants) {
      recreatePlantsTable(plants);
    },
  });
}

//Need to allocate the cards
function recreatePlantsTable(plants) {
  const plantLen = plants.length;
  $("#multi-item-example-search").empty().remove();
  if (plantLen) {
    $("#possible-error").hide();
    // id='carousel-inner-search'
    $("#table-data").append(
      "<div id='multi-item-example-search' class='carousel slide carousel-multi-item' data-ride='carousel'>" +
        "<ol class='carousel-indicators'><li data-target='#multi-item-example-search' data-slide-to='0' class='active'></li>" +
        "<li data-target='#multi-item-example-search' data-slide-to='1'></li></ol><div class='carousel-inner' role='listbox'><div id='search-carousel-item-active' class='carousel-item active'></div><div id='search-carousel-item' class='carousel-item'></div></div></div>"
    );

    for (let i = 0; i < plantLen; i++) {
      let row =
        "<div class='col-md-3' style='float: left'>" +
        "<div class='card mb-2'>" +
        "<img class='card-img-top' src='$imgDb' alt='Card image cap'/>" +
        "<div class='card-body'> <h4 class='card-title'>$nameDb</h4>" +
        "<p class='card-text'>Level: Hard , Location: Indoor</p>" +
        "<div id='btns'><a class='btn btn-info'>View</a> " +
        "<a class='btn btn-light'>Add</a></div></div></div></div>";
      row = row.replace("$imgDb", plants[i].image_url);
      row = row.replace("$nameDb", plants[i].name);
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
