var FacebookLogin = React.createClass({
    getInitialState: function () {
        return {loginState: FacebookLoginStore.get()}
    },
    componentDidMount: function () {
        FacebookLoginStore.listen(this.onLoginStateChange)
    },
    onLoginStateChange: function () {
        this.setState({loginState: FacebookLoginStore.get()});
    },
    onLoginClick: function () {
        Actions.login.click();
    },
    render: function () {
        var message;
        var disabled = false;
        if (this.state.loginState === 'connected') {
            message = 'Logged in';
            disabled = true;
        } else if (this.state.loginState === 'not_authorized') {
            message = 'Please log into this app';
        } else {
            message = 'Please log into facebook';
        }
        return (
            <div className="well clearfix">
                <div className="col-sm-12">
                    <button className="btn btn-default" onClick={ this.onLoginClick } disabled={ disabled }>{ message }</button>
                    <Preloader />
                </div>
            </div>
        )
    }
});