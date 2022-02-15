import React, {useState, useContext} from 'react';
import {StyleSheet, View, PixelRatio} from 'react-native';
import {
  FAB,
  Provider,
  Portal,
  Chip,
  Subheading,
  useTheme,
} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {LocationsContext} from '../../../services/locations/locations.context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fabContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  fabItem: {
    margin: 0,
  },
});
export const SelectLocationScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  navigation.setOptions({tabBarVisible: false});
  const {addToLocations, Locations} = useContext(LocationsContext);
  const getMapZoom = () => {
    return meterRadius / (meterRadius * 10) - 0.09;
  };
  const getInitialState = () => {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: getMapZoom(),
      longitudeDelta: 0,
    };
  };
  const {initialRegion} = route.params;
  const [meterRadius, setMeterRadius] = useState(100);
  const [region, setRegion] = useState(initialRegion || getInitialState());
  const [markerPosition, setMarkerPosition] = useState();

  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const [map, setMap] = useState();
  const [showMarker, setShowMarker] = useState(false);
  const onShowMarker = () => setShowMarker(true);

  const metersToLatLng = meters => {
    return meters / 111111;
  };

  const onMagnify = () => {
    setRegion({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: Math.max(region.latitudeDelta - 0.1, 0.5),
      longitudeDelta: 0,
    });
  };

  const onMagnifyRange = () => {
    setMeterRadius(meterRadius + 25);
  };

  const onMinify = () => {
    setRegion({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta + 0.1,
      longitudeDelta: 0,
    });
  };
  const onMinifyRange = () => {
    setMeterRadius(meterRadius - 25);
  };
  const setRegionLatLng = LatLng => {
    LatLng.latitudeDelta = region.latitudeDelta;
    LatLng.longitudeDelta = region.longitudeDelta;
    setRegion(LatLng);
  };
  const AddLocation = () => {
    const Lat = markerPosition.latitude;
    const Lng = markerPosition.longitude;
    addToLocations(Lat, Lng, meterRadius);
  };
  const onRegionChange = newRegion => {
    setRegion(newRegion);
  };
  const padding = 100;
  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          ref={map => setMap(map)}
          onRegionChangeComplete={onRegionChange}
          onPress={event => {
            if (showMarker) {
              setMarkerPosition(event.nativeEvent.coordinate);

              //setRegion({
              //  latitude: region.latitude,
              //  longitude: region.longitude,
              //  latitudeDelta: getMapZoom(),
              //  longitudeDelta: 0,
              //});
              map.fitToCoordinates([event.nativeEvent.coordinate], {
                edgePadding: {
                  top:
                    Platform.OS === 'ios'
                      ? padding
                      : PixelRatio.get() * padding - 50, // 50 is the baseMapPadding https://github.com/react-native-community/react-native-maps/blob/master/lib/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java#L85
                  right: 0,
                  left: 0,
                  bottom:
                    Platform.OS === 'ios'
                      ? padding
                      : PixelRatio.get() * padding - 50,
                },
              });
            }
          }}>
          {showMarker && markerPosition && (
            <>
              <Marker
                coordinate={{
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                }}
              />
              <Circle
                center={{
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                }}
                radius={meterRadius}
                fillColor="rgba(99, 146, 247, 0.5)"
                strokeColor="rgba(255, 255, 255, 0.5)"
              />
            </>
          )}
        </MapView>
        <View style={{position: 'absolute', top: 30, width: 375}}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                longitudeDelta: region.longitudeDelta,
                latitudeDelta: region.latitudeDelta,
              });
              setMarkerPosition({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              map.fitToCoordinates(
                [
                  {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  },
                ],
                {
                  edgePadding: {
                    top:
                      Platform.OS === 'ios'
                        ? padding
                        : PixelRatio.get() * padding - 50, // 50 is the baseMapPadding https://github.com/react-native-community/react-native-maps/blob/master/lib/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java#L85
                    right: 0,
                    left: 0,
                    bottom:
                      Platform.OS === 'ios'
                        ? padding
                        : PixelRatio.get() * padding - 50,
                  },
                },
              );
              setShowMarker(true);
            }}
            fetchDetails={true}
            query={{
              key: 'AIzaSyA-52WGHTfIbcKoOzV5wRYdgJHliRmzdZY',
              language: 'en',
            }}
          />
        </View>
        {showMarker && (
          <Chip
            style={{
              position: 'absolute',
              bottom: 75,
              backgroundColor: 'rgba(225,225,225,0.75)',
            }}>
            <Subheading>Click To Place Marker</Subheading>
          </Chip>
        )}
      </View>
      <Provider>
        <Portal>
          <View style={styles.fabContainer}>
            <FAB
              style={{margin: 16}}
              label="Finished"
              icon="check"
              size={30}
              theme={{colors: {accent: colors.primary}}}
              onPress={() => {
                if (showMarker) {
                  navigation.goBack();
                  AddLocation();
                }
              }}
            />
            <FAB.Group
              open={open}
              fabStyle={{backgroundColor: colors.primary}}
              style={{margin: 0}}
              icon={open ? 'map-marker-multiple' : 'plus'}
              actions={[
                {
                  icon: 'magnify-minus',
                  onPress: () => onMinifyRange(),
                },
                {
                  icon: 'magnify-plus',
                  onPress: () => onMagnifyRange(),
                },
                {
                  icon: 'map-marker-radius',
                  size: 30,
                  label: 'Add Marker',

                  onPress: () => onShowMarker(),
                  small: false,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </View>
        </Portal>
      </Provider>
    </>
  );
};
