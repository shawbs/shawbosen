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
    }
}