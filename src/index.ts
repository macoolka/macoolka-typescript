/**
 * Common Type
 * @deszh
 * 常用的类型
 * @file
 * @since 0.2.0
 */

/**
 * @ignore
 */
export type Compact<A> = { [K in keyof A]: A[K] }

/**
 * Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise
 * @desczh
 * 判断两个类型是否相等
 * @example
 * import { Equals } from 'macoolka-typescript'
 *
 * export type Result1 = Equals<string, string> // "T"
 * export type Result2 = Equals<string, number> // "F"
 *
 * @since 0.2.0
 */
export type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<C>() => C extends Compact<B>
    ? 'T'
    : 'F')
    ? 'T'
    : 'F'

/**
 * Overwrite a type with anther type
 * @desczh
 * 用一个类型覆盖另一个类型
 * @example
 * import { Overwrite } from 'macoolka-typescript'
 *
 * export type Result = Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
 *
 * @since 0.2.0
 */
export type Overwrite<A extends object, B extends object> = Compact<{ [K in Exclude<keyof A, keyof B>]: A[K] } & B>

/**
 * Define some property is `Partial`
 * @desczh
 * 定义一些属性为`Partial`
 * @example
 * import { Diff } from 'macoolka-typescript'
 *
 * export type Result = Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
 *
 * @since 0.2.0
 */
export type Diff<A extends object, OK extends keyof A> = Compact<
    { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>

/**
 * Picks only the keys of a certain type
 * @desczh
 * 获取特定类型的`key`
 * @example
 * import { KeysOfType } from 'macoolka-typescript'
 *
 * export type Result = KeysOfType<{a: string, b: string | boolean, c: boolean, d: string}, string> // "a" | "d"
 *
 * @since 0.2.0
 */
export type KeysOfType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? K : never }[keyof A]

/**
 * Picks only the keys of a non certain type
 * @desczh
 * 获取非特定类型的`key`
 * @example
 * import { KeysOfType } from 'macoolka-typescript'
 *
 * export type Result = KeysOfNotType<{a: string, b: string | boolean, c: boolean, d: string}, string> // "b" | "c"
 *
 * @since 0.2.0
 */
export type KeysOfNotType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? never : K }[keyof A]

/**
 * Encodes the constraint that a given object `A` does not contain specific keys `K`
 * @desczh
 * 约束不包括指定的`key`
 * @example
 * import { RowLacks } from 'macoolka-typescript'
 *
 * export declare function f(x: RowLacks<{ a: string; b: number }, 'a' | 'b'>): void
 * // $ExpectError
 * // f({ a: 'a', b: 1 })
 * declare function g(x: RowLacks<{ a: string; b: number }, 'c'>): void
 * g({ a: 'a', b: 1 }) // ok
 *
 * @since 0.2.0
 */
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>

/**
 * Exclude a type all members
 * @desczh
 * 排除一个类型的所有成员
 * @example
 * import { Exact } from 'macoolka-typescript'
 *
 * declare function f<T extends Exact<{ a: string }, T>>(a: T): void
 * f({ a: 'a' })
 * // $ExpectError
 * // f({ a: 'a', b: 1 })
 *
 * @since 0.2.0
 */
export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, never>

/**
 * @example
 * import { AnyTuple } from 'macoolka-typescript'
 *
 * declare function f<T extends AnyTuple>(x: T): T
 * declare const x: [number]
 * declare const y: [number, string]
 * declare const z: [number, string, boolean]
 * f(x)
 * f(y)
 * f(z)
 * // $ExpectError
 * // f([1, 2, 3])
 *
 * @since 0.2.0
 */
export type AnyTuple = Array<any> & { '0': any }

/**
 * @ignore
 */
export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> { }

/**
 * @ignore
 */
export type DeepReadonlyObject<A> = { readonly [K in keyof A]: DeepReadonly<A[K]> }

/**
 * Set all memeber is readonly.
 * @desczh
 * 设置所有的成员为`readonly`
 * @example
 * import { DeepReadonly } from 'macoolka-typescript'
 *
 * interface Foo {
 *   bar: {
 *     baz: string
 *     quux: Array<{ barbaz: number }>
 *   }
 * }
 *
 * type ReadonlyFoo = DeepReadonly<Foo>
 * export declare const x: ReadonlyFoo
 * // $ExpectError
 * // x.bar.quux[1].barbaz = 1
 *
 * @since 0.2.0
 */
export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>

/**
 * Extracts the type of a member of a tagged union
 * @desczh
 * 获取特定的类型通过标记
 * @example
 * import { TaggedUnionMember } from 'macoolka-typescript'
 *
 * type A = { tag: 'A'; a: string }
 * type B = { tag: 'B'; b: number }
 * type C = A | B
 * export type Result = TaggedUnionMember<C, 'tag', 'A'> // A
 *
 * @since 0.2.0
 */
export type TaggedUnionMember<A extends object, Tag extends keyof A, Value extends A[Tag]> = Extract<
    A,
    Record<Tag, Value>
>

/**
 * Extracts required keys as a literal type union
 * @desczh
 * 得到必填的`key`
 * @example
 * import { RequiredKeys } from 'macoolka-typescript'
 *
 * type A = { a: string; b: number; x?: string; y?: number }
 * export type Result = RequiredKeys<A> // "a" | "b"
 *
 * @since 0.2.0
 */
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
    ? {} extends U
    ? never
    : U
    : never

/**
 * Extracts optional keys as a literal type union
 * @desczh
 * 得到可选的`key`
 * @example
 * import { OptionalKeys } from 'macoolka-typescript'
 *
 * type A = { a: string; b: number; x?: string; y?: number }
 * export type Result = OptionalKeys<A> // "x" | "y"
 *
 * @since 0.2.0
 */
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
    [_ in keyof T]: infer U
}
    ? {} extends U
    ? never
    : U
    : never

/**
 * Type least have a propery
 * @desczh
 * 约束类型至少有一个属性
 * @example
 * import { AtLeastOne } from 'macoolka-typescript'
 *
 * type A = { a: string; b: number }
 * type Result = AtLeastOne<A>
 * const result: Result = { a: '' } //correct
 * const result1: Result = { b: 1 } //correct
 * const result2: Result = { a: '', b: 1 } //correct
 * const result3: Result = {} //error
 *
 * @since 0.2.0
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
    U[keyof U]
/**
 * Array least have a element
 * @desczh
 * 非空数组
 * @example
 * import { NonEmptyArray } from 'macoolka-typescript'
 *
 * type A = { a: string; b: number }
 * type Result = NonEmptyArray<A>
 * const result1: Result =[ { b: 1 } ]//correct
 * const result3: Result = []//error
 *
 * @since 0.2.0
 */
export interface NonEmptyArray<A> extends Array<A> {
    0: A
}
/**
 * Type may be null or undefined
 * @desczh
 * 类型可以为空
 * @since 0.2.0
 */
export type Maybe<T> = null | undefined | T

/**
 * A *thunk*
 * @desczh
 * 延迟的对象
 * @since 0.2.0
 */
export interface Lazy<A> {
    (): A
}

/**
 * Predicate a type
 * @desczh
 * 断言
 * @since 0.2.0
 */
export interface Predicate<A> {
    (a: A): boolean
}

/**
 * Define a Type A is B
 * @desczh
 * 断言类型A是B
 * @since 0.2.0
 */
export interface Refinement<A, B extends A> {
    (a: A): a is B
}

/**
 * Type Endomorphism
 * @since 0.2.0
 * @desczh
 * 形变
 */
export interface Endomorphism<A> {
    (a: A): A
}

/**
 * @example
 * import { FunctionN } from 'macoolka-typescript'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 0.2.0
 */
export interface FunctionN<A extends Array<unknown>, B> {
    (...args: A): B
}
/**
 * Define a IndexType A is B
 * @desczh
 * 断言一个索引类型A是B
 * @since 0.2.0
 */
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

/**
 * Predicate a IndexType A is B
 * @desczh
 * 断言一个索引类型
 * @since 0.2.0
 */
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

/**
 * Define a OptionIndexType A is B
 * @desczh
 * 断言一个可选索引类型A是B
 * @since 0.2.0
 */
export type RefinementWithOptionIndex<I, A, B extends A> = (a: A, i?: I) => a is B

/**
 * Predicate a OptionIndexType A is B
 * @desczh
 * 断言一个可选索引类型
 * @since 0.2.0
 */
export type PredicateWithOptionIndex<I, A> = (a: A, i?: I) => boolean
/**
 * Deep Partial A Record
 * @desczh
 * 把所有的属性全部可选
 * @since 0.2.2
 */
export type PartialAll<T> = {
    [P in keyof T]?: Partial<T[P]>;
};