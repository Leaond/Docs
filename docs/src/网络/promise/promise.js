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
  let self = this;
  // 判断回调函数参数
  if(typeof onRejected !== 'function'){
    onRejected = reson=>{
      throw reason
    }
  }
  if(typeof onResolved !== 'function'){
    onResolved = v=>{
      return v
    }
  }
  return new Promise((resolve, reject) => {
    // type为回调函数类型
    function callback(type){
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
      callback(onResolved)
      // try {
      //   let result = onResolved(this.PromiseResult);
      //   // 判断返回结果是否是promise实例
      //   if (result instanceof Promise) {
      //     // 是Promise实例，则结果的状态由promise实例的转改决定
      //     result.then(
      //       (value) => {
      //         resolve(value);
      //       },
      //       (reason) => {
      //         reject(reason);
      //       }
      //     );
      //   } else {
      //     // 非 Promise实例，则结果的状态应为 成功
      //     resolve(result);
      //   }
      // } catch (e) {
      //   reject(e);
      // }
    }
    if (this.PromiseState === "rejected") {
      callback(onRejected)
      // try {
      //   let result = onRejected(this.PromiseResult);
      // if (result instanceof Promise) {
      //   result.then(
      //     (v) => {
      //       resolve(v);
      //     },
      //     (r) => {
      //       reject(r);
      //     }
      //   );
      // } else {
      //   resolve(result);
      // }
      // } catch (error) {
      //   reject(error)
      // }
      
    }
    // 保存回调函数
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
          // try {
          //   let result = onResolved(self.PromiseResult);
          //   if (result instanceof Promise) {
          //     result.then(
          //       (v) => {
          //         resolve(v);
          //       },
          //       (r) => {
          //         reject(r);
          //       }
          //     );
          //   } else {
          //     resolve(result);
          //   }
          // } catch (error) {
          //   reject(error);
          // }
        },
        onRejected: function () {
          callback(onRejected)
          // try {
          //   let result = onRejected(self.PromiseResult);
          //   if (result instanceof Promise) {
          //     result.then(
          //       (v) => {
          //         resolve(v);
          //       },
          //       (r) => {
          //         reject(r);
          //       }
          //     );
          //   } else {
          //     reject(result);
          //   }
          // } catch (error) {
          //   reject(error);
          // }
        },
      });
    }
  });
};

// 添加catch方法
Promise.prototype.catch = function (onRejected){
  return this.then(undefined,onRejected)
}

// 添加resolve方法
Promise.resolve = function (data){
  return new Promise(v=>{
    resolve.then(()=>{
      resolve(data)
    })
  })
}
