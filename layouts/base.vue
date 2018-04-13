<template>
    <div>
        <section class="container">
            <div class="top-content">
                <span class="brand">Shawbs</span>
                <template v-if="$store.state.loginState">

                    <dropdown content="萧伯森"></dropdown>

                    
                </template>
                <template v-if="!$store.state.loginState">
                    <nuxt-link class="link" to="/user/login">登录</nuxt-link>
                </template>
                
            </div>
            <div class="header">
                <logo/>
            </div>
            
        </section>
        
        <nuxt />
    </div> 
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import Dropdown from '~/components/Dropdown.vue'
    import util from '~/util/base.js'
    export default {
        components: {
            Logo,
            Dropdown
        }

    }
</script>
