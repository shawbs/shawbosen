

/**
 * 
 * @param {*} timestamp 必须是毫秒数时间cuo
 */
const computeTime = function (timestamp){
    let nowtime = new Date().getTime(); //获取毫秒
    let t = nowtime - timestamp;

    let year,day,hour,minute,second;

    year = Math.floor(t/1000/60/60/24/365);
    day = Math.floor(t/1000/60/60/24%365);
    hour=Math.floor(t/1000/60/60%24);
    minute=Math.floor(t/1000/60%60);
    second=Math.floor(t/1000%60);

    return {
        year,
        day,
        hour,
        minute,
        second
    }

}


const hasClass =  function ( elements,cName ){ 
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
}
const addClass = function ( elements,cName ){ 
    if( !hasClass( elements,cName ) ){ 
        elements.className += " " + cName; 
    }; 
}
const removeClass = function ( elements,cName ){ 
    if( hasClass( elements,cName ) ){ 
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), "" );
    }; 
}

const verifyForm = function(id){
    let form = document.getElementById(id).elements;
    let falg = true;
    let target = null;
    for(let i=0;i<form.length;i++){
        // console.log(form[i].name,form[i].value)
        if(!!form[i].name && form[i].value == ''){
            falg = false;
            target = form[i].name;
            break;
        }
    }
    return {
        status: falg,
        target
    };
}

const setLocal = function(key,value){

    if(typeof value == 'string'){
        localStorage.setItem(key,value)
    }else{
        localStorage.setItem(key,JSON.stringify(value))
    }
}

const getLocal = function(key){

    let result = localStorage.getItem(key);
    let _resutl;
    //只要result不是字符串(不包括JSON字符串),都可以进行JSON.parse()解析
    try {
        _resutl = JSON.parse(result);
    } catch (error) {
        _resutl = result
    }
    return _resutl    
}

// setLocal('aaa','asd');
// setLocal('bbb',111);
// setLocal('ccc',false);
// setLocal('ddd',[{a:1}]);

// console.log(typeof getLocal('aaa'))
// console.log(typeof getLocal('bbb'))
// console.log(typeof getLocal('ccc'))
// console.log(typeof getLocal('ddd'))


const isLogin = function(){
    return !!getLocal('__shawbs_loginState')
}

/**
 * 
 * @param {*} time 时间戳/时间字符串
 * @param {*} fmt 
 */
Date.prototype.format = function(fmt = 'YYYY-MM-DD hh:mm') { 
    let o = {
        'Y+' : this.getFullYear(),
        'M+' : this.getMonth()+1,
        'D+' : this.getDate(),
        'h+' : this.getHours(),
        'm+' : this.getMinutes(),
        's+' : this.getSeconds(),
    }
    for(let k in o){
        fmt = fmt.replace(new RegExp(`${k}`), String(o[k]).length<2 ? 0 +''+ o[k] : o[k]);
    }
    return fmt; 
}

export default {
    computeTime,
    hasClass,
    addClass,
    removeClass,
    verifyForm,
    isLogin,
    getLocal,
    setLocal
}