import PostTag from '../models/PostTag'

let postTagModel = new PostTag();

let delPostTag = (postTagId, callback) => {
    postTagModel.delPostTag(postTagId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', affectedRows: result });
    });
}

let addPostTag = (postTag, callback) => {
    let postTags = [
        [postTag.postId, postTag.tagId]
    ]
    postTagModel.addPostTag(postTags, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'insert fail' });
        }
        callback({ code: 200, message: 'success', insertId: result });
    })
}

module.exports.delPostTag = delPostTag;
module.exports.addPostTag = addPostTag;
