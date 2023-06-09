import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigation from './BottomNavigation';
import SecondScreen from './SecondScreen';
import SplashScreen from './SplashScreen';

//color palette: https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer >
      {/* <Stack.Navigator> */}
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SecondScreen" component={SecondScreen} options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        /> */}
        <BottomNavigation />
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
