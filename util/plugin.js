/**
 * 
 * @param {*} content ''
 * @param {*} status warn success error
 */
const toast = (content,status)=>{
    //判断页面是否存在toast，存在则刷新内容重置时间，没有则新增
    let falg = $('#toast').length ? true : false;
    if(falg){
        clearTimeout(hidetoast);
        $('#toast').html(content).get(0).calssName = `toast ${status}`;
        let hidetoast = setTimeout(() => {
            html.remove();
        }, 2000);
    }else{
        let html = $(`<div id="toast" class="toast ${status}">${content}</div>`);
        $('body').append(html);
    
        let hidetoast = setTimeout(() => {
            html.remove();
        }, 2000);
    }
    
}

let hideLoaderTimer = null; // 每当显示加载条时，取消删除加载条的操作
const showLoader = ()=>{
    clearTimeout(hideLoaderTimer);
    if($('#loader').length== 0){
        let html = $(`<div id="loader" class="loader"><i  class="fa fa-spinner fa-pulse"></i></div>`);
        $('body').append(html);
    }
}
const hideLoader = ()=>{
    hideLoaderTimer = setTimeout(function(){
        $('#loader').remove();
    },500)
}

module.exports = {
    toast,
    showLoader,
    hideLoader
}