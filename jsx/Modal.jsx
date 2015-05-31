var Modal = React.createClass({
    getInitialState: function () {
        return {hidden: true, message: ''};
    },
    componentDidMount: function () {
        Actions.error.listen(this.show);
    },
    show: function (message) {
        this.setState({hidden: false, message: message});
    },
    hide: function () {
        this.setState({hidden: true, message: ''});
    },
    isHidden: function () {
        return this.state.hidden === true;
    },
    render: function () {
        var classList = ['modal'];
        classList.push(!this.isHidden() ? 'show' : 'fade');
        return (
            <div>
                <div className={ ['modal-backdrop', this.isHidden() ? 'hide' : 'show'].join(' ') }></div>
                <div className={ classList.join(' ') }>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={ this.hide }><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Error</h4>
                            </div>
                            <div className="modal-body">
                                <p>{ this.state.message }</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={ this.hide }>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});