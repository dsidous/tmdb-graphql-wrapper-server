const { resolveKey } = require('./utils');

const resolvers = {
  Query: {
    movie: async (parent, args, { dataSources }) => {
      const { id } = args;
      return dataSources.moviesService.getMovie(id);
    },
    movies: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getMovies(query);
    },
    popular: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getPopularMovies(query);
    },
    nowplaying: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getNowPlayingMovies(query);
    },
    upcoming: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getUpcomingMovies(query);
    },
    person: (parent, args, { dataSources }) => {
      const { id } = args;
      return dataSources.moviesService.getPerson(id);
    },
    tv: (parent, args, { dataSources }) => {
      const { id } = args;
      return dataSources.moviesService.getTv(id);
    },
    tvSeason: (parent, args, { dataSources }) => {
      const { id, season } = args;
      return dataSources.moviesService.getTvSeason(id, season);
    },
    tvs: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getTvs(query);
    },
    config: (_, __, { dataSources }) => dataSources.moviesService.getConfig(),
    topPeople: (parent, args, { dataSources }) => {
      const { query } = args;
      return dataSources.moviesService.getTopPeople(query);
    },
    genres: (_, __, { dataSources }) => dataSources.moviesService.getGenres(),
    genresTv: (_, __, { dataSources }) => dataSources.moviesService.getTvGenres()
  },
  Movie: {
    genre_names: (parent, args, { dataSources }) => dataSources.moviesService.getGenreNames(parent.genre_ids)
  },
  Tv: {
    title: resolveKey('name'),
    release_date: resolveKey('first_air_date'),
    genre_names: (parent, args, { dataSources }) => dataSources.moviesService.getTvGenreNames(parent.genre_ids)
  },
  Person_Cast_Credit: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        return 'Person_Tv_Cast_Credit';
      }

      if (obj.title) {
        return 'Person_Movie_Cast_Credit';
      }

      return null;
    },
  },
  Person_Crew_Credit: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        return 'Person_Tv_Crew_Credit';
      }

      if (obj.title) {
        return 'Person_Movie_Crew_Credit';
      }

      return null;
    },
  }
};

module.exports = resolvers;