<template>
    <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{content}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item">
                <nuxt-link class="link" to="/console">发文章</nuxt-link>
            </div>
            <div class="dropdown-item">
                <nuxt-link class="link" to="/user/setting">编辑个人资料</nuxt-link>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" @click="exitHandle">退出</div>

        </div>
    </div>
    
</template>

<script>
    import util from '~/util/base.js'
    export default {
        name: 'dropdown-component',
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        methods: {

            exitHandle(){
                this.$router.push('/user/login')
            }
        }
    }
</script>