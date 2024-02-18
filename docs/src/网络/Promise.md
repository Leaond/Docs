# Promise

## 什么叫做异步编程

异步编程是一种编程范式，旨在`通过优化任务调度和资源利用，提高程序的吞吐量和响应速度`。与传统的同步编程方式相比，异步编程通过非阻塞的方式处理任务，使得一个任务的执行不会阻碍其他任务的进行。

在同步编程中，当一个任务执行时间较长时，整个程序会被阻塞，无法继续执行其他任务，直到该任务完成。而在异步编程中，任务的执行不会阻塞程序的进行，可以同时处理多个任务，提高了系统的并发性能。

# promise 封装读取文件模块

# promise 封装 AJAX 请求

promise 的状态 promiseState
promise 的结果 promiseResult，只有 resolve 和 reject 这两个函数才能改变这个结果的值

# 如何使用 Promise

## promise 的 API

### Promise 的构造函数：Promise(excutor){}

- executor 函数：执行器(resolve,reject)=>{};
- resolve 函数：内部定义成功时我们调用的函数；
- reject 函数：内部定义失败时我们调用的函数；

:::tip

执行器函数是指在执行 new Promise((resolve,reject)=>{}) 的时候的这个参数函数。exector 会在 Promise 内部`立即同步调用`，不会放入队列中。异步操作在执行器中执行。

```js
let p = new Promise((resolve, reject) => {
  console.log(111);
});
console.log(222); //打印顺序:111,222
```

:::

### Promise.prototype.then 方法(onResolved,onRejected)=>{}

- onResolved 函数：成功的回调函数
- onRejected 函数：失败的回调函数

指定用于得到成功 value 的成功回调和用于得到失败 reason 的回调返回一个 Promise 对象.

### Promise.prototype.catch 方法(onRejected)=>{}

- onRejected 函数：失败的回调函数(reason)=>{}

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

:::tip

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

6. Promise 异常穿透？

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

7. 中断 Promise 链
    - 当使用 Promise 的 then 链式调用时，如果想要在中间中断，不再调用后面的回调函数，可以在回调函数中返回一个 pending 状态的 promise 对象。

    ```js
    let p = new Promise((resolve, reject) => {
        reject('error')
        })

    p.then(value => {
        console.log(111);
        //有且仅有一个方法：在前面返回一个pending状态的promise对象，这样就可以进行中断
        return new Promise(() => {})
    }).then(value => {
        console.log(222);
    }).then(value => {
        console.log(333);
    })
    //这里只打印111便结束了链式调用
    ```
:::

## 手写 Promise 对象

### 准备工作

新建一个 promise.js 文件，并且初始化相关变量函数,捕获异常改变 promise 状态

```js
// promise.js
// 申明构造函数
function Promise(excutor) {
  // 添加属性
  this.PromiseState = "pending";
 this.PromiseResult = null;
  const self = this; //_this that self
  // resolve函数
  function resolve(data) {
    // 1.修改对象的状态
    self.PromiseState = "fullfilled";
    // 2.设置对象的结果值
    self.PromiseResult = data;
  }
  // reject函数
  function reject(data) {
    // 1.修改对象的状态
    self.PromiseState = "rejected";
    // 2.设置对象的结果值
    self.PromiseResult = data;
  }
  //   捕获异常，改变promise状态
  try {
    // 同步调用执行器函数
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 原型上添加then方法
Promise.prototype.then = function (onResolved, onRejected) {};
```

### 支持仅可以改变一次promise状态
    在resolve和reject函数中添加判断，PromiseState是否已经改变
```js
// 不等于pending代表promise状态已经改变过一次，则不进行任何处理直接返回
if(self.PromiseState !== 'pending') return
```

### 完善 then() 方法
    then方法支持接受两个函数形参，并且可以根据PromiseState调用不同的方法
```js
Promise.prototype.then = function (onResolved, onRejected) {
    // 调用回调函数，根据PromiseState的值调用不同的回调函数
    if(this.PromiseState === 'fullfilled'){
        onResolved(this.PromiseResult)//注入promise的结果
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult)
    }
};
```
### 实现异步操作
    在原生的Promise对象中支持以下面的这样方式改变状态后再调用回调函数
```js
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ok')
    },1000)
})
p.then(value=>{
    console.log(value)//OK
})
```
因此我们上面的实现还需要做进一步的完善：这里我们需要对判断promise的状态来处理回调函数，当promise的状态还没有进行改变的时候，在then 方法中我们需要保存回调函数。当promise的状态改变的时候我们就可以根据promise的状态来调用保存的回调函数。

根据上面的描述添加下面的语句：
```js
// promise.js
 // 保存回调函数
  this.callback = {};

  function resolve(data) {
    if (self.callback.onResolved) {
      self.callback.onResolved(data);
    }
  }
  // reject函数
  function reject(data) {
    if (self.callback.onRejected) {
      self.callback.onRejected(data);
    }
  }

Promise.prototype.then = function (onResolved, onRejected) {
  // 保存回调函数
  if (this.PromiseState === "pending")
    this.callback = {
      onResolved,
      onRejected,
    };
};
```

上面的实现只能支持单个的回调函数，多个回调函数会被覆盖掉，因此还需要进行优化

### 支持多个 then() 回调
    这里我们需要对callback的结构进行修改，将所有的then的回调函数都保存在callback中，并且在状态发生改变的时候遍历执行所有的回调。
```js
 this.callbacks = [];
   // resolve函数
  function resolve(data) {
    if (self.callbacks.length > 0) {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    }
  }
  // reject函数
  function reject(data) {
    if (self.callbacks.length > 0) {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    }
  }

  // 原型上添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 保存回调函数
  if (this.PromiseState === "pending")
    this.callbacks.push({
      onResolved,
      onRejected,
    });
};
```
:::tip
完成上面的步骤，promise.js如下：
```js
// 申明构造函数
function Promise(excutor) {
  // 添加属性
  this.PromiseState = "pending";
  this.PromiseResult = null;
  // 保存回调函数
  this.callbacks = [];
  const self = this; //_this that self
  // resolve函数
  function resolve(data) {
    // 判断promise的状态是否已经改变
    if (self.PromiseState !== "pending") return;
    // 1.修改对象的状态
    self.PromiseState = "fullfilled";
    // 2.设置对象的结果值
    self.PromiseResult = data;
    //
    if (self.callbacks.length > 0) {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    }
  }
  // reject函数
  function reject(data) {
    if (self.PromiseState !== "pending") return;
    // 1.修改对象的状态
    self.PromiseState = "rejected";
    // 2.设置对象的结果值
    self.PromiseResult = data;

    if (self.callbacks.length > 0) {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    }
  }
  //   捕获异常，改变promise状态
  try {
    // 同步调用执行器函数
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 原型上添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 调用回调函数，根据PromiseState的值调用不同的回调函数
  if (this.PromiseState === "fullfilled") {
    onResolved(this.PromiseResult);
  }
  if (this.PromiseState === "rejected") {
    onRejected(this.PromiseResult);
  }
  // 保存回调函数
  if (this.PromiseState === "pending")
    this.callbacks.push({
      onResolved,
      onRejected,
    });
};

```
:::

### 实现同步任务 then 返回结果
### 实现 then 链式调用




