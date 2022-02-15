import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import {Platform, NativeModules} from 'react-native';

export const AppbarHeader = props => {
  const title = props.title;
  const subtitle = props.subtitle;
  const AddParams = props.AddParams;
  const navigate = props.navigate;
  const navigation = props.navigation;
  const noNavigation = props.noNavigation;
  const OnPressNavigate = props.OnPressNavigate;
  const noNavigationFunc = props.noNavigationFunc;
  const icon = props.icon;
  const action = props.action;
  const OnPressBack = props.OnPressBack;
  const BackButton = props.BackButton;
  const {StatusBarManager} = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;
  const [runAction, setRunAction] = useState(false);

  return (
    <Appbar.Header dark={true} statusBarHeight={STATUSBAR_HEIGHT}>
      {BackButton && (
        <Appbar.BackAction
          size={30}
          onPress={() => {
            if (OnPressBack) {
              OnPressBack();
            }
            navigation.goBack();
          }}
        />
      )}

      <Appbar.Content title={title} subtitle={subtitle} />
      {action && (
        <Appbar.Action
          size={30}
          disabled={runAction}
          icon={icon ? icon : 'check'}
          onPress={() => {
            if (noNavigationFunc !== undefined) {
              console.log(noNavigationFunc());
              if (noNavigationFunc() === false) {
                setRunAction(true);
                if (AddParams) {
                  navigation.navigate(navigate, AddParams);
                } else {
                  navigation.navigate(navigate);
                }
              }
            } else if (!noNavigation) {
              setRunAction(true);
              if (AddParams) {
                navigation.navigate(navigate, AddParams);
              } else {
                navigation.navigate(navigate);
              }
            }
            OnPressNavigate();
          }}
        />
      )}
    </Appbar.Header>
  );
};
