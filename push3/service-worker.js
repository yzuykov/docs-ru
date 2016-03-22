'use strict';

var API_ENDPOINT = 'http://httpbin.org/get';

function showNotification(title, body, icon, data) {
  var notificationOptions = {
    body: body,
    icon: 'http://www.wsoft.ru/bitrix/templates/newrus/images/logo.png',
    tag: 'simple-push-demo-notification',
    data: data
  };

  self.registration.showNotification(title, notificationOptions);
  return;
}

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch(API_ENDPOINT).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }

      // Examine the text in the response
      return response.json().then(function(data) {
        var title = 'You have a new message';
        var message = data.url;
        var icon = 'http://www.wsoft.ru/bitrix/templates/newrus/images/logo.png';


      return showNotification(title, message);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
      clients.openWindow("http://www.wsoft.ru");      
});
