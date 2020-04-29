function sendMessage() {
    chrome.runtime.sendMessage({action: "getCurrentForecast"}, function(response) {
        if (response == null) {
            setTimeout(sendMessage, 2000);
        } else {
            showResult(response);
            graphDraw(response);
        }
    });
}

function showResult(response) {
    var statusDiv = document.getElementById("status");
    var icoImg = document.getElementById("ico");
    var locationDiv = document.getElementById("location");
    var temperatureDiv = document.getElementById("temperature");
    var detailsDiv = document.getElementById("details");
    
    statusDiv.textContent = response.currently.summary;
    locationDiv.textContent = response.timezone;
    temperatureDiv.textContent = response.currently.temperature.toString().split('.')[0] + "˚C";
    detailsDiv.textContent = "Humidity: " + response.currently.humidity   
    + " \n Pressure: " + response.currently.pressure 
    + " \n WindSpeed: " + response.currently.windSpeed  
    + " \n Clouds: " + response.currently.cloudCover;
    

    // icoImg.style.display = "block";
    // icoImg.src = chrome.extension.getURL("/" + response.currently.icon + ".png");

}

function graphDraw(response){
    var ctx = document.getElementById("chart").getContext('2d');
    var data = [response.currently.windGust,response.currently.cloudCover,response.currently.windSpeed,response.currently.dewPoint];
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [ 'windGust', 'CloudCover', 'WindSpeed', 'dewPoint' ],
                datasets: [{
                backgroundColor: [
                    "#59be5b",
                    "#d56328",
                    "#ff1b2d",
                    "#0078d7"
                ],
                data: data
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', sendMessage);


