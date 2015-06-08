var PostGridItem = React.createClass({
    onClick: function () {
        Actions.post.select(this.props.post);
        Actions.grid.show('comments');
    },
    onImageClick: function (e) {
        e.stopPropagation();
    },
    render: function () {
        return (
            <tr onClick={ this.onClick }>
                <td className="date-cell">{ this.props.post.getFormattedDate() }</td>
                <td>
                    { this.props.post.get('message') }
                    { this.props.post.pictureExists()
                        ? <div>
                            <a href={ this.props.post.get('picture').full } target="_blank" onClick={ this.onImageClick }>
                              <img className="fb-thumb-image" src={ this.props.post.get('picture').thumb } alt="" />
                            </a>
                          </div>
                        : null }
                </td>
                <td>{ this.props.post.get('likes') }</td>
                <td>{ this.props.post.get('shares') }</td>
            </tr>
        );
    }
});