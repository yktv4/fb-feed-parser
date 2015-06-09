var Post = Backbone.Model.extend({
    parse: function (response, options) {
        var composeComments = function (comments) {
            return (comments && comments.data.map(function (comment) {
                return new Comment(comment, {parse: true});
            })) || [];
        };
        var composeObjectId = function (response) {
            return response.object_id || response.id.split('_')[1];
        };

        return {
            id: response.id,
            object_id: composeObjectId(response),
            created_time: response.created_time,
            message: response.message || '',
            likes: response.likes.summary.total_count,
            shares: (response.shares && response.shares.count) || 0,
            picture: {
                thumb: response.picture,
                full: response.picture && 'http://graph.facebook.com/' + response.object_id + '/picture'
            },
            comments: composeComments(response.comments),
            apiData: response
        }
    },
    getFormattedDate: function () {
        return moment(this.get('created_time')).format('YYYY-MM-DD HH-mm');
    },
    pictureExists: function () {
        return this.get('picture').thumb !== undefined;
    }
});