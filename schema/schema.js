const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const books = [
    {name : 'AA', genre : 'F', id : '1' },
    {name : 'BB', genre : 'S', id : '2' },
    {name : 'CC', genre : 'S', id : '3' }
]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : {type : GraphQLString},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLString}},
            resolve(parent, args) {
                const book = books.find(b => {
                    if(b.id == args.id) {
                        return true;
                    }
                });
                return book;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
})