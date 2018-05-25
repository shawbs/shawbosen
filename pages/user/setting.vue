<template>
    <section class="container">
        <form>
        <div class="row">
            <div class="col-sm">
                <div class="list-group">
                    <button type="button" class="list-group-item list-group-item-dark list-group-item-action">个人资料</button>
                </div>
            </div>
            <div class="col-sm-9">
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">名字</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" name="nickname" :value="userInfo.nickname">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">简介</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" name="desc" :value="userInfo.desc">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">工作时间</label>
                    <div class="col-sm-10">
                    <input type="text" readonly class="form-control" id="inputDatetime" name="startWorkDate" :value="new Date(userInfo.startWorkDate).format() || new Date().format()">
                    </div>
                </div>

                <input type="hidden" name="id" :value="userInfo.id" class="form-control">
                
                <div class="row">
                    <label class="col-sm-2"></label>
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary" @click="formSubmit">发布</button>&nbsp;
                        <button type="reset" class="btn btn-danger">重置</button>&nbsp;
                    </div>
                </div>
            </div>
        </div>
            
            
            
        </form>
    </section>
</template>
<script>
    import API from '~/api'
    import util from '~/util/base'
    import p from '~/util/plugin'
    export default {
        name: 'setting-page',
        data(){
            return {
                userInfo: {}
            }
        },
        mounted(){
            this.init();

            this.initDatepicker();
            $("#inputDatetime").datetimepicker({
                format: 'yyyy-mm-dd hh:mm',
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                minView: 1
                });
        },
        methods:{
            init(){
                let parameter = {
                    username: util.getLocal('user').username
                }
                this.$store.dispatch('get',{
                    url: API.url.userInfo,
                    param: parameter,
                    showload: true
                }).then(res=>{
                    this.userInfo = res.data.user;
                })
            },
            initDatepicker(){
                $.fn.datetimepicker.dates['en'] = {
                    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                    daysShort: ["周日",  "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                    today: "今天",
                    suffix: [],
                    meridiem: []
                }
            },

            formSubmit(){
                let inputs = $('.form-control');
                let parameter = {}
                inputs.each(function(i,item){
                    if(item.name){
                        if(item.name == 'startWorkDate'){
                            parameter[item.name] = new Date(item.value).getTime();
                        }else{
                            parameter[item.name] = item.value;
                        }
                    }
                })
                this.$store.dispatch('post',{
                    url: API.url.UserInfoUpdata,
                    param: parameter,
                    showload: true
                }).then(res=>{
                    p.toast('更新成功','success')
                })
            }
        }
    }
</script>

