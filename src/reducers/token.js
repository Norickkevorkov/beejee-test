const emptyToken = {
    token: ''
};

function token(state= emptyToken, action) {
    switch (action.type) {
        case 'ADD_TOKEN': return{
            ...state,
            token: action.value
        };
        case 'REMOVE_TOKEN': return {
            ...state,
            token: ''
        };
        default: return state

    }
}

export default token;