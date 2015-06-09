var SelectedPostControls = React.createClass({
    unlisteners: [],
    unlistenSelectedPostStore: null,
    getInitialState: function () {
        return {selectedPost: SelectedPostStore.get(), enableLoadMore: false}
    },
    componentDidMount: function () {
        this.unlisteners.push(SelectedPostStore.listen(this.onSelectedPostUpdated));
        this.unlisteners.push(CommentsStore.listen(this.onCommentsUpdated));
    },
    componentWillUnmount: function () {
        this.unlisteners.map(function (unlisten) {unlisten();});
    },
    onSelectedPostUpdated: function () {
        this.setState({selectedPost: SelectedPostStore.get()});
    },
    onCommentsUpdated: function () {
        this.setState({
            enableLoadMore: CommentsStore.isEmpty() ? false : CommentsStore.get()})
    },
    onPostDeselect: function () {
        Actions.grid.show('posts');
        Actions.post.deselect();
    },
    render: function () {
        return (
            <div className="btn-group selected-post-controls" role="group" aria-label="...">
                <button type="button" className="btn btn-default" visible={ SelectedPostStore.isEmpty() } onClick={ this.onPostDeselect }>Deselect post</button>
                <button type="button" className="btn btn-default" disabled={ !CommentsStore.moreAvailable() } onClick={ Actions.comments.loadMore }>More</button>
            </div>
        );
    }
});