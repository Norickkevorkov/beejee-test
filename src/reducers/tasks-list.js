const emptyTasksList = {
    page: 1,
    tasks: [],
    sortField: 'id',
    sortDirection: 'asc',
    totalPages: 0,
    totalTasks: 0
};

function getTotalPages(tasksCount) {
    return (tasksCount % 3) ? Math.floor(tasksCount / 3) + 1 : Math.floor(tasksCount / 3)
}

function tasksList(state = emptyTasksList, action) {
    switch (action.type) {
        case 'SET_TASKS_LIST':
            return {
                ...state,
                tasks: action.value.tasks,
                totalPages: getTotalPages(action.value.totalTasks),
                totalTasks: action.value.totalTasks,
                sortField: action.value.sortField,
                sortDirection: action.value.sortDirection,
                page: action.value.page
            };
        default:
            return state
    }
}

export default tasksList;