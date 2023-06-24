const graphql = require('graphql');
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID, 
     GraphQLInt, 
     GraphQLList} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
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
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args) {
               var b1 = [];
               books.forEach(bo => {
                if(bo.authorId == parent.id) {
                    b1.push(bo);
                }
               });
               return b1;
            }
        }
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