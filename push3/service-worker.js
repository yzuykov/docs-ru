'use strict';

var API_ENDPOINT = 'https://api.direct.yandex.ru/'+'v4/'+'json/' ;

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
    fetch(API_ENDPOINT,{method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    method: 'GetClientInfo',
    locale: 'RU'
  })
    }
  ).then(function(response) {
        if (response.status !== 200) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error('Invalid status code from  API: ' +
            response.status);
        }

        // Examine the text in the response
        return response.json();
      })
      .then(function(data) {
        console.log('API data: ', data);
        if (data.headers.count === 0) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error();
        }
        var title = 'You have a new message';
        var message = data.headers.Host;
        var icon = 'http://www.wsoft.ru/bitrix/templates/newrus/images/logo.png';
        
        var notificationFilter = {
          tag: 'simple-push-demo-notification'
        };
        return self.registration.getNotifications(notificationFilter)
          .then(function(notifications) {
            if (notifications && notifications.length > 0) {
              // Start with one to account for the new notification
              // we are adding
              var notificationCount = 1;
              for (var i = 0; i < notifications.length; i++) {
                var existingNotification = notifications[i];
                if (existingNotification.data &&
                  existingNotification.data.notificationCount) {
                  notificationCount += existingNotification.data.notificationCount;
                } else {
                  notificationCount++;
                }
                existingNotification.close();
              }
              message = 'You have ' + notificationCount +
                ' weather updates.';
              notificationData.notificationCount = notificationCount;
            }

            return showNotification(title, message, icon, notificationData);
      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';
      var icon = 'http://www.wsoft.ru/bitrix/templates/newrus/images/logo.png';
        return showNotification(title, message,icon);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
      clients.openWindow("http://www.wsoft.ru");      
});
