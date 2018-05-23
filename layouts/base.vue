<template>
    <div>
        <section class="container">
            <top-content />
            <div class="header">
                <span @click="$router.push('/')">SHAWBOSEN</span>
            </div>
            
        </section>
        
        <nuxt />
    </div> 
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import TopContent from '~/components/TopContent.vue'
    export default {
        components: {
            Logo,
            TopContent
        }

    }
</script>
