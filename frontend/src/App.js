import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './screens/ProfileScreen';
import FindFriendScreen from './screens/FindFriendScreen';
import ChatScreen from './screens/ChatScreen';
import MatchingScreen from './screens/MatchingScreen';
import CreateMatchScreen from './screens/CreateMatchScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="FindFriend" component={FindFriendScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Matching" component={MatchingScreen} />
        <Stack.Screen name="CreateMatch" component={CreateMatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
