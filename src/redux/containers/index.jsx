import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from '../../components'
import * as Actions from '../actions'

function mapStateToProps(state) {
	return {
		app: state.app,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, Actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
