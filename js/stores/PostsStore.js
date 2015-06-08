var PostsStore = Reflux.createStore({
    posts: [],
    maxCallLimit: 150,
    init: function () {
        Actions.fetch.listen(this.fetchPosts)
    },
    fetchPosts: function (pageId, number) {
        var whenAllPostsFetched = new Promise(function (resolve, reject) {
            var fetcherFunction;
            if (number > this.maxCallLimit) {
                fetcherFunction = this.fetchPostsWithMultipleRequests;
            } else {
                fetcherFunction = this.fetchPostsWithSingleRequest;
            }

            fetcherFunction.apply(this, [pageId, number]).then(resolve).catch(reject);
        }.bind(this));

        Actions.loading.start();
        this.posts = [];
        this.trigger();

        whenAllPostsFetched.then(this.setPosts).catch(function (error) {
            Actions.error('Facebook API exception: ' + error.message);
        }).then(Actions.loading.stop);
    },
    fetchPostsWithSingleRequest: function (pageId, limit) {
        return this.initialFbApiCall(pageId, limit).then(function (result) {
            return result.data;
        });
    },
    fetchPostsWithMultipleRequests: function (pageId, neededNumber) {
        var firstPosts = [];

        return this.initialFbApiCall(pageId, this.maxCallLimit).then(function (result) {
            firstPosts = result.data;
            return this.processFbPaginatedCall(result.paging.next, neededNumber - firstPosts.length);
        }.bind(this)).then(function (furtherPosts) {
            return firstPosts.concat.apply(firstPosts, furtherPosts).slice(0, neededNumber);
        });
    },
    initialFbApiCall: function (pageId, limit) {
        return new Promise(function (resolve, reject) {
            FB.api(
                '/' + pageId + '/posts?fields=message,comments,id,object_id,shares,picture,likes.summary(true)&limit=' + limit,
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
    processFbPaginatedCall: function (url, neededNumber, alreadyParsedPosts) {
        alreadyParsedPosts = alreadyParsedPosts || [];

        return fetch(url).then(function (response) {
            return response.text();
        }).then(function (text) {
            return JSON.parse(text);
        }).then(function (response) {
            var result;

            alreadyParsedPosts = alreadyParsedPosts.concat.apply(alreadyParsedPosts, response.data);
            if (alreadyParsedPosts.length < neededNumber && response.paging) {
                result = this.processFbPaginatedCall(response.paging.next, neededNumber, alreadyParsedPosts);
            } else {
                result = alreadyParsedPosts;
            }

            return result;
        }.bind(this));
    },
    setPosts: function (fbApiPosts) {
        this.posts = fbApiPosts.map(function (attributes) {
            return new Post(attributes, {parse: true});
        });
        this.trigger();
    },
    get: function () {
        return this.posts;
    },
    isEmpty: function () {
        return this.posts.length === 0;
    }
});