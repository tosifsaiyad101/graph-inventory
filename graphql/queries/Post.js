const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the post type we created
const PostType = require('../types/Post');

// import the post resolver we created
const PostResolver = require('../resolvers/Post');

module.exports = {

	index() {
		return {
			type: new GraphQLList(PostType),
			description: 'This will return all the posts present in the database',
			args: {
				category: {
					type: GraphQLID,
					description: 'Please enter category id',
				}
			},
			resolve(parent, args, context, info) {
				return PostResolver.index(args);
			}
		}
	},

	single() {
		return {
			type: PostType,
			description: 'This will return data of a single post based on the id provided',
			args: {
				id: {
					type: GraphQLID,
					description: 'Please enter post id',
				}
			},
			resolve(parent, args, context, info) {
				if(!args.id)
					throw new Error('Enter either ID of post');
				else	
					return PostResolver.single(args);
			}
		}
	},
	
};

