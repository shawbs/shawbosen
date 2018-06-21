<template>
    <div>
        <section class="container">
            <top-content />
            <div class="header">
                <nuxt-link to="/">
                    <logo />
                    <span class="gray">SHAWBOSEN</span>
                </nuxt-link>
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
