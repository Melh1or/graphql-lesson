const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require("graphql");

const movies = [
  { id: "1", name: "1984", genre: "Sci-Fi" },
  { id: "2", name: "V", genre: "Sci-Fi-Thriller" },
  { id: 3, name: "Snatch", genre: "Comedy" },
  { id: 4, name: "One Out", genre: "Anime" },
]

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find(movie => movie.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})
