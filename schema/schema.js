const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = require("graphql");

const movies = [
  { id: "1", name: "1984", genre: "Sci-Fi", directorId: "1" },
  { id: "2", name: "V", genre: "Sci-Fi-Thriller", directorId: "2" },
  { id: "3", name: "Snatch", genre: "Comedy", directorId: "3" },
  { id: "4", name: "One Out", genre: "Anime", directorId: "4" },
]

const directors = [
  { id: "1", name: "Serhii", age: 21 },
  { id: "2", name: "Roman", age: 20 },
  { id: "3", name: "Dri", age: 17 },
  { id: "4", name: "Nikiiiitaaaa", age: 19 },
]

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(director => director.id == parent.id)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }

  })
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return movies.find(movie => movie.id == args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return directors.find(director => director.id == args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})
