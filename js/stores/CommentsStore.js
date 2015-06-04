var CommentsStore = Reflux.createStore({
    comments: [],
    init: function () {
        Actions.post.select.listen(this.onPostSelect);
        Actions.post.deselect.listen(this.onPostDeselect);
    },
    onPostSelect: function (post) {
        this.comments = post.get('comments');
        this.trigger();
    },
    onPostDeselect: function () {
        this.comments = [];
        this.trigger();
    },
    get: function () {
        return this.comments;
    }
});