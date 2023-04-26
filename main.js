function getWeather() {
    var api_key = "d87475d53bc05bed8e20e9e0c1d08206";
    var city = "Tokyo";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    var weather = data.weather[0].description;
    var temperature = Math.round(data.main.temp - 273.15);
    var result = "今日の" + city + " の天気は" + weather + "です\n気温は" + temperature + "度になるでしょう。";
    return result;
}