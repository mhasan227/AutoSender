import * as React from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, Provider, IconButton} from 'react-native-paper';

export const MenuComponent = ({props, setVisible, visible}) => {
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              {...props}
              icon="dots-vertical"
              onPress={() => {
                openMenu();
              }}
            />
          }>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
};
