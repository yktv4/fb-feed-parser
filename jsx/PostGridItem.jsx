var PostGridItem = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="date-cell">{ this.props.post.getFormattedDate() }</td>
                <td>
                    { this.props.post.get('message') }
                    { this.props.post.pictureExists()
                        ? <div>
                            <a href={ this.props.post.get('picture').full } target="_blank">
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