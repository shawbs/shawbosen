<template>
    <div class="nav">
        <div class="nav-item">
            <nuxt-link class="nav-link" :class="{active: current=='root' }" to='/'>主页</nuxt-link>
        </div>
        <div class="nav-item">
            <nuxt-link class="nav-link" :class="{active: current=='article' }" to='/list/article'>文章</nuxt-link>
        </div>
        <div class="nav-item">
            <nuxt-link class="nav-link" :class="{active: current=='note' }" to='/list/note'>笔记</nuxt-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'main-nav',
    props : {
        navs: {
            type: Array,
            default: ()=>[]
        },
        current: {
            type: String,
            default: 'root'
        }
    }
}
</script>

<style lang="scss">
    .nav{
        margin-left: -15px;
        margin-right: -15px;
        .nav-link{
            font-size: 1.2rem;

            &.active{
                color: rgba(0,0,0,.9);
                font-size: 1.3rem;
            }
        }
    }
</style>
