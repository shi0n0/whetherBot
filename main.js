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
  
    var slackUrl = "https://hooks.slack.com/services/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"
    var payload = {
      "text": message
    };
    var options = {
      "method": "POST",
      "payload": JSON.stringify(payload)
    };
  
    UrlFetchApp.fetch(slackUrl, options);
  }
  
function addTime() {
  const functionName = 'sendWeatherToSlack';
  const hour = 9;
  const minute = 30;

  // 現在のトリガーをすべて削除する
  const triggers = ScriptApp.getProjectTriggers();
  for (const i in triggers) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // 新しいトリガーを設定する
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  ScriptApp.newTrigger(functionName)
      .timeBased()
      .at(date)
      .create();
}