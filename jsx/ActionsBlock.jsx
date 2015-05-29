var ActionsBlock = React.createClass({
    getInitialState: function () {
        return {loggedIn: false}
    },
    componentDidMount: function () {
        Actions.login.success.listen(this.onLoginSuccess)
    },
    onLoginSuccess: function () {
        this.setState({loggedIn: true});
    },
    render: function () {
        return (
            <div className={ this.state.loggedIn ? '' : 'hidden' }>
                <FetchForm />
                <Grids />
            </div>
        );
    }
});