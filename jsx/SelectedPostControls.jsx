var SelectedPostControls = React.createClass({
    unlistenSelectedPostStore: null,
    getInitialState: function () {
        return {selectedPost: SelectedPostStore.get()}
    },
    componentDidMount: function () {
        this.unlistenSelectedPostStore = SelectedPostStore.listen(this.onSelectedPostUpdated);
    },
    componentWillUnmount: function () {
        this.unlistenSelectedPostStore();
    },
    onSelectedPostUpdated: function () {
        this.setState({selectedPost: SelectedPostStore.get()});
    },
    onPostDeselect: function () {
        Actions.post.deselect();
        Actions.grid.show('posts');
    },
    render: function () {
        return (
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default" visible={ SelectedPostStore.isEmpty() } onClick={ this.onPostDeselect }>Deselect post</button>
                <button type="button" className="btn btn-default" disabled={ CommentsStore.isEmpty() }>More comments</button>
            </div>
        );
    }
});