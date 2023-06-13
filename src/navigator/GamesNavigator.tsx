import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GamesScreen} from '../screens/GamesScreen';

export type GamesStackParams = {
  GamesScreen: undefined;
};

const Stack = createStackNavigator<GamesStackParams>();

export const GamesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{title: 'Games'}}
      />
    </Stack.Navigator>
  );
};
