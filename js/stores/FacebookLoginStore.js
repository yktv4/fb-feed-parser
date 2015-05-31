var FacebookLoginStore = Reflux.createStore({
    state: undefined,
    init: function () {
        this.listenTo(Actions.login.stateChange, this.updateLoginState);
        this.listenTo(Actions.login.click, this.onLogin);

        fbLoads.then(function () {
            this.updateLoginState();
        }.bind(this));
    },
    onLogin: function () {
        fbLoads.then(function () {
            FB.login(function (response) {
                Actions.login.stateChange();
            }, {scope: 'public_profile,email'});
        });
    },
    updateLoginState: function () {
        FB.getLoginStatus(function(response) {
            this.state = response.status;
            this.trigger();

            if (this.state == 'connected') {
                Actions.login.success();
            }
        }.bind(this));
    },
    get: function () {
        return this.state;
    }
});