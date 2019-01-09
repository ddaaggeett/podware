const initialState = {
    recording: false,
    selectedMicrophones: [],
    cameras: [],
    isPostProduction: false,
}

const podware = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_APP_STATE':
            return action.newAppState
        default:
            return state;
    }
}

export default podware
