import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { getRootNavigator } from './src/navigator'
import changefeedListeners from './src/db/changefeed-listeners'
import { store } from './src/redux';

changefeedListeners(store)

const AppContainer = getRootNavigator()

export default class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Provider store={store}>
				<AppContainer
                                        onNavigationStateChange={null}
                                        uriPrefix="/app"
                                        />
			</Provider>
		)
	}
}
