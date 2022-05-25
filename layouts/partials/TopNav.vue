<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <div class="container">
                <span class="navbar-brand mb-0 h4">The Movie Database</span>
                <template v-if="authenticated">
                    <b-nav-form @submit.prevent="search">
                        <b-form-input class="mr-md-2" placeholder="Search" v-model="query"></b-form-input>
                        <b-button variant="outline-primary" class="my-2 my-sm-0 w-10" type="submit">{{searchBtnName}}</b-button>
                    </b-nav-form>
                </template>                
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <template v-if="authenticated">
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                {{user.name}}
                            </template>
                            <b-dropdown-item @click.prevent="signOut">SignOut</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/login">Login</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/register">Register</nuxt-link>
                        </li>
                    </template>                    
                </b-navbar-nav>
                </b-collapse>
            </div>            
        </b-navbar>
    </div>

</template>
<script>
export default {
    data() {
        return {
            query:'',
            searchBtnName:'Search'
        }
    },
    methods: {
        signOut() {
            this.$auth.logout();
        },
        search(event) {
            const searchState = event.target.innerText;
            if(searchState === 'Clear') {
                this.query=''
                this.$store.dispatch('movies/clearQuery');
                this.searchBtnName = 'Search';
            } else if(searchState === 'Search') {
                this.$store.dispatch('movies/storeQuery',this.query); 
                this.searchBtnName = 'Clear'; 
            }
        }
    },
    watch: {
        query(newValue) {
            if(newValue === '') {
                this.$store.dispatch('movies/clearQuery');
                this.searchBtnName = 'Search';
            }
        }
    }
}
</script>
<style scoped>
.nav-brand {
    font-size: 10px;
    color: black;
    font-weight: 700;
}
.nav-item {
    font-size: 10px;
    color: black;
    font-weight: 700;
}
</style>
