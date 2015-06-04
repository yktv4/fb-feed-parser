var CommentsGridItem = React.createClass({
    getProfileUrl: function () {
        return 'http://facebook.com/profile.php?id=' + this.props.comment.get('from').id;
    },
    render: function () {
        return (
            <tr>
                <td className="date-cell">{ this.props.comment.getFormattedDate() }</td>
                <td>{ <a href={ this.getProfileUrl() } target="_blank">{ this.props.comment.get('from').name }</a>}</td>
                <td>{ this.props.comment.get('message') }</td>
                <td>{ this.props.comment.get('likes') }</td>
            </tr>
        );
    }
});