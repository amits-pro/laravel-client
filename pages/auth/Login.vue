<template>
    <div class="container">
        <div class="col-md-6 offset-md-3">
            <div class="card mt-4">
                <div class="card-header">
                    <p class="mb-0">Login</p>
                </div>
                {{Object.keys(errors).length === 0 ?"":errors}}
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="form.email" type="email" class="form-control" placeholder="Email" />
                             <div class="invalid-feedback" v-if="errors">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" type="password" class="form-control" placeholder="Password" />
                            <div class="invalid-feedback" v-if="errors">
                            </div>
                        </div>                        
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware: 'guest',
    data() {
        return {
            form: {
               email: '',
               password: ''  
            }
        }        
    },
    methods: {
        async login() {
            try {
                await this.$auth.login({data: this.form});
                this.$router.push(this.$route.query.redirect?this.$route.query.redirect:'/movies');
           }
            catch(error) {
            }
        }
    }

}
</script>