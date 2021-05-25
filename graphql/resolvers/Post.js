
const dotenv = require('dotenv');
dotenv.load({path: '.env'});
const fs = require("fs");
const Post = require('../../models/Post');
const Category = require('../../models/Category');

class PostController {

    constructor(model) {
        this.model = Post;
    }

    // this will find all the records in database and return it
    async index(options) {
        var _query = { isDeleted: { $ne: true } };
        if(options.category) {
            var categories = [];
            categories.push(options.category);
            var category = await Category.findById(options.category);
            if(category && category.parent) {
                categories.push(category.parent);
            }
            _query.category = { $in: categories };
        }

        return this.model
            .find(_query)
            .populate({
                path: 'category',
                populate: {
                    path: 'parent',
                }
            })
            .sort('createdAt')
            .exec()
            .then(records => {
                records.forEach(record => record.categoryInfo = record.category);
                return records;
            })
            .catch(error => {
                return error;
            });
    }

    // this will find a single record based on id and return it.
    single(options) {
        var _query = { isDeleted: { $ne: true } };
        if(options.id) _query._id = options.id;
        return this.model.findOne(_query)
            .populate({
                path: 'category',
                populate: {
                    path: 'parent',
                }
            })
            .exec()
            .then(record => {
                record.categoryInfo = record.category;
                return record;
            })
            .catch(error => {
                return error;
            });
    }

    // this will insert a new record in database
    create(data) { 
        try {

        } catch (err) {
            console.log(err);
        }
        console.log("TTTTTTTTTTTTT", data);      
        const record = new this.model(data);
        return record.save()
            .then((post) => {
                console.log("YYYYYYYYYYY", post);
                return post
            })
            .catch((error) => {
                return error;
            });
    }

    // this will update existing record in database
    update(data) {        
        return this.model
            .findOneAndUpdate({ _id: data.id, isDeleted: { $ne: true } }, { $set: data }, { new: true })
            .then((post) =>  post)
            .catch((error) => error);
    }

    // this will delete the post
    delete(data) {
        return this.model
            .findOneAndUpdate({ _id: data.id }, { isDeleted: true})
            .then(data => {
                return {message: "Post deleted successfully!"};
            })
            .catch(err => {
                return err;
            });
    }

};

const post_controller = new PostController();
module.exports = post_controller;
