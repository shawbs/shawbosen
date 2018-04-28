<template>
    <div class="console-index-page">
        <section class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="list-group">
                        <button type="button" @click="createArticle"  class="list-group-item list-group-item-danger list-group-item-action">新建</button>
                        
                        <button type="button" @click="toggleList"  class="list-dropdown list-group-item list-group-item-action" v-for="(val,key,index) in actricleList" :key="key">

                            <div class="list-head">{{key}}<span class="badge badge-primary badge-pill">{{val.length}}</span></div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item menu-item" @click="selectArticle" v-for="(item,key) in val" :key="key" :data-id="item.id">
                                    {{item.title}} 
                                    <i class="delete-btn fa fa-times" @click="removeArticle" :data-id="item.id"></i>
                                </li>
                            </ul>
                        </button>
                        
                    </div>
                </div>
                <div class="col-sm-9">
                    <form id="articleForm" :data-id="article.id">
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">标题</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputTitle" :value="article.title" placeholder="输入标题" title="标题" name="title">
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="inputTag" class="col-sm-2 col-form-label">标签</label>
                            <div class="col-sm-10">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">已有标签</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="javascript:;" v-for="tag in $store.state.tags">{{tag.tag}}</a>
                                        </div>
                                    </div>
                                    <input type="text" class="form-control" id="inputTag" placeholder="输入标签" title="标签">
                                    <div class="input-group-append">
                                        <input type="text" id="colorPicker" class="input-group-text" value="#000000" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">内容</label>
                            <div class="col-sm-10">
                            <textarea data-provide="markdown" data-iconlibrary="fa" rows="10" id="editor">{{article.content}}</textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2"></label>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="private">
                                    <label class="form-check-label" for="private">仅自己可见</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2"></label>
                            <div class="col-sm-10">
                                <button type="button" class="btn btn-primary" @click="saveFormData">发布</button>&nbsp;
                         
                                <button type="reset" class="btn btn-danger">重置</button>&nbsp;
                            </div>
                        </div>
                        <p class="alert alert-danger" v-if="error_msg">{{error_msg}}</p>
                        <p class="alert alert-success" v-if="success_msg">{{success_msg}}</p>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import API from '~/api'
    import util from '~/util/base'

    let simplemde = null;
    export default {
        name: 'console-index-page',
        data(){
            return {
                error_msg: '',
                success_msg: '',
                actricleList: [],
                article: {},

            }
        },

        mounted(){
            this.initMinicolors();
            this.initMarkdown();
            this.getActricleByGroup();

            $('.list-dropdown').on('click', function(e){
                if(e.target.className.indexOf('list-head')!=-1){
                    $('.list-group',this).toggle();
                }
            })

            $('#inputTag').on('focus blur', function(e){
                let self = this;
                if(e.type == 'focus'){
                    $(self).addClass('open')
                }
                if(e.type == 'blur'){
                    setTimeout(function(){
                         $(self).removeClass('open')
                    },300)
                }
            })
            
        },
        methods:{

            //初始化拾色器
            initMinicolors(){
                $('#colorPicker').minicolors({

					control: $(this).attr('data-control') || 'hue',

					defaultValue: $(this).attr('data-defaultValue') || '',

					inline: $(this).attr('data-inline') === 'true',

					letterCase: $(this).attr('data-letterCase') || 'lowercase',

					opacity: $(this).attr('data-opacity'),

					position: $(this).attr('data-position') || 'bottom left',

					change: function(hex, opacity) {

						if( !hex ) return;

						if( opacity ) hex += ', ' + opacity;

						try {

							console.log(hex);

						} catch(e) {}

					},

					theme: 'bootstrap'

				});


            },

            getTag(){
                let result = null;
                if( $('#tag1').is(':visible') ){
                    let str = $('#selectTag').val();
                    let arr;
                    if(!!str && str != '0'){
                        arr = str.split('/')
                        result = {
                            tag: arr[0],
                            tagColor: arr[1]
                        }
                    }
                }else if( $('#tag2').is(':visible') ) {
                    let tag = $('#inputTag').val();
                    if(!!tag){
                        result = {
                            tag: tag,
                            tagColor: $('#colorPicker').val()
                        }
                    }
                }
                return result
            },



            //初始化编辑器
            initMarkdown(){
                simplemde = new SimpleMDE({ element: document.getElementById("editor") });
            },

            verifyForm(){
                let form = document.getElementById('articleForm').elements;

                let falg =true;
                for(var i=0;i<form.length;i++){
                    let input = form[i]
                    if( !!input.name){
                        if(!!input.value){
                            this.error_msg = '';
                        }else{
                            this.error_msg = `${input.title}不能为空`;
                            falg = false;
                            break;
                        }
                    }
                 }

                return falg;

            },

            //提交表单
            saveFormData(){
                 let status = this.verifyForm();

                 let contentHTML = simplemde.value();
                 let tag = this.getTag();
                 if(!status){
                     return
                 }
                 if(!tag){
                    this.error_msg = `标签不能为空`;
                    return
                }
                if(!contentHTML){
                    this.error_msg = `内容不能为空`;
                    return
                }
                
                console.log(tag,contentHTML)
                 let _this = this;
                 API.refreshToken()
                 .then(function(token){
                    let parameter = {
                        id: $('#articleForm').data('id'),
                        title: $('#inputTitle').val(),
                        tag: tag.tag,
                        tagColor: tag.tagColor,
                        content: contentHTML,
                        private: $('#private').get(0).checked,
                        accessToken: token
                    };
                    _this.addOrUpdate(parameter);

                })


                 

            },

            //发表文章或更新
            async addOrUpdate(parameter){
                let url = !!parameter.id ? API.url.actricleUpdate : API.url.actricleAdd;

                let res = await this.$store.dispatch('post', {
                    url: url,
                    param: parameter
                })

                if(res.code == 200){
                    this.success_msg = res.msg;
                }else{
                    this.error_msg = res.msg
                }
            },

            //获取分类文章
            getActricleByGroup(){
                let _this = this;
                _this.$store.dispatch('get',{
                    url: API.url.getActricleGroupByTag,
                    showload: true
                })
                .then(res=>{
                    if(res.code==200){
                    _this.actricleList = res.data.articleList
                    }else{
                    console.log(res.msg)
                    }
                })
            },

            toggleList(e){
                var target = $(e.target).next();
                if(target.hasClass('list-group-flush')){
                    target.toggle();
                }
                
            },
            
            createArticle(){
                this.article = {}
                simplemde.value('')
                $('#selectTag').val('0')
            },

            removeArticle(e){
                let target = e.target;
                let _this = this;
                _this.deleteArticle(target.dataset.id)
                
                
            },

            selectArticle(e){
                let target = e.target;
                let _this = this;
                if(target.nodeName == 'LI'){
                    _this.getArticleInfo(target.dataset.id)
                    .then(data=>{

                        _this.article = data.actricle;
                        let val = _this.article.tag + '/' + _this.article.tagColor;
                        $('#selectTag').val(val);
                        simplemde.value(_this.article.content)    
                    })
                    
                }
            },

            deleteArticle(id){
                let _this = this;
                API.refreshToken()
                .then(token=>{
                    _this.$store.dispatch('post',{
                        url: API.url.deleteArticle,
                        param: {
                            accessToken: token,
                            actricleId: id
                        },
                        showload: true
                    })
                    .then(data=>{
                        if(data.code == 200){
                            if(data.data.isSuccess){
                                this.getActricleByGroup();
                                _this.createArticle();
                                _this.success_msg = '删除成功'
                            }else{
                                _this.error_msg = '删除失败'
                            }
                        }
                    })
                })
                
            },


            async getArticleInfo(id){
                let {data} = await this.$store.dispatch('get',{
                    url: API.url.actricleGetById,
                    param: {
                        actricleId: id
                    },
                    showload: true
                })

                return data
                     
            }


        }
        
        
    }
</script>

