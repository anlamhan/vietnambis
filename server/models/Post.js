let db = require('../util/DBUtil');
let pageCfg = require('../../util/api.config')

import { postToSQLUpdate } from '../../util/assist'

export default class Post {
    
    list(params, callback) {
        let sql = 'SELECT id,title,slug,image,meta_description,updated_at,status FROM posts ';
        if (params.scope == 'published') {
            sql += ` WHERE status = 'published' `
        }
        sql += 'ORDER BY id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`
        console.log(sql)
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    one(postId, callback) {
        let sql = 'SELECT * FROM posts where id = ?';
        db.query(sql, [postId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    getOne(slug, callback) {
        let sql = 'SELECT * FROM posts where slug = ?';
        db.query(sql, [slug], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    insert(post, callback) {
        let sql = 'INSERT INTO posts (title,slug,markdown,image,status,meta_description,updated_at) VALUES (?,?,?,?,?,?,?)'
        let params = [
            post.title,
            post.slug,
            post.markdown,
            post.image,
            post.status,
            post.meta_description,
            new Date().getTime()
        ]
        db.query(sql, params, (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result.insertId);
        });
    }
    
    update(post, callback) {
        let sql = 'UPDATE posts SET ' + postToSQLUpdate(post).updated + ' WHERE id = ?'

        let params = postToSQLUpdate(post).params
        console.log(params)
        params.push(post.id);

        db.query(sql, params, (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result.changedRows);
        });
    }
    
    count(scope, callback) {
        let sql = 'SELECT COUNT(id) AS count FROM posts';
        if (scope === 'published') {
            sql += ` WHERE status = '${scope}'`
        }
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);
        });
    }
}