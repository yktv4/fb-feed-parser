var PostsGrid = React.createClass({
    inited: 0,
    getInitialState: function () {
        return {posts: PostsStore.get()}
    },
    componentDidMount: function () {
        PostsStore.listen(this.onPostsUpdated);
    },
    onPostsUpdated: function () {
        this.setState({posts: PostsStore.get()});
    },
    componentDidUpdate: function () {
        $(React.findDOMNode(this)).find('table').DataTable({
            paging: false
        });
    },
    renderTable: function () {
        return (
            <table id="js-posts-grid" className="table table-bordered table-condensed table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Message</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.posts.map(function (el) {
                        return <PostGridItem key={ el.id } post={ el } />
                    }) }
                </tbody>
            </table>
        );
    },
    renderNoPosts: function () {
        return (<div>No posts fetched yet</div>);
    },
    render: function () {
        return (<div>{ this.state.posts.length === 0 ? this.renderNoPosts() : this.renderTable() }</div>);
    }
});