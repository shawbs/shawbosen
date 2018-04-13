<template>
    <section class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page"><nuxt-link to="/">首页</nuxt-link></li>
                <li class="breadcrumb-item" aria-current="page"><nuxt-link :to="'/category/'+article._type">{{article._type}}</nuxt-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{article._id}}</li>
            </ol>
        </nav>

        <article class="article ">
            <h2>{{article.title}}</h2>
            <p class="text-muted "><small v-if="article.createDate">创建时间 {{article.createDate}}</small> <small v-if="article.updateDate">更新时间 {{article.updateDate}}</small></p>
            <hr class="my-4">
            <div class="content">
                {{article.content}}

            </div>
        </article>
        

  </section>
</template>

<script>
    import MainNav from '~/components/MainNav.vue'
    export default {
        name: 'note-detail-page',
        // layout: 'base',
        components: {
            MainNav
        },
        asyncData(context){
            return {
                article: {
                    title: 'npm install关于报错node-pre-gyp error',
                    createDate: '2017.12.18 15:53*',
                    content: "在stackoverflow上看到一个解决方法：<pre><code># before installing node-gyp ",
                    _type: 'article',
                    _id: '$asd126a1s6d4a6s'
                }
            }
        }
    }
</script>
