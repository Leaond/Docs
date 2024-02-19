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
