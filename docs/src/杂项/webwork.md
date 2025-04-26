# Web Worker 详解与使用指南

Web Worker 是浏览器提供的 JavaScript 多线程解决方案，允许在主线程之外运行脚本，执行耗时操作而不会阻塞用户界面。

## 一、Web Worker 是什么？

### 核心概念

- **独立的线程**：在后台线程中运行，与主线程并行执行
- **不阻塞 UI**：复杂计算不会导致页面卡顿
- **受限环境**：无法直接访问 DOM/BOM API
- **通信机制**：通过 postMessage 和 onmessage 与主线程通信

### 类型对比

| 类型                 | 作用域       | 生命周期               | 适用场景      |
| -------------------- | ------------ | ---------------------- | ------------- |
| **Dedicated Worker** | 单个页面     | 随页面关闭             | 页面专属任务  |
| **Shared Worker**    | 同源多页面   | 所有关联页面关闭后终止 | 多标签页共享  |
| **Service Worker**   | 同源所有页面 | 可独立于页面存在       | 离线缓存/推送 |

## 二、基本使用方式

### 1. 创建专用 Worker (Dedicated Worker)

**主线程代码**：

```javascript
// 创建Worker并指定脚本文件
const worker = new Worker("worker.js");

// 发送数据给Worker
worker.postMessage({ command: "calculate", data: 1000 });

// 接收Worker消息
worker.onmessage = (event) => {
  console.log("Result:", event.data);
};

// 错误处理
worker.onerror = (error) => {
  console.error("Worker error:", error);
};
```

**worker.js**：

```javascript
// 监听主线程消息
self.onmessage = (event) => {
  if (event.data.command === "calculate") {
    // 执行耗时计算
    const result = heavyCalculation(event.data.data);

    // 返回结果给主线程
    self.postMessage(result);
  }
};

function heavyCalculation(n) {
  // 模拟复杂计算
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum += i * j;
    }
  }
  return sum;
}
```

### 2. 终止 Worker

```javascript
// 主线程中终止
worker.terminate();

// Worker内部自终止
self.close();
```

## 三、高级用法

### 1. 动态创建 Worker

```javascript
// 将代码转为Blob URL
const workerCode = `
  self.onmessage = (e) => {
    postMessage('Echo: ' + e.data);
  };
`;
const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.postMessage("Hello");
worker.onmessage = (e) => console.log(e.data); // "Echo: Hello"
```

### 2. 使用 ES Modules (现代浏览器)

**主线程**：

```javascript
const worker = new Worker("worker.js", {
  type: "module",
});
```

**worker.js**：

```javascript
import { calculate } from "./math.js";

self.onmessage = (e) => {
  postMessage(calculate(e.data));
};
```

### 3. 错误处理增强

```javascript
worker.onerror = (error) => {
  console.error(`
    Error in worker: ${error.filename}
    Line: ${error.lineno}
    Message: ${error.message}
  `);
  // 可考虑重启Worker
};
```

## 四、使用场景示例

### 1. 图像处理

```javascript
// worker.js
self.onmessage = (e) => {
  const { imageData, width, height } = e.data;
  // 执行图像滤镜处理
  const processed = applyFilter(imageData, width, height);
  postMessage(processed, [processed.data.buffer]); // 转移所有权
};
```

### 2. 大数据分析

```javascript
// 主线程
worker.postMessage(largeDataset);

// worker.js
self.onmessage = (e) => {
  const results = analyzeData(e.data); // 耗时分析
  postMessage(results);
};
```

### 3. 实时数据处理

```javascript
// 建立持续通信
setInterval(() => {
  worker.postMessage(getSensorData());
}, 100);

worker.onmessage = (e) => {
  updateDashboard(e.data);
};
```

## 五、注意事项

1. **通信成本**：频繁大数据量传输会影响性能

   - 解决方案：使用 Transferable Objects

   ```javascript
   // 转移ArrayBuffer所有权（零拷贝）
   postMessage(buffer, [buffer]);
   ```

2. **功能限制**：

   - 无法访问：DOM、window、document、parent
   - 可用 API：WebSockets、IndexedDB、fetch 等

3. **兼容性处理**：

   ```javascript
   if (window.Worker) {
     // 支持Worker
   } else {
     // 降级方案
   }
   ```

4. **调试技巧**：
   - Chrome DevTools → Sources → Worker 调试
   - console.log 在 Worker 内部同样可用

## 六、完整示例：素数计算

**index.html**：

```html
<input type="number" id="limit" value="1000000" />
<button id="calculate">计算素数</button>
<div id="result"></div>

<script>
  const worker = new Worker("prime-worker.js");

  document.getElementById("calculate").addEventListener("click", () => {
    const limit = parseInt(document.getElementById("limit").value);
    worker.postMessage(limit);
  });

  worker.onmessage = (e) => {
    document.getElementById(
      "result"
    ).textContent = `找到 ${e.data.count} 个素数，最后一个为 ${e.data.lastPrime}`;
  };
</script>
```

**prime-worker.js**：

```javascript
function findPrimes(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return {
    count: primes.length,
    lastPrime: primes[primes.length - 1],
  };
}

self.onmessage = (e) => {
  const result = findPrimes(e.data);
  self.postMessage(result);
};
```

Web Worker 为前端开发带来了真正的多线程能力，合理使用可以显著提升复杂应用的性能和用户体验。
