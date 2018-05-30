<template>
  <div class="index-page">
    <section class="container">
        <div class="m-button-group">
            <nuxt-link class="btn btn-primary noborder" to="/">全部</nuxt-link>
            <nuxt-link class="btn btn-dark noborder" :to="'/category/' + item.tag"  v-for="(item,index) in $store.state.tags " :key="index" :style="{backgroundColor: item.tagColor}">{{item.tag}}</nuxt-link>
        </div>


        <hr class="my-3 row">
        <div class="main">
          <div class="line row" v-for="(item,key) in actricleList" :key="key" v-if="$store.state.loginState?true:(!item.private)">
            <div class="col-sm-8 link" :data-id="item.id" @click="linkArticleDetail">[{{item.tag}}]&nbsp;{{item.title}}</div>
            <div class="col-sm text-muted"><small>{{new Date(item.updateAt).format()}}</small></div>

          </div>
          <div class="line-end">
            ...
          </div>
        </div>

          

    </section>
  </div>
</template>

<script>
import MainNav from '~/components/MainNav.vue'
import util from '~/util/base'
import API from '~/api'

export default {
  name: 'index-page',
  layout: 'base',
  components: {
    MainNav
  },
  data(){
      return {
        actricleList: [],
        params: null
      }
  },
  asyncData  ({params}) {
    return {
        params: params
    }
  },
  mounted(){
    this.init();
    this.getTags();

    this.$store.dispatch('checkLogin')
    .then(res=>{
      this.$store.commit('changeLoginState', true)
    })
    .catch(err=>{
      this.$store.commit('changeLoginState', false)
    })
  },
  methods: {
    linkArticleDetail(e){
      let id = e.target.dataset.id;
      if(!!id){
        this.$router.push(`/article/${id}`)
      }
    },

    init(){
        this.$store.dispatch('get',{
            url: API.url.actricleGetAll,
            showload: true
        })
        .then(res=>{
            this.actricleList = res.data.actricle
        })
    },

    getTags(){
      this.$store.dispatch('get',{
        url: API.url.getTags
      })
      .then(res=>{
        this.$store.commit('setTags', res.data.tags);
      })
    }


  }
}
</script>






