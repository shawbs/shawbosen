<template>
    <div>
        <div class="top-content container">
            <span class="brand">Shawbs</span>
            <template v-if="$store.state.loginState">

                <button class="m-dropdown btn btn-light" type="button">
                    萧伯森
                    <div class="m-dropdown-menu">
                        <div class="m-dropdown-item">
                            <nuxt-link class="link" to="/console/addTxt">发文章</nuxt-link>
                        </div>
                        <div class="m-dropdown-item">
                            <nuxt-link class="link" to="/console/addTxt">编辑个人资料</nuxt-link>
                        </div>
                        
                        <div class="dropdown-divider"></div>
                        <span class="link m-dropdown-item" >退出</span>
                    </div>
                </button>

                
            </template>
            <template v-if="!$store.state.loginState">
                <nuxt-link class="link" to="/user/login">登录</nuxt-link>
            </template>
        </div>
        <div class="header">
            <logo/>
        </div>
        <nuxt />
    </div> 
</template>

<script>
    import Logo from '~/components/Logo.vue'
    export default {
        components: {
            Logo
        },
        mounted (){
            let self = this;
            setTimeout(function(){
                self.$store.commit('changeLoginState', true)
            },3000)
        }
    }
</script>
<style lang="scss">
    .header{
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    



</style>