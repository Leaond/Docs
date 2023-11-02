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