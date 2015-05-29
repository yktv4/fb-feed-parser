var KeywordsStore = Reflux.createStore({
    keywords: [],
    init: function () {
        PostsStore.listen(this.onPostsUpdated);
    },
    onPostsUpdated: function () {
        this.keywords = [];

        if (!PostsStore.isEmpty()) {
            var keywords = PostsStore.get().map(function (el) {
                return el.message;
            }).join(' ').replace(/(\r\n|\n|\r|\(|\)|\?|\.|,|&|:|;|!|"|\+|\-)/gm, '').split(' ')
                .reduce(function (carry, item) {
                    item = item.toLowerCase().trim();
                    item && (carry[item] = (carry[item] || 0) + 1);
                    return carry;
                }, {});
            var sortable = [];

            for (var keyword in keywords) {
                sortable.push([keyword, keywords[keyword]])
            }
            sortable.sort(function(a, b) {return b[1] - a[1]});

            this.keywords = sortable.slice(0, 100);
        }

        this.trigger();
    },
    get: function () {
        return this.keywords;
    }
});