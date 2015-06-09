var SelectedPostStore = Reflux.createStore({
    post: null,
    init: function () {
        Actions.post.select.listen(this.onPostSelect);
        Actions.post.deselect.listen(this.onPostDeselect);
        Actions.post.updated.listen(this.onPostUpdated);
    },
    onPostSelect: function (post) {
        this.post = post;
        this.trigger();
    },
    onPostDeselect: function () {
        this.post = null;
        this.trigger();
    },
    onPostUpdated: function (post) {
        this.post = post;
        this.trigger();
    },
    get: function () {
        return this.post;
    },
    isEmpty: function () {
        return this.post === null;
    }
});