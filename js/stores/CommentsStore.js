var CommentsStore = Reflux.createStore({
    comments: [],
    nextPaginationAvailable: false,
    init: function () {
        SelectedPostStore.listen(this.onSelectedPostUpdated);
        Actions.comments.loadMore.listen(this.onLoadMore);
    },
    onSelectedPostUpdated: function () {
        if (SelectedPostStore.isEmpty()) {
            this.comments = [];
            this.nextPaginationAvailable = false;
        } else {
            var post = SelectedPostStore.get();
            this.comments = post.get('comments');
            this.nextPaginationAvailable = !!post.get('apiData').comments.paging.next;
            console.log('pagination is ' + this.nextPaginationAvailable, post.get('apiData').comments.paging);
        }
        this.trigger();
    },
    onLoadMore: function () {
        Actions.loading.start();
        this.comments = [];
        this.trigger();

        console.log('next link is: ' + SelectedPostStore.get().get('apiData').comments.paging.next);

        fetch(SelectedPostStore.get().get('apiData').comments.paging.next).then(function (response) {
            return response.text();
        }).then(function (response) {
            return JSON.parse(response);
        }).then(function (response) {
            var post = SelectedPostStore.get();
            var comments = post.get('comments');
            var latestApiData = post.get('apiData');

            latestApiData.comments.paging = response.paging;
            latestApiData.comments.data = response.data.concat.apply(response.data, latestApiData.comments.data);
            comments = comments.concat.apply(
                comments,
                response.data.map(function (comment) {
                    return new Comment(comment, {parse: true});
                })
            );

            post.set({comments: comments, apiData: latestApiData});

            Actions.post.updated(post);
        }.bind(this)).catch(function (error) {
            Actions.error(error.message);
        }).then(function () {
            Actions.loading.stop();
        });
    },
    get: function () {
        return this.comments;
    },
    isEmpty: function () {
        return this.comments.length === 0;
    },
    moreAvailable: function () {
        var result = false;
        if (!this.isEmpty() && this.nextPaginationAvailable) {
            result = true;
        }
        return result;
    }
});