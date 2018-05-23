<template>
    <div>
        <section class="container clearfix mb-4">
            <span class="float-left brand" @click="$router.push('/')">SHAWBOSEN</span>
            <top-content class="float-right"/>      
        </section>
        
        <nuxt />
    </div> 
</template>

<script>
    import TopContent from '~/components/TopContent.vue'
    export default {
        components: {
            TopContent
        }

    }
</script>
