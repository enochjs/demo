/**
 * Make all properties in T optional
 * 设置所有属性 optional
 */
type IPartial<T> = {
  [p in keyof T]?: T[p]; 
}

/**
 * 设置所有属性 required
* Make all properties in T required
*/
type IRequired<T> = {
  [p in keyof T]: T[p]; 
}

/**
* Make all properties in T readonly
*/
type IReadonly<T> = {
  readonly [p in keyof T]: T[p]
}

/**
* From T, pick a set of properties whose keys are in the union K
*/
type IPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
* Construct a type with a set of properties K of type T
* 复制 K 中的属性，为T
*/
type IRecord<K extends keyof any, T> = {
  [P in K]: T
}

/**
* Exclude from T those types that are assignable to U
*/
type IExclude<T, U> = T extends U ? never : T;

let aaa = {
  a: 1,
  b: 2,
  c: 3
}

let bbb = {
  a: 1
}


/**
* Extract from T those types that are assignable to U
*/
// type Extract

/**
* Construct a type with the properties of T except for those in type K.
*/
type IOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

/**
* Exclude null and undefined from T
*/
type INonNullable<T> = T extends null | undefined ? never : T;

/**
* Obtain the parameters of a function type in a tuple
*/
type IParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;



/**
* Obtain the parameters of a constructor function type in a tuple
*/
type IConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

/**
* Obtain the return type of a function type
*/
type IReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
* Obtain the return type of a constructor function type
*/
type IInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

// ============= start ===================//
interface Square {
  width: number,
  height: number,
}


type RecordIpersion = Record<Exclude<keyof Square, 'width'>, undefined>

type PartialRecordSquare = Partial<Record<Exclude<keyof Square, 'width'>, undefined>>

type RequiredOnly = Required<Pick<Square, 'width'>>

// 有且只有一个
type RequireOnlyOne<T, keys extends keyof T = keyof T> = {
  [K in keys]: Required<Pick<T, K>> & Partial<Record<Exclude<keyof Square, K>, undefined>>
}[keys]

let t: RequireOnlyOne<Square> = {
  width: 1,
}
// ============= end ===============//

