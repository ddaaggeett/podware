import { createMaterialTopTabNavigator } from 'react-navigation'
import * as screens from '../containers'
import { store } from '../../App'

const LoggedInNavigator = createMaterialTopTabNavigator({
	camera: {
		screen: screens.Camera,
		navigationOptions: {
			tabBarVisible: false,
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
	swipeEnabled: true,
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
