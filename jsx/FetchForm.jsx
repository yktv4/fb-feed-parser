var FetchForm = React.createClass({
    onSubmit: function (e) {
        e && e.preventDefault();
        var $domNode = $(React.findDOMNode(this));
        var pageId = $domNode.find('#js-page-id').val();
        var maxPostsNumber = $domNode.find('#js-max-posts-number').val();

        Actions.fetch(pageId, maxPostsNumber);
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
            </div>
        )
    }
});