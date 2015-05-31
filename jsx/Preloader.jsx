var Preloader = React.createClass({
    getInitialState: function () {
        return {hidden: true};
    },
    componentDidMount: function () {
        Actions.loading.start.listen(this.onStart);
        Actions.loading.stop.listen(this.onStop);
    },
    onStart: function () {
        this.setState({hidden: false});
    },
    onStop: function () {
        this.setState({hidden: true});
    },
    render: function () {
        return (
            <div className={ ['preloader', this.state.hidden ? 'hide' : null].join(' ') }></div>
        )
    }
});