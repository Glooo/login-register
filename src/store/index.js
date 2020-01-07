import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 数据就保存在state中，页面用this.$store.state调用
  state: {

  },
  // Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果
  // 使用是：this.$store.getters.get
  getters: {
    get: function (state) {
      return 1
    }
  },
  // 修改store中的值唯一的方法就是提交mutation来修改
  // 方法中调用this.$store.commit('add')
  mutations: {
    add (state) {
      // 修改state里的变量
    },
    add2 (state, n) {
      state.num = state.num + n
    }
  },
  // 方法中调用的是this.$store.dispatch('addFun')
  // this.$store.dispatch('addFun1',10)
  // 把commit提交mutations修改为使用dispatch来提交actions；我们点击页面，效果是一样的。
  actions: {
    addFun (context) {
      context.commit('add')
    },
    addFun1 (context, n) {
      context.commit('add1', n)
    }
  },
  modules: {}
})
export default store

// action类似于mutation，不同之处在于：
// 1. action提交的是mutation，而不是直接变更状态。
// 2. action可以包含异步操作，而mutation不行。
// 3. actions中的回调函数的第一个参数是 context , 是一个与store实例具有相同属性和方法的对象.
// 4. action通过store.dispatch方法触发，mutation通过store.commit方法提交。
