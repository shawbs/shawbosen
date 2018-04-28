<template>
  <div class="index-page">
    <section class="container">
        <div class="m-button-group">
            <button type="button" class="btn btn-primary" @click="filterHandle">全部</button>
            <button type="button" class="btn btn-light" @click="filterHandle" v-for="item in $store.state.tags " :style="{backgroundColor: item.tagColor}">{{item.tag}}</button>
        </div>
        <div class="row ">
          <div class="col-md-8 main">
            <hr class="my-3">
            <div class="line row" v-for="(item,key) in actricleList" :key="key">
              <div class="col-sm-8 link" :data-id="item.id" @click="linkArticleDetail">[{{item.tag}}]&nbsp;{{item.title}}</div>
              <div class="col-sm text-muted"><small>{{new Date(item.meta.updateAt).format()}}</small></div>

            </div>
            <div class="line-end">
              ...
            </div>
          </div>

          <div class="col-md side">
            
            <div class="chunk">
              <h5 class="_title">
                关于
              </h5>
              <hr class="my-3">
              <div class="_body">
                <p>
                  <nuxt-link to="/other/about">个人简介</nuxt-link>
                </p>
                <img src="~assets/image/we_code.jpg" alt="微信二维码" width="150">
              </div>
            </div>
            

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
        actricleList: []
      }
  },
  mounted(){
    this.initList();
    this.getTags();
    

  },
  methods: {
    linkArticleDetail(e){
      let id = e.target.dataset.id;
      if(!!id){
        this.$router.push(`/article/${id}`)
      }
    },
    filterHandle(e){
      
      let tag = e.target.innerHTML;
      if(tag == '全部'){
        this.initList();
      }else{
        this.filterArticle(tag)
      }

      
    },
    filterArticle(tag){
      let _this = this;
      _this.$store.dispatch('post',{
        url: API.url.getArticleByTag,
        param: {
          tag: tag
        },
        showload: true
      })
      .then(res=>{
        if(res.code==200){
          _this.actricleList = res.data.actricle
        }else{
          console.log(res.msg)
        }
      })
    },
    initList(){
        let _this = this;
        _this.$store.dispatch('get',{
          url: API.url.actricleGetAll,
          showload: true
        })
        .then(res=>{
          if(res.code == 200){
            _this.actricleList = res.data.actricle
          }else{
            console.log(res.msg)
          }
        })
    },
    getTags(){
      let _this = this;
      _this.$store.dispatch('get',{
        url: API.url.getTags
      })
      .then(res=>{
        if(res.code == 200){
          _this.$store.commit('setTags', res.data.tags);
          console.log(_this.$store.state.tags)
        }else{
          console.log(res.msg)
        }
      })
    }
  }
}
</script>






