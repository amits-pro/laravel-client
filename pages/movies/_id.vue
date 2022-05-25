<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <NuxtLink class="btn btn-primary" :to="{ name: 'movies' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="image">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Runtime:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'auth',
  name: 'singleMovie',
  async fetch() {
    await this.getSingleMovie()
  },
  data() {
    return {
      movie: '',
    }
  },
  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `http://127.0.0.1:8000/api/movies/${this.$route.params.id}`
      )
      const result = await data
      this.movie = result.data
    },
  },
}
</script>
<style lang="scss" scoped>
.movie-info {
  position: relative;
  display: flex;
  padding: 5rem 0;
  align-items: flex-start;
  justify-content: space-between;
}
.movie-content {
  width: 100%;
  margin-left: 0;
}
.movie-info {
  img {
    width: 70%;
    height: 30%;
    margin-top: 0;
  }
}
</style>