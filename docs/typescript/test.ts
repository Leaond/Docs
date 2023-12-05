type Test = {
    a?: 1;
    b?: 2;
  }
  type MyRequired<T> = {
    [P in keyof T]-?: T[P]
  }
  
  /**
   type Test1 = {
      a: 1;
      b: 2;
    }
   */
  type Test1 = MyRequired<Test>; 