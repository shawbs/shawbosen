<template>
    <div class="console-index-page">
        <section class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="list-group">
                        <button type="button" @click="newArticle"  class="list-group-item list-group-item-dark  list-group-item-action">新建</button>
                        
                        <button type="button" @click="toggleList"  class="list-dropdown list-group-item list-group-item-action" v-for="(val,key,index) in actricleList" :key="key">

                            <div class="list-head" >{{key}}<span class="badge badge-primary badge-pill">{{val.length}}</span></div>
                            <ul class="list-group list-group-flush">
                                
                                <li class="list-group-item menu-item " :data-name="key" @click="selectArticle" v-for="(item,_key) in val" :key="_key" :data-id="item.id">
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
                                <div class="input-group tag mb-3">
                                    <input type="text" class="form-control" list="tags" id="inputTag" title="标签" name="tag" :value="tag" autocomplete="off"/>
                                    <div class="dropdown-view" id="tags">
                                        <div class="dropdown-line" @click="selectTag" v-for="(item,index) in $store.state.tags" :key="index" :data-color="item.tagColor">{{item.tag}}</div>
                                    </div>
                                    <div class="input-group-append">
                                        <input type="text" id="colorPicker" class="input-group-text" value="#ff0000" name="tagColor"/>
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
                                    <input type="checkbox" class="form-check-input" id="private" :checked="article.private">
                                    <label class="form-check-label" for="private">仅自己可见</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2"></label>
                            <div class="col-sm-10">
                                <button type="button" class="btn btn-primary" @click="saveFormData">提交</button>&nbsp;
                                <button type="reset" class="btn btn-danger">重置</button>&nbsp;
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </section>

    </div>

    
</template>

<script>
    import API from '~/api'
    import util from '~/util/base'
    import p from '~/util/plugin'

    let simplemde = null;
    export default {
        name: 'console-index-page',
        data(){
            return {

                actricleList: [],
                article: {},
                tag: '',
                formData: {}
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
                    },200)
                }
            })
            
        },
        methods:{

            //初始化拾色器
            initMinicolors(){
                let conf = {
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

							// console.log(hex);

						} catch(e) {}

					},

					theme: 'bootstrap'
                }
                $('#colorPicker').minicolors(conf);

            },

            setMinicolor(color){
                $('.minicolors-swatch-color').eq(0).css('backgroundColor',color);
                $('#colorPicker').val(color)  
            },


            //初始化编辑器
            initMarkdown(){
                simplemde = new SimpleMDE({ element: document.getElementById("editor") });
            },

            //验证表单
            verifyForm(){
                let form = document.getElementById('articleForm').elements;
                let falg=true;
                for(var i=0;i<form.length;i++){
                    let input = form[i];
                    if( !!input.name){
                        if(!!input.value){
                            this.error_msg = '';
                            this.formData[input.name] = input.value
                        }else{
                            this.error_msg = `${input.title}不能为空`;
                            falg = false;
                            break;
                        }
                    }
                 }
                 return falg
            },

            //提交表单
            saveFormData(){
                let status = this.verifyForm();
                let contentHTML = simplemde.value();

                if(!status){
                    return
                }

                if(!contentHTML){
                    this.error_msg = `内容不能为空`;
                    return
                }
                
                // console.log(contentHTML)
                let parameter = $.extend(this.formData, {
                    id: $('#articleForm').data('id'),
                    content: contentHTML,
                    private: $('#private').get(0).checked
                });
                this.addOrUpdate(parameter);

            },

            //发表文章或更新
            addOrUpdate(parameter){
                this.success_msg='';
                this.error_msg='';
                let url = !!parameter.id ? API.url.actricleUpdate : API.url.actricleAdd;

                this.$store.dispatch('post', {
                    url: url,
                    param: parameter,
                    showload: true
                }).then(data=>{
                    p.toast('提交成功','success')
                })

            },



            //获取分类文章
            getActricleByGroup(){
                let _this = this;
                _this.$store.dispatch('get',{
                    url: API.url.getActricleGroupByTag,
                    showload: true
                })
                .then(res=>{

                    _this.actricleList = res.data.articleList

                })
            },

            newArticle(){
                this.article = {};
                this.tag = '';
                simplemde.value('');
            },

            selectTag(e){
                let target = e.target;
                this.tag = $(target).text()

                this.setMinicolor($(target).data('color'))
            },

            toggleList(e){
                let target = $(e.target);
                let list = target.next();
                let parent = target.parent();
                if(target.hasClass('list-head')){
                    parent.siblings().find('.list-group-flush').slideUp();
                    if(list.hasClass('list-group-flush')){
                        list.slideToggle();
                    }
                }
                
            },
            
            removeArticle(e){
                let target = e.target;
                let _this = this;
                _this.deleteArticle(target.dataset.id)
                
                
            },

            selectArticle(e){
                let target = e.target;
                let _this = this;
                _this.tag = $(target).data('name') || '';
                if(target.nodeName == 'LI'){
                    _this.getArticleInfo(target.dataset.id)
                    .then(data=>{

                        _this.article = data.actricle;
                        let val = _this.article.tag + '/' + _this.article.tagColor;
                        simplemde.value(_this.article.content)  
                        _this.setMinicolor(data.actricle.tagColor)  
                    })
                    
                }
            },

            deleteArticle(id){
                let _this = this;
                _this.$store.dispatch('post',{
                    url: API.url.deleteArticle,
                    param: {
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

