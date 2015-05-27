var FetchForm = React.createClass({
    onSubmit: function () {
        var $domNode = $(React.findDOMNode(this));
        var pageId = $domNode.find('#js-page-id').val();
        var maxPostsNumber = $domNode.find('#js-max-posts-number').val();

        Actions.fetch(pageId, maxPostsNumber);
    },
    render: function () {
        return (
            <div className="well">
                <input type="text" id="js-page-id" className="form-control" placeholder="page id" defaultValue="hotelcomau" />
                <input type="text" id="js-max-posts-number" className="form-control" placeholder="max number of posts" defaultValue="10" />
                <button className="btn" onClick={ this.onSubmit }>Fetch</button>
            </div>
        )
    }
});