const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;


// import the query file we created
const PostQuery = require('./queries/Post');
const CategoryQuery = require('./queries/Category');

// import the mutation file we created
const PostMutation = require('./mutations/Post');
const CategoryMutation = require('./mutations/Category');


// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
		// POST
		posts: PostQuery.index(),
		post: PostQuery.single(),

		// CATEGORY
		categories: CategoryQuery.index(),
	},
});


// lets define our root mutation
const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
		// POST
		addPost: PostMutation.create(),
		updatePost: PostMutation.update(),
		deletePost: PostMutation.delete(),

		// CATEGORY
		addCategory: CategoryMutation.create(),
		updateCategory: CategoryMutation.update(),
		deleteCategory: CategoryMutation.delete(),
	},
});

// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

