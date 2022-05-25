<template>
    <div>
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <!--p class="overview">{{ movie.overview }}</p> -->
          </div>
          <div class="info" @click.prevent="routeToDetails">
            <p class="title">
              {{ movie.title }}
            </p>  
            <p class="release">
              {{releaseYear}}
            </p>
          </div>
    </div>
</template>

<script>
    export default {
        props: ['movie'],
        computed: {
            releaseYear: {
                get() {
                    return new Date(this.movie.release_date).getFullYear()
                }
            }    
        },
        methods: {
            routeToDetails() {
                //console.log('clicked');
                this.$router.push({ name: 'movies-id', params: {id: this.movie.id }});
            }
        }
    }
    
</script>

<style lang="scss" scoped>

</style>