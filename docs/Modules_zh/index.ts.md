---
title:index.ts
nav_order:2
parent:模块
---

# 概述

Common Type

---

<h2 class="text-delta">目录</h2>

- [Endomorphism (接口)](#endomorphism-%E6%8E%A5%E5%8F%A3)
- [FunctionN (接口)](#functionn-%E6%8E%A5%E5%8F%A3)
- [Lazy (接口)](#lazy-%E6%8E%A5%E5%8F%A3)
- [NonEmptyArray (接口)](#nonemptyarray-%E6%8E%A5%E5%8F%A3)
- [Predicate (接口)](#predicate-%E6%8E%A5%E5%8F%A3)
- [Refinement (接口)](#refinement-%E6%8E%A5%E5%8F%A3)
- [AnyTuple (类型)](#anytuple-%E7%B1%BB%E5%9E%8B)
- [AtLeastOne (类型)](#atleastone-%E7%B1%BB%E5%9E%8B)
- [DeepReadonly (类型)](#deepreadonly-%E7%B1%BB%E5%9E%8B)
- [Diff (类型)](#diff-%E7%B1%BB%E5%9E%8B)
- [Equals (类型)](#equals-%E7%B1%BB%E5%9E%8B)
- [Exact (类型)](#exact-%E7%B1%BB%E5%9E%8B)
- [KeysOfNotType (类型)](#keysofnottype-%E7%B1%BB%E5%9E%8B)
- [KeysOfType (类型)](#keysoftype-%E7%B1%BB%E5%9E%8B)
- [Maybe (类型)](#maybe-%E7%B1%BB%E5%9E%8B)
- [OptionalKeys (类型)](#optionalkeys-%E7%B1%BB%E5%9E%8B)
- [Overwrite (类型)](#overwrite-%E7%B1%BB%E5%9E%8B)
- [PredicateWithIndex (类型)](#predicatewithindex-%E7%B1%BB%E5%9E%8B)
- [PredicateWithOptionIndex (类型)](#predicatewithoptionindex-%E7%B1%BB%E5%9E%8B)
- [RefinementWithIndex (类型)](#refinementwithindex-%E7%B1%BB%E5%9E%8B)
- [RefinementWithOptionIndex (类型)](#refinementwithoptionindex-%E7%B1%BB%E5%9E%8B)
- [RequiredKeys (类型)](#requiredkeys-%E7%B1%BB%E5%9E%8B)
- [RowLacks (类型)](#rowlacks-%E7%B1%BB%E5%9E%8B)
- [TaggedUnionMember (类型)](#taggedunionmember-%E7%B1%BB%E5%9E%8B)

---

# Endomorphism (接口)

形变

**签名**

```ts
interface Endomorphism {}
```

v0.2.0 中添加

# FunctionN (接口)

**签名**

```ts
interface FunctionN {}
```

**示例**

```ts
import { FunctionN } from 'macoolka-typescript'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

v0.2.0 中添加

# Lazy (接口)

延迟的对象

**签名**

```ts
interface Lazy {}
```

v0.2.0 中添加

# NonEmptyArray (接口)

非空数组

**签名**

```ts
interface NonEmptyArray extends Array, Array, Array, Array, Array, Array {
  0: A
}
```

**示例**

```ts
import { NonEmptyArray } from 'macoolka-typescript'

type A = { a: string; b: number }
type Result = NonEmptyArray<A>
const result1: Result = [{ b: 1 }] //correct
const result3: Result = [] //error
```

v0.2.0 中添加

# Predicate (接口)

断言

**签名**

```ts
interface Predicate {}
```

v0.2.0 中添加

# Refinement (接口)

断言类型 A 是 B

**签名**

```ts
interface Refinement {}
```

v0.2.0 中添加

# AnyTuple (类型)

**签名**

```ts
export type AnyTuple = Array<any> & { '0': any }
```

**示例**

```ts
import { AnyTuple } from 'macoolka-typescript'

declare function f<T extends AnyTuple>(x: T): T
declare const x: [number]
declare const y: [number, string]
declare const z: [number, string, boolean]
f(x)
f(y)
f(z)
// $ExpectError
// f([1, 2, 3])
```

v0.2.0 中添加

# AtLeastOne (类型)

约束类型至少有一个属性

**签名**

```ts
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
```

**示例**

```ts
import { AtLeastOne } from 'macoolka-typescript'

type A = { a: string; b: number }
type Result = AtLeastOne<A>
const result: Result = { a: '' } //correct
const result1: Result = { b: 1 } //correct
const result2: Result = { a: '', b: 1 } //correct
const result3: Result = {} //error
```

v0.2.0 中添加

# DeepReadonly (类型)

设置所有的成员为`readonly`

**签名**

```ts
export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>
```

**示例**

```ts
import { DeepReadonly } from 'macoolka-typescript'

interface Foo {
  bar: {
    baz: string
    quux: Array<{ barbaz: number }>
  }
}

type ReadonlyFoo = DeepReadonly<Foo>
export declare const x: ReadonlyFoo
// $ExpectError
// x.bar.quux[1].barbaz = 1
```

v0.2.0 中添加

# Diff (类型)

定义一些属性为`Partial`

**签名**

```ts
export type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>
```

**示例**

```ts
import { Diff } from 'macoolka-typescript'

export type Result = Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
```

v0.2.0 中添加

# Equals (类型)

判断两个类型是否相等

**签名**

```ts
export type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<C>() => C extends Compact<B>
  ? 'T'
  : 'F')
  ? 'T'
  : 'F'
```

**示例**

```ts
import { Equals } from 'macoolka-typescript'

export type Result1 = Equals<string, string> // "T"
export type Result2 = Equals<string, number> // "F"
```

v0.2.0 中添加

# Exact (类型)

排除一个类型的所有成员

**签名**

```ts
export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, never>
```

**示例**

```ts
import { Exact } from 'macoolka-typescript'

declare function f<T extends Exact<{ a: string }, T>>(a: T): void
f({ a: 'a' })
// $ExpectError
// f({ a: 'a', b: 1 })
```

v0.2.0 中添加

# KeysOfNotType (类型)

获取非特定类型的`key`

**签名**

```ts
export type KeysOfNotType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? never : K }[keyof A]
```

**示例**

```ts
import { KeysOfType } from 'macoolka-typescript'

export type Result = KeysOfNotType<{ a: string; b: string | boolean; c: boolean; d: string }, string> // "b" | "c"
```

v0.2.0 中添加

# KeysOfType (类型)

获取特定类型的`key`

**签名**

```ts
export type KeysOfType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? K : never }[keyof A]
```

**示例**

```ts
import { KeysOfType } from 'macoolka-typescript'

export type Result = KeysOfType<{ a: string; b: string | boolean; c: boolean; d: string }, string> // "a" | "d"
```

v0.2.0 中添加

# Maybe (类型)

类型可以为空

**签名**

```ts
export type Maybe<T> = null | undefined | T
```

v0.2.0 中添加

# OptionalKeys (类型)

得到可选的`key`

**签名**

```ts
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
  [_ in keyof T]: infer U
}
  ? {} extends U
    ? never
    : U
  : never
```

**示例**

```ts
import { OptionalKeys } from 'macoolka-typescript'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = OptionalKeys<A> // "x" | "y"
```

v0.2.0 中添加

# Overwrite (类型)

用一个类型覆盖另一个类型

**签名**

```ts
export type Overwrite<A extends object, B extends object> = Compact<{ [K in Exclude<keyof A, keyof B>]: A[K] } & B>
```

**示例**

```ts
import { Overwrite } from 'macoolka-typescript'

export type Result = Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
```

v0.2.0 中添加

# PredicateWithIndex (类型)

断言一个索引类型

**签名**

```ts
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

v0.2.0 中添加

# PredicateWithOptionIndex (类型)

断言一个可选索引类型

**签名**

```ts
export type PredicateWithOptionIndex<I, A> = (a: A, i?: I) => boolean
```

v0.2.0 中添加

# RefinementWithIndex (类型)

断言一个索引类型 A 是 B

**签名**

```ts
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```

v0.2.0 中添加

# RefinementWithOptionIndex (类型)

断言一个可选索引类型 A 是 B

**签名**

```ts
export type RefinementWithOptionIndex<I, A, B extends A> = (a: A, i?: I) => a is B
```

v0.2.0 中添加

# RequiredKeys (类型)

得到必填的`key`

**签名**

```ts
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never
```

**示例**

```ts
import { RequiredKeys } from 'macoolka-typescript'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = RequiredKeys<A> // "a" | "b"
```

v0.2.0 中添加

# RowLacks (类型)

约束不包括指定的`key`

**签名**

```ts
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>
```

**示例**

```ts
import { RowLacks } from 'macoolka-typescript'

export declare function f(x: RowLacks<{ a: string; b: number }, 'a' | 'b'>): void
// $ExpectError
// f({ a: 'a', b: 1 })
declare function g(x: RowLacks<{ a: string; b: number }, 'c'>): void
g({ a: 'a', b: 1 }) // ok
```

v0.2.0 中添加

# TaggedUnionMember (类型)

获取特定的类型通过标记

**签名**

```ts
export type TaggedUnionMember<A extends object, Tag extends keyof A, Value extends A[Tag]> = Extract<
  A,
  Record<Tag, Value>
>
```

**示例**

```ts
import { TaggedUnionMember } from 'macoolka-typescript'

type A = { tag: 'A'; a: string }
type B = { tag: 'B'; b: number }
type C = A | B
export type Result = TaggedUnionMember<C, 'tag', 'A'> // A
```

v0.2.0 中添加
