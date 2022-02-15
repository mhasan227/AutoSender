import AppIntroSlider from 'react-native-app-intro-slider';
import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TutorialContext} from '../../../services/tutorial/tutorial.context';
import {Caption, Subheading} from 'react-native-paper';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 30,
    color: 'black',
    textAlign: 'center',
  },
});
const slides = [
  {
    key: 'k1',
    title: 'Messages',
    text: '\nSend Messages Automatically Wherever You Want, Whenever The Need. No Need For Any Human Interaction',
    image: require('../../../../assets/gifs/messageTransparent.gif'),
    width: 315,
    height: 415,
    backgroundColor: 'lightblue',
  },
  {
    key: 'k2',
    title: 'Location',
    text: 'Send Messages Based On Where You Are In The World, And Even Set A Radius For A More Accurate Measurement',
    image: require('../../../../assets/gifs/around-the-world-transparent.gif'),
    width: 350,
    height: 450,
    backgroundColor: '#FFD8D7',
  },
  {
    key: 'k3',
    title: 'Date & Time',
    text: 'Send Messages Based On The Date And Time And Even Set Intervals To Send Messages Every Few Seconds',
    image: require('../../../../assets/gifs/clockTransparent.gif'),
    width: 350,
    height: 450,
    backgroundColor: '#D7D0DC',
  },
  {
    key: 'k4',
    title: '24/7 Online',
    text: 'Active 24/7 For Your Every Need, It Will Send Messages Day Or Night, Monday To Sunday',
    image: require('../../../../assets/gifs/24-hours-transparent.gif'),
    width: 350,
    height: 450,
    backgroundColor: '#FFF8AD',
  },
];
export const TutorialScreen = ({navigation}) => {
  const {addToTutorial} = useContext(TutorialContext);
  const [showMainApp, setShowMainApp] = useState(false);
  const onDoneAllSlides = navigation => {
    setShowMainApp(true);
    addToTutorial(false);
    navigation.navigate('ProfilesHome', {screen: 'Profiles'});
  };
  const onSkipSlides = navigation => {
    setShowMainApp(true);
    addToTutorial(false);
    navigation.navigate('ProfilesHome', {screen: 'Profiles'});
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          onPress={() => onDoneAllSlides(navigation)}
        />
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: item.backgroundColor,
          flex: 1,
          paddingTop: 20,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={item.image}
          style={{
            width: item.width,
            height: item.height,
            alignSelf: 'center',
            resizeMode: 'contain',
            flex: 0.75,
          }}
        />
        <Subheading style={styles.text}>{item.text}</Subheading>
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
    />
  );
};
