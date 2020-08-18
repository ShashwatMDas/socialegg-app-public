import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VideoScreen from '../screens/VideoScreen'
import SwipeScreen from '../screens/SwipeScreen';
import TrendingScreen from '../screens/TrendingScreen'

import {Icon} from 'native-base';
import SearchBar from '../screens/SearchScreen'
import Animation from '../screens/Animations'
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'SwipeScreen';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route)});

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{tabStyle: {backgroundColor: '#2e2e2e', borderTopColor: '#2e2e2e', borderTopWidth: 2, paddingTop: 5,}, activeTintColor:'white',labelStyle: {fontFamily: 'Headings'}}}>
      
      <BottomTab.Screen
        name="Feed"
        component={SwipeScreen}
        options={{
          title: 'Feed',
          style:{backgroundColor:'black'},
          tabBarIcon: ({ focused }) => <Icon focused={focused} style={focused ? {color: '#5873FF'}: {color: 'white'}} type="FontAwesome5" name="egg" />,
        }}
      />
       <BottomTab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: 'Videos',
          tabBarIcon: ({ focused }) => <Icon active={focused} style={focused ? {color: '#5873FF'}: {color: 'white'}} type="Feather" name="video" />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchBar}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <Icon active={focused} style={focused ? {color: '#5873FF'}: {color: 'white'}} type="Feather" name="search" />,
        }}
      />
         <BottomTab.Screen
        name="Trending"
        component={TrendingScreen}
        options={{
          title: 'Trending',
          tabBarIcon: ({ focused }) => <Icon active={focused} style={focused ? {color: '#5873FF'}: {color: 'white'}} type="Feather" name="trending-up" />,
        }}
      />
       <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Icon active={focused} style={focused ? {color: '#5873FF'}: {color: 'white'}} type="Feather" name="user" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Feed':
      return 'Swipe through your favourite News articles';
    case 'Saved':
      return 'Read your favourite articles again';
      case 'Profile':
        return 'Edit your preferences';
        case 'Search':
        return 'Edit your preferences';
        case 'Swipe':
          return 'Edit your preferences';
  }
}
