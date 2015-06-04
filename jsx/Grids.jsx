var Grids = React.createClass({
    getInitialState: function () {
        return {active: 'posts'}
    },
    show: function (what) {
        this.setState({active: what});
    },
    isPostsVisible: function () {
        return this.state.active == 'posts';
    },
    isKeywordsVisible: function () {
        return this.state.active == 'keywords';
    },
    isCommentsVisible: function () {
        return this.state.active == 'comments';
    },
    render: function () {
        return (
            <div>
                <div>
                    <ul className="nav nav-tabs nav-justified">
                        <li role="presentation" className={ this.isPostsVisible() ? 'active' : '' }>
                            <a href="javascript:void(0)" onClick={ this.show.bind(this, 'posts') }>Posts</a>
                        </li>
                        <li role="presentation" className={ this.isCommentsVisible() ? 'active' : '' }>
                            <a href="javascript:void(0)" onClick={ this.show.bind(this, 'comments') }>Comments</a>
                        </li>
                        <li role="presentation" className={ this.isKeywordsVisible() ? 'active' : '' }>
                            <a href="javascript:void(0)" onClick={ this.show.bind(this, 'keywords') }>Keywords</a>
                        </li>
                    </ul>
                </div>
                <div className="grids-container">
                    <PostsGrid visible={ this.isPostsVisible() } />
                    <CommentsGrid visible={ this.isCommentsVisible() } />
                    <KeywordsGrid visible={ this.isKeywordsVisible() } />
                </div>
            </div>
        );
    }
});