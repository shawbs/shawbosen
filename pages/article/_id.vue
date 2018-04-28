<template v-if="$store.state.article">
    <section class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page"><nuxt-link to="/">首页</nuxt-link></li>
                <li class="breadcrumb-item" aria-current="page"><nuxt-link :to="'/category/'+$store.state.article.tag">{{$store.state.article.tag}}</nuxt-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$store.state.article.id}}</li>
            </ol>
        </nav>

        <article class="article ">
            <h2>{{$store.state.article.title}}</h2>
            <p class="text-muted " v-if="$store.state.article.meta">
                <small class="mr-2">创建时间 {{new Date($store.state.article.meta.createAt).format()}}</small>
                <small>更新时间 {{new Date($store.state.article.meta.updateAt).format()}}</small>
            </p>
            <hr class="my-4">
            <div class="content mb-5" v-html="$store.state.article.content">


            </div>
            <h3 class="text-center">&lt; end &gt;</h3>
        </article>
        

  </section>
</template>

<script>
    import MainNav from '~/components/MainNav.vue'
    import API from '~/api'
    export default {
        name: 'note-detail-page',
        // layout: 'base',
        components: {
            MainNav
        },
        data(){
            return {
            }
        },
        async fetch({store, params}){
            
            let {data} = await store.dispatch('get',{
                url: API.url.actricleGetById,
                param: {
                    actricleId: params.id
                }
            })
            // console.log(res)
            store.commit('setArticle', data.actricle)
            
        }
    }
</script>
