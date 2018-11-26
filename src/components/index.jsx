import React, { Component } from 'react'
import RecordingControl from './RecordingControl'
import PostProduction from './PostProduction'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.app.isPostProduction) return <PostProduction {...this.props} />
        else return <RecordingControl {...this.props} />
    }
}
