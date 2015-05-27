var Application = React.createClass({
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
        var className = this.state.loggedIn ? '' : 'hidden';
        return (
            <div>
                <div className="well">
                    <FacebookLogin />
                </div>
                <div className={ className }>
                    <FetchForm />
                    <PostsGrid />
                </div>
            </div>
        )
    }
});