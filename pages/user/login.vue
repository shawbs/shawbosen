<template>
    <section class="container">

        <form id="loginForm">
            <div class="form-group">
                <label>用户名</label>
                <input type="email" v-model="username" name="username" class="form-control"  placeholder="输入用户名">
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label>用户密码</label>
                <input type="password" v-model="password" name="password" class="form-control" placeholder="输入用户密码" @keyup.enter="submitForm">
            </div>
            <button type="button" class="btn btn-primary mr-2" @click="submitForm">
                登录
                
            </button>
            <button type="reset" class="btn btn-danger">重置</button>
            <p class="alert" :class="{'alert-success': msg == '登录成功','alert-danger': msg != '登录成功'}" v-if="msg">{{msg}}</p>
        </form>
    </section>
</template>

<script>
    import Logo from '~/components/Logo'
    import API from '~/api'
    import util from '~/util/base'
    import p from '~/util/plugin'
    export default{
        name: 'login-page',
        layout: 'base',
        data(){
            return{
                username:'',
                password: '',
                msg: '',
            }
        },
        mounted(){

        },
        methods: {
            loginHandle(){
                let _this = this;
                let user = {
                    username: _this.username,
                    password: _this.password
                }
                _this.$store.dispatch('post',{
                    url: API.url.login,
                    param: user,
                    showload: true
                })
                .then(res=>{

                    p.toast('登录成功','success')
                    util.setLocal('__shawbs_token',res.token)
                    util.setLocal('__shawbs_refresh_token',res.refresh_token)
                    util.setLocal('loginState',true)
                    util.setLocal('user',res.data.user)
                    this.$store.commit('setUser', util.getLocal('user'))

                    setTimeout(function(){
                        _this.$router.push('/')
                    },1000)

                })
                .catch(err=>{})
            },
            submitForm(){
                let result = util.verifyForm('loginForm');
                if(result.status){
                    this.loginHandle();
                }else{
                    p.toast(`${result.target}不能为空`,'warn')
                }
                
            }
        },
        components: {
            Logo
        }
    }
</script>