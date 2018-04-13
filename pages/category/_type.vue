<template>
  <section class="container">
      <div class="m-button-group">
          <button type="button" class="btn btn-light">日志</button>
          <button type="button" class="btn btn-light">nodejs</button>
          <button type="button" class="btn btn-light">javascript</button>
          <button type="button" class="btn btn-light">vuejs</button>
      </div>
      <div class="row ">
        <div class="col-md-8 main">
          <hr class="my-3">
          <div class="line row" v-for="item in arrs">
            <div class="col-sm-8"><nuxt-link :to="item.url"><span class="badge badge-secondary">{{item._type}}</span>&nbsp;{{item.name}}</nuxt-link></div>
            <div class="col-sm text-muted"><small>{{item.datetime}}</small></div>

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
              <nuxt-link to="/other/about">个人简介</nuxt-link>
            </div>
          </div>
          

        </div>
      </div>
        

  </section>
</template>

<script>
import MainNav from '~/components/MainNav.vue'

export default {
  name: 'index-page',
  layout: 'base',
  components: {
    MainNav
  },
  asyncData(context){
      return {
        arrs: [
          {
            name: 'npm install关于报错node-pre-gyp error',
            datetime: '2017.12.18 15:53',
            _type: '文章',
            url: '/article/123'
          },
          {
            name: 'npm install关于报错node-pre-gyp error',
            datetime: '2017.12.18 15:53',
            _type: '笔记',
            url: '/'
          },
          {
            name: 'npm install关于报错node-pre-gyp error',
            datetime: '2017.12.13 15:53',
            _type: '文章',
            url: '/'
          },
          {
            name: 'npm install关于报错node-pre-gyp error',
            datetime: '2017.12.18 15:53',
            _type: '文章',
            url: '/'
          },
          {
            name: 'npm install关于报错node-pre-gyp error',
            datetime: '2017.12.16 15:53',
            _type: '文章',
            url: '/'
          }
        ]
      }
  },
  mounted(){
    console.dir(this.$store)
  }
}
</script>


