<template>
    <div class="top-content">
        <template v-if="$store.state.user">
            <dropdown :content="$store.state.user.nickname"></dropdown>
        </template>
        
        <template v-if="!$store.state.user">
            <nuxt-link class="link" to="/user/login">登录</nuxt-link>
        </template>
        <nuxt-link to="/other/about" class="small ml-2">关于</nuxt-link>
        
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
            this.$store.commit('setUser', util.getLocal('user'))
        }
    }
</script>