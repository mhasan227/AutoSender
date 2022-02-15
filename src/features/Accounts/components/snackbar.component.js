import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar, Colors} from 'react-native-paper';

export const SnackBar = ({visible, setVisible, text}) => {
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          color: Colors.red500,
          label: 'Ok',
          onPress: () => {
            // Do something
            onDismissSnackBar();
          },
        }}>
        {text}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
