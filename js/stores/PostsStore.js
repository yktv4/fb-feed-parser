var PostsStore = Reflux.createStore({
    posts: [],
    maxCallLimit: 150,
    init: function () {
        Actions.fetch.listen(this.fetchPosts)
    },
    fetchPosts: function (pageId, number) {
        var promises = [];
        this.posts = [];
        this.trigger();

        if (number > this.maxCallLimit) {
            this.fetchPostsWithPaging(pageId, number);
        } else {
            this.fbApiCall(pageId, number).then(function (result) {
                this.addPosts(result.data);
                this.trigger();
            }.bind(this))
        }
    },
    fbApiCall: function (pageId, limit) {
        return new Promise(function (resolve, reject) {
            FB.api(
                '/' + pageId + '/posts?fields=message,shares,likes.summary(true)&limit=' + limit,
                function (response) {
                    if (!response || response.error) {
                        reject(response.error || 'no response received');
                    } else {
                        resolve(response);
                    }
                }.bind(this)
            );
        });
    },
    fbApiPaginatedCall: function (next, neededNumber) {
        var result;
        if (!next) {
            result = Promise.resolve();
        } else {
            result = fetch(next).then(function (response) {
                return response.text();
            }).then(function (text) {
                return JSON.parse(text);
            }).then(function (result) {
                this.addPosts(result.data);
                if (this.posts.length < neededNumber) {
                    return this.fbApiPaginatedCall(result.paging.next, neededNumber);
                }
            }.bind(this));
        }

        return result;
    },
    fetchPostsWithPaging: function (pageId, number) {
        this.fbApiCall(pageId, this.maxCallLimit).then(function (result) {
            this.addPosts(result.data);
            return result.paging;
        }.bind(this)).then(function (paging) {
            return this.fbApiPaginatedCall(paging.next, number);
        }.bind(this)).then(function () {
            this.posts = this.posts.slice(0, number);
            this.trigger();
        }.bind(this));
    },
    addPosts: function (postsToAdd) {
        this.posts = this.posts.concat.apply(this.posts, postsToAdd).map(function (attributes) {
            return new Post(attributes, {parse: true});
        })
    },
    get: function () {
        return this.posts;
    },
    isEmpty: function () {
        return this.posts.length === 0;
    }
});