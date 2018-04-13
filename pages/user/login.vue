<template>
    <section class="container">

        <form id="loginForm">
            <div class="form-group">
                <label for="exampleInputEmail1">用户名</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="输入用户名">
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">用户密码</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="输入用户密码">
            </div>
            <button type="button" class="btn btn-primary mr-2" @click="submitForm">登录</button>
            <button type="reset" class="btn btn-danger">重置</button>
        </form>
    </section>
</template>

<script>
    import Logo from '~/components/Logo'
    export default{
        name: 'login-page',
        layout: 'base',
        methods: {
            loginHandle(){
                this.$store.dispatch('login');
            },
            submitForm(){

                this.loginHandle();
            }
        },
        components: {
            Logo
        }
    }
</script>