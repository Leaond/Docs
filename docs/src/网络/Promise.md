# Promise

Promise 是 `异步编程` 的一种解决方案，比传统的解决方案 `回调函数和事件` 更加的合理和强大。ES6 将其写进了标准语言，统一了用法，原生提供了 promise 对象。简单来说，promise 就像是一个容器，里面保存着某个未来才会结束的事件的结果。

## 异步编程

异步编程是一种编程范式，旨在`通过优化任务调度和资源利用，提高程序的吞吐量和响应速度`。与传统的同步编程方式相比，异步编程通过非阻塞的方式处理任务，使得一个任务的执行不会阻碍其他任务的进行。

在同步编程中，当一个任务执行时间较长时，整个程序会被阻塞，无法继续执行其他任务，直到该任务完成; 而在异步编程中，任务的执行不会阻塞程序的进行，可以同时处理多个任务，提高了系统的并发性能。

## promise 对象的特点

promise 主要有以下两个特点：

1. promise 对象的状态不受外界影响。promise 对象代表一个异步操作，有 3 种状态：pending(进行中)、fullfilled(已成功)、rejected(已失败)。只有异步操作的结果才能决定当前是哪一种状态，任何其他操作都无法改变这个状态。在 Promise 对象身上我们可以通过 promiseState 看到 Promise 的状态，promiseResult 来得到 Promise 对象得到的结果
2. 一旦状态改变，就不会再发生改变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 `pending变为fullfilled` 和 从 `pending变为rejected`。只要这两种情况发生，状态就凝固了，不会再发生改变，这个时候就称为 resolved (已定型)。

有了 Promise 对象之后，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象还提供了统一的接口，使得控制异步操作更加的容易。

:::tip Promise 缺点
首先，无法取消 Promise，一旦新建他就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反映到外部。其三，当处于 pending 状态时，无法得知当前的状态是刚刚开始还是即将完成。
:::

## Promise 的构造函数：Promise(excutor){ }

Promise 函数接受一个函数 excutor 作为参数，这个 excutor 函数又接收两个函数作为参数：resolve 和 reject。

resolve 函数的作用是，将 Promise 的状态从 pending 变为 fullfilled。在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

reject 函数的作用是，将 Promise 的状态从 pending 变为 rejected。在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

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

## Promise.prototype.then 方法(onResolved,onRejected)=>{}

promise 的实例身上有 then 方法，也就是说，then 方法是定义在原型对象(Promise.prototype)上的。then 方法的作用是为 Promise 实例添加状态改变时的回调函数。then 方法 接收两个`可选参数`：第一个是 resolved 状态的回调函数，第二个是 rejected 状态的回调函数.

then() 方法返回的是一个新的 Promise 实例，因此我们可以采用链式调用的方式。

```js
getJSON("/posts.json")
  .then(function (json) {
    return json.post;
  })
  .then(function (post) {
    // ...
  });
// 依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
```

## Promise.prototype.catch 方法(onRejected)=>{}

Promise 的实力身上还有一个 catch() 方法，他也是定义在 Promise 的原型上的。可以将 catch()方法理解为：`.then(null, rejection)`或`.then(undefined, rejection)`的别名。catch()方法是专门用来捕获错误的。

```js
getJSON("/posts.json")
  .then(function (posts) {
    // ...
  })
  .catch(function (error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log("发生错误！", error);
  });
```

上面的 getJSON()方法会返回一个 Promise 对象，如果该对象的状态变为 resolved，则会调用 then() 方法指定的回调函数，如果异步操作抛出错误，那么状态就会变为 rejected，就会调用 catch() 方法指定的回调函数，处理这个错误。此外，then() 方法指定的回调函数，如果运行中抛出错误也会被 catch() 方法捕获。

Promise 对象的错误具有`冒泡`性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

一般来说，不要在 then()方法里面定义 Reject 状态的回调函数（即 then 的第二个参数），而是总是使用 catch 方法。

跟传统的 try/catch 代码块不同的是，如果没有使用 catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```js
const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function () {
  console.log("everything is great");
});

setTimeout(() => {
  console.log(123);
}, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

上面代码中，someAsyncThing()函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示 "ReferenceError: x is not defined"，但是不会退出进程、终止脚本执行，2 秒之后还是会输出 123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

```js
// 不推荐
promise.then(
  function (data) {
    // success
  },
  function (err) {
    // error
  }
);

// 推荐写法
promise
  .then(function (data) {
    //cb
    // success
  })
  .catch(function (err) {
    // error
  });
```

一般总是建议，Promise 对象后面要跟 catch()方法，这样可以处理 Promise 内部发生的错误。catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then()方法。

## Promise.prototype.finally()

finally()方法用于指定不管 promise 最后的状态如何，都会执行的操作。finally()方法不接收任何的参数，这也就意味着，finally 方法中我们无法获取到最后的 promise 的状态。这也表明，finally 里面的操作是不依赖于 promise 的最终状态的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

## Promise.resolve()方法：(value)=>{}

Promise.resolve()方法可以将接收的参数转成 Promise 对象。

Promise.resolve()等价于下面的写法。

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

Promise.resolve()接收的参数分成 4 种情况：

1. 参数是 Promise 实例。接收的参数是 Promise 实例的时候，Promise.resolve()将不做任何修改，原封不动的返回这个实例。
2. 参数是 thnable 对象。Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then()方法.
   `thenable对象指的是具有then方法的对象`

```js
let thenable = {
  then: function (resolve, reject) {
    resolve(42);
  },
};
```

下面代码中，thenable 对象的 then()方法执行后，对象 p1 的状态就变为 resolved，从而立即执行最后那个 then()方法指定的回调函数，输出 42。

```js
let thenable = {
  then: function (resolve, reject) {
    resolve(42);
  },
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value); // 42
});
```

3. 参数不具有 then()方法的对象，或者不是对象。Promise.resolve()方法会返回一个新的 Promise 对象，状态为 fullfilled，结果是这个参数值。
4. 不带有任何的参数。当 resolve()方法不带有任何的参数的时候，会直接返回一个 resolved 状态的 Promise 对象，结果是 undefined。

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

:::tip 注意
立即 resolved()的 Promise 对象，是在本轮事件循环的结束的时候执行，而不是在下一轮事件循环开始的时候执行。

```js
setTimeout(function () {
  console.log("three");
}, 0);

Promise.resolve().then(function () {
  console.log("two");
});

console.log("one");

// one
// two
// three
```

上面的代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
:::

## Promise.reject()方法：(reason)=>{}

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
```

## Promise.all()方法：(promises)=>{}

promise.all() 方法用于将多个 promise 实例包装成一个`新的 promise 实例`。参数 promises 是一个包含 n 个 promise 实例 的数组,如果参数中有不是 promise 实例对象的数据，那么就会调用 promise.resolve() 转成 promise 对象 再调用 all 方法。promise.all() 方法返回一个新的 promise 对象，只有参数中所有的 promise 的结果都成功，all()方法返回的 promise 对象才成功，只要有一个失败了那么 all()方法就直接失败。

```js
let p1 = new Promise((resolve, reject) => {
  resolve("ok");
});
let p2 = new Promise((resolve, reject) => {
  resolve("ok");
});
let p3 = new Promise((resolve, reject) => {
  resolve("error");
});
// p1,p2,p3都是promise实例对象
let result = Promise.all([p1, p2, p3]);
// 当all方法中有非promise对象的情况
let result1 = Promise.all([2, 1]);
```

promise.all() 方法返回的是一个 promise 对象，所以我们可以用 then()方法和 catch()方法来进行处理. 但是，如果 all()方法参数里面的 promise 实例自己身上定义了 catch()方法来捕获错误，那么 Promise.all()后面的 catch()方法就不会被执行。

```js
const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then((result) => result)
  .catch((e) => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error("报错了");
})
  .then((result) => result)
  .catch((e) => e);

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
// ["hello", Error: 报错了]
```

## Promise.race()方法：(promises)=>{}

Promise.race()方法接受的参数跟 Promise.all() 方法接收的参数是一样的。但是 Promise.race()方法执行的结果不一样：Promise.race()的结果和状态由参数里面 第一个 改变状态的 Promise 结果和状态来决定，如果不是 Promise 实例，就会先调用到 Promise.resolve() 方法，将参数转成 Promise 实例，再做进一步的处理。

```js
// 1. 参数都是Promise实例的情况
let p1 = new Promise((resolve, reject) => {
  resolve("ok");
});
let p2 = new Promise((resolve, reject) => {
  resolve("ok");
});
let p3 = new Promise((resolve, reject) => {
  resolve("error");
});
let result = Promise.race([p1, p2, p3]);
console.log("***result*****", result);
// 2.参数不是Promise实例的情况：先调用Promise.resolve()将参数转成promise实例
let result1 = Promise.race([1]);
console.log("=====>>> ", result1);
```

## Promise.any()方法：(promises)=>{}

Promise.any()接收的参数跟 Promise.any()和 Promise.any()参数也是一样的，也会将参数包装成一个新的 Promise 实例返回，只要有一个实例的状态变为 fullfilled，那么包装的实例结果就是 fullfilled，如果所有的参数实例都是 rejected，那么包装的实例结果就是 rejected。

ES2021 新增

:::tip 注意

1.  当一个 Promise 指定多个成功、失败回调函数时，只要 Promise 发生改变，则对应状态的回调函数都会调用。
    ```js
    let p1 = Promise.resolve('ok')
    p1.then(value=>{console.log(1)})
    p1.then(value=>{console.log(2)})
    p1.then(value=>{console.log(3)})
    ······
    //依次打印1,2,3...
    ```
2.  改变 Promise 状态和 指定回调函数 谁先谁后？

    - 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
      如何先改变状态再指定回调
    - 在执行器中直接调用 resolve、reject
    - 延迟更长时间才调用 then()
      什么时候才能得到数据？
    - 如果先指定的回调，那么当状态发生改变时，回调函数就会调用，得到数据
    - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

3.  Promise.then()返回的新 Promise 的结果状态是由 then()指定的回调函数执行的结果决定.

- then()方法中抛出错误。then()返回的状态是 reject。
- 返回结果是非 Promise 类型的对象。then()返回的状态是 resolve。
- 返回结果是 Promise 对象。then()返回的状态由这个 Promise 对象的结果决定。

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

4.  Promise 如果串联多个操作任务？

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

5.  Promise 异常穿透？

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

6.  中断 Promise 链

当使用 Promise 的 then 链式调用时，如果想要在中间中断，不再调用后面的回调函数，可以在回调函数中返回一个 pending 状态的 promise 对象。

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
