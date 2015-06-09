var CommentsGrid = React.createClass({
    getInitialState: function () {
        return {comments: CommentsStore.get(), selectedPost: SelectedPostStore.get(), showSelectedPostControls: false}
    },
    componentDidMount: function () {
        CommentsStore.listen(this.onCommentsUpdated);
        SelectedPostStore.listen(this.onSelectedPostUpdated);
    },
    onCommentsUpdated: function () {
        var comments = CommentsStore.get();
        this.setState({comments: comments})

        if (comments.length !== 0) {
            $(React.findDOMNode(this)).find('table').DataTable();
        }
    },
    onSelectedPostUpdated: function () {
        this.setState({selectedPost: SelectedPostStore.get(), showSelectedPostControls: !SelectedPostStore.isEmpty()});
    },
    renderTable: function () {
        return (
            <div>
                { this.state.showSelectedPostControls ? <SelectedPostControls /> : null }
                <table id="js-comments-grid" className="table table-condensed table-striped">
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
            </div>
        );
    },
    renderNoComments: function () {
        return (<div>No comments for this post</div>);
    },
    renderNoPostSelected: function () {
        return (<div>No post selected</div>);
    },
    getComponentToRender: function () {
        var result;
        if (SelectedPostStore.get()) {
            if (CommentsStore.isEmpty()) {
                result = this.renderNoComments();
            } else {
                result = this.renderTable();
            }
        } else {
            result = this.renderNoPostSelected();
        }

        return result;
    },
    render: function () {
        return (
            <div className={ this.props.visible ? '' : 'hidden'}>
                { this.getComponentToRender() }
            </div>
        );
    }
});