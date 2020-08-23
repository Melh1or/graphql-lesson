const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require("graphql");

const Movies = require("../models/Movie");
const Directors = require("../models/Director");

// const movies = [
//   { id: "1", name: "1984", genre: "Sci-Fi", directorId: "1" },
//   { id: "2", name: "V", genre: "Sci-Fi-Thriller", directorId: "2" },
//   { id: "3", name: "Snatch", genre: "Comedy", directorId: "3" },
//   { id: "4", name: "One Out", genre: "Anime", directorId: "4" },
//   { id: "5", name: "One Out 2", genre: "Anime", directorId: "4" },
// ]

// const directors = [
//   { id: "1", name: "Serhii", age: 21 },       // 5f4107cea5800e99b5e92801
//   { id: "2", name: "Roman", age: 20 },        // 5f410960a5800e99b5e92804
//   { id: "3", name: "Dri", age: 17 },          // 5f41099fa5800e99b5e92805
//   { id: "4", name: "Nikiiiitaaaa", age: 19 }, // 5f4109c4a5800e99b5e92806
// ]

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Directors.findById(parent.directorId);
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId === parent.id)
        return Movies.find({ directorId: parend.id })
      }
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age,
        });

        return director.save();
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString},
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId
        });

        return movie.save();
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id === args.id)
        return Movies.findById( args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id)
        return Directors.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({});
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({});

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
