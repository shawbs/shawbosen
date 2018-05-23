<template>
    <div class="dropdown">
        <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{content}}
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item">
                <nuxt-link class="link dropdown-item" to="/console">发文章</nuxt-link>
            </div>
            <div class="dropdown-item">
                <nuxt-link class="link dropdown-item" to="/user/setting">编辑个人资料</nuxt-link>
            </div>
            <div class="dropdown-item " @click="exitHandle">
                <span class="link">退出</span>
            </div>

        </div>
    </div>
    
</template>

<script>
    import util from '~/util/base.js'
    export default {
        name: 'dropdown-component',
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        methods: {

            exitHandle(){
                localStorage.removeItem('__shawbs_token');
                localStorage.removeItem('__shawbs_refresh_token');
                localStorage.removeItem('loginState')
                localStorage.removeItem('user')
                this.$store.commit('setUser', null)
                this.$router.push('/user/login')
            }
        }
    }
</script>