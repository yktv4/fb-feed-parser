var CommentsGrid = React.createClass({
    getInitialState: function () {
        return {comments: CommentsStore.get()}
    },
    componentDidMount: function () {
        CommentsStore.listen(this.onCommentsUpdated);
    },
    onCommentsUpdated: function () {
        this.setState({comments: CommentsStore.get()})
    },
    renderTable: function () {
        return (
            <table id="js-posts-grid" className="table table-condensed table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>Message</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.comments.map(function (el) {
                        return <CommentsGridItem key={ el.id } comment={ el } />
                    }) }
                </tbody>
            </table>
        );
    },
    renderNoComments: function () {
        return (<div>No post selected</div>);
    },
    render: function () {
        return (
            <div className={ this.props.visible ? '' : 'hidden'}>
                { this.state.comments.length === 0 ? this.renderNoComments() : this.renderTable() }
            </div>
        );
    }
});