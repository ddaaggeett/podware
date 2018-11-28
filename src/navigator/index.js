import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import LoggedInNavigator from './LoggedIn'

const switchNavigator = createSwitchNavigator({
    LoggedIn: {
        screen: LoggedInNavigator
    }
}, {
    initialRouteName: 'LoggedIn'
})

export const getRootNavigator = (loggedIn = false) => createAppContainer(switchNavigator)
