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
  
    // トリガーを設定
    var now = new Date();
    var eightAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8);
    ScriptApp.newTrigger("sendWeatherToSlack")
      .timeBased()
      .at(eightAM)
      .create();
  
    UrlFetchApp.fetch(slackUrl, options);
  }
  
  function addTime() {
  const functionName = 'sendWeatherToSlack';
  const date = new Date();
  const time = '09:30';
  date.setHours(...time.split(':'));
  setTrigger(functionName, date);
}

function deleteTrigger(functionName) {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() !== functionName) return;
    ScriptApp.deleteTrigger(trigger);
  })
}

//時間を指定してトリガーを設定
function setTrigger(functionName, date) {
  ScriptApp.newTrigger(functionName).
    timeBased().
    at(date).
    create();
}