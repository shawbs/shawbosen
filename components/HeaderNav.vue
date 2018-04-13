<template>

    <nav class="m-navbar">
        <section class="container">
            <logo />
            <main-nav :current="current"/>
        </section>
    </nav>
    
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import MainNav from '~/components/MainNav.vue'

    export default {
        name: 'header-nav-component',
        components: {
            Logo,
            MainNav
        },
        props: {
            current: {
                type: String,
                default: 'root'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-navbar{
        padding: 20px 0;
        .container{
            display: flex;
            align-items: center;
        }
    
    }
    .logo-box{
        margin-right: 20px;
    }
</style>