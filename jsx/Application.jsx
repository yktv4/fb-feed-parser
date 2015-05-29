var Application = React.createClass({
    render: function () {
        return (
            <div>
                <div className="well">
                    <FacebookLogin />
                </div>
                <ActionsBlock />
            </div>
        )
    }
});