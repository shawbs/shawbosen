import API from '../api'
import axios from 'axios'
import util from '../util/base'
import p from '../util/plugin'

/**
 * 刷新token
 * @param {*} token 
 */
const refreshToken = ()=>{
    let refreshToken = util.getLocal('__shawbs_refresh_token');
    return new Promise((resolve,reject)=>{
        axios.post(API.url.refreshAccessToken, {
            refreshToken: refreshToken
        })
        .then(res=>{
            if(res.data.code == 200){
                util.setLocal('__shawbs_token',res.data.data.token);
                util.setLocal('__shawbs_refresh_token',res.data.data.token);
                resolve(res.data.data.token)
            }else{
                reject()
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}


/**
 * action:  异步动作
 * 第个action接收一个store实例上下文content,包含state,mutatons,commit等
 * 通过store.dispatch()提交
 */
export default {
    /**
     * 
     * @param {*} param0 
     * @param {*} options {url,param,showload}
     */
    post({commit },options){
        let token = util.getLocal('__shawbs_token')
        axios.defaults.headers['accesstoken'] = token;
        let showload = options.showload || false
        showload && p.showLoader()
        return new Promise((resolve,reject)=>{
            axios.post(options.url, options.param || {})
            .then(res=>{
                setTimeout(function(){
                    showload && p.hideLoader()
                },300)
                if(res.data.code == 401){
                    refreshToken()
                    .then(token=>{
                        
                    })
                    .catch(()=>{
                        console.log('token刷新失败')
                    })
                }else{

                    if(res.data.code == 200){
                        resolve(res.data)
                    }else{
                        p.toast(res.data.msg,'error')
                    }
                }
            })
            .catch(err=>{
                showload && p.hideLoader()
                console.log('request failed')
                reject(err)
            })
        })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} options {url,param,showload}
     */
    get({commit },options){
        let token = util.getLocal('__shawbs_token')
        axios.defaults.headers['accesstoken'] = token;
        let showload = options.showload || false;
        showload && p.hideLoader()
        // console.log(options,showload)
        return new Promise((resolve,reject)=>{
            axios.get(options.url, {
                params: options.param || {}
            })
            .then(res=>{

                showload && p.hideLoader()

                if(res.data.code == 401){
                    refreshToken()
                    .then(token=>{
                        
                    })
                    .catch(()=>{
                        console.log('token刷新失败')
                    })
                }else{

                    if(res.data.code == 200){
                        resolve(res.data)
                    }else{
                        p.toast(res.data.msg,'error')
                    }
                }

            })
            .catch(err=>{
                showload && p.hideLoader()
                console.log('request failed')
                reject(err)
            })
        })
    },
    checkLogin({commit}){
        let token = util.getLocal('__shawbs_token')
        axios.defaults.headers['accesstoken'] = token;
        return new Promise((resolve,reject)=>{
            axios.post(API.url.verifyToken, {})
            .then(res=>{
                if(res.data.code == 401){
                    refreshToken()
                    .then(token=>{
                        
                    })
                    .catch(()=>{
                        console.log('token刷新失败')
                    })
                }else{

                    if(res.data.code == 200){
                        resolve(res.data)
                    }else{
                        reject(res.data.msg)
                    }
                }

            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    login({commit}, parameter){
        return API.post(API.url.login,parameter,true)
    }
}