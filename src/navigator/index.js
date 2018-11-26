import { createSwitchNavigator } from 'react-navigation'

import LoggedInNavigator from './LoggedIn'

export const getRootNavigator = (loggedIn = false) => createSwitchNavigator({
    LoggedIn: {
        screen: LoggedInNavigator
    }
}, {
    initialRouteName: 'LoggedIn'
})
