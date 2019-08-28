---
title:index.ts
nav_order:1
parent:Modules
---

# Overview

Common Type

---

<h2 class="text-delta">Table of contents</h2>

- [Endomorphism (interface)](#endomorphism-interface)
- [FunctionN (interface)](#functionn-interface)
- [Lazy (interface)](#lazy-interface)
- [NonEmptyArray (interface)](#nonemptyarray-interface)
- [Predicate (interface)](#predicate-interface)
- [Refinement (interface)](#refinement-interface)
- [AnyTuple (type alias)](#anytuple-type-alias)
- [AtLeastOne (type alias)](#atleastone-type-alias)
- [DeepReadonly (type alias)](#deepreadonly-type-alias)
- [Diff (type alias)](#diff-type-alias)
- [Equals (type alias)](#equals-type-alias)
- [Exact (type alias)](#exact-type-alias)
- [KeysOfNotType (type alias)](#keysofnottype-type-alias)
- [KeysOfType (type alias)](#keysoftype-type-alias)
- [Maybe (type alias)](#maybe-type-alias)
- [OptionalKeys (type alias)](#optionalkeys-type-alias)
- [Overwrite (type alias)](#overwrite-type-alias)
- [PredicateWithIndex (type alias)](#predicatewithindex-type-alias)
- [PredicateWithOptionIndex (type alias)](#predicatewithoptionindex-type-alias)
- [RefinementWithIndex (type alias)](#refinementwithindex-type-alias)
- [RefinementWithOptionIndex (type alias)](#refinementwithoptionindex-type-alias)
- [RequiredKeys (type alias)](#requiredkeys-type-alias)
- [RowLacks (type alias)](#rowlacks-type-alias)
- [TaggedUnionMember (type alias)](#taggedunionmember-type-alias)

---

# Endomorphism (interface)

Type Endomorphism

**Signature**

```ts
interface Endomorphism {}
```

Added in v0.2.0

# FunctionN (interface)

**Signature**

```ts
interface FunctionN {}
```

**Example**

```ts
import { FunctionN } from 'macoolka-typescript'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v0.2.0

# Lazy (interface)

A _thunk_

**Signature**

```ts
interface Lazy {}
```

Added in v0.2.0

# NonEmptyArray (interface)

Array least have a element

**Signature**

```ts
interface NonEmptyArray extends Array, Array, Array, Array, Array, Array {
  0: A
}
```

**Example**

```ts
import { NonEmptyArray } from 'macoolka-typescript'

type A = { a: string; b: number }
type Result = NonEmptyArray<A>
const result1: Result = [{ b: 1 }] //correct
const result3: Result = [] //error
```

Added in v0.2.0

# Predicate (interface)

Predicate a type

**Signature**

```ts
interface Predicate {}
```

Added in v0.2.0

# Refinement (interface)

Define a Type A is B

**Signature**

```ts
interface Refinement {}
```

Added in v0.2.0

# AnyTuple (type alias)

**Signature**

```ts
export type AnyTuple = Array<any> & { '0': any }
```

**Example**

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

Added in v0.2.0

# AtLeastOne (type alias)

Type least have a propery

**Signature**

```ts
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
```

**Example**

```ts
import { AtLeastOne } from 'macoolka-typescript'

type A = { a: string; b: number }
type Result = AtLeastOne<A>
const result: Result = { a: '' } //correct
const result1: Result = { b: 1 } //correct
const result2: Result = { a: '', b: 1 } //correct
const result3: Result = {} //error
```

Added in v0.2.0

# DeepReadonly (type alias)

Set all memeber is readonly.

**Signature**

```ts
export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>
```

**Example**

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

Added in v0.2.0

# Diff (type alias)

Define some property is `Partial`

**Signature**

```ts
export type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>
```

**Example**

```ts
import { Diff } from 'macoolka-typescript'

export type Result = Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
```

Added in v0.2.0

# Equals (type alias)

Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise

**Signature**

```ts
export type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<C>() => C extends Compact<B>
  ? 'T'
  : 'F')
  ? 'T'
  : 'F'
```

**Example**

```ts
import { Equals } from 'macoolka-typescript'

export type Result1 = Equals<string, string> // "T"
export type Result2 = Equals<string, number> // "F"
```

Added in v0.2.0

# Exact (type alias)

Exclude a type all members

**Signature**

```ts
export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, never>
```

**Example**

```ts
import { Exact } from 'macoolka-typescript'

declare function f<T extends Exact<{ a: string }, T>>(a: T): void
f({ a: 'a' })
// $ExpectError
// f({ a: 'a', b: 1 })
```

Added in v0.2.0

# KeysOfNotType (type alias)

Picks only the keys of a non certain type

**Signature**

```ts
export type KeysOfNotType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? never : K }[keyof A]
```

**Example**

```ts
import { KeysOfType } from 'macoolka-typescript'

export type Result = KeysOfNotType<{ a: string; b: string | boolean; c: boolean; d: string }, string> // "b" | "c"
```

Added in v0.2.0

# KeysOfType (type alias)

Picks only the keys of a certain type

**Signature**

```ts
export type KeysOfType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? K : never }[keyof A]
```

**Example**

```ts
import { KeysOfType } from 'macoolka-typescript'

export type Result = KeysOfType<{ a: string; b: string | boolean; c: boolean; d: string }, string> // "a" | "d"
```

Added in v0.2.0

# Maybe (type alias)

Type may be null or undefined

**Signature**

```ts
export type Maybe<T> = null | undefined | T
```

Added in v0.2.0

# OptionalKeys (type alias)

Extracts optional keys as a literal type union

**Signature**

```ts
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
  [_ in keyof T]: infer U
}
  ? {} extends U
    ? never
    : U
  : never
```

**Example**

```ts
import { OptionalKeys } from 'macoolka-typescript'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = OptionalKeys<A> // "x" | "y"
```

Added in v0.2.0

# Overwrite (type alias)

Overwrite a type with anther type

**Signature**

```ts
export type Overwrite<A extends object, B extends object> = Compact<{ [K in Exclude<keyof A, keyof B>]: A[K] } & B>
```

**Example**

```ts
import { Overwrite } from 'macoolka-typescript'

export type Result = Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
```

Added in v0.2.0

# PredicateWithIndex (type alias)

Predicate a IndexType A is B

**Signature**

```ts
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

Added in v0.2.0

# PredicateWithOptionIndex (type alias)

Predicate a OptionIndexType A is B

**Signature**

```ts
export type PredicateWithOptionIndex<I, A> = (a: A, i?: I) => boolean
```

Added in v0.2.0

# RefinementWithIndex (type alias)

Define a IndexType A is B

**Signature**

```ts
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```

Added in v0.2.0

# RefinementWithOptionIndex (type alias)

Define a OptionIndexType A is B

**Signature**

```ts
export type RefinementWithOptionIndex<I, A, B extends A> = (a: A, i?: I) => a is B
```

Added in v0.2.0

# RequiredKeys (type alias)

Extracts required keys as a literal type union

**Signature**

```ts
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never
```

**Example**

```ts
import { RequiredKeys } from 'macoolka-typescript'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = RequiredKeys<A> // "a" | "b"
```

Added in v0.2.0

# RowLacks (type alias)

Encodes the constraint that a given object `A` does not contain specific keys `K`

**Signature**

```ts
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>
```

**Example**

```ts
import { RowLacks } from 'macoolka-typescript'

export declare function f(x: RowLacks<{ a: string; b: number }, 'a' | 'b'>): void
// $ExpectError
// f({ a: 'a', b: 1 })
declare function g(x: RowLacks<{ a: string; b: number }, 'c'>): void
g({ a: 'a', b: 1 }) // ok
```

Added in v0.2.0

# TaggedUnionMember (type alias)

Extracts the type of a member of a tagged union

**Signature**

```ts
export type TaggedUnionMember<A extends object, Tag extends keyof A, Value extends A[Tag]> = Extract<
  A,
  Record<Tag, Value>
>
```

**Example**

```ts
import { TaggedUnionMember } from 'macoolka-typescript'

type A = { tag: 'A'; a: string }
type B = { tag: 'B'; b: number }
type C = A | B
export type Result = TaggedUnionMember<C, 'tag', 'A'> // A
```

Added in v0.2.0
