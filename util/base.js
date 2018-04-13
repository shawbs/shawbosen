


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

export default {
    computeTime,
    hasClass,
    addClass,
    removeClass
}