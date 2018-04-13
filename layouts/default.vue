<template>
  <div>
    <div class="top-content container mb-4">
        <nuxt-link to="/" class="brand">Shawbs</nuxt-link>
        <template v-if="$store.state.loginState">
            <dropdown content="萧伯森"></dropdown>
        </template>
        <template v-if="!$store.state.loginState">
            <nuxt-link class="link" to="/user/login">登录</nuxt-link>
        </template>
    </div>
    <nuxt/>
  </div>
</template>

<script>
    import Dropdown from '~/components/Dropdown.vue'
    import util from '~/util/base.js'
    export default {
        components: {
          Dropdown
        }



    }
</script>


