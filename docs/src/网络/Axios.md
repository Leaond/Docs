# Axios

## Axios 的特点

- 可以在浏览器中发送 XMLHttpRequest 请求
- 可以在 nodejs 中发送请求
- 支持 Promise API
- 请求和响应拦截器
- 取消请求
- 帮助我们对请求和响应数据进行转换
- 自动转换 json 数据
- ···

## 搭建服务器： json-server

json-server 是 github 上一个开源的服务端的 库，按照官方教程只需要简单的 3 步即可搭建一个服务器，后面我们将使用这个服务器作为我们 axios 请求的服务器。

### 安装以及使用

1. 安装

```js
npm install json-server
```

2. 创建一个 db.json 文件，用来存放数据

```json
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

3. 启动服务器

```js
json-server --watch db.json
```

4. 使用启动的服务器地址作为请求地址即可

```js
// 获取公告息
http://localhost:3000/posts

// 获取评论信息
http://localhost:3000/comments

// 获取作者信息
http://localhost:3000/profile
```

:::tip 基本使用

- GET /posts 获取所有的公告信息
- GET /posts/:id 根据 ID 查询公告信息
- POST /posts 添加公告
- PUT /posts/:id 更新公告
- PATCH /posts/:id 更新公告
- DELETE /posts/:id 根据 ID 删除公告
  :::

## Axios 的安装和引入

安装

::: code-group

```npm
npm install axios
```

```yarn
yarn add axios
```

```bower
bower install axios
```

:::

使用

```js
// 按需引入
import axios, { isCancel, AxiosError } from "axios";

// 默认引入
import axios from "axios";
console.log(axios.isCancel("something"));

// CDN方式引入
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>;
```

## Axios API 的使用

    为了方便使用，axios对常见的http请求方式都进行了封装。

```js
axios.request(config);
axios.get(url, config);
axios.delete(url, config);
axios.head(url, config);
axios.options(url, config);
axios.post(url, data, config);
axios.put(url, data, config);
axios.patch(url, data, config);
```

例子

```js
// axios.request
axios.request({
  method: "post",
  url: "http://localhost:3000/posts",
  data: {
    title: "测试",
    views: 100,
  },
});
// axios.post
axios.post(
  "http://localhost:3000/posts",
  {
    title: "测试axios.post()",
    views: 100,
  },
  {
    // 这里是配置对象
  }
);
```

:::tip
当使用了方法别名之后，我们就不需要再在配置对象中设置 url、data 和 method 了。
:::

## axios 实例对象

同时我们也可以手动去创建 axios 实例对象以获取更多的自定义设置。

```js
const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
```

## axios 响应架构

```js
{
  // data是服务器提供的响应数据
  data: {},

  // status是服务器响应的http状态码
  status: 200,

  // status是服务器响应的http状态文本
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lowercase and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config`是对axios的request的配置
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

## axios 的配置对象

下面是一些常见的 axios 配置。更详细的配置参考[文档](https://github.com/axios/axios?tab=readme-ov-file)

```js
{
  // 请求的服务器地址
  url: '/user',

  // `method` 发起请求的方式
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional config that allows you to customize serializing `params`.
  paramsSerializer: {

    //Custom encoder function which sends key/value pairs in an iterative fashion.
    encode?: (param: string): string => { /* Do custom operations here and return transformed string */ },

    // Custom serializer function for the entire parameter. Allows user to mimic pre 1.x behaviour.
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ),

    //Configuration for formatting array indexes in the params.
    indexes: false // Three available options: (1) indexes: null (leads to no brackets), (2) (default) indexes: false (leads to empty brackets), (3) indexes: true (leads to brackets with indexes).
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer, FormData (form-data package)
  data: {
    firstName: 'Fred'
  },

  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  // options are: 'ascii', 'ASCII', 'ansi', 'ANSI', 'binary', 'BINARY', 'base64', 'BASE64', 'base64url',
  // 'BASE64URL', 'hex', 'HEX', 'latin1', 'LATIN1', 'ucs-2', 'UCS-2', 'ucs2', 'UCS2', 'utf-8', 'UTF-8',
  // 'utf8', 'UTF8', 'utf16le', 'UTF16LE'
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `undefined` (default) - set XSRF header only for the same origin requests
  withXSRFToken: boolean | undefined | ((config: InternalAxiosRequestConfig) => boolean | undefined),

  // `onUploadProgress` allows handling of progress events for uploads
  // browser & node.js
  onUploadProgress: function ({loaded, total, progress, bytes, estimated, rate, upload = true}) {
    // Do whatever you want with the Axios progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  // browser & node.js
  onDownloadProgress: function ({loaded, total, progress, bytes, estimated, rate, download = true}) {
    // Do whatever you want with the Axios progress event
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
  maxContentLength: 2000,

  // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
  maxBodyLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 21, // default

  // `beforeRedirect` defines a function that will be called before redirect.
  // Use this to adjust the request options upon redirecting,
  // to inspect the latest response headers,
  // or to cancel the request by throwing an error
  // If maxRedirects is set to 0, `beforeRedirect` is not used.
  beforeRedirect: (options, { headers }) => {
    if (options.hostname === "example.com") {
      options.auth = "user:password";
    }
  },

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `transport` determines the transport method that will be used to make the request. If defined, it will be used. Otherwise, if `maxRedirects` is 0, the default `http` or `https` library will be used, depending on the protocol specified in `protocol`. Otherwise, the `httpFollow` or `httpsFollow` library will be used, again depending on the protocol, which can handle redirects.
  transport: undefined, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` defines the hostname, port, and protocol of the proxy server.
  // You can also define your proxy using the conventional `http_proxy` and
  // `https_proxy` environment variables. If you are using environment variables
  // for your proxy configuration, you can also define a `no_proxy` environment
  // variable as a comma-separated list of domains that should not be proxied.
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // If the proxy server uses HTTPS, then you must set the protocol to `https`.
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  }),

  // an alternative way to cancel Axios requests using AbortController
  signal: new AbortController().signal,

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true, // default

  // `insecureHTTPParser` boolean.
  // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
  // This may allow interoperability with non-conformant HTTP implementations.
  // Using the insecure parser should be avoided.
  // see options https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback
  // see also https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/#strict-http-header-parsing-none
  insecureHTTPParser: undefined, // default

  // transitional options for backward compatibility that may be removed in the newer versions
  transitional: {
    // silent JSON parsing mode
    // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
    // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true,

    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  },

  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: window?.FormData || global?.FormData
  },

  formSerializer: {
      visitor: (value, key, path, helpers) => {}; // custom visitor function to serialize form values
      dots: boolean; // use dots instead of brackets format
      metaTokens: boolean; // keep special endings like {} in parameter key
      indexes: boolean; // array indexes format null - no brackets, false - empty brackets, true - brackets with indexes
  },

  // http adapter only (node.js)
  maxRate: [
    100 * 1024, // 100KB/s upload limit,
    100 * 1024  // 100KB/s download limit
  ]
}
```

## axios 的默认配置

对于请求中的重复配置，我们可以使用默认配置的方式减少代码的重复性。

全局 axios 默认值

```js
axios.defaults.baseURL = "https://api.example.com";

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

自定义实例默认值

```js
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://api.example.com",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

:::tip 配置的优先级顺序

Config 将按优先顺序合并。顺序是在 lib/defaults.js 中找到的库默认值，然后是 defaults 实例的属性，最后 config 是请求的参数。后者将优先于前者。下面是一个示例。

```js
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get("/longRequest", {
  timeout: 5000,
});
```

:::

## 拦截器 Interceptors

拦截器允许我们在发送请求之前和接收响应之后对请求进行拦截。拦截器的本质就是函数：`请求拦截器`和`响应拦截器`。

```js
axios.interceptors = {
  request,
  response,
};
```

```js
// 请求拦截器：请求拦截器会在发送请求之前执行，可以用于修改请求的配置或添加一些公共的请求头
axios.interceptors.request.use(
  function (config) {
    // 可以在发送请求之前进行相关的配置
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器：响应拦截器会在接收响应后执行，可以用于对响应进行处理或者错误处理
axios.interceptors.response.use(
  function (response) {
    // 任何位于2xx范围内的状态代码都会触发此函数
    // 对响应数据进行一些处理
    return response;
  },
  function (error) {
    // 任何不在2xx范围内的状态代码都会触发此函数
    // 对响应错误进行一些处理
    return Promise.reject(error);
  }
);
```

:::tip 多个拦截器的执行顺序

请求拦截器是逆序执行的，响应拦截器是顺序执行的。

```js
// 请求拦截器
axios.interceptors.request.use(function (config) {
  console.log("❥❥❥❥", 111);
  return config;
});
axios.interceptors.request.use(function (config) {
  console.log("❥❥❥❥", 222);
  return config;
});
axios.interceptors.request.use(function (config) {
  console.log("❥❥❥❥", 333);
  return config;
});
//    响应拦截器
axios.interceptors.response.use(function (response) {
  console.log("❥❥❥❥", 444);
  return response;
});
axios.interceptors.response.use(function (response) {
  console.log("❥❥❥❥", 555);
  return response;
});
axios.interceptors.response.use(function (response) {
  console.log("❥❥❥❥", 666);
  return response;
});
```

上面的打印结果是：333,222,111,444,555,666
:::

## 错误类型 Error Types

常见的错误类型结构
| 属性 | 定义 |
| :--------------------------: | :---------------------------------: |
| message | 错误消息以及失败状态的摘要 |
| name | 错误的来源，对于 axios 来说他始终是"AxiosError" |
| stack | 提供错误的堆栈跟踪 |
| config | 一个 axios 配置对象 |
| code | 表示 axios 的错误码 |
| status | HTTP 响应状态码 |

更多关于 http 状态码的含义[参考](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

常见的错误类别
| 属性 | 定义 |
| :--------------------------: | :---------------------------------: |
| ERR_BAD_OPTION_VALUE | axios 配置对象有非法或者不支持的值 |
| ERR_BAD_OPTION | axios 配置对象中有非法属性 |
| ECONNABORTED | 超出了 axios 配置中的超时，请求超时 |
| ETIMEDOUT | 超出了 axios 默认时间限制，请求超时 |
| ERR_NETWORK | 网络出现问题 |
| ERR_FR_TOO_MANY_REDIRECTS | 请求重定向过多，超过了 aixos 的配置最大的数目 |
| ERR_DEPRECATED | axios 已经废弃的功能或者方法 |
| ERR_BAD_RESPONSE | 无法正确解析响应结果或者响应中有意外的格式 |
| ERR_BAD_REQUEST | request 参数中有意外的格式或缺少必要的参数 |
| ERR_CANCELED | 功能或方法由用户显示取消 |
| ERR_NOT_SUPPORT | 当前环境中的 axios 不支持的方法或功能 |
| ERR_INVALID_URL | 为 axios 提供无效的 url |

## axios 取消请求

axios 提供了两种方式取消请求：AbortController(v0.22.0 以上支持)和 CancelToken(v0.22.0 之后已经废弃)。

### AbortController

```js
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then(function (response) {
    //...
  });
// cancel the request
controller.abort();
```

### CancelToken(已废弃,不建议在新项目中使用)

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
```
