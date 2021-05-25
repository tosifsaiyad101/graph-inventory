const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const Generic = require('./Generic');
const CategoryType = require('./Category');


const PostType = new GraphQL.GraphQLObjectType({
	name: 'Post',
	description: 'Posts in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the post, Generated automatically by MongoDB',
		},
		title: {
			type: GraphQLString,
			description: 'title of the post',
		},
        content: {
			type: GraphQLString,
			description: 'Post data',
		},
		category: {
			type: GraphQLID,
			description: 'ID of the post\'s category',
		},
		categoryInfo: {
			type: Generic.categoryTree,
			description: 'Full info about post\'s category',
		},
        isDeleted: {
			type: GraphQLBoolean,
			description: 'Status of the post',
		}
	})
});


module.exports = PostType;

