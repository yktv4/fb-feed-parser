var PostGridItem = React.createClass({
    getFormattedDate: function () {
        return moment(this.props.post.created_time).format('YYYY-MM-DD HH-mm');
    },
    getLikesNumber: function () {
        return (this.props.post.likes && this.props.post.likes.data.length) || 0;
    },
    render: function () {
        return (
            <tr>
                <td>{ this.getFormattedDate() }</td>
                <td>{ this.props.post.message }</td>
                <td>{ this.getLikesNumber() }</td>
            </tr>
        );
    }
});