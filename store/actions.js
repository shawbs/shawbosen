
/**
 * action:  异步动作
 * 第个action接收一个store实例上下文content,包含state,mutatons,commit等
 * 通过store.dispatch()提交
 */
export default {
    test({commit}){
        commit('changeLoadState', true)
        setTimeout(() => {
            commit('changeLoadState', false)
        }, 3000);
    }
}