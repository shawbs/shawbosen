<template>
    <div class="container">
        <div class="text-center about">
            <h5 class="card-title">{{user.name}}</h5>
            <hr class="my-3">
            <p>{{user.desc}}</p>
            <p>邮箱 {{user.email}}</p>
            <p>微信</p>
            <img src="~assets/image/we_code.jpg" alt="微信二维码" width="150">
        </div>
        
    </div>
</template>
<script>
    import util from '~/util/base.js'
    export default {
        asyncData (context) {

            var datetime = util.computeTime(1420041600*1000);
            return {
                user:{
                    name: '萧伯森',
                    startWorkDate: 1420041600,
                    desc: `前端程序员，从业${datetime.year}年。`,
                    email: '572249500@qq.com',
                    wechat: {
                        imgurl: ''
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
    .about{
        padding: 100px 0;
    }
</style>