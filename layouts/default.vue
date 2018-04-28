<template>
  <div>
    <section class="container">
        <top-content class="mb-5 mt-3"/>
        <logo class="top-logo"/>            
    </section>
    <nuxt/>
  </div>
</template>

<script>
    import TopContent from '~/components/TopContent.vue'
    import Logo from '~/components/Logo.vue'
    export default {
        components: {
          TopContent,
          Logo
        }



    }
</script>




