const setTasksList = (value)=>({
    type: 'SET_TASKS_LIST',
    value
});

const addToken = value => ({
   type: 'ADD_TOKEN',
   value
});

const removeToken = () => ({
    type: 'REMOVE_TOKEN'

});

export {
    setTasksList,
    addToken,
    removeToken
}