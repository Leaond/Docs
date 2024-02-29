# Promise

Promise 是 异步编程 的一种解决方案，比传统的解决方案 `回调函数和事件` 更加的合理和强大。ES6将其写进了标准语言，统一了用法，原生提供了promise对象。简单来说，promise就像是一个容器，里面保存着某个未来才会结束的事件的结果。

## 什么叫做异步编程

异步编程是一种编程范式，旨在`通过优化任务调度和资源利用，提高程序的吞吐量和响应速度`。与传统的同步编程方式相比，异步编程通过非阻塞的方式处理任务，使得一个任务的执行不会阻碍其他任务的进行。

在同步编程中，当一个任务执行时间较长时，整个程序会被阻塞，无法继续执行其他任务，直到该任务完成; 而在异步编程中，任务的执行不会阻塞程序的进行，可以同时处理多个任务，提高了系统的并发性能。

## promise对象的特点

  promise主要有以下两个特点：

1. promise对象的状态不受外界影响。promise对象代表一个异步操作，有3种状态：pending(进行中)、fullfilled(已成功)、rejected(已失败)。只有异步操作的结果才能决定当前是哪一种状态，任何其他操作都无法改变这个状态。在Promise对象身上我们可以通过 promiseState 看到Promise的状态，promiseResult 来得到Promise对象得到的结果
2. 一旦状态改变，就不会再发生改变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从 `pending变为fullfilled` 和 从 `pending变为rejected`。只要这两种情况发生，状态就凝固了，不会再发生改变，这个时候就称为 resolved (已定型)。

有了Promise对象之后，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象还提供了统一的接口，使得控制异步操作更加的容易。

:::tip Promise缺点
首先，无法取消Promise，一旦新建他就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反映到外部。其三，当处于pending状态时，无法得知当前的状态是刚刚开始还是即将完成。
:::

## promise 的 API
  Promise对象提供了众多的API供我们使用。

### Promise 的构造函数：Promise(excutor){ }
  Promise函数接受一个函数excutor作为参数，这个excutor函数又接收两个函数作为参数：resolve 和 reject。

  resolve函数的作用是，将Promise的状态从 pending变为fullfilled。在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

  reject函数的作用是，将Promise的状态从 pending变为rejected。在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

:::tip

执行器函数是指在执行 `new Promise((resolve,reject)=>{ })` 的时候的这个参数函数。exector 会在 Promise 内部`立即同步调用`，不会放入队列中。异步操作在执行器中执行。

```js
let p = new Promise((resolve, reject) => {
  console.log(111);
});
console.log(222); //打印顺序:111,222
```

:::

### Promise.prototype.then 方法(onResolved,onRejected)=>{}
promise 的实例身上有 then 方法，也就是说，then 方法是定义在原型对象(Promise.prototype)上的。then 方法的作用是为Promise实例添加状态改变时的回调函数。then 方法 接收两个`可选参数`：第一个是resolved状态的回调函数，第二个是rejected状态的回调函数.

then() 方法返回的是一个新的Promise实例，因此我们可以采用链式调用的方式。

```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
// 依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
```

### Promise.prototype.catch 方法(onRejected)=>{}
Promise的实力身上还有一个catch方法，他也是定义在Promise的原型上的。可以将catch方法理解为：`.then(null, rejection)`或`.then(undefined, rejection)`的别名。catch方法是专门用来捕获错误的。

```js
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```
上面的getJSON()方法会返回一个Promise对象，如果该对象的状态变为 resolved，则会调用 then() 方法指定的回调函数，如果异步操作抛出错误，那么状态就会变为 rejected，就会调用 catch() 方法指定的回调函数，处理这个错误。此外，then() 方法指定的回调函数，如果运行中抛出错误也会被 catch() 方法捕获。

### Promise.resolve()方法：(value)=>{}

    value:返回的是一个成功的结果promise对象

```js
// 如果传入的参数为 非Promise类型的对象，则返回的结果为成功Promise对象
// 如果传入的参数为 Promise对象，则参数的结果决定了resolve的结果
let p1 = Promise.resolve(521);
let p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    resolve("ok");
  })
);
let p3 = Promise.resolve(
  new Promise((resolve, reject) => {
    reject("ok");
  })
);
```

### Promise.reject()方法：(reason)=>{}

reason:返回的是一个失败的原因 promise 对象

```js
// 如果传入的参数为 非Promise类型的对象，则返回的结果为成功Promise对象
// 如果传入的参数为 Promise对象，则参数的结果决定了resolve的结果
let p1 = Promise.reject(521);
let p2 = Promise.reject(
  new Promise((resolve, reject) => {
    reject("ok");
  })
);
let p3 = Promise.reject(
  new Promise((resolve, reject) => {
    resolve("ok");
  })
);

### Promise.all()方法：(promises)=>{}

promises：包含 n 个 promise 的数组。返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败

### Promise.race()方法：(promises)=>{}

promises：包含 n 个 promise 的数组。返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态
```

:::tip 注意

1.  Promise 对象的状态改变的方式

    - resolve 函数：pending=>fullfilled
    - reject 函数：pending=>reject
    - throw 方法：pending=>reject

2.  当一个 Promise 指定多个成功、失败回调函数时，只要 Promise 发生改变，则对应状态的回调函数都会调用。
    ```js
    let p1 = Promise.resolve('ok')
    p1.then(value=>{console.log(1)})
    p1.then(value=>{console.log(2)})
    p1.then(value=>{console.log(3)})
    ······
    //依次打印1,2,3...
    ```
3.  改变 Promise 状态和指定回调函数谁先谁后？

    - 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
      如何先改变状态再指定回调
    - 在执行器中直接调用 resolve、reject
    - 延迟更长时间才调用 then()
      什么时候才能得到数据？
    - 如果先指定的回调，那么当状态发生改变时，回调函数就会调用，得到数据
    - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

4.  Promise.then()返回的新 Promise 的结果状态是由 then()指定的回调函数执行的结果决定. - then()方法中抛出错误。then()返回的状态是 reject。 - 返回结果是非 Promise 类型的对象。then()返回的状态是 resolve。 - 返回结果是 Promise 对象。then()返回的状态由这个 Promise 对象的结果决定。

    ```js
    let p1 = new Promise((resolve, reject) => {
      resolve("OK");
    });
    let result = p1.then(
      (value) => {
        // 1.抛出错误
        throw "出错了";
        // 2.返回非 Promise
        return 111;
        // 3.返回 Promise
        return new Promise((resolve, reject) => {
          resolve("OK");
          reject("Error");
        });
      },
      (reason) => {}
    );
    ```

5.  Promise 如果串联多个操作任务？

    - Promise 的 then()返回一个新的 Promise，所以可以通过 then 的链式调用串联多个同步/异步任务

    ```js
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("OK");
      }, 1000);
    });

    p.then((value) => {
      return new Promise((resolve, reject) => {
        resolve("Success!");
      });
    })
      .then((value) => {
        console.log(value); //Success!
      })
      .then((value) => {
        //由于上一个then方法没有返回任何值，所以上一个then返回的Promise对象的状态是成功的，但是没有定义任何的返回值，所以成功的值是undefined
        console.log(value); //undefined.
      });
    ```

6.  Promise 异常穿透？

    - 当使用 Promise 的 then 链式调用时，可以在最后指定失败的回调
    - 前面任何操作出了异常，都会传到最后失败的回调中处理

    ```js
    let p = new Promise((resolve, reject) => {
      reject("error");
    });

    p.then((value) => {
      return new Promise((resolve, reject) => {
        resolve("Success!");
      });
    })
      .then((value) => {
        console.log(value);
      })
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        // 这里进行异常处理
        console.warn(error); //error，这里可以捕捉到前面所有回调的异常
      });
    ```

7.  中断 Promise 链 - 当使用 Promise 的 then 链式调用时，如果想要在中间中断，不再调用后面的回调函数，可以在回调函数中返回一个 pending 状态的 promise 对象。

```js
let p = new Promise((resolve, reject) => {
  reject("error");
});

p.then((value) => {
  console.log(111);
  //有且仅有一个方法：在前面返回一个pending状态的promise对象，这样就可以进行中断
  return new Promise(() => {});
})
  .then((value) => {
    console.log(222);
  })
  .then((value) => {
    console.log(333);
  });
//这里只打印111便结束了链式调用
```

:::