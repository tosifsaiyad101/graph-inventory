const GraphQL = require('graphql');
const Generic = require('../types/Generic');

const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = GraphQL;

// import post type
const PostType = require('../types/Post');

// import post resolver
const PostResolver = require('../resolvers/Post');


module.exports = {

    create() {
        return {
            type: PostType,
            description: 'Add new Post',

            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter the post name, Cannot be left empty',
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter Base64 image details',
                },
                category: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Enter the post category ID',
                },
            },
            resolve(parent, fields) {
                return PostResolver.create(fields);
            }
        }
    },

    update() {
        return {
            type: PostType,
            description: 'Update Post details',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Enter the ID that you want to update',
                },
                title: {
                    type: GraphQLString,
                    description: 'Enter the post name, Cannot be left empty',
                },
                content: {
                    type: GraphQLString,
                    description: 'Enter Base64 image details',
                },
                category: {
                    type: GraphQLID,
                    description: 'Enter the post category ID',
                },
            },
            resolve(parent, fields, context, info) {
                return PostResolver.update(fields);
            }
        }
    },

    delete() {
        return {
            type: Generic.messageOutputType,
            description: 'Delete Posts\'s details',

            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter post id',
                }
            },
            resolve(parent, fields, context, info) {
                return PostResolver.delete(fields);
            }
        }
    }
};
