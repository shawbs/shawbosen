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


const showLoader = ()=>{
    if($('#loader').length== 0){
        let html = $(`<div id="loader" class="loader"><i  class="fa fa-spinner fa-pulse"></i></div>`);
        $('body').append(html);
    }
}

const hideLoader = ()=>{
    $('#loader').remove();
}

module.exports = {
    toast,
    showLoader,
    hideLoader
}