var Comment = Backbone.Model.extend({
    parse: function (response, options) {
        return {
            created_time: response.created_time,
            message: response.message || '',
            likes: response.like_count,
            from: response.from
        }
    },
    getFormattedDate: function () {
        return moment(this.get('created_time')).format('YYYY-MM-DD HH-mm');
    }
});