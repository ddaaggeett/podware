import React from 'react'
import ReactDOM from 'react-dom'
import App from './redux/containers'
import { Provider } from 'react-redux'
import { store } from './redux'
import changefeedListeners from './db/changefeed-listeners'
import './assets/css/global.css'

changefeedListeners(store)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
