官网[https://cn.vuejs.org/]
TS与组合式API
为模板引用标注类型
注意为了严格的类型安全，有必要在访问 el.value 时使用可选链或类型守卫
类型守卫：https://blog.csdn.net/weixin_44198965/article/details/128973137

若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 author.books 不改变，无论多少次访问 publishedBooksMessage 都会立即返回先前的计算结果，而不用重复执行 getter 函数
```js
// 因为 Date.now() 并不是一个响应式依赖
  const now = computed(() => Date.now());
  setInterval(() => {
    console.log('********', now.value);
  }, 2000);
  ```
# vue2组件通信方式
props: 可以实现父子组件、子父组件、甚至兄弟组件通信（只读不改）
自定义事件:可以实现子父组件通信
全局事件总线$bus:可以实现任意组件通信
pubsub: 发布订阅模式实现任意组件通信
vuex:集中式状态管理容器，实现任意组件通信
ref:父组件获取子组件实例VC,获取子组件的响应式数据以及方法
slot: 插槽(默认插槽、具名插槽、作用域插槽)实现父子组件通信
# Vue3组件之间的通信
props、自定义事件、事件总线、v-model、useattrs、ref、$parent、provide-inject、pinia、slot插槽