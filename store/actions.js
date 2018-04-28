import API from '../api'
import axios from 'axios'
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
        let showload = options.showload || false
        showload && commit('changeLoadState', true)
        // console.log(options,showload)
        return new Promise((resolve,reject)=>{
            axios.post(options.url, options.param || {})
            .then(res=>{
                setTimeout(function(){
                    showload && commit('changeLoadState', false)
                },1000)
                resolve(res.data)
            })
            .catch(err=>{
                showload && commit('changeLoadState', false)
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
        let showload = options.showload || false;
        showload && commit('changeLoadState', true)
        // console.log(options,showload)
        return new Promise((resolve,reject)=>{
            axios.get(options.url, {
                params: options.param || {}
            })
            .then(res=>{
                setTimeout(function(){
                    showload && commit('changeLoadState', false)
                },1000)
                resolve(res.data)
            })
            .catch(err=>{
                showload && commit('changeLoadState', false)
                console.log('request failed')
                reject(err)
            })
        })
    },
    login({commit}, parameter){
        return API.post(API.url.login,parameter,true)
    }
}