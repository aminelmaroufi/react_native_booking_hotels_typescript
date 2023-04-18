import {CommonActions} from '@react-navigation/native';

export const navigateToScreen = (screenName: string, params: any) => {
  return CommonActions.navigate({
    name: screenName,
    params,
  });
};
