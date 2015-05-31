var FetchForm = React.createClass({
    onSubmit: function (e) {
        e && e.preventDefault();
        var $domNode = $(React.findDOMNode(this));
        var pageId = $domNode.find('#js-page-id').val();
        var maxPostsNumber = $domNode.find('#js-max-posts-number').val();

        Actions.fetch(pageId, maxPostsNumber);
    },
    download: function () {
        var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
        var csvContent = PostsStore.get().reduce(function (carry, item, idx) {
            var row = [
                item.created_time,
                item.message,
                item.likes.summary.total_count,
                (item.shares && (item.shares.count) || 0)
            ].map(function (el) {
                    return '"' + el.toString().replace(/"/gm, '""') + '"';
                }).join(',');
            carry += idx < PostsStore.get().length ? row + "\n" : row;
            return carry;
        }, 'data:text/csv;charset=utf-8,"Date","Message","Likes","Shares"\n');

        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    },
    render: function () {
        return (
            <div className="well clearfix">
                <form onSubmit={ this.onSubmit }>
                    <div className=" col-sm-6 col-lg-2">
                        <input type="text" id="js-page-id" className="form-control" placeholder="page id" defaultValue="hotelcomau" />
                    </div>
                    <div className=" col-sm-6 col-lg-2">
                        <input type="text" id="js-max-posts-number" className="form-control col-sm-6 col-xs-2" placeholder="max number of posts" defaultValue="10" />
                    </div>
                    <div className=" col-sm-6 col-lg-2">
                        <button className="btn" onClick={ this.onSubmit }>Fetch</button>
                    </div>
                </form>
                <div className=" col-sm-6 col-lg-2">
                    <button className="btn" onClick={ this.download }>Export</button>
                </div>
            </div>
        )
    }
});