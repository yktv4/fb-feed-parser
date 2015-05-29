var KeywordGridItem = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{ this.props.keyword }</td>
                <td>{ this.props.count }</td>
            </tr>
        );
    }
});