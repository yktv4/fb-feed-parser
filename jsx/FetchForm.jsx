var FetchForm = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        var $domNode = $(React.findDOMNode(this));
        var pageId = $domNode.find('#js-page-id').val();
        var postsNumber = $domNode.find('#js-posts-number').val();

        Actions.fetch(pageId, postsNumber);
    },
    onInputKeyPress: function (e) {
        if (e.keyCode == 13) {
            this.onSubmit(e);
        }
    },
    render: function () {
        return (
            <div className="well clearfix">
                <div className="col-sm-6 col-lg-2">
                    <input type="text" id="js-page-id" className="form-control" placeholder="page id" onKeyUp={ this.onInputKeyPress } />
                </div>
                <div className="col-sm-6 col-lg-2">
                    <input type="text" id="js-posts-number" className="form-control col-sm-6 col-xs-2" defaultValue="10" onKeyUp={ this.onInputKeyPress } />
                </div>
                <div className="col-sm-6 col-lg-2">
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-default" onClick={ this.onSubmit }>Fetch</button>
                        <Export />
                    </div>
                </div>
            </div>
        )
    }
});