const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request) {
    request.params.set('api_key', this.context.apikey);
  }

  async getMovies(query) {
    const { results } = await this.get(`discover/movie?${query}`);
    return results;
  }

  async getMovie(id) {
    const data = await this.get(`movie/${id}?append_to_response=credits,images,similar,videos,reviews`);
    const {
      videos: { results: videos },
      reviews: { results: reviews }
    } = data;
    return { ...data, videos, reviews };
  }

  async getPerson(id) {
    const data = await this.get(`person/${id}?append_to_response=movie_credits,tv_credits,combined_credits,images`);
    const { images: { profiles: images } } = data;
    return { ...data, images }
  }

  async getGenreNames(ids) {
    const data = await this.get(`genre/movie/list`);
    const ret = { genre_name: [].concat(...ids.map(genreId => data.genres.filter(genre => genre.id === genreId).map(g => g.name))) };
    return ret;
  }

  async getTvGenreNames(ids) {
    const data = await this.get(`genre/tv/list`);
    const ret = { genre_name: [].concat(...ids.map(genreId => data.genres.filter(genre => genre.id === genreId).map(g => g.name))) };
    return ret;
  }

  async getTv(id) {
    const data = await this.get(`tv/${id}?append_to_response=credits,images,reviews,videos,similar`);
    const {
      videos: { results: videos },
      reviews: { results: reviews }
    } = data;
    return { ...data, videos, reviews };
  }

  async getTvSeason(id, season) {
    const data = await this.get(`tv/${id}/season/${season}`);
    return data;
  }

  async getTvs(query) {
    const { results } = await this.get(`discover/tv?${query}`);
    return results;
  }

  async getConfig() {
    const data = await this.get(`configuration`);
    return data;
  }

  async getGenres() {
    const { genres } = await this.get(`genre/movie/list`);
    return genres;
  }

  async getTvGenres() {
    const { genres } = await this.get(`genre/tv/list`);
    return genres;
  }

  async getTopPeople(query) {
    const { results } = await this.get(`person/popular?${query}`);
    return results;
  }

  async getPopularMovies(query) {
    const { results } = await this.get(`movie/popular?${query}`);
    return results;
  }

  async getNowPlayingMovies(query) {
    const { results } = await this.get(`movie/now_playing?${query}`);
    return results;
  }

  async getUpcomingMovies(query) {
    const { results } = await this.get(`movie/upcoming?${query}`);
    return results;
  }

}

module.exports = MoviesService;
