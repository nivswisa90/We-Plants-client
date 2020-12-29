const service_url = 'http://localhost:3000/api/plants';

//Self invoke  for the button listeners
;

// logics of the buttons.
(function userOperationsListeners() {
    $("#get-query-search").click(() =>{
        const queryValue = $("#query-value").val();
        const query = `?name=${queryValue}`;
        getAllPlantsBySearch(query);
    });
}())


function getAllPlantsBySearch(query) {
    // alert('getAll');
    // alert(service_url + query);
    $.ajax({
        url: service_url + query,
        type: 'GET',
        success: function (plants) {
            console.log(plants);
            recreatePlantsTable(plants);
        }
    });
}



function recreatePlantsTable(plants) {
    // console.log(plants);
    // EXTRACT VALUE FOR HTML HEADER. 
    let col = [];
    for (let i = 0; i < plants.length; i++) {
        for (let key in plants[i]) {
            if (col.indexOf(key) === -1) {

                col.push(key);
            }
        }
    }

    // col.splice(9, 1);
    // col.splice(0, 1);

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    let tr = table.insertRow(-1);// TABLE ROW.
    console.log(tr);

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");// TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < plants.length; i++) {
        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {

            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = plants[i][col[j]];
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    const divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}