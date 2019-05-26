import React from 'react';
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator,
	createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './screens/Main';
import EventDetails from './screens/EventDetails';
import Favour from './screens/Favour';
import Auth from './components/Auth';
import WelcomeScreen from './screens/WelcomeScreen';

const StackNavigationOptions = {
	headerStyle: {
		backgroundColor: '#6AD9C4'
	},
	headerTintColor: '#fff',
	headerTitleStyle: {
		fontWeight: 'bold'
	}
};

const HomeStack = createStackNavigator(
	{
		Main: Main,
		Details: EventDetails
	},
	{
		defaultNavigationOptions: StackNavigationOptions
	}
);

const FavouriteStack = createStackNavigator(
	{
		Fav: Favour,
		FavourDetails: EventDetails
	},
	{
		defaultNavigationOptions: StackNavigationOptions
	}
);

FavouriteStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible
	};
};

const TabNavigator = createBottomTabNavigator(
	{
		Events: HomeStack,
		Favourites: FavouriteStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = Ionicons;
				let iconName;
				if (routeName === 'Events') {
					iconName = `md-calendar`;
					if (focused) {
						tintColor = '#fff';
					}
				} else if (routeName === 'Favourites') {
					iconName = `md-star`;
					if (focused) {
						tintColor = 'orange';
					}
				}
				return <IconComponent name={iconName} size={35} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: '#fff',
			inactiveTintColor: '#404040',
			style: {
				backgroundColor: '#54BFA1'
			},
			lazy: true
		}
	}
);

export const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			Welcome: WelcomeScreen,
			Auth: Auth,
			App: TabNavigator
		},
		{ initialRouteName: 'Welcome' }
	)
);
