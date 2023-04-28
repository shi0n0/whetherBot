function sendWeatherToSlack() {
    var api_key = "d87475d53bc05bed8e20e9e0c1d08206";
    var city = "Tokyo";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    var weather = data.weather[0].description;
    var temperature = Math.round(data.main.temp - 273.15);
    var message = "今日の" + city + " の天気は" + weather + "です\n気温は" + temperature + "度になるでしょう。";

    var slackUrl = "slackUrl"
    var payload = {
        "text": message
    };
    var options = {
        "method": "POST",
        "payload": JSON.stringify(payload)
    };

    // 定期的に実行するためにトリガーを設定
    ScriptApp.newTrigger("sendWeatherToSlack")
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();

UrlFetchApp.fetch(slackUrl, options);
}