import { TabNavigator } from 'react-navigation'
import * as screens from '../containers'
import { store } from '../../App'
import { swapWallView } from '../actions/actionCreators'

const LoggedInNavigator = TabNavigator({
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
	order: ['controller','camera'],
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
