var PostGridItem = React.createClass({
    getFormattedDate: function () {
        return moment(this.props.post.created_time).format('YYYY-MM-DD HH-mm');
    },
    render: function () {
        return (
            <tr>
                <td nowrap="nowrap">{ this.getFormattedDate() }</td>
                <td>{ this.props.post.message }</td>
                <td>{ this.props.post.likes.data.length }</td>
            </tr>
        );
    }
});