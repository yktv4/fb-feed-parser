var Export = React.createClass({
    getInitialState: function () {
        return {disabled: true};
    },
    componentDidMount: function () {
        PostsStore.listen(this.onPostsUpdated);
    },
    download: function () {
        var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
        var csvContent = PostsStore.get().reduce(function (carry, item, idx) {
            return carry + [
                    item.getFormattedDate(),
                    item.get('message').replace(/"/gm, '""'),
                    item.get('likes'),
                    item.get('shares')
                ].map(function (el) {
                        return '"' + el + '"';
                    }).join(',') + '\n';
        }, 'data:text/csv;charset=utf-8,"Date","Message","Likes","Shares"\n');
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    },
    onPostsUpdated: function () {
        this.setState({disabled: PostsStore.isEmpty()});
    },
    render: function () {
        return (
            <button type="button" className="btn btn-default" disabled={ this.state.disabled } onClick={ this.download }>Export</button>
        );
    }
});