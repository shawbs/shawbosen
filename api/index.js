
import axios from 'axios'
import conf from '~/config.js'

axios.defaults.baseURL = conf[conf.env].host; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const url = {
    login: '/shawbosen/user/login',
    register: '/shawbosen/user/register',
    refreshAccessToken: '/shawbosen/refreshAccessToken',
    actricleGetAll: '/shawbosen/actricle/getall',
    actricleGetById: '/shawbosen/actricle/getbyid',
    actricleAdd: '/shawbosen/actricle/add',
    actricleUpdate: '/shawbosen/actricle/update',
    getTags: '/shawbosen/actricle/getTags',
    getArticleByTag: '/shawbosen/actricle/getActricle/tag',
    getActricleGroupByTag: '/shawbosen/actricle/getActricleGroup/tag',
    deleteArticle: '/shawbosen/actricle/delete',
    verifyToken: '/shawbosen/verifyToken',
    UserInfoUpdata: '/shawbosen/user/info/update',
    userInfo: '/shawbosen/user/info',
    userInfoSimple: '/shawbosen/user/info/simple'
}

const get = (url,parameter)=> {

    return new Promise((resolve,reject)=>{
        axios.get(url, parameter)
        .then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            console.log('request failed')
            reject()
        })
    })
}

const post = (url,parameter)=> {

    return new Promise((resolve,reject)=>{
        axios.post(url, parameter)
        .then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            console.log('request failed')
            reject()
        })
    })
}

const upload = (url,parameter)=>{

    return new Promise((resolve,reject)=>{
        axios.post(url, parameter,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log(store())
            resolve(res.data)
        })
        .catch(err=>{
            console.log('request failed')
            reject()
        })
    })
    
}

const refreshToken = async function(){
    
    try {
        let refreshToken = localStorage.getItem('__shawbs_refresh_token');
        let {data}= await axios.post(url.refreshAccessToken,{refreshToken:refreshToken})

        if(data.code == 200){
            return data.data.token
        }else{
            console.log(data.msg)
        }
    } catch (error) {
        console.log(error)
    }
    
}

export default {
    url,
    refreshToken
    // get,
    // post,
    // upload
}