<template>
  <div class="home">
    <!-- Hero -->
    
    <div>
        <div class="container pager overflow-auto">
        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
        ></b-pagination>  
        <b-table
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        small
        ></b-table>
  </div>
    <div class="container movies">
      <div class="caption">{{query !== ''?'Searched Movies':'Trending Movies'}}</div> 
      <div id="movie-grid" class="movies-grid">
        <MovieCard class="movie" v-for="movieInfo in movies" :key="movieInfo.index" :movie="movieInfo"/>
      </div>
    </div>
    </div>     
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  middleware: 'auth',
  data() {
    return {
      movies: [],
      total_pages:'',
      currentPage: 1,
      perPage:20
    }
  },
  async fetch() {
    await this.getMovies(1);
  },
  watch: {
      currentPage(newValue) {
          if(this.query !== '') {
              this.searchMovies(this.query,newValue);
          } else {
            this.getMovies(newValue);
          }
      },
      query(newValue) {
          console.log(newValue);
          if(newValue !== '') {
              this.searchMovies(newValue,1);
          } else {
              this.getMovies(1);
          }
      }
  },
  methods: {
      async getMovies(pageId) {
        const data = await this.$axios.$get(`http://127.0.0.1:8000/api/movies/page/${pageId}`);
        this.total_pages = data.total_pages;
        this.movies = data.results;
        this.currentPage = pageId;
      },
      async searchMovies(query, pageId) {
          const data = await this.$axios.$get(`http://127.0.0.1:8000/api/movie/search?page=${pageId}&query=${query}`);
          this.total_pages = data.total_pages;
          this.movies = data.results;
          this.currentPage = pageId;  
      }
  },
  computed: {
      rows() {
        return this.total_pages * this.perPage;
      },
      query() {
          console.log(this.$store);
          return this.$store.getters['movies/searchQuery'];
      }
    }  
}
</script>

<style lang="scss">
.caption {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
}
.pager {
    margin-top: 30px;
    margin-bottom: 0;    
}
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .movies {
    padding: 0px 16px;
    .movies-grid {
      display: grid;
      column-gap: 20px;
      row-gap: 32px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(5, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 16px;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }          
        }
        .info {
          margin-top: 2px;
          background-color: black;
          border-radius: 16px;
          .title {
            padding-left: 6px;  
            margin-top: 2px;
            color: yellow;
            font-size: 8px;
            margin-bottom: 0;
          }
          .release {
            padding-left: 6px;  
            color: #c9c9c9;
            font-size: 8px;
            margin-bottom: 0;
          }
          .button {
              margin-top: 0;
            font-size: 8px;
            padding-left: 6px;
          }
        }
      }
    }
  }
}
</style>