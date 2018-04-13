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
                    <input type="text" class="form-control" name="username" value="萧伯森">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">简介</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" name="desc" value="萧伯森">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">工作时间</label>
                    <div class="col-sm-10">
                    <input type="text" readonly class="form-control" id="inputDatetime" name="startDate">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">邮箱</label>
                    <div class="col-sm-10">
                    <input type="email" class="form-control" name="email" value="example@xx.com">
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">微信二维码</label>
                    <div class="col-sm-10">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile04" name="qrcode">
                            <label class="custom-file-label" for="inputGroupFile04">选择文件</label>
                            
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <label class="col-sm-2"></label>
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary">发布</button>&nbsp;
                        <button type="reset" class="btn btn-danger">重置</button>&nbsp;
                    </div>
                </div>
            </div>
        </div>
            
            
            
        </form>
    </section>
</template>
<script>
    export default {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: '/lib/bootstrap-datetimepicker.min.css'
                }
            ],
            script: [
                {
                    src: '/lib/bootstrap-datetimepicker.min.js'
                }
            ]
           
        },
        mounted(){
            this.initDatepicker();
            $("#inputDatetime").datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                minView: 2
                });
        },
        methods:{
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
            }
        }
    }
</script>

