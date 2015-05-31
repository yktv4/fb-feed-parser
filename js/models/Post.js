var Post = Backbone.Model.extend({
    created_time: null,
    message: null,
    likes: null,
    shares: null,

    parse: function (response, options) {
        return {
            created_time: response.created_time,
            message: response.message || '',
            likes: response.likes.summary.total_count,
            shares: (response.shares && response.shares.count) || 0
        }
    },
    getFormattedDate: function () {
        return moment(this.get('created_time')).format('YYYY-MM-DD HH-mm');
    }
});