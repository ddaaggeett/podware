import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Controller from '../components/Controller'

import * as actionCreators from '../actions/actionCreators'

function mapStateToProps(state) {
	return {
		app: state.app,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, actionCreators), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller)
