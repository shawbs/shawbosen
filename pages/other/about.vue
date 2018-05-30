<template>
    <div class="container">
        <div class="text-center about">
            <h5 class="card-title">{{userInfo.nickname}}</h5>
            <hr class="my-3">
            <p>{{userInfo.desc}}, 工作时间{{timer}}</p>
            <p>邮箱 572249500@qq.com</p>
            <p>微信</p>
            <img src="~assets/image/we_code.jpg" alt="微信二维码" width="130">
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
                userInfo: {},
                timer: ''
            }
        },
        mounted(){
            
            this.$store.dispatch('get',{
                url: API.url.userInfoSimple,
                param: {},
                showload: true
            }).then(res=>{
                let userInfo = res.data.user;
                let year =  util.computeTime(userInfo.startWorkDate).year;
                let day =  util.computeTime(userInfo.startWorkDate).day;
                this.userInfo = userInfo;
                this.timer = year + '年' +  day + '天';
            })
        }
    }
</script>
<style lang="scss">
    .about{
        padding: 100px 0;
        color: #444;
    }
</style>