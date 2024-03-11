# 手写 Promise 对象

这里记录一下自己 diy 封装 promise 对象。

## 初始化 promise.js

新建一个 promise.js 文件，并且初始化相关变量、函数。

```js
// promise.js
// 申明构造函数
function Promise(excutor) {
  // 添加属性
  this.PromiseState = "pending"; //promise当前的状态
  this.PromiseResult = null; //promise的结果
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

// 原型上添加then()方法
Promise.prototype.then = function (onResolved, onRejected) {};
```

## 完成仅可以改变一次 promise 状态

    在resolve和reject函数中添加判断，PromiseState是否已经改变

```js
// 不等于pending代表promise状态已经改变过一次，则不进行任何处理直接返回
if (self.PromiseState !== "pending") return;
```

## 完善 then() 方法

then()方法支持接受两个函数形参，并且可以根据 PromiseState 调用不同的方法

```js
Promise.prototype.then = function (onResolved, onRejected) {
  // 调用回调函数，根据PromiseState的值调用不同的回调函数
  if (this.PromiseState === "fullfilled") {
    onResolved(this.PromiseResult); //注入promise的结果
  }
  if (this.PromiseState === "rejected") {
    onRejected(this.PromiseResult);
  }
};
```

## 实现异步操作

在原生的 Promise 对象中支持以下面的这样方式改变状态后再调用回调函数

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1000);
});
p.then((value) => {
  console.log(value); //OK
});
```

因此我们上面的实现还需要做进一步的完善：这里我们需要对判断 promise 的状态来处理回调函数，当 promise 的状态还没有进行改变的时候，在 then 方法中我们需要保存回调函数。当 promise 的状态改变的时候我们就可以根据 promise 的状态来调用保存的回调函数。

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

上面的实现只能支持单个的回调函数，多个回调函数会被覆盖掉，因此还需要进行优化.

## 支持多个 then() 回调

这里我们需要对 callback 的结构进行修改，将所有的 then 的回调函数都保存在 callback 中，并且在状态发生改变的时候遍历执行所有的回调。

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
完成上面的步骤，promise.js 如下：

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

## 实现同步任务 then() 返回结果

下面我们来实现同步任务下 Promise.then()返回结果。then 方法返回一个 Promise 对象，这个对象的状态由 then 方法中参数的 return 的值来决定：如果返回的是一个 Promise 对象，那么 then 方法返回的状态就由 then 里面的这个 Promise 对象的状态决定；如果返回的是一个非 Promise 值，则 then 方法返回的 Promise 的状态就变为 fullfilled，返回的结果就是这个 return 值,如果没有返回值，那么 then 方法返回的 result 就是 undefined。同时，当 then 方法中抛出错误的时候(throw Error)，then()方法返回的 Promise 的状态应该变为 reject，返回的结果应该是抛出错误的值。
具体实现：

```js
Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    // 调用回调函数，根据PromiseState的值调用不同的回调函数
    if (this.PromiseState === "fullfilled") {
      try {
        let result = onResolved(this.PromiseResult);
        // 判断返回结果是否是promise实例
        if (result instanceof Promise) {
          // 是Promise实例，则结果的状态由promise实例的转改决定
          result.then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          // 非 Promise实例，则结果的状态应为 成功
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
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
  });
};
```

## 实现异步任务 then() 返回结果

在上面我们实现了同步状态下 then 的返回结果，当 Promise 中有异步任务的时候，这个时候我们就需要先保存 then 的回调函数，当 Promise 的状态发生改变的时候再去调用 then 的回调函数。

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('OK!!!')
    reject("Error!!");
  }, 1000);
});
// console.log("********",p1);
let res = p1.then(
  (value) => {
    console.log("********", 111);
    return "oh yeah!";
  },
  (reason) => {
    console.warn(222);
    // return 'oh No!'
    throw "throw Error!";
  }
);
console.log("****res****", res);
```

then 方法的改造

```js
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  return new Promise((resolve, reject) => {
    // 调用回调函数，根据PromiseState的值调用不同的回调函数
    if (this.PromiseState === "fullfilled") {
      try {
        let result = onResolved(this.PromiseResult);
        // 判断返回结果是否是promise实例
        if (result instanceof Promise) {
          // 是Promise实例，则结果的状态由promise实例的转改决定
          result.then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          // 非 Promise实例，则结果的状态应为 成功
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    if (this.PromiseState === "rejected") {
      onRejected(this.PromiseResult);
    }
    // 保存回调函数
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          try {
            let result = onResolved(self.PromiseResult);
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v);
                },
                (r) => {
                  reject(r);
                }
              );
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        },
        onRejected: function () {
          try {
            let result = onRejected(self.PromiseResult);
            if (result instanceof Promise) {
              result.then(
                (v) => {
                  resolve(v);
                },
                (r) => {
                  reject(r);
                }
              );
            } else {
              reject(result);
            }
          } catch (error) {
            reject(error);
          }
        },
      });
    }
  });
};
```

## then() 方法中 rejected 状态的补充

上面的 then 方法只处理了 fullfilled 和 pending 状态下的情况，当怕 Promise 的状态变为 reject 的时候就会出现问题。

```js
let p1 = new Promise((resolve, reject) => {
  reject("Error!!");
});
let res = p1.then(
  (value) => {
    console.log("********", 111);
  },
  (reason) => {
    console.log("********", 222);
  }
);
console.log("****res****", res);
```

上面的 p1 同步任务变为 reject 状态，因此 then 方法执行第二个回调函数，但是失败的回调函数中并没有返回任何的值，因此这个 res 打印的结果会一直是 pending 状态。 所以我们同样参照之前的方式需要给 reject 状态加上返回处理

## 封装回调

经过上面的步骤，我们的 then() 方法已经逐渐完善，但是在 then 方法中的 3 个状态里面，我们写了很多的重复的代码：只有里面的回调方法不一样，所以我们将进行封装一个 callback 函数来简化代码

```js
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  return new Promise((resolve, reject) => {
    // type为回调函数类型
    function callback(type) {
      try {
        let result = type(self.PromiseResult);
        // 判断返回结果是否是promise实例
        if (result instanceof Promise) {
          // 是Promise实例，则结果的状态由promise实例的转改决定
          result.then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          // 非 Promise实例，则结果的状态应为 成功
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    // 调用回调函数，根据PromiseState的值调用不同的回调函数
    if (this.PromiseState === "fullfilled") {
      callback(onResolved);
    }
    if (this.PromiseState === "rejected") {
      callback(onRejected);
    }
    // 保存回调函数
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};
```

## catch 方法与异常穿透

原生的 Promise 中还有 catch 方法，因此我们还需要定义 catch 方法用来捕获异常

```js
// 添加catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
```

原生的 then 方法中的两个参数是可以不传的，所以我们还需要再我们自己的 then 方法中去判断是否有参数:如果有就执行后面的代码；如果没有参数，那么我们就需要定义默认的相关的参数，保证程序能正常的执行。

```js
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  // 判断回调函数参数
  if (typeof onRejected !== "function") {
    onRejected = (reson) => {
      throw reason;
    };
  }
  if (typeof onResolved !== "function") {
    onResolved = (v) => {
      return v;
    };
  }
};
```

## Promise 的 API 的封装

### Promise.resolve()

```js
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};
```

### Promise.reject()

```js
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
```

### Promise.all()

```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let array = [];
    // 遍历所有的promise
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          count++;
          // array.push(v);//使用push不能保证顺序一致
          // 采用下标的方式赋值
          array[i] = v;
          if (count == promises.length) {
            resolve(array);
          }
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
```

### Promise.race()

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 遍历所有的promise
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          resolve(v);
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
```

## 回调函数异步执行
在回调函数中加个定时器0s后执行

## class 版本
  完成上面的步骤，Promise对象的封装已经基本完成了。下面我们将进封装的Promise对象完善为class版本。
