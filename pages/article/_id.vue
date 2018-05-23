<template >
    <section class="container" v-if="article">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page"><nuxt-link to="/">首页</nuxt-link></li>
                <li class="breadcrumb-item" aria-current="page"><nuxt-link :to="'/category/'+article.tag">{{article.tag}}</nuxt-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{article.id}}</li>
            </ol>
        </nav>

        <article class="article ">
            <h2>{{article.title}}</h2>
            <p class="text-muted clearfix" v-if="article.meta">
                <small class="mr-2">创建时间 {{new Date(article.meta.createAt).format()}}</small>
                <small>更新时间 {{new Date(article.meta.updateAt).format()}}</small>
                <small class="float-right link gray" @click="deleteActricle">删除文章</small>
                
            </p>
            <hr class="my-4">
            <div class="content mb-5" v-html="article.content">


            </div>

        </article>
        

  </section>
</template>

<script>
    import MainNav from '~/components/MainNav.vue'
    import API from '~/api'
    import p from '~/util/plugin'
    export default {
        name: 'note-detail-page',
        // layout: 'base',
        components: {
            MainNav
        },
        data(){
            return {
                id: '',
                article: null
            }
        },
        asyncData  ({params}) {
            return {
                id: params.id
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            deleteActricle(){
                let _this = this;
                _this.$store.dispatch('post',{
                    url: API.url.deleteArticle,
                    param: {
                        actricleId: this.id
                    },
                    showload: true
                })
                .then(data=>{

                    if(data.data.isSuccess){
                        p.toast('删除成功','success')
                    }
                })
            },
            async init(){
                let {data} = await this.$store.dispatch('get',{
                    url: API.url.actricleGetById,
                    param: {
                        actricleId: this.id
                    }
                })
                let actricle = data.actricle;
                actricle.content = new SimpleMDE().markdown(actricle.content);
                this.article = actricle;
            }
        }

    }
</script>
