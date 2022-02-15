import React, {useContext, useEffect, useState} from 'react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import {GetAllPermissions} from '../../services/Permissions';
import {NativeModules, PermissionsAndroid} from 'react-native';
import moment from 'moment';
import {ProfilesContext} from '../profiles/profiles.context';
var DirectSms = NativeModules.DirectSms;

const isWithinRange = (num1, num2, rangeValue) => {
  if (num1 - rangeValue < num2 && num1 + rangeValue > num2) {
    return true;
  }
  return false;
};
const metersToLatLng = meters => {
  return meters / 111111;
};
const sendDirectSms = async (Number, Message) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'YourProject App Sms Permission',
        message:
          'YourProject App needs access to your inbox ' +
          'so you can send messages in background.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      DirectSms.sendDirectSms(Number, Message);
    } else {
      console.log('SMS permission denied');
    }
  } catch (err) {
    console.log('ERROR');
    console.warn(err);
  }
};
const runForegroundService = profilesLength => {
  ReactNativeForegroundService.remove_task('taskid');
  ReactNativeForegroundService.stop();
  ReactNativeForegroundService.start({
    id: 144,
    title: 'Send Automatic Messages',
    message: `${profilesLength} Automatic Messages Services Running`,
  });
  RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });
};

const currentDateStatic = new Date();
export const AddForegroundService = (tempProfiles, setToday) => {
  const profiles = tempProfiles;

  let locationSubscription = null;
  let locationTimeout = null;

  const DaysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    if (profiles.length) {
      runForegroundService(profiles.length);
      AddForegroundServiceTask(profiles, setToday);
    }
  }, [profiles]);

  const AddForegroundServiceTask = (foregroundProfiles, setToday) => {
    let intervalSeconds = 0;
    let intervalSecondsCounter = 0;
    ReactNativeForegroundService.add_task(
      () => {
        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine',
          },
        }).then(granted => {
          //console.log('Location Permissions: ', granted);
          // if has permissions try to obtain location with RN location
          const currentDate = new Date();
          intervalSecondsCounter = intervalSecondsCounter + 1;

          if (granted) {
            locationSubscription && locationSubscription();

            locationSubscription = RNLocation.subscribeToLocationUpdates(
              ([locations]) => {
                locationSubscription();

                foregroundProfiles.map(profile => {
                  if (profile.active) {
                    profile.messages.map(message => {
                      profile.locations.map(location => {
                        if (
                          isWithinRange(
                            location.Lat,
                            locations.latitude,
                            metersToLatLng(location.range),
                          ) &&
                          isWithinRange(
                            location.Lng,
                            locations.longitude,
                            metersToLatLng(location.range),
                          )
                        ) {
                          if (
                            profile.type === 'Location' &&
                            profile.today !== currentDate.getDay()
                          ) {
                            setToday(profile.title, currentDate.getDay());
                            sendDirectSms(message.number, message.message);
                          }
                          if (
                            profile.type === 'Location Time' &&
                            profile.today !== currentDate.getDay()
                          ) {
                            if (
                              moment(profile.time).format('hh:mm A') ===
                                moment(currentDate).format('hh:mm A') &&
                              profile.date.includes(
                                DaysOfWeek[currentDate.getDay() - 1],
                              )
                            ) {
                              setToday(profile.title, currentDate.getDay());
                              sendDirectSms(message.number, message.message);
                            }
                          }
                        }
                      });
                      if (profile.type === 'Time') {
                        if (
                          moment(profile.time).format('hh:mm A') ===
                            moment(currentDate).format('hh:mm A') &&
                          profile.date.includes(
                            DaysOfWeek[currentDate.getDay() - 1],
                          ) &&
                          profile.today !== currentDate.getDay()
                        ) {
                          setToday(profile.title, currentDate.getDay());
                          sendDirectSms(message.number, message.message);
                        }
                      }
                      if (profile.type === 'Interval') {
                        if (intervalSecondsCounter >= intervalSeconds) {
                          sendDirectSms(message.number, message.message);
                          intervalSeconds =
                            intervalSecondsCounter + profile.interval;
                        }
                      }
                    });
                  }
                });
                locationTimeout && clearTimeout(locationTimeout);
                //console.log(locations.latitude, locations.longitude);
              },
            );
          } else {
            locationSubscription && locationSubscription();
            locationTimeout && clearTimeout(locationTimeout);
            console.log('no permissions to obtain location');
          }
        });
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'taskid',
        onError: e => console.log('Error logging:', e),
      },
    );
  };
};
