import React from 'react';
import Image from 'react-native';
export const Logo = () => {
  return (
    <>
      <Image
        source={require('../../../../assets/AutoSender.jpeg')}
        style={{
          position: 'absolute',
          bottom: 350,
          flex: 1,
          alignSelf: 'center',
          width: '70%',
          resizeMode: 'contain',
        }}
      />
    </>
  );
};
