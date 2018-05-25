<template>
    <div class="container">
        <div class="text-center about">
            <h5 class="card-title">{{userInfo.nickname}}</h5>
            <hr class="my-3">
            <p>{{userInfo.desc}}</p>
            <p>邮箱 572249500@qq.com</p>
            <p>微信</p>
            <img src="~assets/image/we_code.jpg" alt="微信二维码" width="150">
        </div>
        
    </div>
</template>
<script>
    import API from '~/api'
    import util from '~/util/base'
    import p from '~/util/plugin'
    export default {
        data(){
            return {
                userInfo: {}
            }
        },
        mounted(){
            
            this.$store.dispatch('get',{
                url: API.url.userInfoSimple,
                param: {},
                showload: true
            }).then(res=>{
                this.userInfo = res.data.user;
            })
        }
    }
</script>
<style lang="scss">
    .about{
        padding: 100px 0;
    }
</style>