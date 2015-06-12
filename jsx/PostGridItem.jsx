var PostGridItem = React.createClass({
    unlisteners: [],
    getInitialState: function () {
        return {selected: false};
    },
    componentDidMount: function () {
        this.unlisteners.push(SelectedPostStore.listen(this.onSelectedPostUpdated));
    },
    onSelectedPostUpdated: function () {
        var post = SelectedPostStore.get();
        this.setState({selected: post && post.get('id') === this.props.post.get('id')});
    },
    onClick: function () {
        Actions.post.select(this.props.post);
        Actions.grid.show('comments');
    },
    componentWillUnmount: function () {
        this.unlisteners.map(function (unlisten) {unlisten();});
    },
    onImageClick: function (e) {
        e.stopPropagation();
    },
    render: function () {
        return (
            <tr onClick={ this.onClick } className={ this.state.selected ? 'success' : null }>
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