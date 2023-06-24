const graphql = require('graphql');
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID} = graphql;

const books = [
    {name : 'AA', genre : 'F', id : '1' },
    {name : 'BB', genre : 'S', id : '2' },
    {name : 'CC', genre : 'S', id : '3' }
]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
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