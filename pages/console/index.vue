<template>
    <section class="container">
        <div class="row">
            <div class="col-sm">
                <div class="list-group">
                    <button type="button"  class="list-group-item list-group-item-danger list-group-item-action">新建</button>
                    <button type="button"  class="list-dropdown list-group-item list-group-item-dark list-group-item-action">
                        <div class="list-head">草稿</div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </button>
                    <button type="button"  class="list-dropdown list-group-item list-group-item-action" v-for="item in lists">
                        <div class="list-head">{{item.name}}<span class="badge badge-primary badge-pill">14</span></div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </button>
                    
                </div>
            </div>
            <div class="col-sm-9">
                <form>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">标题</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="staticEmail" value="email@example.com">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="inputTag" class="col-sm-2 col-form-label">标签</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputTag" placeholder="输入标签">
                            <div class="dropdown-hint">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" @click="putInt">nodejs</li>
                                    <li class="list-group-item">vuejs</li>
                                    <li class="list-group-item">日志</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">内容</label>
                        <div class="col-sm-10">
                        <textarea name="content" data-provide="markdown" data-iconlibrary="fa" rows="10" id="editor"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">仅自己可见</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary">发布</button>&nbsp;
                            <button type="button" class="btn btn-light" @click="saveFormData">保存草稿</button>&nbsp;
                            <button type="reset" class="btn btn-danger">重置</button>&nbsp;
                        </div>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    // import SimpleMDE from 'simplemde'
    export default {
        name: 'console-index-page',

        asyncData(context){
            return {
                lists: [
                    {
                        name: '日志',
                        type: 'article'
                    },
                    {
                        name: 'nodejs',
                        type: 'nodejs'
                    },
                    {
                        name: 'vuejs',
                        type: 'vuejs'
                    }
                ]
            }
        },
        mounted(){
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
            }),
            this.initMarkdown();
        },
        methods:{
            putInt(e){
                $('#inputTag').val($(e.target).text())
            },
            initMarkdown(){
                
                let simplemde = new SimpleMDE({ element: document.getElementById("editor") });

            },
            saveFormData(){
                console.log(editor)

            }

        }
        
    }
</script>

