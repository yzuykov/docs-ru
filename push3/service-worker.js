'use strict';

var API_ENDPOINT = 'https://android.googleapis.com/gcm/send';

function showNotification(title, body, icon, data) {
  var notificationOptions = {
    body: body,
    icon: icon ? icon : 'images/touch/chrome-touch-icon-192x192.png',
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
        var message = data.message;
        var icon = 'images/notification-icon.png';
        var notificationTag = 'chat-message';

        var notificationFilter = {
          tag: notificationTag
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
                  notificationCount +=
existingNotification.data.notificationCount;
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
      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';

      return showNotification(title, message);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
      clients.openWindow("http://www.wsoft.ru");      
});
