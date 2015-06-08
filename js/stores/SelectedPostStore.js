var SelectedPostStore = Reflux.createStore({
    post: null,
    init: function () {
        Actions.post.select.listen(this.onPostSelect);
        Actions.post.deselect.listen(this.onPostDeselect);
    },
    onPostSelect: function (post) {
        this.post = post;
        this.trigger();
    },
    onPostDeselect: function () {
        this.post = null;
        this.trigger();
    },
    get: function () {
        return this.post;
    }
});