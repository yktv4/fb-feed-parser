var PostsGrid = React.createClass({
    getInitialState: function () {
        return {posts: PostsStore.get()}
    },
    componentDidMount: function () {
        PostsStore.listen(this.onPostsUpdated);
    },
    onPostsUpdated: function () {
        var posts = PostsStore.get();
        this.setState({posts: posts});

        if (posts.length !== 0) {
            $(React.findDOMNode(this)).find('table').DataTable();
        }
    },
    renderTable: function () {
        return (
            <table id="js-posts-grid" className="table table-condensed table-striped table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Message</th>
                        <th>Likes</th>
                        <th>Shares</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.posts.map(function (el) {
                        return <PostGridItem key={ el.get('object_id') } post={ el } />
                    }) }
                </tbody>
            </table>
        );
    },
    renderNoPosts: function () {
        return (<div>No posts fetched yet</div>);
    },
    render: function () {
        return (
            <div className={ this.props.visible ? '' : 'hidden'}>
                { this.state.posts.length === 0 ? this.renderNoPosts() : this.renderTable() }
            </div>
        );
    }
});