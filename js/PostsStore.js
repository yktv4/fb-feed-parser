var PostsStore = Reflux.createStore({
    posts: [],
    maxCallLimit: 250,
    init: function () {
        Actions.fetch.listen(this.fetchPosts)
    },
    fetchPosts: function (pageId, number) {
        var promises = [];
        this.posts = [];
        this.trigger();

        if (number > this.maxCallLimit) {
            var limits = (new Array(Math.floor(number / this.maxCallLimit))).join(' ').split(' ')
                .map(function () {return this.maxCallLimit;}.bind(this));
            number % this.maxCallLimit === 0 || limits.push(this.maxCallLimit - number);
            promises = limits.map(function (el, idx) {
                return this.fbApiCall(pageId, el, idx === 0 ? 0 : (idx * this.maxCallLimit)+1);
            }.bind(this));
        } else {
            promises.push(this.fbApiCall(pageId, number, 0));
        }

        Promise.all(promises).then(function (results) {
            this.posts = this.posts.concat.apply(this.posts, results);
            this.trigger();
        }.bind(this));
    },
    fbApiCall: function (pageId, limit, offset) {
        return new Promise(function (resolve, reject) {
            FB.api(
                '/' + pageId + '/feed?offset=' + offset + '&limit=' + limit,
                function (response) {
                    if (!response || response.error) {
                        reject(response.error || 'no response received');
                    } else {
                        resolve(response.data);
                    }
                }.bind(this)
            );
        });
    },
    get: function () {
        return this.posts;
    },
    isEmpty: function () {
        return this.posts.length === 0;
    }
});