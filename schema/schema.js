const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = require("graphql");

const Movies = require("../models/Movie");
const Directors = require("../models/Director");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve({ directorId }) {
        return Directors.findById(directorId);
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve({ id }) {
        return Movies.find({ directorId: id })
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, { name, age }) {
        const director = new Directors({
          name,
          age,
        });

        return director.save();
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, { id }) {
        return Directors.findByIdAndRemove(id);
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, { id, name, age }) {
        return Directors.findByIdAndUpdate(
          id,
          { $set: { name, age } },
          { new: true }
        );
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString},
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve(_, { name, genre, directorId, rate, watched }) {
        const movie = new Movies({
          name,
          genre,
          directorId,
          rate,
          watched,
        });

        return movie.save();
      }
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, { id }) {
        return Movies.findByIdAndRemove(id);
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve(_, { id, name, genre, directorId, rate, watched }) {
        return Movies.findByIdAndUpdate(
          id,
          { $set: { name, genre, directorId, rate, watched } },
          { new: true }
        );
      }
    },
  }
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Movies.findById( id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Directors.findById(id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movies.find({});
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Directors.find({});

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
