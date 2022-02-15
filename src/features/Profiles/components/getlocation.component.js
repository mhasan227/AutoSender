import React from 'react';
import RNLocation from 'react-native-location';

export const getLocation = () => {
  let locationSubscription = null;
  let locationTimeout = null;
  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'fine',
    },
  }).then(granted => {
    //console.log('Location Permissions: ', granted);
    // if has permissions try to obtain location with RN location

    if (granted) {
      locationSubscription && locationSubscription();

      locationSubscription = RNLocation.subscribeToLocationUpdates(
        ([locations]) => {
          locationSubscription();
          locationTimeout && clearTimeout(locationTimeout);
          return locations;
        },
      );
    } else {
      locationSubscription && locationSubscription();
      locationTimeout && clearTimeout(locationTimeout);
      console.log('no permissions to obtain location');
    }
  });
};
