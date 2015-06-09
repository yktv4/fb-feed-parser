var Actions = {
    login: {
        stateChange: Reflux.createAction(),
        success: Reflux.createAction(),
        click: Reflux.createAction()
    },
    fetch: Reflux.createAction(),
    error: Reflux.createAction(),
    loading: {
        start: Reflux.createAction(),
        stop: Reflux.createAction()
    },
    post: {
        select: Reflux.createAction(),
        deselect: Reflux.createAction(),
        updated: Reflux.createAction()
    },
    grid: {
        show: Reflux.createAction()
    },
    comments: {
        loadMore: Reflux.createAction()
    }
};