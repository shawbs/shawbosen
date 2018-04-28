import state from './states'

/**
 * mutation:    同步动作
 * 通过store的commit()提交
 */
export default {
    changeLoadState(state, status){
        state.loading = status
    },
    changeLoginState(state, status){
        state.loginState = status
    },
    setUser(state, data){
        state.user = data
    },
    setArticle(state, data){
        state.article = data
    },
    setUser(state, data){
        state.user = data
    },
    setTags(state, arr){
        state.tags = [...arr]
    }
}