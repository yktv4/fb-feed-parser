var PostsGrid = React.createClass({
    getInitialState: function () {
        return {posts: PostsStore.get()}
    },
    componentDidMount: function () {
        PostsStore.listen(this.onPostsUpdated);
    },
    onPostsUpdated: function () {
        this.setState({posts: PostsStore.get()});
    },
    renderTable: function () {
        return <table className="table table-bordered">
            <tr>
                <th>Date</th>
                <th>Message</th>
                <th>Likes</th>
            </tr>
            { this.state.posts.map(function (el, idx) {
                return <PostGridItem key={ idx } post={ el } />
            }) }
        </table>
    },
    renderNoPosts: function () {
        return (<div>No posts fetched yet</div>);
    },
    render: function () {
        return (<div>{ this.state.posts.length === 0 ? this.renderNoPosts() : this.renderTable() }</div>);
    }
});