var PostGridItem = React.createClass({
    getFormattedDate: function () {
        var date = new Date(this.props.post.created_time);
        return date.toISOString();
    },
    render: function () {
        return (
            <tr>
                <td>{ this.getFormattedDate() }</td>
                <td>{ this.props.post.message }</td>
                <td>{ this.props.post.likes.data.length }</td>
            </tr>
        );
    }
});