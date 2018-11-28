import { createBottomTabNavigator } from 'react-navigation'
import * as screens from '../containers'
import { store } from '../../App'

const LoggedInNavigator = createBottomTabNavigator({
	camera: {
		screen: screens.Camera,
		navigationOptions: {
			header: null,
		},
	},
	controller: {
		screen: screens.Controller,
		navigationOptions: {
			tabBarLabel: 'controller',
		},
	}
}, {
	order: ['camera','controller'],
	initialRouteName: 'camera',
	tabBarOptions: {
		style: {
			backgroundColor: '#555',
		},
		labelStyle: {
			fontSize: 14,
			fontWeight: 'bold',
		},
		activeTintColor: '#fff',
        inactiveTintColor: '#000',
	},
})

export default LoggedInNavigator
