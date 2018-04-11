<template>
    <section class="container">
        <div>
            <main-nav current="note" />
            <div class="jumbotron">
                <h1 class="display-4">Hello, world!</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4">
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            </div>
        </div>
  </section>
</template>

<script>

    import MainNav from '~/components/MainNav.vue'

    export default {
        name: 'note-page',
        layout: 'base',
        components: {
            MainNav
        }
    }
</script>