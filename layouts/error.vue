<template>
<div class="__nuxt-error-page">
<div class="error">
 
  <div class="title">{{ message }}</div>
  <p class="description" v-if="statusCode === 404">
    <nuxt-link class="error-link" to="/">回到首页</nuxt-link>
  </p>

</div>
</div>
</template>

<script>
export default {
  name: 'nuxt-error',
  props: ['error'],
  head () {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },

  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
        let msg = '';
        let statusCode = this.error.statusCode;
        switch(statusCode){
            case 404: msg = '当前页面未找到， 404';break;
            default: msg = `服务器异常，${statusCode}`;
        }
        return msg;
    }
  }
}
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #f5f5d5;
  color: #47494E;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased; 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494E;
  margin-bottom: 8px; 
}
.__nuxt-error-page .description {
  color: #7F828B;
  line-height: 21px;
  margin-bottom: 10px;
}
.__nuxt-error-page a {
  color: #7F828B !important;
  text-decoration: none;
}
.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}
</style>