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
  
  var slackUrl = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL');

  var payload = {
    "text": message
  };
  var options = {
    "method": "POST",
    "payload": JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(slackUrl, options);
}

function setDailyTrigger() {
  const functionName = 'sendWeatherToSlack';
  const hour = 9;
  const minute = 30;

  // すでにトリガーが存在する場合は削除する
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // 新しいトリガーを作成する
  const date = new Date();
  date.setDate(date.getDate() + 1); // 現在の日付に1日加算する
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .at(date)
    .create();
}

