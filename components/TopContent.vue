<template>
    <div class="top-content">
        <span class="brand">Shawbs</span>
        <template v-if="$store.state.user">

            <dropdown :content="$store.state.user.nickname"></dropdown>

        
        </template>
        
        <template v-if="!$store.state.user">
            <nuxt-link class="link" to="/user/login">登录</nuxt-link>
        </template>
        
    </div>
</template>

<script>
    import util from '~/util/base'
    import Dropdown from './Dropdown'

    export default {
        components:{
            Dropdown
        },
        data(){
            return {
                user: null
            }
        },
        mounted(){

            this.$store.commit('setUser', util.getLocal('__shawbosen_user'))
        }
    }
</script>