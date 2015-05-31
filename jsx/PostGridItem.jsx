var PostGridItem = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{ this.props.post.getFormattedDate() }</td>
                <td>{ this.props.post.get('message') }</td>
                <td>{ this.props.post.get('likes') }</td>
                <td>{ this.props.post.get('shares') }</td>
            </tr>
        );
    }
});