var Post = Backbone.Model.extend({
    parse: function (response, options) {
        return {
            object_id: response.object_id,
            created_time: response.created_time,
            message: response.message || '',
            likes: response.likes.summary.total_count,
            shares: (response.shares && response.shares.count) || 0,
            picture: {
                thumb: response.picture,
                full: response.picture && 'http://graph.facebook.com/' + response.object_id + '/picture'
            }
        }
    },
    getFormattedDate: function () {
        return moment(this.get('created_time')).format('YYYY-MM-DD HH-mm');
    },
    pictureExists: function () {
        return this.get('picture').thumb !== undefined;
    }
});