const graphql = require('graphql');
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID, 
     GraphQLInt} = graphql;

const books = [
    {name : 'AA', genre : 'F', id : '1', authorId : "1" },
    {name : 'BB', genre : 'S', id : '2', authorId : "2" },
    {name : 'CC', genre : 'S', id : '3', authorId : "3" }
];

const authors = [
    {name : "A", age : 1, id : "1"},
    {name : "B", age : 2, id : "2"},
    {name : "C", age : 3, id : "3"}
];

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args) {
                const auth = authors.find(auth => {
                    if(auth.id == parent.authorId){
                        return true;
                    }
                })
                return auth;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt}
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
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent, args) {
                const author = authors.find(auth => {
                    if(auth.id == args.id) {
                        return true;
                    }
                })
                return author;
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query : RootQuery
})