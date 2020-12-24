import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MyApp from './src/tab_navigation';
import Home from './src/Containers/HomeContainer'
import devToolsEnhancer from 'remote-redux-devtools';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './src/Services/Reducers/index'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const store=createStore(rootReducer ,devToolsEnhancer());
// console.log("store",store)

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
     <Home/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'cloud-circle-sharp'
                : 'cloud-circle-sharp';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'list-box' : 'list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          activeBackgroundColor:'black',
          inactiveBackgroundColor:'black',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}