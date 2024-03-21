# TypeScript

## keyof

keyof 用于获取`类型`内所有的 key(即所有属性名), 获取的是一个 联合类型.
:::tip
这里类型指：通过 interface 或 type 定义的类型；通过 typeof xxx 返回的类型等。keyof 后面必须是类型，不能是具体的对象.
:::

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}
type T = keyof IPeople;
// 等同于
type T = "name" | "age" | "sex";
```

注意：keyof any

```ts
type TAny = keyof any;
// 等同于
type TAny = string | number | symbol; //不包括 boolean object等
```

## in

in 用于循环类型， 一般循环的是 联合类型，把联合类型中每一个属性名赋值给 P

```ts
// 使用上面的 IPeople 类型
type TObj = {
  [P in keyof IPeople]: any;
};
// 等同于
type TObj = {
  name: any;
  age: any;
  sex: any;
};
```

## typeof

ts 中 typeof 是获取数据的类型，常用用于获取 对象、数组、函数、class、枚举等类型

```ts
const people = {
  name: "liuyz",
  age: 18,
};

type INewPeople = typeof people;
// 等同于
// type INewPeople = {
// name: number
// age: number
// }

const newPeople: INewPeople = {
  name: "zhi",
  age: 18,
};

type TKeys = keyof typeof newPeople;
// 等同于
// type TKeys = "name" | "age"
```

## Record

将 K 中的所有属性值都转换为 T 类型，并返回新的对象类型

```ts
//   源码

type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

- keyof any: 等同于 string | number | symbol,也就是说 K 只能是这三种类型
- P in K: 指循环 K 类型

```ts
type TKeys = "A" | "B" | "C";

interface IPeople {
  name: string;
  age?: number;
  sex: string;
}

type TRecord = Record<TKeys, IPeople>;

// 等同于
type TRecord = {
  B: IPeople;
  C: IPeople;
  A: IPeople;
};
```

## Pick

从 T 类型中选取部分 K 类型，并返回新的类型，这里 T 常用于对象类型

```ts
// 源码
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

keyof T 获取 T 中所有的 key 属性

K extends keyof T K 必须继承于 keyof T ,如果 K 中的属性有不属于 keyof T 的则会报错

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}

type TPick = Pick<IPeople, "name" | "age">;

// 等同于
type TPick = {
  name: string;
  age?: number | undefined;
};
```

:::tip 注意
如果想生成的 TPick 包含自定义属性，则需要在 IPeople 中添加 [key: string]: any

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
  [key: string]: any;
}

type TPick = Pick<IPeople, "name" | "age" | "color">;

等同于;
type TPick = {
  name: string;
  age?: number | undefined;
  color: any;
};
```

类似于

```ts
const getValue = <T extends object, K extends keyof T>(
  obj: T,
  name: K
): T[K] => {
  return obj[name];
};
```

:::

## Partial

将 T 中的所有属性设置为可选

```ts
// 源码
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}
type TPartial = Partial<IPeople>;

// 等同于
type TPartial = {
  name?: string | undefined;
  age?: number | undefined;
  sex?: string | undefined;
};
```

## Required

使 T 中的所有属性都变成必需的

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}
type TRequired = Required<IPeople>;

// 等同于
type TRequired = {
  name: string;
  age: number;
  sex: string;
};
```

## Readonly

将 T 中的所有属性设为只读

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}
type TReadonly = Readonly<IPeople>;

// 等同于
type TReadonly = {
  readonly name: string;
  readonly age?: number | undefined;
  readonly sex: string;
};
```

## Exclude

从 T 中剔除可以赋值给 U 的类型

```ts
type Exclude<T, U> = T extends U ? never : T;
```

当 T 是联合类型时，则会循环 T 类型即： (T1 extends U ? never : T1) ｜ (T2 extends U ? never : T2) | …

```ts
type TExclude1 = Exclude<"a" | "b", "a" | "c">;
// 等同于
type TExclude1 = "b";

type TExclude2 = Exclude<number | string | boolean, string>;
// 等同于
type TExclude2 = number | boolean;
```

## Extract

提取 T 中可以赋值给 U 的类型

```ts
type Extract<T, U> = T extends U ? T : never;
```

当 T 是联合类型时，则会循环 T 类型即： (T1 extends U ? T1 : never ) ｜ (T2 extends U ? T2 : never ) | …

```ts
type TExtract1 = Extract<"a" | "b", "a" | "c">;
// 等同于
type TExtract1 = "a";

type TExtract2 = Extract<number | string | boolean, string>;
// 等同于
type TExtract2 = string;

type TExtract3 = Extract<number | string | boolean, object>;
// 等同于
type TExtract3 = never;
```

## Omit

获取 T 中不包含 K 属性的 新类型

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

- keyof any 等同于 string | number | symbol ，也就是说 K 只能是这三种类型
- keyof T 获取 T 的所有属性
- Exclude 从 T 中剔除可以赋值给 K 的类型
- Pick 从 T 类型中选取部分 K 类型，并返回新的类型，这里 T 常用于对象类型

说明：先通过 Exclued 获取 T 中不包含 K 属性的新类型， 再通过 Pick 获取 T 中包含 K 属性的新类型

```ts
interface IPeople {
  name: string;
  age?: number;
  sex: string;
}

type TOmit = Omit<IPeople, "name" | "sex" | "color">;

// 等同于
type TOmit = {
  age?: number | undefined;
};
```

## NonNullable

去除 null 和 undefined 后的新类型

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

当 T 是联合类型时，则会循环 T 类型即： (T1 extends U ? never : T1) ｜ (T2 extends U ? never : T2) | …

```ts
type TType = number | null | undefined;
type TNonNullable = NonNullable<TType>;
// 等同于
// type TNonNullable = number
```

## typeof 具体使用

### 对象使用

自动生成对象的类型，如果对象上有类型则使用定义的类型

对象上无类型

```ts
const people = {
  name: "liuyz",
  age: 20,
  info: {
    sex: "man",
    hobby: "sleep",
  },
};

type IPeople = typeof people;
// 等同于
// type IPeople = {
// name: string
// age: number
// info: {
// sex: string
// hobby: string
// }
// }

type IPeople = keyof typeof people; // keyof 只会获取数据类型的第一级属性 key
// 等同于
// type IPeople = "name" | "age" | "info"
```

对象上有类型

```ts
type IPeople = {
  name: string | number;
  age: number;
};

const people: IPeople = {
  name: 9527,
  age: 18,
};

type INewPeople = typeof people;
// 等同于
// type INewPeople = IPeople = {
// name: string | number
// age: number
// }

const newPeople: INewPeople = {
  name: "liuyz",
  age: 18,
};
```

### 函数使用

```ts
const add = (a: number, b: number): number => {
  return a + b;
};

type TFunType = typeof add; // 获取函数类型
// 等同于
// type TFunType = (a: number, b: number) => number
type TReturnType = ReturnType<TFunType>; // 获取函数返回值类型
// 等同于
// type TReturnType = number
type TParamsType = Parameters<TFunType>; // 获取函数参数类型，转变为元组类型
// 等同于
// type TParamsType = [a: number, b: number] // 元组类型
```

### 数组使用

```ts
const arr = ["liu", "y", "z"];
type IArr = typeof arr;
// 等同于
// type IArr = string[]

const arr = ["liu", "y", 1];
type IArr = typeof arr;
// 等同于
// type IArr = (string | number)[] // 字符串或数字 数组

type IKey = keyof typeof arr;
// 等同于
// type IKey = keyof string[]
```

注意：数组上使用 keyof typeof arr 是没有意义的

### 枚举使用

```ts
enum EDirection {
  UP = "UP",
  DOWN = "DOWN",
}

type TDirection = typeof EDirection;

const direction: TDirection = {
  UP: EDirection.UP,
  DOWN: EDirection.DOWN,
};

console.log(direction); // { UP: 'UP', DOWN: 'DOWN' }

type TNewDirection = keyof typeof direction;
// 等同于
// type TNewDirection = "UP" | "DOWN"
let newDirection: TNewDirection = "DOWN"; // 这里只能取值 UP 或 DOWN
```

### 基本类型使用

基本类型使用 并没有什么意义

```ts
const bool = true;
type TBool = typeof boolean;
// 等同于
// type TBool = true
let newBool: TBool = true; // 此时 newBool 只能赋值 true，否则报错

const str = "test";
type IStr = typeof str;
// 等同于
// type IStr = "test"
let newStr: IStr = "test"; // 此时 newStr 只能赋值 test，否则报错

const num = 10;
type INum = typeof num;
// 等同于
// type INum = 10
let newNum: INum = 10; // 此时 newNum 只能赋值 10，否则报错
```
