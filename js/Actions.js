var Actions = {
    login: {
        stateChange: Reflux.createAction(),
        success: Reflux.createAction(),
        click: Reflux.createAction()
    },
    fetch: Reflux.createAction(),
    error: Reflux.createAction()
};