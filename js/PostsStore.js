var PostsStore = Reflux.createStore({
    posts: [],
    init: function () {
        Actions.fetch.listen(this.fetchPosts)
    },
    fetchPosts: function (pageId, number) {
        FB.api(
            '/' + pageId + '/feed?limit=' + number,
            function (response) {
                if (response && !response.error) {
                    this.posts = response.data;
                    this.trigger();
                }
            }.bind(this)
        );
    },

    get: function () {
        return this.posts;
    }
});