
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model types_demande
 * 
 */
export type types_demande = $Result.DefaultSelection<Prisma.$types_demandePayload>
/**
 * Model soldes_conges
 * 
 */
export type soldes_conges = $Result.DefaultSelection<Prisma.$soldes_congesPayload>
/**
 * Model demandes_rh
 * 
 */
export type demandes_rh = $Result.DefaultSelection<Prisma.$demandes_rhPayload>
/**
 * Model validations_demande
 * 
 */
export type validations_demande = $Result.DefaultSelection<Prisma.$validations_demandePayload>
/**
 * Model pieces_jointes_demande
 * 
 */
export type pieces_jointes_demande = $Result.DefaultSelection<Prisma.$pieces_jointes_demandePayload>
/**
 * Model historique_demande
 * 
 */
export type historique_demande = $Result.DefaultSelection<Prisma.$historique_demandePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Types_demandes
 * const types_demandes = await prisma.types_demande.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Types_demandes
   * const types_demandes = await prisma.types_demande.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.types_demande`: Exposes CRUD operations for the **types_demande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Types_demandes
    * const types_demandes = await prisma.types_demande.findMany()
    * ```
    */
  get types_demande(): Prisma.types_demandeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.soldes_conges`: Exposes CRUD operations for the **soldes_conges** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Soldes_conges
    * const soldes_conges = await prisma.soldes_conges.findMany()
    * ```
    */
  get soldes_conges(): Prisma.soldes_congesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.demandes_rh`: Exposes CRUD operations for the **demandes_rh** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Demandes_rhs
    * const demandes_rhs = await prisma.demandes_rh.findMany()
    * ```
    */
  get demandes_rh(): Prisma.demandes_rhDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.validations_demande`: Exposes CRUD operations for the **validations_demande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Validations_demandes
    * const validations_demandes = await prisma.validations_demande.findMany()
    * ```
    */
  get validations_demande(): Prisma.validations_demandeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pieces_jointes_demande`: Exposes CRUD operations for the **pieces_jointes_demande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pieces_jointes_demandes
    * const pieces_jointes_demandes = await prisma.pieces_jointes_demande.findMany()
    * ```
    */
  get pieces_jointes_demande(): Prisma.pieces_jointes_demandeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.historique_demande`: Exposes CRUD operations for the **historique_demande** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Historique_demandes
    * const historique_demandes = await prisma.historique_demande.findMany()
    * ```
    */
  get historique_demande(): Prisma.historique_demandeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    types_demande: 'types_demande',
    soldes_conges: 'soldes_conges',
    demandes_rh: 'demandes_rh',
    validations_demande: 'validations_demande',
    pieces_jointes_demande: 'pieces_jointes_demande',
    historique_demande: 'historique_demande'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "types_demande" | "soldes_conges" | "demandes_rh" | "validations_demande" | "pieces_jointes_demande" | "historique_demande"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      types_demande: {
        payload: Prisma.$types_demandePayload<ExtArgs>
        fields: Prisma.types_demandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.types_demandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.types_demandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          findFirst: {
            args: Prisma.types_demandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.types_demandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          findMany: {
            args: Prisma.types_demandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>[]
          }
          create: {
            args: Prisma.types_demandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          createMany: {
            args: Prisma.types_demandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.types_demandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>[]
          }
          delete: {
            args: Prisma.types_demandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          update: {
            args: Prisma.types_demandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          deleteMany: {
            args: Prisma.types_demandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.types_demandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.types_demandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>[]
          }
          upsert: {
            args: Prisma.types_demandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$types_demandePayload>
          }
          aggregate: {
            args: Prisma.Types_demandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTypes_demande>
          }
          groupBy: {
            args: Prisma.types_demandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Types_demandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.types_demandeCountArgs<ExtArgs>
            result: $Utils.Optional<Types_demandeCountAggregateOutputType> | number
          }
        }
      }
      soldes_conges: {
        payload: Prisma.$soldes_congesPayload<ExtArgs>
        fields: Prisma.soldes_congesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.soldes_congesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.soldes_congesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          findFirst: {
            args: Prisma.soldes_congesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.soldes_congesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          findMany: {
            args: Prisma.soldes_congesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>[]
          }
          create: {
            args: Prisma.soldes_congesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          createMany: {
            args: Prisma.soldes_congesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.soldes_congesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>[]
          }
          delete: {
            args: Prisma.soldes_congesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          update: {
            args: Prisma.soldes_congesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          deleteMany: {
            args: Prisma.soldes_congesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.soldes_congesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.soldes_congesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>[]
          }
          upsert: {
            args: Prisma.soldes_congesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$soldes_congesPayload>
          }
          aggregate: {
            args: Prisma.Soldes_congesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoldes_conges>
          }
          groupBy: {
            args: Prisma.soldes_congesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Soldes_congesGroupByOutputType>[]
          }
          count: {
            args: Prisma.soldes_congesCountArgs<ExtArgs>
            result: $Utils.Optional<Soldes_congesCountAggregateOutputType> | number
          }
        }
      }
      demandes_rh: {
        payload: Prisma.$demandes_rhPayload<ExtArgs>
        fields: Prisma.demandes_rhFieldRefs
        operations: {
          findUnique: {
            args: Prisma.demandes_rhFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.demandes_rhFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          findFirst: {
            args: Prisma.demandes_rhFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.demandes_rhFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          findMany: {
            args: Prisma.demandes_rhFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>[]
          }
          create: {
            args: Prisma.demandes_rhCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          createMany: {
            args: Prisma.demandes_rhCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.demandes_rhCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>[]
          }
          delete: {
            args: Prisma.demandes_rhDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          update: {
            args: Prisma.demandes_rhUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          deleteMany: {
            args: Prisma.demandes_rhDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.demandes_rhUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.demandes_rhUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>[]
          }
          upsert: {
            args: Prisma.demandes_rhUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$demandes_rhPayload>
          }
          aggregate: {
            args: Prisma.Demandes_rhAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemandes_rh>
          }
          groupBy: {
            args: Prisma.demandes_rhGroupByArgs<ExtArgs>
            result: $Utils.Optional<Demandes_rhGroupByOutputType>[]
          }
          count: {
            args: Prisma.demandes_rhCountArgs<ExtArgs>
            result: $Utils.Optional<Demandes_rhCountAggregateOutputType> | number
          }
        }
      }
      validations_demande: {
        payload: Prisma.$validations_demandePayload<ExtArgs>
        fields: Prisma.validations_demandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.validations_demandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.validations_demandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          findFirst: {
            args: Prisma.validations_demandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.validations_demandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          findMany: {
            args: Prisma.validations_demandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>[]
          }
          create: {
            args: Prisma.validations_demandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          createMany: {
            args: Prisma.validations_demandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.validations_demandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>[]
          }
          delete: {
            args: Prisma.validations_demandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          update: {
            args: Prisma.validations_demandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          deleteMany: {
            args: Prisma.validations_demandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.validations_demandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.validations_demandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>[]
          }
          upsert: {
            args: Prisma.validations_demandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$validations_demandePayload>
          }
          aggregate: {
            args: Prisma.Validations_demandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateValidations_demande>
          }
          groupBy: {
            args: Prisma.validations_demandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Validations_demandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.validations_demandeCountArgs<ExtArgs>
            result: $Utils.Optional<Validations_demandeCountAggregateOutputType> | number
          }
        }
      }
      pieces_jointes_demande: {
        payload: Prisma.$pieces_jointes_demandePayload<ExtArgs>
        fields: Prisma.pieces_jointes_demandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pieces_jointes_demandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pieces_jointes_demandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          findFirst: {
            args: Prisma.pieces_jointes_demandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pieces_jointes_demandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          findMany: {
            args: Prisma.pieces_jointes_demandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>[]
          }
          create: {
            args: Prisma.pieces_jointes_demandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          createMany: {
            args: Prisma.pieces_jointes_demandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pieces_jointes_demandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>[]
          }
          delete: {
            args: Prisma.pieces_jointes_demandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          update: {
            args: Prisma.pieces_jointes_demandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          deleteMany: {
            args: Prisma.pieces_jointes_demandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pieces_jointes_demandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pieces_jointes_demandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>[]
          }
          upsert: {
            args: Prisma.pieces_jointes_demandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pieces_jointes_demandePayload>
          }
          aggregate: {
            args: Prisma.Pieces_jointes_demandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePieces_jointes_demande>
          }
          groupBy: {
            args: Prisma.pieces_jointes_demandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pieces_jointes_demandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.pieces_jointes_demandeCountArgs<ExtArgs>
            result: $Utils.Optional<Pieces_jointes_demandeCountAggregateOutputType> | number
          }
        }
      }
      historique_demande: {
        payload: Prisma.$historique_demandePayload<ExtArgs>
        fields: Prisma.historique_demandeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.historique_demandeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.historique_demandeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          findFirst: {
            args: Prisma.historique_demandeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.historique_demandeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          findMany: {
            args: Prisma.historique_demandeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>[]
          }
          create: {
            args: Prisma.historique_demandeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          createMany: {
            args: Prisma.historique_demandeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.historique_demandeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>[]
          }
          delete: {
            args: Prisma.historique_demandeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          update: {
            args: Prisma.historique_demandeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          deleteMany: {
            args: Prisma.historique_demandeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.historique_demandeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.historique_demandeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>[]
          }
          upsert: {
            args: Prisma.historique_demandeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$historique_demandePayload>
          }
          aggregate: {
            args: Prisma.Historique_demandeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistorique_demande>
          }
          groupBy: {
            args: Prisma.historique_demandeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Historique_demandeGroupByOutputType>[]
          }
          count: {
            args: Prisma.historique_demandeCountArgs<ExtArgs>
            result: $Utils.Optional<Historique_demandeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    types_demande?: types_demandeOmit
    soldes_conges?: soldes_congesOmit
    demandes_rh?: demandes_rhOmit
    validations_demande?: validations_demandeOmit
    pieces_jointes_demande?: pieces_jointes_demandeOmit
    historique_demande?: historique_demandeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Types_demandeCountOutputType
   */

  export type Types_demandeCountOutputType = {
    demandes: number
  }

  export type Types_demandeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes?: boolean | Types_demandeCountOutputTypeCountDemandesArgs
  }

  // Custom InputTypes
  /**
   * Types_demandeCountOutputType without action
   */
  export type Types_demandeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Types_demandeCountOutputType
     */
    select?: Types_demandeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Types_demandeCountOutputType without action
   */
  export type Types_demandeCountOutputTypeCountDemandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: demandes_rhWhereInput
  }


  /**
   * Count Type Demandes_rhCountOutputType
   */

  export type Demandes_rhCountOutputType = {
    validations: number
    piecesJointes: number
    historique: number
  }

  export type Demandes_rhCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    validations?: boolean | Demandes_rhCountOutputTypeCountValidationsArgs
    piecesJointes?: boolean | Demandes_rhCountOutputTypeCountPiecesJointesArgs
    historique?: boolean | Demandes_rhCountOutputTypeCountHistoriqueArgs
  }

  // Custom InputTypes
  /**
   * Demandes_rhCountOutputType without action
   */
  export type Demandes_rhCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandes_rhCountOutputType
     */
    select?: Demandes_rhCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Demandes_rhCountOutputType without action
   */
  export type Demandes_rhCountOutputTypeCountValidationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: validations_demandeWhereInput
  }

  /**
   * Demandes_rhCountOutputType without action
   */
  export type Demandes_rhCountOutputTypeCountPiecesJointesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pieces_jointes_demandeWhereInput
  }

  /**
   * Demandes_rhCountOutputType without action
   */
  export type Demandes_rhCountOutputTypeCountHistoriqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: historique_demandeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model types_demande
   */

  export type AggregateTypes_demande = {
    _count: Types_demandeCountAggregateOutputType | null
    _avg: Types_demandeAvgAggregateOutputType | null
    _sum: Types_demandeSumAggregateOutputType | null
    _min: Types_demandeMinAggregateOutputType | null
    _max: Types_demandeMaxAggregateOutputType | null
  }

  export type Types_demandeAvgAggregateOutputType = {
    delaiMinJours: number | null
    dureeMaxJours: number | null
  }

  export type Types_demandeSumAggregateOutputType = {
    delaiMinJours: number | null
    dureeMaxJours: number | null
  }

  export type Types_demandeMinAggregateOutputType = {
    id: string | null
    code: string | null
    libelle: string | null
    categorie: string | null
    necessiteSolde: boolean | null
    pieceRequise: boolean | null
    delaiMinJours: number | null
    dureeMaxJours: number | null
    actif: boolean | null
    createdAt: Date | null
  }

  export type Types_demandeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    libelle: string | null
    categorie: string | null
    necessiteSolde: boolean | null
    pieceRequise: boolean | null
    delaiMinJours: number | null
    dureeMaxJours: number | null
    actif: boolean | null
    createdAt: Date | null
  }

  export type Types_demandeCountAggregateOutputType = {
    id: number
    code: number
    libelle: number
    categorie: number
    necessiteSolde: number
    pieceRequise: number
    delaiMinJours: number
    dureeMaxJours: number
    actif: number
    createdAt: number
    _all: number
  }


  export type Types_demandeAvgAggregateInputType = {
    delaiMinJours?: true
    dureeMaxJours?: true
  }

  export type Types_demandeSumAggregateInputType = {
    delaiMinJours?: true
    dureeMaxJours?: true
  }

  export type Types_demandeMinAggregateInputType = {
    id?: true
    code?: true
    libelle?: true
    categorie?: true
    necessiteSolde?: true
    pieceRequise?: true
    delaiMinJours?: true
    dureeMaxJours?: true
    actif?: true
    createdAt?: true
  }

  export type Types_demandeMaxAggregateInputType = {
    id?: true
    code?: true
    libelle?: true
    categorie?: true
    necessiteSolde?: true
    pieceRequise?: true
    delaiMinJours?: true
    dureeMaxJours?: true
    actif?: true
    createdAt?: true
  }

  export type Types_demandeCountAggregateInputType = {
    id?: true
    code?: true
    libelle?: true
    categorie?: true
    necessiteSolde?: true
    pieceRequise?: true
    delaiMinJours?: true
    dureeMaxJours?: true
    actif?: true
    createdAt?: true
    _all?: true
  }

  export type Types_demandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which types_demande to aggregate.
     */
    where?: types_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_demandes to fetch.
     */
    orderBy?: types_demandeOrderByWithRelationInput | types_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: types_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned types_demandes
    **/
    _count?: true | Types_demandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Types_demandeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Types_demandeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Types_demandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Types_demandeMaxAggregateInputType
  }

  export type GetTypes_demandeAggregateType<T extends Types_demandeAggregateArgs> = {
        [P in keyof T & keyof AggregateTypes_demande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTypes_demande[P]>
      : GetScalarType<T[P], AggregateTypes_demande[P]>
  }




  export type types_demandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: types_demandeWhereInput
    orderBy?: types_demandeOrderByWithAggregationInput | types_demandeOrderByWithAggregationInput[]
    by: Types_demandeScalarFieldEnum[] | Types_demandeScalarFieldEnum
    having?: types_demandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Types_demandeCountAggregateInputType | true
    _avg?: Types_demandeAvgAggregateInputType
    _sum?: Types_demandeSumAggregateInputType
    _min?: Types_demandeMinAggregateInputType
    _max?: Types_demandeMaxAggregateInputType
  }

  export type Types_demandeGroupByOutputType = {
    id: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde: boolean
    pieceRequise: boolean
    delaiMinJours: number
    dureeMaxJours: number | null
    actif: boolean
    createdAt: Date
    _count: Types_demandeCountAggregateOutputType | null
    _avg: Types_demandeAvgAggregateOutputType | null
    _sum: Types_demandeSumAggregateOutputType | null
    _min: Types_demandeMinAggregateOutputType | null
    _max: Types_demandeMaxAggregateOutputType | null
  }

  type GetTypes_demandeGroupByPayload<T extends types_demandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Types_demandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Types_demandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Types_demandeGroupByOutputType[P]>
            : GetScalarType<T[P], Types_demandeGroupByOutputType[P]>
        }
      >
    >


  export type types_demandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    libelle?: boolean
    categorie?: boolean
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: boolean
    dureeMaxJours?: boolean
    actif?: boolean
    createdAt?: boolean
    demandes?: boolean | types_demande$demandesArgs<ExtArgs>
    _count?: boolean | Types_demandeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["types_demande"]>

  export type types_demandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    libelle?: boolean
    categorie?: boolean
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: boolean
    dureeMaxJours?: boolean
    actif?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["types_demande"]>

  export type types_demandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    libelle?: boolean
    categorie?: boolean
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: boolean
    dureeMaxJours?: boolean
    actif?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["types_demande"]>

  export type types_demandeSelectScalar = {
    id?: boolean
    code?: boolean
    libelle?: boolean
    categorie?: boolean
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: boolean
    dureeMaxJours?: boolean
    actif?: boolean
    createdAt?: boolean
  }

  export type types_demandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "libelle" | "categorie" | "necessiteSolde" | "pieceRequise" | "delaiMinJours" | "dureeMaxJours" | "actif" | "createdAt", ExtArgs["result"]["types_demande"]>
  export type types_demandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes?: boolean | types_demande$demandesArgs<ExtArgs>
    _count?: boolean | Types_demandeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type types_demandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type types_demandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $types_demandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "types_demande"
    objects: {
      demandes: Prisma.$demandes_rhPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      libelle: string
      categorie: string
      necessiteSolde: boolean
      pieceRequise: boolean
      delaiMinJours: number
      dureeMaxJours: number | null
      actif: boolean
      createdAt: Date
    }, ExtArgs["result"]["types_demande"]>
    composites: {}
  }

  type types_demandeGetPayload<S extends boolean | null | undefined | types_demandeDefaultArgs> = $Result.GetResult<Prisma.$types_demandePayload, S>

  type types_demandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<types_demandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Types_demandeCountAggregateInputType | true
    }

  export interface types_demandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['types_demande'], meta: { name: 'types_demande' } }
    /**
     * Find zero or one Types_demande that matches the filter.
     * @param {types_demandeFindUniqueArgs} args - Arguments to find a Types_demande
     * @example
     * // Get one Types_demande
     * const types_demande = await prisma.types_demande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends types_demandeFindUniqueArgs>(args: SelectSubset<T, types_demandeFindUniqueArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Types_demande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {types_demandeFindUniqueOrThrowArgs} args - Arguments to find a Types_demande
     * @example
     * // Get one Types_demande
     * const types_demande = await prisma.types_demande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends types_demandeFindUniqueOrThrowArgs>(args: SelectSubset<T, types_demandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Types_demande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeFindFirstArgs} args - Arguments to find a Types_demande
     * @example
     * // Get one Types_demande
     * const types_demande = await prisma.types_demande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends types_demandeFindFirstArgs>(args?: SelectSubset<T, types_demandeFindFirstArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Types_demande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeFindFirstOrThrowArgs} args - Arguments to find a Types_demande
     * @example
     * // Get one Types_demande
     * const types_demande = await prisma.types_demande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends types_demandeFindFirstOrThrowArgs>(args?: SelectSubset<T, types_demandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Types_demandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Types_demandes
     * const types_demandes = await prisma.types_demande.findMany()
     * 
     * // Get first 10 Types_demandes
     * const types_demandes = await prisma.types_demande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const types_demandeWithIdOnly = await prisma.types_demande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends types_demandeFindManyArgs>(args?: SelectSubset<T, types_demandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Types_demande.
     * @param {types_demandeCreateArgs} args - Arguments to create a Types_demande.
     * @example
     * // Create one Types_demande
     * const Types_demande = await prisma.types_demande.create({
     *   data: {
     *     // ... data to create a Types_demande
     *   }
     * })
     * 
     */
    create<T extends types_demandeCreateArgs>(args: SelectSubset<T, types_demandeCreateArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Types_demandes.
     * @param {types_demandeCreateManyArgs} args - Arguments to create many Types_demandes.
     * @example
     * // Create many Types_demandes
     * const types_demande = await prisma.types_demande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends types_demandeCreateManyArgs>(args?: SelectSubset<T, types_demandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Types_demandes and returns the data saved in the database.
     * @param {types_demandeCreateManyAndReturnArgs} args - Arguments to create many Types_demandes.
     * @example
     * // Create many Types_demandes
     * const types_demande = await prisma.types_demande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Types_demandes and only return the `id`
     * const types_demandeWithIdOnly = await prisma.types_demande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends types_demandeCreateManyAndReturnArgs>(args?: SelectSubset<T, types_demandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Types_demande.
     * @param {types_demandeDeleteArgs} args - Arguments to delete one Types_demande.
     * @example
     * // Delete one Types_demande
     * const Types_demande = await prisma.types_demande.delete({
     *   where: {
     *     // ... filter to delete one Types_demande
     *   }
     * })
     * 
     */
    delete<T extends types_demandeDeleteArgs>(args: SelectSubset<T, types_demandeDeleteArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Types_demande.
     * @param {types_demandeUpdateArgs} args - Arguments to update one Types_demande.
     * @example
     * // Update one Types_demande
     * const types_demande = await prisma.types_demande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends types_demandeUpdateArgs>(args: SelectSubset<T, types_demandeUpdateArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Types_demandes.
     * @param {types_demandeDeleteManyArgs} args - Arguments to filter Types_demandes to delete.
     * @example
     * // Delete a few Types_demandes
     * const { count } = await prisma.types_demande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends types_demandeDeleteManyArgs>(args?: SelectSubset<T, types_demandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Types_demandes
     * const types_demande = await prisma.types_demande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends types_demandeUpdateManyArgs>(args: SelectSubset<T, types_demandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types_demandes and returns the data updated in the database.
     * @param {types_demandeUpdateManyAndReturnArgs} args - Arguments to update many Types_demandes.
     * @example
     * // Update many Types_demandes
     * const types_demande = await prisma.types_demande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Types_demandes and only return the `id`
     * const types_demandeWithIdOnly = await prisma.types_demande.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends types_demandeUpdateManyAndReturnArgs>(args: SelectSubset<T, types_demandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Types_demande.
     * @param {types_demandeUpsertArgs} args - Arguments to update or create a Types_demande.
     * @example
     * // Update or create a Types_demande
     * const types_demande = await prisma.types_demande.upsert({
     *   create: {
     *     // ... data to create a Types_demande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Types_demande we want to update
     *   }
     * })
     */
    upsert<T extends types_demandeUpsertArgs>(args: SelectSubset<T, types_demandeUpsertArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Types_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeCountArgs} args - Arguments to filter Types_demandes to count.
     * @example
     * // Count the number of Types_demandes
     * const count = await prisma.types_demande.count({
     *   where: {
     *     // ... the filter for the Types_demandes we want to count
     *   }
     * })
    **/
    count<T extends types_demandeCountArgs>(
      args?: Subset<T, types_demandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Types_demandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Types_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Types_demandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Types_demandeAggregateArgs>(args: Subset<T, Types_demandeAggregateArgs>): Prisma.PrismaPromise<GetTypes_demandeAggregateType<T>>

    /**
     * Group by Types_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {types_demandeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends types_demandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: types_demandeGroupByArgs['orderBy'] }
        : { orderBy?: types_demandeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, types_demandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypes_demandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the types_demande model
   */
  readonly fields: types_demandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for types_demande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__types_demandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demandes<T extends types_demande$demandesArgs<ExtArgs> = {}>(args?: Subset<T, types_demande$demandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the types_demande model
   */
  interface types_demandeFieldRefs {
    readonly id: FieldRef<"types_demande", 'String'>
    readonly code: FieldRef<"types_demande", 'String'>
    readonly libelle: FieldRef<"types_demande", 'String'>
    readonly categorie: FieldRef<"types_demande", 'String'>
    readonly necessiteSolde: FieldRef<"types_demande", 'Boolean'>
    readonly pieceRequise: FieldRef<"types_demande", 'Boolean'>
    readonly delaiMinJours: FieldRef<"types_demande", 'Int'>
    readonly dureeMaxJours: FieldRef<"types_demande", 'Int'>
    readonly actif: FieldRef<"types_demande", 'Boolean'>
    readonly createdAt: FieldRef<"types_demande", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * types_demande findUnique
   */
  export type types_demandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter, which types_demande to fetch.
     */
    where: types_demandeWhereUniqueInput
  }

  /**
   * types_demande findUniqueOrThrow
   */
  export type types_demandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter, which types_demande to fetch.
     */
    where: types_demandeWhereUniqueInput
  }

  /**
   * types_demande findFirst
   */
  export type types_demandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter, which types_demande to fetch.
     */
    where?: types_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_demandes to fetch.
     */
    orderBy?: types_demandeOrderByWithRelationInput | types_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for types_demandes.
     */
    cursor?: types_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of types_demandes.
     */
    distinct?: Types_demandeScalarFieldEnum | Types_demandeScalarFieldEnum[]
  }

  /**
   * types_demande findFirstOrThrow
   */
  export type types_demandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter, which types_demande to fetch.
     */
    where?: types_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_demandes to fetch.
     */
    orderBy?: types_demandeOrderByWithRelationInput | types_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for types_demandes.
     */
    cursor?: types_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of types_demandes.
     */
    distinct?: Types_demandeScalarFieldEnum | Types_demandeScalarFieldEnum[]
  }

  /**
   * types_demande findMany
   */
  export type types_demandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter, which types_demandes to fetch.
     */
    where?: types_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of types_demandes to fetch.
     */
    orderBy?: types_demandeOrderByWithRelationInput | types_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing types_demandes.
     */
    cursor?: types_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` types_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` types_demandes.
     */
    skip?: number
    distinct?: Types_demandeScalarFieldEnum | Types_demandeScalarFieldEnum[]
  }

  /**
   * types_demande create
   */
  export type types_demandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * The data needed to create a types_demande.
     */
    data: XOR<types_demandeCreateInput, types_demandeUncheckedCreateInput>
  }

  /**
   * types_demande createMany
   */
  export type types_demandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many types_demandes.
     */
    data: types_demandeCreateManyInput | types_demandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * types_demande createManyAndReturn
   */
  export type types_demandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * The data used to create many types_demandes.
     */
    data: types_demandeCreateManyInput | types_demandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * types_demande update
   */
  export type types_demandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * The data needed to update a types_demande.
     */
    data: XOR<types_demandeUpdateInput, types_demandeUncheckedUpdateInput>
    /**
     * Choose, which types_demande to update.
     */
    where: types_demandeWhereUniqueInput
  }

  /**
   * types_demande updateMany
   */
  export type types_demandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update types_demandes.
     */
    data: XOR<types_demandeUpdateManyMutationInput, types_demandeUncheckedUpdateManyInput>
    /**
     * Filter which types_demandes to update
     */
    where?: types_demandeWhereInput
    /**
     * Limit how many types_demandes to update.
     */
    limit?: number
  }

  /**
   * types_demande updateManyAndReturn
   */
  export type types_demandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * The data used to update types_demandes.
     */
    data: XOR<types_demandeUpdateManyMutationInput, types_demandeUncheckedUpdateManyInput>
    /**
     * Filter which types_demandes to update
     */
    where?: types_demandeWhereInput
    /**
     * Limit how many types_demandes to update.
     */
    limit?: number
  }

  /**
   * types_demande upsert
   */
  export type types_demandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * The filter to search for the types_demande to update in case it exists.
     */
    where: types_demandeWhereUniqueInput
    /**
     * In case the types_demande found by the `where` argument doesn't exist, create a new types_demande with this data.
     */
    create: XOR<types_demandeCreateInput, types_demandeUncheckedCreateInput>
    /**
     * In case the types_demande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<types_demandeUpdateInput, types_demandeUncheckedUpdateInput>
  }

  /**
   * types_demande delete
   */
  export type types_demandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
    /**
     * Filter which types_demande to delete.
     */
    where: types_demandeWhereUniqueInput
  }

  /**
   * types_demande deleteMany
   */
  export type types_demandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which types_demandes to delete
     */
    where?: types_demandeWhereInput
    /**
     * Limit how many types_demandes to delete.
     */
    limit?: number
  }

  /**
   * types_demande.demandes
   */
  export type types_demande$demandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    where?: demandes_rhWhereInput
    orderBy?: demandes_rhOrderByWithRelationInput | demandes_rhOrderByWithRelationInput[]
    cursor?: demandes_rhWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Demandes_rhScalarFieldEnum | Demandes_rhScalarFieldEnum[]
  }

  /**
   * types_demande without action
   */
  export type types_demandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the types_demande
     */
    select?: types_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the types_demande
     */
    omit?: types_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: types_demandeInclude<ExtArgs> | null
  }


  /**
   * Model soldes_conges
   */

  export type AggregateSoldes_conges = {
    _count: Soldes_congesCountAggregateOutputType | null
    _avg: Soldes_congesAvgAggregateOutputType | null
    _sum: Soldes_congesSumAggregateOutputType | null
    _min: Soldes_congesMinAggregateOutputType | null
    _max: Soldes_congesMaxAggregateOutputType | null
  }

  export type Soldes_congesAvgAggregateOutputType = {
    annee: number | null
    joursAcquis: Decimal | null
    joursPris: Decimal | null
    joursEnAttente: Decimal | null
    reliquatN1: Decimal | null
  }

  export type Soldes_congesSumAggregateOutputType = {
    annee: number | null
    joursAcquis: Decimal | null
    joursPris: Decimal | null
    joursEnAttente: Decimal | null
    reliquatN1: Decimal | null
  }

  export type Soldes_congesMinAggregateOutputType = {
    id: string | null
    salarieId: string | null
    annee: number | null
    joursAcquis: Decimal | null
    joursPris: Decimal | null
    joursEnAttente: Decimal | null
    reliquatN1: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Soldes_congesMaxAggregateOutputType = {
    id: string | null
    salarieId: string | null
    annee: number | null
    joursAcquis: Decimal | null
    joursPris: Decimal | null
    joursEnAttente: Decimal | null
    reliquatN1: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Soldes_congesCountAggregateOutputType = {
    id: number
    salarieId: number
    annee: number
    joursAcquis: number
    joursPris: number
    joursEnAttente: number
    reliquatN1: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Soldes_congesAvgAggregateInputType = {
    annee?: true
    joursAcquis?: true
    joursPris?: true
    joursEnAttente?: true
    reliquatN1?: true
  }

  export type Soldes_congesSumAggregateInputType = {
    annee?: true
    joursAcquis?: true
    joursPris?: true
    joursEnAttente?: true
    reliquatN1?: true
  }

  export type Soldes_congesMinAggregateInputType = {
    id?: true
    salarieId?: true
    annee?: true
    joursAcquis?: true
    joursPris?: true
    joursEnAttente?: true
    reliquatN1?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Soldes_congesMaxAggregateInputType = {
    id?: true
    salarieId?: true
    annee?: true
    joursAcquis?: true
    joursPris?: true
    joursEnAttente?: true
    reliquatN1?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Soldes_congesCountAggregateInputType = {
    id?: true
    salarieId?: true
    annee?: true
    joursAcquis?: true
    joursPris?: true
    joursEnAttente?: true
    reliquatN1?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Soldes_congesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which soldes_conges to aggregate.
     */
    where?: soldes_congesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldes_conges to fetch.
     */
    orderBy?: soldes_congesOrderByWithRelationInput | soldes_congesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: soldes_congesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned soldes_conges
    **/
    _count?: true | Soldes_congesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Soldes_congesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Soldes_congesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Soldes_congesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Soldes_congesMaxAggregateInputType
  }

  export type GetSoldes_congesAggregateType<T extends Soldes_congesAggregateArgs> = {
        [P in keyof T & keyof AggregateSoldes_conges]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoldes_conges[P]>
      : GetScalarType<T[P], AggregateSoldes_conges[P]>
  }




  export type soldes_congesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: soldes_congesWhereInput
    orderBy?: soldes_congesOrderByWithAggregationInput | soldes_congesOrderByWithAggregationInput[]
    by: Soldes_congesScalarFieldEnum[] | Soldes_congesScalarFieldEnum
    having?: soldes_congesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Soldes_congesCountAggregateInputType | true
    _avg?: Soldes_congesAvgAggregateInputType
    _sum?: Soldes_congesSumAggregateInputType
    _min?: Soldes_congesMinAggregateInputType
    _max?: Soldes_congesMaxAggregateInputType
  }

  export type Soldes_congesGroupByOutputType = {
    id: string
    salarieId: string
    annee: number
    joursAcquis: Decimal
    joursPris: Decimal
    joursEnAttente: Decimal
    reliquatN1: Decimal
    createdAt: Date
    updatedAt: Date
    _count: Soldes_congesCountAggregateOutputType | null
    _avg: Soldes_congesAvgAggregateOutputType | null
    _sum: Soldes_congesSumAggregateOutputType | null
    _min: Soldes_congesMinAggregateOutputType | null
    _max: Soldes_congesMaxAggregateOutputType | null
  }

  type GetSoldes_congesGroupByPayload<T extends soldes_congesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Soldes_congesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Soldes_congesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Soldes_congesGroupByOutputType[P]>
            : GetScalarType<T[P], Soldes_congesGroupByOutputType[P]>
        }
      >
    >


  export type soldes_congesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salarieId?: boolean
    annee?: boolean
    joursAcquis?: boolean
    joursPris?: boolean
    joursEnAttente?: boolean
    reliquatN1?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldes_conges"]>

  export type soldes_congesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salarieId?: boolean
    annee?: boolean
    joursAcquis?: boolean
    joursPris?: boolean
    joursEnAttente?: boolean
    reliquatN1?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldes_conges"]>

  export type soldes_congesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salarieId?: boolean
    annee?: boolean
    joursAcquis?: boolean
    joursPris?: boolean
    joursEnAttente?: boolean
    reliquatN1?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldes_conges"]>

  export type soldes_congesSelectScalar = {
    id?: boolean
    salarieId?: boolean
    annee?: boolean
    joursAcquis?: boolean
    joursPris?: boolean
    joursEnAttente?: boolean
    reliquatN1?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type soldes_congesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "salarieId" | "annee" | "joursAcquis" | "joursPris" | "joursEnAttente" | "reliquatN1" | "createdAt" | "updatedAt", ExtArgs["result"]["soldes_conges"]>

  export type $soldes_congesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "soldes_conges"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      salarieId: string
      annee: number
      joursAcquis: Prisma.Decimal
      joursPris: Prisma.Decimal
      joursEnAttente: Prisma.Decimal
      reliquatN1: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["soldes_conges"]>
    composites: {}
  }

  type soldes_congesGetPayload<S extends boolean | null | undefined | soldes_congesDefaultArgs> = $Result.GetResult<Prisma.$soldes_congesPayload, S>

  type soldes_congesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<soldes_congesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Soldes_congesCountAggregateInputType | true
    }

  export interface soldes_congesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['soldes_conges'], meta: { name: 'soldes_conges' } }
    /**
     * Find zero or one Soldes_conges that matches the filter.
     * @param {soldes_congesFindUniqueArgs} args - Arguments to find a Soldes_conges
     * @example
     * // Get one Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends soldes_congesFindUniqueArgs>(args: SelectSubset<T, soldes_congesFindUniqueArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Soldes_conges that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {soldes_congesFindUniqueOrThrowArgs} args - Arguments to find a Soldes_conges
     * @example
     * // Get one Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends soldes_congesFindUniqueOrThrowArgs>(args: SelectSubset<T, soldes_congesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Soldes_conges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesFindFirstArgs} args - Arguments to find a Soldes_conges
     * @example
     * // Get one Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends soldes_congesFindFirstArgs>(args?: SelectSubset<T, soldes_congesFindFirstArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Soldes_conges that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesFindFirstOrThrowArgs} args - Arguments to find a Soldes_conges
     * @example
     * // Get one Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends soldes_congesFindFirstOrThrowArgs>(args?: SelectSubset<T, soldes_congesFindFirstOrThrowArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Soldes_conges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findMany()
     * 
     * // Get first 10 Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soldes_congesWithIdOnly = await prisma.soldes_conges.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends soldes_congesFindManyArgs>(args?: SelectSubset<T, soldes_congesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Soldes_conges.
     * @param {soldes_congesCreateArgs} args - Arguments to create a Soldes_conges.
     * @example
     * // Create one Soldes_conges
     * const Soldes_conges = await prisma.soldes_conges.create({
     *   data: {
     *     // ... data to create a Soldes_conges
     *   }
     * })
     * 
     */
    create<T extends soldes_congesCreateArgs>(args: SelectSubset<T, soldes_congesCreateArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Soldes_conges.
     * @param {soldes_congesCreateManyArgs} args - Arguments to create many Soldes_conges.
     * @example
     * // Create many Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends soldes_congesCreateManyArgs>(args?: SelectSubset<T, soldes_congesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Soldes_conges and returns the data saved in the database.
     * @param {soldes_congesCreateManyAndReturnArgs} args - Arguments to create many Soldes_conges.
     * @example
     * // Create many Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Soldes_conges and only return the `id`
     * const soldes_congesWithIdOnly = await prisma.soldes_conges.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends soldes_congesCreateManyAndReturnArgs>(args?: SelectSubset<T, soldes_congesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Soldes_conges.
     * @param {soldes_congesDeleteArgs} args - Arguments to delete one Soldes_conges.
     * @example
     * // Delete one Soldes_conges
     * const Soldes_conges = await prisma.soldes_conges.delete({
     *   where: {
     *     // ... filter to delete one Soldes_conges
     *   }
     * })
     * 
     */
    delete<T extends soldes_congesDeleteArgs>(args: SelectSubset<T, soldes_congesDeleteArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Soldes_conges.
     * @param {soldes_congesUpdateArgs} args - Arguments to update one Soldes_conges.
     * @example
     * // Update one Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends soldes_congesUpdateArgs>(args: SelectSubset<T, soldes_congesUpdateArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Soldes_conges.
     * @param {soldes_congesDeleteManyArgs} args - Arguments to filter Soldes_conges to delete.
     * @example
     * // Delete a few Soldes_conges
     * const { count } = await prisma.soldes_conges.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends soldes_congesDeleteManyArgs>(args?: SelectSubset<T, soldes_congesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Soldes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends soldes_congesUpdateManyArgs>(args: SelectSubset<T, soldes_congesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Soldes_conges and returns the data updated in the database.
     * @param {soldes_congesUpdateManyAndReturnArgs} args - Arguments to update many Soldes_conges.
     * @example
     * // Update many Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Soldes_conges and only return the `id`
     * const soldes_congesWithIdOnly = await prisma.soldes_conges.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends soldes_congesUpdateManyAndReturnArgs>(args: SelectSubset<T, soldes_congesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Soldes_conges.
     * @param {soldes_congesUpsertArgs} args - Arguments to update or create a Soldes_conges.
     * @example
     * // Update or create a Soldes_conges
     * const soldes_conges = await prisma.soldes_conges.upsert({
     *   create: {
     *     // ... data to create a Soldes_conges
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Soldes_conges we want to update
     *   }
     * })
     */
    upsert<T extends soldes_congesUpsertArgs>(args: SelectSubset<T, soldes_congesUpsertArgs<ExtArgs>>): Prisma__soldes_congesClient<$Result.GetResult<Prisma.$soldes_congesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Soldes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesCountArgs} args - Arguments to filter Soldes_conges to count.
     * @example
     * // Count the number of Soldes_conges
     * const count = await prisma.soldes_conges.count({
     *   where: {
     *     // ... the filter for the Soldes_conges we want to count
     *   }
     * })
    **/
    count<T extends soldes_congesCountArgs>(
      args?: Subset<T, soldes_congesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Soldes_congesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Soldes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Soldes_congesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Soldes_congesAggregateArgs>(args: Subset<T, Soldes_congesAggregateArgs>): Prisma.PrismaPromise<GetSoldes_congesAggregateType<T>>

    /**
     * Group by Soldes_conges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {soldes_congesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends soldes_congesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: soldes_congesGroupByArgs['orderBy'] }
        : { orderBy?: soldes_congesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, soldes_congesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoldes_congesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the soldes_conges model
   */
  readonly fields: soldes_congesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for soldes_conges.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__soldes_congesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the soldes_conges model
   */
  interface soldes_congesFieldRefs {
    readonly id: FieldRef<"soldes_conges", 'String'>
    readonly salarieId: FieldRef<"soldes_conges", 'String'>
    readonly annee: FieldRef<"soldes_conges", 'Int'>
    readonly joursAcquis: FieldRef<"soldes_conges", 'Decimal'>
    readonly joursPris: FieldRef<"soldes_conges", 'Decimal'>
    readonly joursEnAttente: FieldRef<"soldes_conges", 'Decimal'>
    readonly reliquatN1: FieldRef<"soldes_conges", 'Decimal'>
    readonly createdAt: FieldRef<"soldes_conges", 'DateTime'>
    readonly updatedAt: FieldRef<"soldes_conges", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * soldes_conges findUnique
   */
  export type soldes_congesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter, which soldes_conges to fetch.
     */
    where: soldes_congesWhereUniqueInput
  }

  /**
   * soldes_conges findUniqueOrThrow
   */
  export type soldes_congesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter, which soldes_conges to fetch.
     */
    where: soldes_congesWhereUniqueInput
  }

  /**
   * soldes_conges findFirst
   */
  export type soldes_congesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter, which soldes_conges to fetch.
     */
    where?: soldes_congesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldes_conges to fetch.
     */
    orderBy?: soldes_congesOrderByWithRelationInput | soldes_congesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for soldes_conges.
     */
    cursor?: soldes_congesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of soldes_conges.
     */
    distinct?: Soldes_congesScalarFieldEnum | Soldes_congesScalarFieldEnum[]
  }

  /**
   * soldes_conges findFirstOrThrow
   */
  export type soldes_congesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter, which soldes_conges to fetch.
     */
    where?: soldes_congesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldes_conges to fetch.
     */
    orderBy?: soldes_congesOrderByWithRelationInput | soldes_congesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for soldes_conges.
     */
    cursor?: soldes_congesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldes_conges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of soldes_conges.
     */
    distinct?: Soldes_congesScalarFieldEnum | Soldes_congesScalarFieldEnum[]
  }

  /**
   * soldes_conges findMany
   */
  export type soldes_congesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter, which soldes_conges to fetch.
     */
    where?: soldes_congesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of soldes_conges to fetch.
     */
    orderBy?: soldes_congesOrderByWithRelationInput | soldes_congesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing soldes_conges.
     */
    cursor?: soldes_congesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` soldes_conges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` soldes_conges.
     */
    skip?: number
    distinct?: Soldes_congesScalarFieldEnum | Soldes_congesScalarFieldEnum[]
  }

  /**
   * soldes_conges create
   */
  export type soldes_congesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * The data needed to create a soldes_conges.
     */
    data: XOR<soldes_congesCreateInput, soldes_congesUncheckedCreateInput>
  }

  /**
   * soldes_conges createMany
   */
  export type soldes_congesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many soldes_conges.
     */
    data: soldes_congesCreateManyInput | soldes_congesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * soldes_conges createManyAndReturn
   */
  export type soldes_congesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * The data used to create many soldes_conges.
     */
    data: soldes_congesCreateManyInput | soldes_congesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * soldes_conges update
   */
  export type soldes_congesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * The data needed to update a soldes_conges.
     */
    data: XOR<soldes_congesUpdateInput, soldes_congesUncheckedUpdateInput>
    /**
     * Choose, which soldes_conges to update.
     */
    where: soldes_congesWhereUniqueInput
  }

  /**
   * soldes_conges updateMany
   */
  export type soldes_congesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update soldes_conges.
     */
    data: XOR<soldes_congesUpdateManyMutationInput, soldes_congesUncheckedUpdateManyInput>
    /**
     * Filter which soldes_conges to update
     */
    where?: soldes_congesWhereInput
    /**
     * Limit how many soldes_conges to update.
     */
    limit?: number
  }

  /**
   * soldes_conges updateManyAndReturn
   */
  export type soldes_congesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * The data used to update soldes_conges.
     */
    data: XOR<soldes_congesUpdateManyMutationInput, soldes_congesUncheckedUpdateManyInput>
    /**
     * Filter which soldes_conges to update
     */
    where?: soldes_congesWhereInput
    /**
     * Limit how many soldes_conges to update.
     */
    limit?: number
  }

  /**
   * soldes_conges upsert
   */
  export type soldes_congesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * The filter to search for the soldes_conges to update in case it exists.
     */
    where: soldes_congesWhereUniqueInput
    /**
     * In case the soldes_conges found by the `where` argument doesn't exist, create a new soldes_conges with this data.
     */
    create: XOR<soldes_congesCreateInput, soldes_congesUncheckedCreateInput>
    /**
     * In case the soldes_conges was found with the provided `where` argument, update it with this data.
     */
    update: XOR<soldes_congesUpdateInput, soldes_congesUncheckedUpdateInput>
  }

  /**
   * soldes_conges delete
   */
  export type soldes_congesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
    /**
     * Filter which soldes_conges to delete.
     */
    where: soldes_congesWhereUniqueInput
  }

  /**
   * soldes_conges deleteMany
   */
  export type soldes_congesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which soldes_conges to delete
     */
    where?: soldes_congesWhereInput
    /**
     * Limit how many soldes_conges to delete.
     */
    limit?: number
  }

  /**
   * soldes_conges without action
   */
  export type soldes_congesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the soldes_conges
     */
    select?: soldes_congesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the soldes_conges
     */
    omit?: soldes_congesOmit<ExtArgs> | null
  }


  /**
   * Model demandes_rh
   */

  export type AggregateDemandes_rh = {
    _count: Demandes_rhCountAggregateOutputType | null
    _avg: Demandes_rhAvgAggregateOutputType | null
    _sum: Demandes_rhSumAggregateOutputType | null
    _min: Demandes_rhMinAggregateOutputType | null
    _max: Demandes_rhMaxAggregateOutputType | null
  }

  export type Demandes_rhAvgAggregateOutputType = {
    nombreJours: Decimal | null
    fraisEstimes: Decimal | null
    etapeCourante: number | null
    cycleRejetCount: number | null
  }

  export type Demandes_rhSumAggregateOutputType = {
    nombreJours: Decimal | null
    fraisEstimes: Decimal | null
    etapeCourante: number | null
    cycleRejetCount: number | null
  }

  export type Demandes_rhMinAggregateOutputType = {
    id: string | null
    numeroDemande: string | null
    salarieId: string | null
    salarieNom: string | null
    salarieEmail: string | null
    salariePoste: string | null
    salarieDirection: string | null
    managerId: string | null
    typeId: string | null
    dateDebut: Date | null
    dateFin: Date | null
    demiJourneeDebut: boolean | null
    demiJourneeFin: boolean | null
    nombreJours: Decimal | null
    motif: string | null
    destination: string | null
    moyenTransport: string | null
    fraisEstimes: Decimal | null
    statut: string | null
    etapeCourante: number | null
    cycleRejetCount: number | null
    documentUrl: string | null
    numeroTitre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Demandes_rhMaxAggregateOutputType = {
    id: string | null
    numeroDemande: string | null
    salarieId: string | null
    salarieNom: string | null
    salarieEmail: string | null
    salariePoste: string | null
    salarieDirection: string | null
    managerId: string | null
    typeId: string | null
    dateDebut: Date | null
    dateFin: Date | null
    demiJourneeDebut: boolean | null
    demiJourneeFin: boolean | null
    nombreJours: Decimal | null
    motif: string | null
    destination: string | null
    moyenTransport: string | null
    fraisEstimes: Decimal | null
    statut: string | null
    etapeCourante: number | null
    cycleRejetCount: number | null
    documentUrl: string | null
    numeroTitre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Demandes_rhCountAggregateOutputType = {
    id: number
    numeroDemande: number
    salarieId: number
    salarieNom: number
    salarieEmail: number
    salariePoste: number
    salarieDirection: number
    managerId: number
    typeId: number
    dateDebut: number
    dateFin: number
    demiJourneeDebut: number
    demiJourneeFin: number
    nombreJours: number
    motif: number
    destination: number
    moyenTransport: number
    fraisEstimes: number
    statut: number
    etapeCourante: number
    cycleRejetCount: number
    documentUrl: number
    numeroTitre: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Demandes_rhAvgAggregateInputType = {
    nombreJours?: true
    fraisEstimes?: true
    etapeCourante?: true
    cycleRejetCount?: true
  }

  export type Demandes_rhSumAggregateInputType = {
    nombreJours?: true
    fraisEstimes?: true
    etapeCourante?: true
    cycleRejetCount?: true
  }

  export type Demandes_rhMinAggregateInputType = {
    id?: true
    numeroDemande?: true
    salarieId?: true
    salarieNom?: true
    salarieEmail?: true
    salariePoste?: true
    salarieDirection?: true
    managerId?: true
    typeId?: true
    dateDebut?: true
    dateFin?: true
    demiJourneeDebut?: true
    demiJourneeFin?: true
    nombreJours?: true
    motif?: true
    destination?: true
    moyenTransport?: true
    fraisEstimes?: true
    statut?: true
    etapeCourante?: true
    cycleRejetCount?: true
    documentUrl?: true
    numeroTitre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Demandes_rhMaxAggregateInputType = {
    id?: true
    numeroDemande?: true
    salarieId?: true
    salarieNom?: true
    salarieEmail?: true
    salariePoste?: true
    salarieDirection?: true
    managerId?: true
    typeId?: true
    dateDebut?: true
    dateFin?: true
    demiJourneeDebut?: true
    demiJourneeFin?: true
    nombreJours?: true
    motif?: true
    destination?: true
    moyenTransport?: true
    fraisEstimes?: true
    statut?: true
    etapeCourante?: true
    cycleRejetCount?: true
    documentUrl?: true
    numeroTitre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Demandes_rhCountAggregateInputType = {
    id?: true
    numeroDemande?: true
    salarieId?: true
    salarieNom?: true
    salarieEmail?: true
    salariePoste?: true
    salarieDirection?: true
    managerId?: true
    typeId?: true
    dateDebut?: true
    dateFin?: true
    demiJourneeDebut?: true
    demiJourneeFin?: true
    nombreJours?: true
    motif?: true
    destination?: true
    moyenTransport?: true
    fraisEstimes?: true
    statut?: true
    etapeCourante?: true
    cycleRejetCount?: true
    documentUrl?: true
    numeroTitre?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Demandes_rhAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which demandes_rh to aggregate.
     */
    where?: demandes_rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_rhs to fetch.
     */
    orderBy?: demandes_rhOrderByWithRelationInput | demandes_rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: demandes_rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned demandes_rhs
    **/
    _count?: true | Demandes_rhCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Demandes_rhAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Demandes_rhSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Demandes_rhMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Demandes_rhMaxAggregateInputType
  }

  export type GetDemandes_rhAggregateType<T extends Demandes_rhAggregateArgs> = {
        [P in keyof T & keyof AggregateDemandes_rh]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemandes_rh[P]>
      : GetScalarType<T[P], AggregateDemandes_rh[P]>
  }




  export type demandes_rhGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: demandes_rhWhereInput
    orderBy?: demandes_rhOrderByWithAggregationInput | demandes_rhOrderByWithAggregationInput[]
    by: Demandes_rhScalarFieldEnum[] | Demandes_rhScalarFieldEnum
    having?: demandes_rhScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Demandes_rhCountAggregateInputType | true
    _avg?: Demandes_rhAvgAggregateInputType
    _sum?: Demandes_rhSumAggregateInputType
    _min?: Demandes_rhMinAggregateInputType
    _max?: Demandes_rhMaxAggregateInputType
  }

  export type Demandes_rhGroupByOutputType = {
    id: string
    numeroDemande: string
    salarieId: string
    salarieNom: string | null
    salarieEmail: string | null
    salariePoste: string | null
    salarieDirection: string | null
    managerId: string | null
    typeId: string
    dateDebut: Date
    dateFin: Date
    demiJourneeDebut: boolean
    demiJourneeFin: boolean
    nombreJours: Decimal
    motif: string
    destination: string | null
    moyenTransport: string | null
    fraisEstimes: Decimal | null
    statut: string
    etapeCourante: number
    cycleRejetCount: number
    documentUrl: string | null
    numeroTitre: string | null
    createdAt: Date
    updatedAt: Date
    _count: Demandes_rhCountAggregateOutputType | null
    _avg: Demandes_rhAvgAggregateOutputType | null
    _sum: Demandes_rhSumAggregateOutputType | null
    _min: Demandes_rhMinAggregateOutputType | null
    _max: Demandes_rhMaxAggregateOutputType | null
  }

  type GetDemandes_rhGroupByPayload<T extends demandes_rhGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Demandes_rhGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Demandes_rhGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Demandes_rhGroupByOutputType[P]>
            : GetScalarType<T[P], Demandes_rhGroupByOutputType[P]>
        }
      >
    >


  export type demandes_rhSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroDemande?: boolean
    salarieId?: boolean
    salarieNom?: boolean
    salarieEmail?: boolean
    salariePoste?: boolean
    salarieDirection?: boolean
    managerId?: boolean
    typeId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours?: boolean
    motif?: boolean
    destination?: boolean
    moyenTransport?: boolean
    fraisEstimes?: boolean
    statut?: boolean
    etapeCourante?: boolean
    cycleRejetCount?: boolean
    documentUrl?: boolean
    numeroTitre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
    validations?: boolean | demandes_rh$validationsArgs<ExtArgs>
    piecesJointes?: boolean | demandes_rh$piecesJointesArgs<ExtArgs>
    historique?: boolean | demandes_rh$historiqueArgs<ExtArgs>
    _count?: boolean | Demandes_rhCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_rh"]>

  export type demandes_rhSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroDemande?: boolean
    salarieId?: boolean
    salarieNom?: boolean
    salarieEmail?: boolean
    salariePoste?: boolean
    salarieDirection?: boolean
    managerId?: boolean
    typeId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours?: boolean
    motif?: boolean
    destination?: boolean
    moyenTransport?: boolean
    fraisEstimes?: boolean
    statut?: boolean
    etapeCourante?: boolean
    cycleRejetCount?: boolean
    documentUrl?: boolean
    numeroTitre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_rh"]>

  export type demandes_rhSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroDemande?: boolean
    salarieId?: boolean
    salarieNom?: boolean
    salarieEmail?: boolean
    salariePoste?: boolean
    salarieDirection?: boolean
    managerId?: boolean
    typeId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours?: boolean
    motif?: boolean
    destination?: boolean
    moyenTransport?: boolean
    fraisEstimes?: boolean
    statut?: boolean
    etapeCourante?: boolean
    cycleRejetCount?: boolean
    documentUrl?: boolean
    numeroTitre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandes_rh"]>

  export type demandes_rhSelectScalar = {
    id?: boolean
    numeroDemande?: boolean
    salarieId?: boolean
    salarieNom?: boolean
    salarieEmail?: boolean
    salariePoste?: boolean
    salarieDirection?: boolean
    managerId?: boolean
    typeId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours?: boolean
    motif?: boolean
    destination?: boolean
    moyenTransport?: boolean
    fraisEstimes?: boolean
    statut?: boolean
    etapeCourante?: boolean
    cycleRejetCount?: boolean
    documentUrl?: boolean
    numeroTitre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type demandes_rhOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroDemande" | "salarieId" | "salarieNom" | "salarieEmail" | "salariePoste" | "salarieDirection" | "managerId" | "typeId" | "dateDebut" | "dateFin" | "demiJourneeDebut" | "demiJourneeFin" | "nombreJours" | "motif" | "destination" | "moyenTransport" | "fraisEstimes" | "statut" | "etapeCourante" | "cycleRejetCount" | "documentUrl" | "numeroTitre" | "createdAt" | "updatedAt", ExtArgs["result"]["demandes_rh"]>
  export type demandes_rhInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
    validations?: boolean | demandes_rh$validationsArgs<ExtArgs>
    piecesJointes?: boolean | demandes_rh$piecesJointesArgs<ExtArgs>
    historique?: boolean | demandes_rh$historiqueArgs<ExtArgs>
    _count?: boolean | Demandes_rhCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type demandes_rhIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
  }
  export type demandes_rhIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    typeDemande?: boolean | types_demandeDefaultArgs<ExtArgs>
  }

  export type $demandes_rhPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "demandes_rh"
    objects: {
      typeDemande: Prisma.$types_demandePayload<ExtArgs>
      validations: Prisma.$validations_demandePayload<ExtArgs>[]
      piecesJointes: Prisma.$pieces_jointes_demandePayload<ExtArgs>[]
      historique: Prisma.$historique_demandePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numeroDemande: string
      salarieId: string
      salarieNom: string | null
      salarieEmail: string | null
      salariePoste: string | null
      salarieDirection: string | null
      managerId: string | null
      typeId: string
      dateDebut: Date
      dateFin: Date
      demiJourneeDebut: boolean
      demiJourneeFin: boolean
      nombreJours: Prisma.Decimal
      motif: string
      destination: string | null
      moyenTransport: string | null
      fraisEstimes: Prisma.Decimal | null
      statut: string
      etapeCourante: number
      cycleRejetCount: number
      documentUrl: string | null
      numeroTitre: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["demandes_rh"]>
    composites: {}
  }

  type demandes_rhGetPayload<S extends boolean | null | undefined | demandes_rhDefaultArgs> = $Result.GetResult<Prisma.$demandes_rhPayload, S>

  type demandes_rhCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<demandes_rhFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Demandes_rhCountAggregateInputType | true
    }

  export interface demandes_rhDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['demandes_rh'], meta: { name: 'demandes_rh' } }
    /**
     * Find zero or one Demandes_rh that matches the filter.
     * @param {demandes_rhFindUniqueArgs} args - Arguments to find a Demandes_rh
     * @example
     * // Get one Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends demandes_rhFindUniqueArgs>(args: SelectSubset<T, demandes_rhFindUniqueArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Demandes_rh that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {demandes_rhFindUniqueOrThrowArgs} args - Arguments to find a Demandes_rh
     * @example
     * // Get one Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends demandes_rhFindUniqueOrThrowArgs>(args: SelectSubset<T, demandes_rhFindUniqueOrThrowArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandes_rh that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhFindFirstArgs} args - Arguments to find a Demandes_rh
     * @example
     * // Get one Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends demandes_rhFindFirstArgs>(args?: SelectSubset<T, demandes_rhFindFirstArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandes_rh that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhFindFirstOrThrowArgs} args - Arguments to find a Demandes_rh
     * @example
     * // Get one Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends demandes_rhFindFirstOrThrowArgs>(args?: SelectSubset<T, demandes_rhFindFirstOrThrowArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Demandes_rhs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Demandes_rhs
     * const demandes_rhs = await prisma.demandes_rh.findMany()
     * 
     * // Get first 10 Demandes_rhs
     * const demandes_rhs = await prisma.demandes_rh.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const demandes_rhWithIdOnly = await prisma.demandes_rh.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends demandes_rhFindManyArgs>(args?: SelectSubset<T, demandes_rhFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Demandes_rh.
     * @param {demandes_rhCreateArgs} args - Arguments to create a Demandes_rh.
     * @example
     * // Create one Demandes_rh
     * const Demandes_rh = await prisma.demandes_rh.create({
     *   data: {
     *     // ... data to create a Demandes_rh
     *   }
     * })
     * 
     */
    create<T extends demandes_rhCreateArgs>(args: SelectSubset<T, demandes_rhCreateArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Demandes_rhs.
     * @param {demandes_rhCreateManyArgs} args - Arguments to create many Demandes_rhs.
     * @example
     * // Create many Demandes_rhs
     * const demandes_rh = await prisma.demandes_rh.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends demandes_rhCreateManyArgs>(args?: SelectSubset<T, demandes_rhCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Demandes_rhs and returns the data saved in the database.
     * @param {demandes_rhCreateManyAndReturnArgs} args - Arguments to create many Demandes_rhs.
     * @example
     * // Create many Demandes_rhs
     * const demandes_rh = await prisma.demandes_rh.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Demandes_rhs and only return the `id`
     * const demandes_rhWithIdOnly = await prisma.demandes_rh.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends demandes_rhCreateManyAndReturnArgs>(args?: SelectSubset<T, demandes_rhCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Demandes_rh.
     * @param {demandes_rhDeleteArgs} args - Arguments to delete one Demandes_rh.
     * @example
     * // Delete one Demandes_rh
     * const Demandes_rh = await prisma.demandes_rh.delete({
     *   where: {
     *     // ... filter to delete one Demandes_rh
     *   }
     * })
     * 
     */
    delete<T extends demandes_rhDeleteArgs>(args: SelectSubset<T, demandes_rhDeleteArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Demandes_rh.
     * @param {demandes_rhUpdateArgs} args - Arguments to update one Demandes_rh.
     * @example
     * // Update one Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends demandes_rhUpdateArgs>(args: SelectSubset<T, demandes_rhUpdateArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Demandes_rhs.
     * @param {demandes_rhDeleteManyArgs} args - Arguments to filter Demandes_rhs to delete.
     * @example
     * // Delete a few Demandes_rhs
     * const { count } = await prisma.demandes_rh.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends demandes_rhDeleteManyArgs>(args?: SelectSubset<T, demandes_rhDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demandes_rhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Demandes_rhs
     * const demandes_rh = await prisma.demandes_rh.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends demandes_rhUpdateManyArgs>(args: SelectSubset<T, demandes_rhUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demandes_rhs and returns the data updated in the database.
     * @param {demandes_rhUpdateManyAndReturnArgs} args - Arguments to update many Demandes_rhs.
     * @example
     * // Update many Demandes_rhs
     * const demandes_rh = await prisma.demandes_rh.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Demandes_rhs and only return the `id`
     * const demandes_rhWithIdOnly = await prisma.demandes_rh.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends demandes_rhUpdateManyAndReturnArgs>(args: SelectSubset<T, demandes_rhUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Demandes_rh.
     * @param {demandes_rhUpsertArgs} args - Arguments to update or create a Demandes_rh.
     * @example
     * // Update or create a Demandes_rh
     * const demandes_rh = await prisma.demandes_rh.upsert({
     *   create: {
     *     // ... data to create a Demandes_rh
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Demandes_rh we want to update
     *   }
     * })
     */
    upsert<T extends demandes_rhUpsertArgs>(args: SelectSubset<T, demandes_rhUpsertArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Demandes_rhs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhCountArgs} args - Arguments to filter Demandes_rhs to count.
     * @example
     * // Count the number of Demandes_rhs
     * const count = await prisma.demandes_rh.count({
     *   where: {
     *     // ... the filter for the Demandes_rhs we want to count
     *   }
     * })
    **/
    count<T extends demandes_rhCountArgs>(
      args?: Subset<T, demandes_rhCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Demandes_rhCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Demandes_rh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Demandes_rhAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Demandes_rhAggregateArgs>(args: Subset<T, Demandes_rhAggregateArgs>): Prisma.PrismaPromise<GetDemandes_rhAggregateType<T>>

    /**
     * Group by Demandes_rh.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {demandes_rhGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends demandes_rhGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: demandes_rhGroupByArgs['orderBy'] }
        : { orderBy?: demandes_rhGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, demandes_rhGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemandes_rhGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the demandes_rh model
   */
  readonly fields: demandes_rhFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for demandes_rh.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__demandes_rhClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    typeDemande<T extends types_demandeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, types_demandeDefaultArgs<ExtArgs>>): Prisma__types_demandeClient<$Result.GetResult<Prisma.$types_demandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    validations<T extends demandes_rh$validationsArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rh$validationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    piecesJointes<T extends demandes_rh$piecesJointesArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rh$piecesJointesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historique<T extends demandes_rh$historiqueArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rh$historiqueArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the demandes_rh model
   */
  interface demandes_rhFieldRefs {
    readonly id: FieldRef<"demandes_rh", 'String'>
    readonly numeroDemande: FieldRef<"demandes_rh", 'String'>
    readonly salarieId: FieldRef<"demandes_rh", 'String'>
    readonly salarieNom: FieldRef<"demandes_rh", 'String'>
    readonly salarieEmail: FieldRef<"demandes_rh", 'String'>
    readonly salariePoste: FieldRef<"demandes_rh", 'String'>
    readonly salarieDirection: FieldRef<"demandes_rh", 'String'>
    readonly managerId: FieldRef<"demandes_rh", 'String'>
    readonly typeId: FieldRef<"demandes_rh", 'String'>
    readonly dateDebut: FieldRef<"demandes_rh", 'DateTime'>
    readonly dateFin: FieldRef<"demandes_rh", 'DateTime'>
    readonly demiJourneeDebut: FieldRef<"demandes_rh", 'Boolean'>
    readonly demiJourneeFin: FieldRef<"demandes_rh", 'Boolean'>
    readonly nombreJours: FieldRef<"demandes_rh", 'Decimal'>
    readonly motif: FieldRef<"demandes_rh", 'String'>
    readonly destination: FieldRef<"demandes_rh", 'String'>
    readonly moyenTransport: FieldRef<"demandes_rh", 'String'>
    readonly fraisEstimes: FieldRef<"demandes_rh", 'Decimal'>
    readonly statut: FieldRef<"demandes_rh", 'String'>
    readonly etapeCourante: FieldRef<"demandes_rh", 'Int'>
    readonly cycleRejetCount: FieldRef<"demandes_rh", 'Int'>
    readonly documentUrl: FieldRef<"demandes_rh", 'String'>
    readonly numeroTitre: FieldRef<"demandes_rh", 'String'>
    readonly createdAt: FieldRef<"demandes_rh", 'DateTime'>
    readonly updatedAt: FieldRef<"demandes_rh", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * demandes_rh findUnique
   */
  export type demandes_rhFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter, which demandes_rh to fetch.
     */
    where: demandes_rhWhereUniqueInput
  }

  /**
   * demandes_rh findUniqueOrThrow
   */
  export type demandes_rhFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter, which demandes_rh to fetch.
     */
    where: demandes_rhWhereUniqueInput
  }

  /**
   * demandes_rh findFirst
   */
  export type demandes_rhFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter, which demandes_rh to fetch.
     */
    where?: demandes_rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_rhs to fetch.
     */
    orderBy?: demandes_rhOrderByWithRelationInput | demandes_rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for demandes_rhs.
     */
    cursor?: demandes_rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of demandes_rhs.
     */
    distinct?: Demandes_rhScalarFieldEnum | Demandes_rhScalarFieldEnum[]
  }

  /**
   * demandes_rh findFirstOrThrow
   */
  export type demandes_rhFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter, which demandes_rh to fetch.
     */
    where?: demandes_rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_rhs to fetch.
     */
    orderBy?: demandes_rhOrderByWithRelationInput | demandes_rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for demandes_rhs.
     */
    cursor?: demandes_rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_rhs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of demandes_rhs.
     */
    distinct?: Demandes_rhScalarFieldEnum | Demandes_rhScalarFieldEnum[]
  }

  /**
   * demandes_rh findMany
   */
  export type demandes_rhFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter, which demandes_rhs to fetch.
     */
    where?: demandes_rhWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of demandes_rhs to fetch.
     */
    orderBy?: demandes_rhOrderByWithRelationInput | demandes_rhOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing demandes_rhs.
     */
    cursor?: demandes_rhWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` demandes_rhs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` demandes_rhs.
     */
    skip?: number
    distinct?: Demandes_rhScalarFieldEnum | Demandes_rhScalarFieldEnum[]
  }

  /**
   * demandes_rh create
   */
  export type demandes_rhCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * The data needed to create a demandes_rh.
     */
    data: XOR<demandes_rhCreateInput, demandes_rhUncheckedCreateInput>
  }

  /**
   * demandes_rh createMany
   */
  export type demandes_rhCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many demandes_rhs.
     */
    data: demandes_rhCreateManyInput | demandes_rhCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * demandes_rh createManyAndReturn
   */
  export type demandes_rhCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * The data used to create many demandes_rhs.
     */
    data: demandes_rhCreateManyInput | demandes_rhCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * demandes_rh update
   */
  export type demandes_rhUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * The data needed to update a demandes_rh.
     */
    data: XOR<demandes_rhUpdateInput, demandes_rhUncheckedUpdateInput>
    /**
     * Choose, which demandes_rh to update.
     */
    where: demandes_rhWhereUniqueInput
  }

  /**
   * demandes_rh updateMany
   */
  export type demandes_rhUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update demandes_rhs.
     */
    data: XOR<demandes_rhUpdateManyMutationInput, demandes_rhUncheckedUpdateManyInput>
    /**
     * Filter which demandes_rhs to update
     */
    where?: demandes_rhWhereInput
    /**
     * Limit how many demandes_rhs to update.
     */
    limit?: number
  }

  /**
   * demandes_rh updateManyAndReturn
   */
  export type demandes_rhUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * The data used to update demandes_rhs.
     */
    data: XOR<demandes_rhUpdateManyMutationInput, demandes_rhUncheckedUpdateManyInput>
    /**
     * Filter which demandes_rhs to update
     */
    where?: demandes_rhWhereInput
    /**
     * Limit how many demandes_rhs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * demandes_rh upsert
   */
  export type demandes_rhUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * The filter to search for the demandes_rh to update in case it exists.
     */
    where: demandes_rhWhereUniqueInput
    /**
     * In case the demandes_rh found by the `where` argument doesn't exist, create a new demandes_rh with this data.
     */
    create: XOR<demandes_rhCreateInput, demandes_rhUncheckedCreateInput>
    /**
     * In case the demandes_rh was found with the provided `where` argument, update it with this data.
     */
    update: XOR<demandes_rhUpdateInput, demandes_rhUncheckedUpdateInput>
  }

  /**
   * demandes_rh delete
   */
  export type demandes_rhDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
    /**
     * Filter which demandes_rh to delete.
     */
    where: demandes_rhWhereUniqueInput
  }

  /**
   * demandes_rh deleteMany
   */
  export type demandes_rhDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which demandes_rhs to delete
     */
    where?: demandes_rhWhereInput
    /**
     * Limit how many demandes_rhs to delete.
     */
    limit?: number
  }

  /**
   * demandes_rh.validations
   */
  export type demandes_rh$validationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    where?: validations_demandeWhereInput
    orderBy?: validations_demandeOrderByWithRelationInput | validations_demandeOrderByWithRelationInput[]
    cursor?: validations_demandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Validations_demandeScalarFieldEnum | Validations_demandeScalarFieldEnum[]
  }

  /**
   * demandes_rh.piecesJointes
   */
  export type demandes_rh$piecesJointesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    where?: pieces_jointes_demandeWhereInput
    orderBy?: pieces_jointes_demandeOrderByWithRelationInput | pieces_jointes_demandeOrderByWithRelationInput[]
    cursor?: pieces_jointes_demandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Pieces_jointes_demandeScalarFieldEnum | Pieces_jointes_demandeScalarFieldEnum[]
  }

  /**
   * demandes_rh.historique
   */
  export type demandes_rh$historiqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    where?: historique_demandeWhereInput
    orderBy?: historique_demandeOrderByWithRelationInput | historique_demandeOrderByWithRelationInput[]
    cursor?: historique_demandeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Historique_demandeScalarFieldEnum | Historique_demandeScalarFieldEnum[]
  }

  /**
   * demandes_rh without action
   */
  export type demandes_rhDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the demandes_rh
     */
    select?: demandes_rhSelect<ExtArgs> | null
    /**
     * Omit specific fields from the demandes_rh
     */
    omit?: demandes_rhOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: demandes_rhInclude<ExtArgs> | null
  }


  /**
   * Model validations_demande
   */

  export type AggregateValidations_demande = {
    _count: Validations_demandeCountAggregateOutputType | null
    _avg: Validations_demandeAvgAggregateOutputType | null
    _sum: Validations_demandeSumAggregateOutputType | null
    _min: Validations_demandeMinAggregateOutputType | null
    _max: Validations_demandeMaxAggregateOutputType | null
  }

  export type Validations_demandeAvgAggregateOutputType = {
    etape: number | null
  }

  export type Validations_demandeSumAggregateOutputType = {
    etape: number | null
  }

  export type Validations_demandeMinAggregateOutputType = {
    id: string | null
    demandeId: string | null
    etape: number | null
    valideurId: string | null
    valideurNom: string | null
    valideurRole: string | null
    decision: string | null
    motif: string | null
    dateDecision: Date | null
  }

  export type Validations_demandeMaxAggregateOutputType = {
    id: string | null
    demandeId: string | null
    etape: number | null
    valideurId: string | null
    valideurNom: string | null
    valideurRole: string | null
    decision: string | null
    motif: string | null
    dateDecision: Date | null
  }

  export type Validations_demandeCountAggregateOutputType = {
    id: number
    demandeId: number
    etape: number
    valideurId: number
    valideurNom: number
    valideurRole: number
    decision: number
    motif: number
    dateDecision: number
    _all: number
  }


  export type Validations_demandeAvgAggregateInputType = {
    etape?: true
  }

  export type Validations_demandeSumAggregateInputType = {
    etape?: true
  }

  export type Validations_demandeMinAggregateInputType = {
    id?: true
    demandeId?: true
    etape?: true
    valideurId?: true
    valideurNom?: true
    valideurRole?: true
    decision?: true
    motif?: true
    dateDecision?: true
  }

  export type Validations_demandeMaxAggregateInputType = {
    id?: true
    demandeId?: true
    etape?: true
    valideurId?: true
    valideurNom?: true
    valideurRole?: true
    decision?: true
    motif?: true
    dateDecision?: true
  }

  export type Validations_demandeCountAggregateInputType = {
    id?: true
    demandeId?: true
    etape?: true
    valideurId?: true
    valideurNom?: true
    valideurRole?: true
    decision?: true
    motif?: true
    dateDecision?: true
    _all?: true
  }

  export type Validations_demandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which validations_demande to aggregate.
     */
    where?: validations_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of validations_demandes to fetch.
     */
    orderBy?: validations_demandeOrderByWithRelationInput | validations_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: validations_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` validations_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` validations_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned validations_demandes
    **/
    _count?: true | Validations_demandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Validations_demandeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Validations_demandeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Validations_demandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Validations_demandeMaxAggregateInputType
  }

  export type GetValidations_demandeAggregateType<T extends Validations_demandeAggregateArgs> = {
        [P in keyof T & keyof AggregateValidations_demande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateValidations_demande[P]>
      : GetScalarType<T[P], AggregateValidations_demande[P]>
  }




  export type validations_demandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: validations_demandeWhereInput
    orderBy?: validations_demandeOrderByWithAggregationInput | validations_demandeOrderByWithAggregationInput[]
    by: Validations_demandeScalarFieldEnum[] | Validations_demandeScalarFieldEnum
    having?: validations_demandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Validations_demandeCountAggregateInputType | true
    _avg?: Validations_demandeAvgAggregateInputType
    _sum?: Validations_demandeSumAggregateInputType
    _min?: Validations_demandeMinAggregateInputType
    _max?: Validations_demandeMaxAggregateInputType
  }

  export type Validations_demandeGroupByOutputType = {
    id: string
    demandeId: string
    etape: number
    valideurId: string
    valideurNom: string | null
    valideurRole: string | null
    decision: string
    motif: string | null
    dateDecision: Date
    _count: Validations_demandeCountAggregateOutputType | null
    _avg: Validations_demandeAvgAggregateOutputType | null
    _sum: Validations_demandeSumAggregateOutputType | null
    _min: Validations_demandeMinAggregateOutputType | null
    _max: Validations_demandeMaxAggregateOutputType | null
  }

  type GetValidations_demandeGroupByPayload<T extends validations_demandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Validations_demandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Validations_demandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Validations_demandeGroupByOutputType[P]>
            : GetScalarType<T[P], Validations_demandeGroupByOutputType[P]>
        }
      >
    >


  export type validations_demandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    etape?: boolean
    valideurId?: boolean
    valideurNom?: boolean
    valideurRole?: boolean
    decision?: boolean
    motif?: boolean
    dateDecision?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["validations_demande"]>

  export type validations_demandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    etape?: boolean
    valideurId?: boolean
    valideurNom?: boolean
    valideurRole?: boolean
    decision?: boolean
    motif?: boolean
    dateDecision?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["validations_demande"]>

  export type validations_demandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    etape?: boolean
    valideurId?: boolean
    valideurNom?: boolean
    valideurRole?: boolean
    decision?: boolean
    motif?: boolean
    dateDecision?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["validations_demande"]>

  export type validations_demandeSelectScalar = {
    id?: boolean
    demandeId?: boolean
    etape?: boolean
    valideurId?: boolean
    valideurNom?: boolean
    valideurRole?: boolean
    decision?: boolean
    motif?: boolean
    dateDecision?: boolean
  }

  export type validations_demandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "demandeId" | "etape" | "valideurId" | "valideurNom" | "valideurRole" | "decision" | "motif" | "dateDecision", ExtArgs["result"]["validations_demande"]>
  export type validations_demandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type validations_demandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type validations_demandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }

  export type $validations_demandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "validations_demande"
    objects: {
      demande: Prisma.$demandes_rhPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      demandeId: string
      etape: number
      valideurId: string
      valideurNom: string | null
      valideurRole: string | null
      decision: string
      motif: string | null
      dateDecision: Date
    }, ExtArgs["result"]["validations_demande"]>
    composites: {}
  }

  type validations_demandeGetPayload<S extends boolean | null | undefined | validations_demandeDefaultArgs> = $Result.GetResult<Prisma.$validations_demandePayload, S>

  type validations_demandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<validations_demandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Validations_demandeCountAggregateInputType | true
    }

  export interface validations_demandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['validations_demande'], meta: { name: 'validations_demande' } }
    /**
     * Find zero or one Validations_demande that matches the filter.
     * @param {validations_demandeFindUniqueArgs} args - Arguments to find a Validations_demande
     * @example
     * // Get one Validations_demande
     * const validations_demande = await prisma.validations_demande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends validations_demandeFindUniqueArgs>(args: SelectSubset<T, validations_demandeFindUniqueArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Validations_demande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {validations_demandeFindUniqueOrThrowArgs} args - Arguments to find a Validations_demande
     * @example
     * // Get one Validations_demande
     * const validations_demande = await prisma.validations_demande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends validations_demandeFindUniqueOrThrowArgs>(args: SelectSubset<T, validations_demandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Validations_demande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeFindFirstArgs} args - Arguments to find a Validations_demande
     * @example
     * // Get one Validations_demande
     * const validations_demande = await prisma.validations_demande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends validations_demandeFindFirstArgs>(args?: SelectSubset<T, validations_demandeFindFirstArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Validations_demande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeFindFirstOrThrowArgs} args - Arguments to find a Validations_demande
     * @example
     * // Get one Validations_demande
     * const validations_demande = await prisma.validations_demande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends validations_demandeFindFirstOrThrowArgs>(args?: SelectSubset<T, validations_demandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Validations_demandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Validations_demandes
     * const validations_demandes = await prisma.validations_demande.findMany()
     * 
     * // Get first 10 Validations_demandes
     * const validations_demandes = await prisma.validations_demande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const validations_demandeWithIdOnly = await prisma.validations_demande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends validations_demandeFindManyArgs>(args?: SelectSubset<T, validations_demandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Validations_demande.
     * @param {validations_demandeCreateArgs} args - Arguments to create a Validations_demande.
     * @example
     * // Create one Validations_demande
     * const Validations_demande = await prisma.validations_demande.create({
     *   data: {
     *     // ... data to create a Validations_demande
     *   }
     * })
     * 
     */
    create<T extends validations_demandeCreateArgs>(args: SelectSubset<T, validations_demandeCreateArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Validations_demandes.
     * @param {validations_demandeCreateManyArgs} args - Arguments to create many Validations_demandes.
     * @example
     * // Create many Validations_demandes
     * const validations_demande = await prisma.validations_demande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends validations_demandeCreateManyArgs>(args?: SelectSubset<T, validations_demandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Validations_demandes and returns the data saved in the database.
     * @param {validations_demandeCreateManyAndReturnArgs} args - Arguments to create many Validations_demandes.
     * @example
     * // Create many Validations_demandes
     * const validations_demande = await prisma.validations_demande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Validations_demandes and only return the `id`
     * const validations_demandeWithIdOnly = await prisma.validations_demande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends validations_demandeCreateManyAndReturnArgs>(args?: SelectSubset<T, validations_demandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Validations_demande.
     * @param {validations_demandeDeleteArgs} args - Arguments to delete one Validations_demande.
     * @example
     * // Delete one Validations_demande
     * const Validations_demande = await prisma.validations_demande.delete({
     *   where: {
     *     // ... filter to delete one Validations_demande
     *   }
     * })
     * 
     */
    delete<T extends validations_demandeDeleteArgs>(args: SelectSubset<T, validations_demandeDeleteArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Validations_demande.
     * @param {validations_demandeUpdateArgs} args - Arguments to update one Validations_demande.
     * @example
     * // Update one Validations_demande
     * const validations_demande = await prisma.validations_demande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends validations_demandeUpdateArgs>(args: SelectSubset<T, validations_demandeUpdateArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Validations_demandes.
     * @param {validations_demandeDeleteManyArgs} args - Arguments to filter Validations_demandes to delete.
     * @example
     * // Delete a few Validations_demandes
     * const { count } = await prisma.validations_demande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends validations_demandeDeleteManyArgs>(args?: SelectSubset<T, validations_demandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Validations_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Validations_demandes
     * const validations_demande = await prisma.validations_demande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends validations_demandeUpdateManyArgs>(args: SelectSubset<T, validations_demandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Validations_demandes and returns the data updated in the database.
     * @param {validations_demandeUpdateManyAndReturnArgs} args - Arguments to update many Validations_demandes.
     * @example
     * // Update many Validations_demandes
     * const validations_demande = await prisma.validations_demande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Validations_demandes and only return the `id`
     * const validations_demandeWithIdOnly = await prisma.validations_demande.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends validations_demandeUpdateManyAndReturnArgs>(args: SelectSubset<T, validations_demandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Validations_demande.
     * @param {validations_demandeUpsertArgs} args - Arguments to update or create a Validations_demande.
     * @example
     * // Update or create a Validations_demande
     * const validations_demande = await prisma.validations_demande.upsert({
     *   create: {
     *     // ... data to create a Validations_demande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Validations_demande we want to update
     *   }
     * })
     */
    upsert<T extends validations_demandeUpsertArgs>(args: SelectSubset<T, validations_demandeUpsertArgs<ExtArgs>>): Prisma__validations_demandeClient<$Result.GetResult<Prisma.$validations_demandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Validations_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeCountArgs} args - Arguments to filter Validations_demandes to count.
     * @example
     * // Count the number of Validations_demandes
     * const count = await prisma.validations_demande.count({
     *   where: {
     *     // ... the filter for the Validations_demandes we want to count
     *   }
     * })
    **/
    count<T extends validations_demandeCountArgs>(
      args?: Subset<T, validations_demandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Validations_demandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Validations_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Validations_demandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Validations_demandeAggregateArgs>(args: Subset<T, Validations_demandeAggregateArgs>): Prisma.PrismaPromise<GetValidations_demandeAggregateType<T>>

    /**
     * Group by Validations_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {validations_demandeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends validations_demandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: validations_demandeGroupByArgs['orderBy'] }
        : { orderBy?: validations_demandeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, validations_demandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValidations_demandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the validations_demande model
   */
  readonly fields: validations_demandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for validations_demande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__validations_demandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demande<T extends demandes_rhDefaultArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rhDefaultArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the validations_demande model
   */
  interface validations_demandeFieldRefs {
    readonly id: FieldRef<"validations_demande", 'String'>
    readonly demandeId: FieldRef<"validations_demande", 'String'>
    readonly etape: FieldRef<"validations_demande", 'Int'>
    readonly valideurId: FieldRef<"validations_demande", 'String'>
    readonly valideurNom: FieldRef<"validations_demande", 'String'>
    readonly valideurRole: FieldRef<"validations_demande", 'String'>
    readonly decision: FieldRef<"validations_demande", 'String'>
    readonly motif: FieldRef<"validations_demande", 'String'>
    readonly dateDecision: FieldRef<"validations_demande", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * validations_demande findUnique
   */
  export type validations_demandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter, which validations_demande to fetch.
     */
    where: validations_demandeWhereUniqueInput
  }

  /**
   * validations_demande findUniqueOrThrow
   */
  export type validations_demandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter, which validations_demande to fetch.
     */
    where: validations_demandeWhereUniqueInput
  }

  /**
   * validations_demande findFirst
   */
  export type validations_demandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter, which validations_demande to fetch.
     */
    where?: validations_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of validations_demandes to fetch.
     */
    orderBy?: validations_demandeOrderByWithRelationInput | validations_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for validations_demandes.
     */
    cursor?: validations_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` validations_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` validations_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of validations_demandes.
     */
    distinct?: Validations_demandeScalarFieldEnum | Validations_demandeScalarFieldEnum[]
  }

  /**
   * validations_demande findFirstOrThrow
   */
  export type validations_demandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter, which validations_demande to fetch.
     */
    where?: validations_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of validations_demandes to fetch.
     */
    orderBy?: validations_demandeOrderByWithRelationInput | validations_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for validations_demandes.
     */
    cursor?: validations_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` validations_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` validations_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of validations_demandes.
     */
    distinct?: Validations_demandeScalarFieldEnum | Validations_demandeScalarFieldEnum[]
  }

  /**
   * validations_demande findMany
   */
  export type validations_demandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter, which validations_demandes to fetch.
     */
    where?: validations_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of validations_demandes to fetch.
     */
    orderBy?: validations_demandeOrderByWithRelationInput | validations_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing validations_demandes.
     */
    cursor?: validations_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` validations_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` validations_demandes.
     */
    skip?: number
    distinct?: Validations_demandeScalarFieldEnum | Validations_demandeScalarFieldEnum[]
  }

  /**
   * validations_demande create
   */
  export type validations_demandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * The data needed to create a validations_demande.
     */
    data: XOR<validations_demandeCreateInput, validations_demandeUncheckedCreateInput>
  }

  /**
   * validations_demande createMany
   */
  export type validations_demandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many validations_demandes.
     */
    data: validations_demandeCreateManyInput | validations_demandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * validations_demande createManyAndReturn
   */
  export type validations_demandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * The data used to create many validations_demandes.
     */
    data: validations_demandeCreateManyInput | validations_demandeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * validations_demande update
   */
  export type validations_demandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * The data needed to update a validations_demande.
     */
    data: XOR<validations_demandeUpdateInput, validations_demandeUncheckedUpdateInput>
    /**
     * Choose, which validations_demande to update.
     */
    where: validations_demandeWhereUniqueInput
  }

  /**
   * validations_demande updateMany
   */
  export type validations_demandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update validations_demandes.
     */
    data: XOR<validations_demandeUpdateManyMutationInput, validations_demandeUncheckedUpdateManyInput>
    /**
     * Filter which validations_demandes to update
     */
    where?: validations_demandeWhereInput
    /**
     * Limit how many validations_demandes to update.
     */
    limit?: number
  }

  /**
   * validations_demande updateManyAndReturn
   */
  export type validations_demandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * The data used to update validations_demandes.
     */
    data: XOR<validations_demandeUpdateManyMutationInput, validations_demandeUncheckedUpdateManyInput>
    /**
     * Filter which validations_demandes to update
     */
    where?: validations_demandeWhereInput
    /**
     * Limit how many validations_demandes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * validations_demande upsert
   */
  export type validations_demandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * The filter to search for the validations_demande to update in case it exists.
     */
    where: validations_demandeWhereUniqueInput
    /**
     * In case the validations_demande found by the `where` argument doesn't exist, create a new validations_demande with this data.
     */
    create: XOR<validations_demandeCreateInput, validations_demandeUncheckedCreateInput>
    /**
     * In case the validations_demande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<validations_demandeUpdateInput, validations_demandeUncheckedUpdateInput>
  }

  /**
   * validations_demande delete
   */
  export type validations_demandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
    /**
     * Filter which validations_demande to delete.
     */
    where: validations_demandeWhereUniqueInput
  }

  /**
   * validations_demande deleteMany
   */
  export type validations_demandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which validations_demandes to delete
     */
    where?: validations_demandeWhereInput
    /**
     * Limit how many validations_demandes to delete.
     */
    limit?: number
  }

  /**
   * validations_demande without action
   */
  export type validations_demandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the validations_demande
     */
    select?: validations_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the validations_demande
     */
    omit?: validations_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: validations_demandeInclude<ExtArgs> | null
  }


  /**
   * Model pieces_jointes_demande
   */

  export type AggregatePieces_jointes_demande = {
    _count: Pieces_jointes_demandeCountAggregateOutputType | null
    _avg: Pieces_jointes_demandeAvgAggregateOutputType | null
    _sum: Pieces_jointes_demandeSumAggregateOutputType | null
    _min: Pieces_jointes_demandeMinAggregateOutputType | null
    _max: Pieces_jointes_demandeMaxAggregateOutputType | null
  }

  export type Pieces_jointes_demandeAvgAggregateOutputType = {
    tailleOctets: number | null
  }

  export type Pieces_jointes_demandeSumAggregateOutputType = {
    tailleOctets: number | null
  }

  export type Pieces_jointes_demandeMinAggregateOutputType = {
    id: string | null
    demandeId: string | null
    nomFichier: string | null
    cheminFichier: string | null
    mimeType: string | null
    tailleOctets: number | null
    createdAt: Date | null
  }

  export type Pieces_jointes_demandeMaxAggregateOutputType = {
    id: string | null
    demandeId: string | null
    nomFichier: string | null
    cheminFichier: string | null
    mimeType: string | null
    tailleOctets: number | null
    createdAt: Date | null
  }

  export type Pieces_jointes_demandeCountAggregateOutputType = {
    id: number
    demandeId: number
    nomFichier: number
    cheminFichier: number
    mimeType: number
    tailleOctets: number
    createdAt: number
    _all: number
  }


  export type Pieces_jointes_demandeAvgAggregateInputType = {
    tailleOctets?: true
  }

  export type Pieces_jointes_demandeSumAggregateInputType = {
    tailleOctets?: true
  }

  export type Pieces_jointes_demandeMinAggregateInputType = {
    id?: true
    demandeId?: true
    nomFichier?: true
    cheminFichier?: true
    mimeType?: true
    tailleOctets?: true
    createdAt?: true
  }

  export type Pieces_jointes_demandeMaxAggregateInputType = {
    id?: true
    demandeId?: true
    nomFichier?: true
    cheminFichier?: true
    mimeType?: true
    tailleOctets?: true
    createdAt?: true
  }

  export type Pieces_jointes_demandeCountAggregateInputType = {
    id?: true
    demandeId?: true
    nomFichier?: true
    cheminFichier?: true
    mimeType?: true
    tailleOctets?: true
    createdAt?: true
    _all?: true
  }

  export type Pieces_jointes_demandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pieces_jointes_demande to aggregate.
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pieces_jointes_demandes to fetch.
     */
    orderBy?: pieces_jointes_demandeOrderByWithRelationInput | pieces_jointes_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pieces_jointes_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pieces_jointes_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pieces_jointes_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pieces_jointes_demandes
    **/
    _count?: true | Pieces_jointes_demandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Pieces_jointes_demandeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Pieces_jointes_demandeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pieces_jointes_demandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pieces_jointes_demandeMaxAggregateInputType
  }

  export type GetPieces_jointes_demandeAggregateType<T extends Pieces_jointes_demandeAggregateArgs> = {
        [P in keyof T & keyof AggregatePieces_jointes_demande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePieces_jointes_demande[P]>
      : GetScalarType<T[P], AggregatePieces_jointes_demande[P]>
  }




  export type pieces_jointes_demandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pieces_jointes_demandeWhereInput
    orderBy?: pieces_jointes_demandeOrderByWithAggregationInput | pieces_jointes_demandeOrderByWithAggregationInput[]
    by: Pieces_jointes_demandeScalarFieldEnum[] | Pieces_jointes_demandeScalarFieldEnum
    having?: pieces_jointes_demandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pieces_jointes_demandeCountAggregateInputType | true
    _avg?: Pieces_jointes_demandeAvgAggregateInputType
    _sum?: Pieces_jointes_demandeSumAggregateInputType
    _min?: Pieces_jointes_demandeMinAggregateInputType
    _max?: Pieces_jointes_demandeMaxAggregateInputType
  }

  export type Pieces_jointes_demandeGroupByOutputType = {
    id: string
    demandeId: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt: Date
    _count: Pieces_jointes_demandeCountAggregateOutputType | null
    _avg: Pieces_jointes_demandeAvgAggregateOutputType | null
    _sum: Pieces_jointes_demandeSumAggregateOutputType | null
    _min: Pieces_jointes_demandeMinAggregateOutputType | null
    _max: Pieces_jointes_demandeMaxAggregateOutputType | null
  }

  type GetPieces_jointes_demandeGroupByPayload<T extends pieces_jointes_demandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pieces_jointes_demandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pieces_jointes_demandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pieces_jointes_demandeGroupByOutputType[P]>
            : GetScalarType<T[P], Pieces_jointes_demandeGroupByOutputType[P]>
        }
      >
    >


  export type pieces_jointes_demandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    nomFichier?: boolean
    cheminFichier?: boolean
    mimeType?: boolean
    tailleOctets?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pieces_jointes_demande"]>

  export type pieces_jointes_demandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    nomFichier?: boolean
    cheminFichier?: boolean
    mimeType?: boolean
    tailleOctets?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pieces_jointes_demande"]>

  export type pieces_jointes_demandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    nomFichier?: boolean
    cheminFichier?: boolean
    mimeType?: boolean
    tailleOctets?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pieces_jointes_demande"]>

  export type pieces_jointes_demandeSelectScalar = {
    id?: boolean
    demandeId?: boolean
    nomFichier?: boolean
    cheminFichier?: boolean
    mimeType?: boolean
    tailleOctets?: boolean
    createdAt?: boolean
  }

  export type pieces_jointes_demandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "demandeId" | "nomFichier" | "cheminFichier" | "mimeType" | "tailleOctets" | "createdAt", ExtArgs["result"]["pieces_jointes_demande"]>
  export type pieces_jointes_demandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type pieces_jointes_demandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type pieces_jointes_demandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }

  export type $pieces_jointes_demandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pieces_jointes_demande"
    objects: {
      demande: Prisma.$demandes_rhPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      demandeId: string
      nomFichier: string
      cheminFichier: string
      mimeType: string
      tailleOctets: number
      createdAt: Date
    }, ExtArgs["result"]["pieces_jointes_demande"]>
    composites: {}
  }

  type pieces_jointes_demandeGetPayload<S extends boolean | null | undefined | pieces_jointes_demandeDefaultArgs> = $Result.GetResult<Prisma.$pieces_jointes_demandePayload, S>

  type pieces_jointes_demandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pieces_jointes_demandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Pieces_jointes_demandeCountAggregateInputType | true
    }

  export interface pieces_jointes_demandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pieces_jointes_demande'], meta: { name: 'pieces_jointes_demande' } }
    /**
     * Find zero or one Pieces_jointes_demande that matches the filter.
     * @param {pieces_jointes_demandeFindUniqueArgs} args - Arguments to find a Pieces_jointes_demande
     * @example
     * // Get one Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pieces_jointes_demandeFindUniqueArgs>(args: SelectSubset<T, pieces_jointes_demandeFindUniqueArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pieces_jointes_demande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pieces_jointes_demandeFindUniqueOrThrowArgs} args - Arguments to find a Pieces_jointes_demande
     * @example
     * // Get one Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pieces_jointes_demandeFindUniqueOrThrowArgs>(args: SelectSubset<T, pieces_jointes_demandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pieces_jointes_demande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeFindFirstArgs} args - Arguments to find a Pieces_jointes_demande
     * @example
     * // Get one Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pieces_jointes_demandeFindFirstArgs>(args?: SelectSubset<T, pieces_jointes_demandeFindFirstArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pieces_jointes_demande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeFindFirstOrThrowArgs} args - Arguments to find a Pieces_jointes_demande
     * @example
     * // Get one Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pieces_jointes_demandeFindFirstOrThrowArgs>(args?: SelectSubset<T, pieces_jointes_demandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pieces_jointes_demandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pieces_jointes_demandes
     * const pieces_jointes_demandes = await prisma.pieces_jointes_demande.findMany()
     * 
     * // Get first 10 Pieces_jointes_demandes
     * const pieces_jointes_demandes = await prisma.pieces_jointes_demande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pieces_jointes_demandeWithIdOnly = await prisma.pieces_jointes_demande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pieces_jointes_demandeFindManyArgs>(args?: SelectSubset<T, pieces_jointes_demandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pieces_jointes_demande.
     * @param {pieces_jointes_demandeCreateArgs} args - Arguments to create a Pieces_jointes_demande.
     * @example
     * // Create one Pieces_jointes_demande
     * const Pieces_jointes_demande = await prisma.pieces_jointes_demande.create({
     *   data: {
     *     // ... data to create a Pieces_jointes_demande
     *   }
     * })
     * 
     */
    create<T extends pieces_jointes_demandeCreateArgs>(args: SelectSubset<T, pieces_jointes_demandeCreateArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pieces_jointes_demandes.
     * @param {pieces_jointes_demandeCreateManyArgs} args - Arguments to create many Pieces_jointes_demandes.
     * @example
     * // Create many Pieces_jointes_demandes
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pieces_jointes_demandeCreateManyArgs>(args?: SelectSubset<T, pieces_jointes_demandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pieces_jointes_demandes and returns the data saved in the database.
     * @param {pieces_jointes_demandeCreateManyAndReturnArgs} args - Arguments to create many Pieces_jointes_demandes.
     * @example
     * // Create many Pieces_jointes_demandes
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pieces_jointes_demandes and only return the `id`
     * const pieces_jointes_demandeWithIdOnly = await prisma.pieces_jointes_demande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pieces_jointes_demandeCreateManyAndReturnArgs>(args?: SelectSubset<T, pieces_jointes_demandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pieces_jointes_demande.
     * @param {pieces_jointes_demandeDeleteArgs} args - Arguments to delete one Pieces_jointes_demande.
     * @example
     * // Delete one Pieces_jointes_demande
     * const Pieces_jointes_demande = await prisma.pieces_jointes_demande.delete({
     *   where: {
     *     // ... filter to delete one Pieces_jointes_demande
     *   }
     * })
     * 
     */
    delete<T extends pieces_jointes_demandeDeleteArgs>(args: SelectSubset<T, pieces_jointes_demandeDeleteArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pieces_jointes_demande.
     * @param {pieces_jointes_demandeUpdateArgs} args - Arguments to update one Pieces_jointes_demande.
     * @example
     * // Update one Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pieces_jointes_demandeUpdateArgs>(args: SelectSubset<T, pieces_jointes_demandeUpdateArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pieces_jointes_demandes.
     * @param {pieces_jointes_demandeDeleteManyArgs} args - Arguments to filter Pieces_jointes_demandes to delete.
     * @example
     * // Delete a few Pieces_jointes_demandes
     * const { count } = await prisma.pieces_jointes_demande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pieces_jointes_demandeDeleteManyArgs>(args?: SelectSubset<T, pieces_jointes_demandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pieces_jointes_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pieces_jointes_demandes
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pieces_jointes_demandeUpdateManyArgs>(args: SelectSubset<T, pieces_jointes_demandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pieces_jointes_demandes and returns the data updated in the database.
     * @param {pieces_jointes_demandeUpdateManyAndReturnArgs} args - Arguments to update many Pieces_jointes_demandes.
     * @example
     * // Update many Pieces_jointes_demandes
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pieces_jointes_demandes and only return the `id`
     * const pieces_jointes_demandeWithIdOnly = await prisma.pieces_jointes_demande.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pieces_jointes_demandeUpdateManyAndReturnArgs>(args: SelectSubset<T, pieces_jointes_demandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pieces_jointes_demande.
     * @param {pieces_jointes_demandeUpsertArgs} args - Arguments to update or create a Pieces_jointes_demande.
     * @example
     * // Update or create a Pieces_jointes_demande
     * const pieces_jointes_demande = await prisma.pieces_jointes_demande.upsert({
     *   create: {
     *     // ... data to create a Pieces_jointes_demande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pieces_jointes_demande we want to update
     *   }
     * })
     */
    upsert<T extends pieces_jointes_demandeUpsertArgs>(args: SelectSubset<T, pieces_jointes_demandeUpsertArgs<ExtArgs>>): Prisma__pieces_jointes_demandeClient<$Result.GetResult<Prisma.$pieces_jointes_demandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pieces_jointes_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeCountArgs} args - Arguments to filter Pieces_jointes_demandes to count.
     * @example
     * // Count the number of Pieces_jointes_demandes
     * const count = await prisma.pieces_jointes_demande.count({
     *   where: {
     *     // ... the filter for the Pieces_jointes_demandes we want to count
     *   }
     * })
    **/
    count<T extends pieces_jointes_demandeCountArgs>(
      args?: Subset<T, pieces_jointes_demandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pieces_jointes_demandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pieces_jointes_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pieces_jointes_demandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Pieces_jointes_demandeAggregateArgs>(args: Subset<T, Pieces_jointes_demandeAggregateArgs>): Prisma.PrismaPromise<GetPieces_jointes_demandeAggregateType<T>>

    /**
     * Group by Pieces_jointes_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pieces_jointes_demandeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pieces_jointes_demandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pieces_jointes_demandeGroupByArgs['orderBy'] }
        : { orderBy?: pieces_jointes_demandeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pieces_jointes_demandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPieces_jointes_demandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pieces_jointes_demande model
   */
  readonly fields: pieces_jointes_demandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pieces_jointes_demande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pieces_jointes_demandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demande<T extends demandes_rhDefaultArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rhDefaultArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pieces_jointes_demande model
   */
  interface pieces_jointes_demandeFieldRefs {
    readonly id: FieldRef<"pieces_jointes_demande", 'String'>
    readonly demandeId: FieldRef<"pieces_jointes_demande", 'String'>
    readonly nomFichier: FieldRef<"pieces_jointes_demande", 'String'>
    readonly cheminFichier: FieldRef<"pieces_jointes_demande", 'String'>
    readonly mimeType: FieldRef<"pieces_jointes_demande", 'String'>
    readonly tailleOctets: FieldRef<"pieces_jointes_demande", 'Int'>
    readonly createdAt: FieldRef<"pieces_jointes_demande", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pieces_jointes_demande findUnique
   */
  export type pieces_jointes_demandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter, which pieces_jointes_demande to fetch.
     */
    where: pieces_jointes_demandeWhereUniqueInput
  }

  /**
   * pieces_jointes_demande findUniqueOrThrow
   */
  export type pieces_jointes_demandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter, which pieces_jointes_demande to fetch.
     */
    where: pieces_jointes_demandeWhereUniqueInput
  }

  /**
   * pieces_jointes_demande findFirst
   */
  export type pieces_jointes_demandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter, which pieces_jointes_demande to fetch.
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pieces_jointes_demandes to fetch.
     */
    orderBy?: pieces_jointes_demandeOrderByWithRelationInput | pieces_jointes_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pieces_jointes_demandes.
     */
    cursor?: pieces_jointes_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pieces_jointes_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pieces_jointes_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pieces_jointes_demandes.
     */
    distinct?: Pieces_jointes_demandeScalarFieldEnum | Pieces_jointes_demandeScalarFieldEnum[]
  }

  /**
   * pieces_jointes_demande findFirstOrThrow
   */
  export type pieces_jointes_demandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter, which pieces_jointes_demande to fetch.
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pieces_jointes_demandes to fetch.
     */
    orderBy?: pieces_jointes_demandeOrderByWithRelationInput | pieces_jointes_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pieces_jointes_demandes.
     */
    cursor?: pieces_jointes_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pieces_jointes_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pieces_jointes_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pieces_jointes_demandes.
     */
    distinct?: Pieces_jointes_demandeScalarFieldEnum | Pieces_jointes_demandeScalarFieldEnum[]
  }

  /**
   * pieces_jointes_demande findMany
   */
  export type pieces_jointes_demandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter, which pieces_jointes_demandes to fetch.
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pieces_jointes_demandes to fetch.
     */
    orderBy?: pieces_jointes_demandeOrderByWithRelationInput | pieces_jointes_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pieces_jointes_demandes.
     */
    cursor?: pieces_jointes_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pieces_jointes_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pieces_jointes_demandes.
     */
    skip?: number
    distinct?: Pieces_jointes_demandeScalarFieldEnum | Pieces_jointes_demandeScalarFieldEnum[]
  }

  /**
   * pieces_jointes_demande create
   */
  export type pieces_jointes_demandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * The data needed to create a pieces_jointes_demande.
     */
    data: XOR<pieces_jointes_demandeCreateInput, pieces_jointes_demandeUncheckedCreateInput>
  }

  /**
   * pieces_jointes_demande createMany
   */
  export type pieces_jointes_demandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pieces_jointes_demandes.
     */
    data: pieces_jointes_demandeCreateManyInput | pieces_jointes_demandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pieces_jointes_demande createManyAndReturn
   */
  export type pieces_jointes_demandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * The data used to create many pieces_jointes_demandes.
     */
    data: pieces_jointes_demandeCreateManyInput | pieces_jointes_demandeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pieces_jointes_demande update
   */
  export type pieces_jointes_demandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * The data needed to update a pieces_jointes_demande.
     */
    data: XOR<pieces_jointes_demandeUpdateInput, pieces_jointes_demandeUncheckedUpdateInput>
    /**
     * Choose, which pieces_jointes_demande to update.
     */
    where: pieces_jointes_demandeWhereUniqueInput
  }

  /**
   * pieces_jointes_demande updateMany
   */
  export type pieces_jointes_demandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pieces_jointes_demandes.
     */
    data: XOR<pieces_jointes_demandeUpdateManyMutationInput, pieces_jointes_demandeUncheckedUpdateManyInput>
    /**
     * Filter which pieces_jointes_demandes to update
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * Limit how many pieces_jointes_demandes to update.
     */
    limit?: number
  }

  /**
   * pieces_jointes_demande updateManyAndReturn
   */
  export type pieces_jointes_demandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * The data used to update pieces_jointes_demandes.
     */
    data: XOR<pieces_jointes_demandeUpdateManyMutationInput, pieces_jointes_demandeUncheckedUpdateManyInput>
    /**
     * Filter which pieces_jointes_demandes to update
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * Limit how many pieces_jointes_demandes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pieces_jointes_demande upsert
   */
  export type pieces_jointes_demandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * The filter to search for the pieces_jointes_demande to update in case it exists.
     */
    where: pieces_jointes_demandeWhereUniqueInput
    /**
     * In case the pieces_jointes_demande found by the `where` argument doesn't exist, create a new pieces_jointes_demande with this data.
     */
    create: XOR<pieces_jointes_demandeCreateInput, pieces_jointes_demandeUncheckedCreateInput>
    /**
     * In case the pieces_jointes_demande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pieces_jointes_demandeUpdateInput, pieces_jointes_demandeUncheckedUpdateInput>
  }

  /**
   * pieces_jointes_demande delete
   */
  export type pieces_jointes_demandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
    /**
     * Filter which pieces_jointes_demande to delete.
     */
    where: pieces_jointes_demandeWhereUniqueInput
  }

  /**
   * pieces_jointes_demande deleteMany
   */
  export type pieces_jointes_demandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pieces_jointes_demandes to delete
     */
    where?: pieces_jointes_demandeWhereInput
    /**
     * Limit how many pieces_jointes_demandes to delete.
     */
    limit?: number
  }

  /**
   * pieces_jointes_demande without action
   */
  export type pieces_jointes_demandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pieces_jointes_demande
     */
    select?: pieces_jointes_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pieces_jointes_demande
     */
    omit?: pieces_jointes_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pieces_jointes_demandeInclude<ExtArgs> | null
  }


  /**
   * Model historique_demande
   */

  export type AggregateHistorique_demande = {
    _count: Historique_demandeCountAggregateOutputType | null
    _min: Historique_demandeMinAggregateOutputType | null
    _max: Historique_demandeMaxAggregateOutputType | null
  }

  export type Historique_demandeMinAggregateOutputType = {
    id: string | null
    demandeId: string | null
    auteurId: string | null
    auteurNom: string | null
    action: string | null
    statutPrecedent: string | null
    nouveauStatut: string | null
    commentaire: string | null
    adresseIp: string | null
    createdAt: Date | null
  }

  export type Historique_demandeMaxAggregateOutputType = {
    id: string | null
    demandeId: string | null
    auteurId: string | null
    auteurNom: string | null
    action: string | null
    statutPrecedent: string | null
    nouveauStatut: string | null
    commentaire: string | null
    adresseIp: string | null
    createdAt: Date | null
  }

  export type Historique_demandeCountAggregateOutputType = {
    id: number
    demandeId: number
    auteurId: number
    auteurNom: number
    action: number
    statutPrecedent: number
    nouveauStatut: number
    commentaire: number
    adresseIp: number
    createdAt: number
    _all: number
  }


  export type Historique_demandeMinAggregateInputType = {
    id?: true
    demandeId?: true
    auteurId?: true
    auteurNom?: true
    action?: true
    statutPrecedent?: true
    nouveauStatut?: true
    commentaire?: true
    adresseIp?: true
    createdAt?: true
  }

  export type Historique_demandeMaxAggregateInputType = {
    id?: true
    demandeId?: true
    auteurId?: true
    auteurNom?: true
    action?: true
    statutPrecedent?: true
    nouveauStatut?: true
    commentaire?: true
    adresseIp?: true
    createdAt?: true
  }

  export type Historique_demandeCountAggregateInputType = {
    id?: true
    demandeId?: true
    auteurId?: true
    auteurNom?: true
    action?: true
    statutPrecedent?: true
    nouveauStatut?: true
    commentaire?: true
    adresseIp?: true
    createdAt?: true
    _all?: true
  }

  export type Historique_demandeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which historique_demande to aggregate.
     */
    where?: historique_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of historique_demandes to fetch.
     */
    orderBy?: historique_demandeOrderByWithRelationInput | historique_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: historique_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` historique_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` historique_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned historique_demandes
    **/
    _count?: true | Historique_demandeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Historique_demandeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Historique_demandeMaxAggregateInputType
  }

  export type GetHistorique_demandeAggregateType<T extends Historique_demandeAggregateArgs> = {
        [P in keyof T & keyof AggregateHistorique_demande]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistorique_demande[P]>
      : GetScalarType<T[P], AggregateHistorique_demande[P]>
  }




  export type historique_demandeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: historique_demandeWhereInput
    orderBy?: historique_demandeOrderByWithAggregationInput | historique_demandeOrderByWithAggregationInput[]
    by: Historique_demandeScalarFieldEnum[] | Historique_demandeScalarFieldEnum
    having?: historique_demandeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Historique_demandeCountAggregateInputType | true
    _min?: Historique_demandeMinAggregateInputType
    _max?: Historique_demandeMaxAggregateInputType
  }

  export type Historique_demandeGroupByOutputType = {
    id: string
    demandeId: string
    auteurId: string
    auteurNom: string | null
    action: string
    statutPrecedent: string | null
    nouveauStatut: string
    commentaire: string | null
    adresseIp: string | null
    createdAt: Date
    _count: Historique_demandeCountAggregateOutputType | null
    _min: Historique_demandeMinAggregateOutputType | null
    _max: Historique_demandeMaxAggregateOutputType | null
  }

  type GetHistorique_demandeGroupByPayload<T extends historique_demandeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Historique_demandeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Historique_demandeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Historique_demandeGroupByOutputType[P]>
            : GetScalarType<T[P], Historique_demandeGroupByOutputType[P]>
        }
      >
    >


  export type historique_demandeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    auteurId?: boolean
    auteurNom?: boolean
    action?: boolean
    statutPrecedent?: boolean
    nouveauStatut?: boolean
    commentaire?: boolean
    adresseIp?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historique_demande"]>

  export type historique_demandeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    auteurId?: boolean
    auteurNom?: boolean
    action?: boolean
    statutPrecedent?: boolean
    nouveauStatut?: boolean
    commentaire?: boolean
    adresseIp?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historique_demande"]>

  export type historique_demandeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeId?: boolean
    auteurId?: boolean
    auteurNom?: boolean
    action?: boolean
    statutPrecedent?: boolean
    nouveauStatut?: boolean
    commentaire?: boolean
    adresseIp?: boolean
    createdAt?: boolean
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historique_demande"]>

  export type historique_demandeSelectScalar = {
    id?: boolean
    demandeId?: boolean
    auteurId?: boolean
    auteurNom?: boolean
    action?: boolean
    statutPrecedent?: boolean
    nouveauStatut?: boolean
    commentaire?: boolean
    adresseIp?: boolean
    createdAt?: boolean
  }

  export type historique_demandeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "demandeId" | "auteurId" | "auteurNom" | "action" | "statutPrecedent" | "nouveauStatut" | "commentaire" | "adresseIp" | "createdAt", ExtArgs["result"]["historique_demande"]>
  export type historique_demandeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type historique_demandeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }
  export type historique_demandeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demande?: boolean | demandes_rhDefaultArgs<ExtArgs>
  }

  export type $historique_demandePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "historique_demande"
    objects: {
      demande: Prisma.$demandes_rhPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      demandeId: string
      auteurId: string
      auteurNom: string | null
      action: string
      statutPrecedent: string | null
      nouveauStatut: string
      commentaire: string | null
      adresseIp: string | null
      createdAt: Date
    }, ExtArgs["result"]["historique_demande"]>
    composites: {}
  }

  type historique_demandeGetPayload<S extends boolean | null | undefined | historique_demandeDefaultArgs> = $Result.GetResult<Prisma.$historique_demandePayload, S>

  type historique_demandeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<historique_demandeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Historique_demandeCountAggregateInputType | true
    }

  export interface historique_demandeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['historique_demande'], meta: { name: 'historique_demande' } }
    /**
     * Find zero or one Historique_demande that matches the filter.
     * @param {historique_demandeFindUniqueArgs} args - Arguments to find a Historique_demande
     * @example
     * // Get one Historique_demande
     * const historique_demande = await prisma.historique_demande.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends historique_demandeFindUniqueArgs>(args: SelectSubset<T, historique_demandeFindUniqueArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Historique_demande that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {historique_demandeFindUniqueOrThrowArgs} args - Arguments to find a Historique_demande
     * @example
     * // Get one Historique_demande
     * const historique_demande = await prisma.historique_demande.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends historique_demandeFindUniqueOrThrowArgs>(args: SelectSubset<T, historique_demandeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Historique_demande that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeFindFirstArgs} args - Arguments to find a Historique_demande
     * @example
     * // Get one Historique_demande
     * const historique_demande = await prisma.historique_demande.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends historique_demandeFindFirstArgs>(args?: SelectSubset<T, historique_demandeFindFirstArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Historique_demande that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeFindFirstOrThrowArgs} args - Arguments to find a Historique_demande
     * @example
     * // Get one Historique_demande
     * const historique_demande = await prisma.historique_demande.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends historique_demandeFindFirstOrThrowArgs>(args?: SelectSubset<T, historique_demandeFindFirstOrThrowArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Historique_demandes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Historique_demandes
     * const historique_demandes = await prisma.historique_demande.findMany()
     * 
     * // Get first 10 Historique_demandes
     * const historique_demandes = await prisma.historique_demande.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historique_demandeWithIdOnly = await prisma.historique_demande.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends historique_demandeFindManyArgs>(args?: SelectSubset<T, historique_demandeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Historique_demande.
     * @param {historique_demandeCreateArgs} args - Arguments to create a Historique_demande.
     * @example
     * // Create one Historique_demande
     * const Historique_demande = await prisma.historique_demande.create({
     *   data: {
     *     // ... data to create a Historique_demande
     *   }
     * })
     * 
     */
    create<T extends historique_demandeCreateArgs>(args: SelectSubset<T, historique_demandeCreateArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Historique_demandes.
     * @param {historique_demandeCreateManyArgs} args - Arguments to create many Historique_demandes.
     * @example
     * // Create many Historique_demandes
     * const historique_demande = await prisma.historique_demande.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends historique_demandeCreateManyArgs>(args?: SelectSubset<T, historique_demandeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Historique_demandes and returns the data saved in the database.
     * @param {historique_demandeCreateManyAndReturnArgs} args - Arguments to create many Historique_demandes.
     * @example
     * // Create many Historique_demandes
     * const historique_demande = await prisma.historique_demande.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Historique_demandes and only return the `id`
     * const historique_demandeWithIdOnly = await prisma.historique_demande.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends historique_demandeCreateManyAndReturnArgs>(args?: SelectSubset<T, historique_demandeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Historique_demande.
     * @param {historique_demandeDeleteArgs} args - Arguments to delete one Historique_demande.
     * @example
     * // Delete one Historique_demande
     * const Historique_demande = await prisma.historique_demande.delete({
     *   where: {
     *     // ... filter to delete one Historique_demande
     *   }
     * })
     * 
     */
    delete<T extends historique_demandeDeleteArgs>(args: SelectSubset<T, historique_demandeDeleteArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Historique_demande.
     * @param {historique_demandeUpdateArgs} args - Arguments to update one Historique_demande.
     * @example
     * // Update one Historique_demande
     * const historique_demande = await prisma.historique_demande.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends historique_demandeUpdateArgs>(args: SelectSubset<T, historique_demandeUpdateArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Historique_demandes.
     * @param {historique_demandeDeleteManyArgs} args - Arguments to filter Historique_demandes to delete.
     * @example
     * // Delete a few Historique_demandes
     * const { count } = await prisma.historique_demande.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends historique_demandeDeleteManyArgs>(args?: SelectSubset<T, historique_demandeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Historique_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Historique_demandes
     * const historique_demande = await prisma.historique_demande.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends historique_demandeUpdateManyArgs>(args: SelectSubset<T, historique_demandeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Historique_demandes and returns the data updated in the database.
     * @param {historique_demandeUpdateManyAndReturnArgs} args - Arguments to update many Historique_demandes.
     * @example
     * // Update many Historique_demandes
     * const historique_demande = await prisma.historique_demande.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Historique_demandes and only return the `id`
     * const historique_demandeWithIdOnly = await prisma.historique_demande.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends historique_demandeUpdateManyAndReturnArgs>(args: SelectSubset<T, historique_demandeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Historique_demande.
     * @param {historique_demandeUpsertArgs} args - Arguments to update or create a Historique_demande.
     * @example
     * // Update or create a Historique_demande
     * const historique_demande = await prisma.historique_demande.upsert({
     *   create: {
     *     // ... data to create a Historique_demande
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Historique_demande we want to update
     *   }
     * })
     */
    upsert<T extends historique_demandeUpsertArgs>(args: SelectSubset<T, historique_demandeUpsertArgs<ExtArgs>>): Prisma__historique_demandeClient<$Result.GetResult<Prisma.$historique_demandePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Historique_demandes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeCountArgs} args - Arguments to filter Historique_demandes to count.
     * @example
     * // Count the number of Historique_demandes
     * const count = await prisma.historique_demande.count({
     *   where: {
     *     // ... the filter for the Historique_demandes we want to count
     *   }
     * })
    **/
    count<T extends historique_demandeCountArgs>(
      args?: Subset<T, historique_demandeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Historique_demandeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Historique_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Historique_demandeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Historique_demandeAggregateArgs>(args: Subset<T, Historique_demandeAggregateArgs>): Prisma.PrismaPromise<GetHistorique_demandeAggregateType<T>>

    /**
     * Group by Historique_demande.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {historique_demandeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends historique_demandeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: historique_demandeGroupByArgs['orderBy'] }
        : { orderBy?: historique_demandeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, historique_demandeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistorique_demandeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the historique_demande model
   */
  readonly fields: historique_demandeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for historique_demande.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__historique_demandeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demande<T extends demandes_rhDefaultArgs<ExtArgs> = {}>(args?: Subset<T, demandes_rhDefaultArgs<ExtArgs>>): Prisma__demandes_rhClient<$Result.GetResult<Prisma.$demandes_rhPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the historique_demande model
   */
  interface historique_demandeFieldRefs {
    readonly id: FieldRef<"historique_demande", 'String'>
    readonly demandeId: FieldRef<"historique_demande", 'String'>
    readonly auteurId: FieldRef<"historique_demande", 'String'>
    readonly auteurNom: FieldRef<"historique_demande", 'String'>
    readonly action: FieldRef<"historique_demande", 'String'>
    readonly statutPrecedent: FieldRef<"historique_demande", 'String'>
    readonly nouveauStatut: FieldRef<"historique_demande", 'String'>
    readonly commentaire: FieldRef<"historique_demande", 'String'>
    readonly adresseIp: FieldRef<"historique_demande", 'String'>
    readonly createdAt: FieldRef<"historique_demande", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * historique_demande findUnique
   */
  export type historique_demandeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter, which historique_demande to fetch.
     */
    where: historique_demandeWhereUniqueInput
  }

  /**
   * historique_demande findUniqueOrThrow
   */
  export type historique_demandeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter, which historique_demande to fetch.
     */
    where: historique_demandeWhereUniqueInput
  }

  /**
   * historique_demande findFirst
   */
  export type historique_demandeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter, which historique_demande to fetch.
     */
    where?: historique_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of historique_demandes to fetch.
     */
    orderBy?: historique_demandeOrderByWithRelationInput | historique_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for historique_demandes.
     */
    cursor?: historique_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` historique_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` historique_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of historique_demandes.
     */
    distinct?: Historique_demandeScalarFieldEnum | Historique_demandeScalarFieldEnum[]
  }

  /**
   * historique_demande findFirstOrThrow
   */
  export type historique_demandeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter, which historique_demande to fetch.
     */
    where?: historique_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of historique_demandes to fetch.
     */
    orderBy?: historique_demandeOrderByWithRelationInput | historique_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for historique_demandes.
     */
    cursor?: historique_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` historique_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` historique_demandes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of historique_demandes.
     */
    distinct?: Historique_demandeScalarFieldEnum | Historique_demandeScalarFieldEnum[]
  }

  /**
   * historique_demande findMany
   */
  export type historique_demandeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter, which historique_demandes to fetch.
     */
    where?: historique_demandeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of historique_demandes to fetch.
     */
    orderBy?: historique_demandeOrderByWithRelationInput | historique_demandeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing historique_demandes.
     */
    cursor?: historique_demandeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` historique_demandes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` historique_demandes.
     */
    skip?: number
    distinct?: Historique_demandeScalarFieldEnum | Historique_demandeScalarFieldEnum[]
  }

  /**
   * historique_demande create
   */
  export type historique_demandeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * The data needed to create a historique_demande.
     */
    data: XOR<historique_demandeCreateInput, historique_demandeUncheckedCreateInput>
  }

  /**
   * historique_demande createMany
   */
  export type historique_demandeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many historique_demandes.
     */
    data: historique_demandeCreateManyInput | historique_demandeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * historique_demande createManyAndReturn
   */
  export type historique_demandeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * The data used to create many historique_demandes.
     */
    data: historique_demandeCreateManyInput | historique_demandeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * historique_demande update
   */
  export type historique_demandeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * The data needed to update a historique_demande.
     */
    data: XOR<historique_demandeUpdateInput, historique_demandeUncheckedUpdateInput>
    /**
     * Choose, which historique_demande to update.
     */
    where: historique_demandeWhereUniqueInput
  }

  /**
   * historique_demande updateMany
   */
  export type historique_demandeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update historique_demandes.
     */
    data: XOR<historique_demandeUpdateManyMutationInput, historique_demandeUncheckedUpdateManyInput>
    /**
     * Filter which historique_demandes to update
     */
    where?: historique_demandeWhereInput
    /**
     * Limit how many historique_demandes to update.
     */
    limit?: number
  }

  /**
   * historique_demande updateManyAndReturn
   */
  export type historique_demandeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * The data used to update historique_demandes.
     */
    data: XOR<historique_demandeUpdateManyMutationInput, historique_demandeUncheckedUpdateManyInput>
    /**
     * Filter which historique_demandes to update
     */
    where?: historique_demandeWhereInput
    /**
     * Limit how many historique_demandes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * historique_demande upsert
   */
  export type historique_demandeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * The filter to search for the historique_demande to update in case it exists.
     */
    where: historique_demandeWhereUniqueInput
    /**
     * In case the historique_demande found by the `where` argument doesn't exist, create a new historique_demande with this data.
     */
    create: XOR<historique_demandeCreateInput, historique_demandeUncheckedCreateInput>
    /**
     * In case the historique_demande was found with the provided `where` argument, update it with this data.
     */
    update: XOR<historique_demandeUpdateInput, historique_demandeUncheckedUpdateInput>
  }

  /**
   * historique_demande delete
   */
  export type historique_demandeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
    /**
     * Filter which historique_demande to delete.
     */
    where: historique_demandeWhereUniqueInput
  }

  /**
   * historique_demande deleteMany
   */
  export type historique_demandeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which historique_demandes to delete
     */
    where?: historique_demandeWhereInput
    /**
     * Limit how many historique_demandes to delete.
     */
    limit?: number
  }

  /**
   * historique_demande without action
   */
  export type historique_demandeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the historique_demande
     */
    select?: historique_demandeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the historique_demande
     */
    omit?: historique_demandeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: historique_demandeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Types_demandeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    libelle: 'libelle',
    categorie: 'categorie',
    necessiteSolde: 'necessiteSolde',
    pieceRequise: 'pieceRequise',
    delaiMinJours: 'delaiMinJours',
    dureeMaxJours: 'dureeMaxJours',
    actif: 'actif',
    createdAt: 'createdAt'
  };

  export type Types_demandeScalarFieldEnum = (typeof Types_demandeScalarFieldEnum)[keyof typeof Types_demandeScalarFieldEnum]


  export const Soldes_congesScalarFieldEnum: {
    id: 'id',
    salarieId: 'salarieId',
    annee: 'annee',
    joursAcquis: 'joursAcquis',
    joursPris: 'joursPris',
    joursEnAttente: 'joursEnAttente',
    reliquatN1: 'reliquatN1',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Soldes_congesScalarFieldEnum = (typeof Soldes_congesScalarFieldEnum)[keyof typeof Soldes_congesScalarFieldEnum]


  export const Demandes_rhScalarFieldEnum: {
    id: 'id',
    numeroDemande: 'numeroDemande',
    salarieId: 'salarieId',
    salarieNom: 'salarieNom',
    salarieEmail: 'salarieEmail',
    salariePoste: 'salariePoste',
    salarieDirection: 'salarieDirection',
    managerId: 'managerId',
    typeId: 'typeId',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin',
    demiJourneeDebut: 'demiJourneeDebut',
    demiJourneeFin: 'demiJourneeFin',
    nombreJours: 'nombreJours',
    motif: 'motif',
    destination: 'destination',
    moyenTransport: 'moyenTransport',
    fraisEstimes: 'fraisEstimes',
    statut: 'statut',
    etapeCourante: 'etapeCourante',
    cycleRejetCount: 'cycleRejetCount',
    documentUrl: 'documentUrl',
    numeroTitre: 'numeroTitre',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Demandes_rhScalarFieldEnum = (typeof Demandes_rhScalarFieldEnum)[keyof typeof Demandes_rhScalarFieldEnum]


  export const Validations_demandeScalarFieldEnum: {
    id: 'id',
    demandeId: 'demandeId',
    etape: 'etape',
    valideurId: 'valideurId',
    valideurNom: 'valideurNom',
    valideurRole: 'valideurRole',
    decision: 'decision',
    motif: 'motif',
    dateDecision: 'dateDecision'
  };

  export type Validations_demandeScalarFieldEnum = (typeof Validations_demandeScalarFieldEnum)[keyof typeof Validations_demandeScalarFieldEnum]


  export const Pieces_jointes_demandeScalarFieldEnum: {
    id: 'id',
    demandeId: 'demandeId',
    nomFichier: 'nomFichier',
    cheminFichier: 'cheminFichier',
    mimeType: 'mimeType',
    tailleOctets: 'tailleOctets',
    createdAt: 'createdAt'
  };

  export type Pieces_jointes_demandeScalarFieldEnum = (typeof Pieces_jointes_demandeScalarFieldEnum)[keyof typeof Pieces_jointes_demandeScalarFieldEnum]


  export const Historique_demandeScalarFieldEnum: {
    id: 'id',
    demandeId: 'demandeId',
    auteurId: 'auteurId',
    auteurNom: 'auteurNom',
    action: 'action',
    statutPrecedent: 'statutPrecedent',
    nouveauStatut: 'nouveauStatut',
    commentaire: 'commentaire',
    adresseIp: 'adresseIp',
    createdAt: 'createdAt'
  };

  export type Historique_demandeScalarFieldEnum = (typeof Historique_demandeScalarFieldEnum)[keyof typeof Historique_demandeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type types_demandeWhereInput = {
    AND?: types_demandeWhereInput | types_demandeWhereInput[]
    OR?: types_demandeWhereInput[]
    NOT?: types_demandeWhereInput | types_demandeWhereInput[]
    id?: StringFilter<"types_demande"> | string
    code?: StringFilter<"types_demande"> | string
    libelle?: StringFilter<"types_demande"> | string
    categorie?: StringFilter<"types_demande"> | string
    necessiteSolde?: BoolFilter<"types_demande"> | boolean
    pieceRequise?: BoolFilter<"types_demande"> | boolean
    delaiMinJours?: IntFilter<"types_demande"> | number
    dureeMaxJours?: IntNullableFilter<"types_demande"> | number | null
    actif?: BoolFilter<"types_demande"> | boolean
    createdAt?: DateTimeFilter<"types_demande"> | Date | string
    demandes?: Demandes_rhListRelationFilter
  }

  export type types_demandeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    libelle?: SortOrder
    categorie?: SortOrder
    necessiteSolde?: SortOrder
    pieceRequise?: SortOrder
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrderInput | SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    demandes?: demandes_rhOrderByRelationAggregateInput
  }

  export type types_demandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: types_demandeWhereInput | types_demandeWhereInput[]
    OR?: types_demandeWhereInput[]
    NOT?: types_demandeWhereInput | types_demandeWhereInput[]
    libelle?: StringFilter<"types_demande"> | string
    categorie?: StringFilter<"types_demande"> | string
    necessiteSolde?: BoolFilter<"types_demande"> | boolean
    pieceRequise?: BoolFilter<"types_demande"> | boolean
    delaiMinJours?: IntFilter<"types_demande"> | number
    dureeMaxJours?: IntNullableFilter<"types_demande"> | number | null
    actif?: BoolFilter<"types_demande"> | boolean
    createdAt?: DateTimeFilter<"types_demande"> | Date | string
    demandes?: Demandes_rhListRelationFilter
  }, "id" | "code">

  export type types_demandeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    libelle?: SortOrder
    categorie?: SortOrder
    necessiteSolde?: SortOrder
    pieceRequise?: SortOrder
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrderInput | SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    _count?: types_demandeCountOrderByAggregateInput
    _avg?: types_demandeAvgOrderByAggregateInput
    _max?: types_demandeMaxOrderByAggregateInput
    _min?: types_demandeMinOrderByAggregateInput
    _sum?: types_demandeSumOrderByAggregateInput
  }

  export type types_demandeScalarWhereWithAggregatesInput = {
    AND?: types_demandeScalarWhereWithAggregatesInput | types_demandeScalarWhereWithAggregatesInput[]
    OR?: types_demandeScalarWhereWithAggregatesInput[]
    NOT?: types_demandeScalarWhereWithAggregatesInput | types_demandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"types_demande"> | string
    code?: StringWithAggregatesFilter<"types_demande"> | string
    libelle?: StringWithAggregatesFilter<"types_demande"> | string
    categorie?: StringWithAggregatesFilter<"types_demande"> | string
    necessiteSolde?: BoolWithAggregatesFilter<"types_demande"> | boolean
    pieceRequise?: BoolWithAggregatesFilter<"types_demande"> | boolean
    delaiMinJours?: IntWithAggregatesFilter<"types_demande"> | number
    dureeMaxJours?: IntNullableWithAggregatesFilter<"types_demande"> | number | null
    actif?: BoolWithAggregatesFilter<"types_demande"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"types_demande"> | Date | string
  }

  export type soldes_congesWhereInput = {
    AND?: soldes_congesWhereInput | soldes_congesWhereInput[]
    OR?: soldes_congesWhereInput[]
    NOT?: soldes_congesWhereInput | soldes_congesWhereInput[]
    id?: StringFilter<"soldes_conges"> | string
    salarieId?: StringFilter<"soldes_conges"> | string
    annee?: IntFilter<"soldes_conges"> | number
    joursAcquis?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"soldes_conges"> | Date | string
    updatedAt?: DateTimeFilter<"soldes_conges"> | Date | string
  }

  export type soldes_congesOrderByWithRelationInput = {
    id?: SortOrder
    salarieId?: SortOrder
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldes_congesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    salarieId_annee?: soldes_congesSalarieIdAnneeCompoundUniqueInput
    AND?: soldes_congesWhereInput | soldes_congesWhereInput[]
    OR?: soldes_congesWhereInput[]
    NOT?: soldes_congesWhereInput | soldes_congesWhereInput[]
    salarieId?: StringFilter<"soldes_conges"> | string
    annee?: IntFilter<"soldes_conges"> | number
    joursAcquis?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"soldes_conges"> | Date | string
    updatedAt?: DateTimeFilter<"soldes_conges"> | Date | string
  }, "id" | "salarieId_annee">

  export type soldes_congesOrderByWithAggregationInput = {
    id?: SortOrder
    salarieId?: SortOrder
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: soldes_congesCountOrderByAggregateInput
    _avg?: soldes_congesAvgOrderByAggregateInput
    _max?: soldes_congesMaxOrderByAggregateInput
    _min?: soldes_congesMinOrderByAggregateInput
    _sum?: soldes_congesSumOrderByAggregateInput
  }

  export type soldes_congesScalarWhereWithAggregatesInput = {
    AND?: soldes_congesScalarWhereWithAggregatesInput | soldes_congesScalarWhereWithAggregatesInput[]
    OR?: soldes_congesScalarWhereWithAggregatesInput[]
    NOT?: soldes_congesScalarWhereWithAggregatesInput | soldes_congesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"soldes_conges"> | string
    salarieId?: StringWithAggregatesFilter<"soldes_conges"> | string
    annee?: IntWithAggregatesFilter<"soldes_conges"> | number
    joursAcquis?: DecimalWithAggregatesFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalWithAggregatesFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalWithAggregatesFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalWithAggregatesFilter<"soldes_conges"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"soldes_conges"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"soldes_conges"> | Date | string
  }

  export type demandes_rhWhereInput = {
    AND?: demandes_rhWhereInput | demandes_rhWhereInput[]
    OR?: demandes_rhWhereInput[]
    NOT?: demandes_rhWhereInput | demandes_rhWhereInput[]
    id?: StringFilter<"demandes_rh"> | string
    numeroDemande?: StringFilter<"demandes_rh"> | string
    salarieId?: StringFilter<"demandes_rh"> | string
    salarieNom?: StringNullableFilter<"demandes_rh"> | string | null
    salarieEmail?: StringNullableFilter<"demandes_rh"> | string | null
    salariePoste?: StringNullableFilter<"demandes_rh"> | string | null
    salarieDirection?: StringNullableFilter<"demandes_rh"> | string | null
    managerId?: StringNullableFilter<"demandes_rh"> | string | null
    typeId?: StringFilter<"demandes_rh"> | string
    dateDebut?: DateTimeFilter<"demandes_rh"> | Date | string
    dateFin?: DateTimeFilter<"demandes_rh"> | Date | string
    demiJourneeDebut?: BoolFilter<"demandes_rh"> | boolean
    demiJourneeFin?: BoolFilter<"demandes_rh"> | boolean
    nombreJours?: DecimalFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string
    motif?: StringFilter<"demandes_rh"> | string
    destination?: StringNullableFilter<"demandes_rh"> | string | null
    moyenTransport?: StringNullableFilter<"demandes_rh"> | string | null
    fraisEstimes?: DecimalNullableFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string | null
    statut?: StringFilter<"demandes_rh"> | string
    etapeCourante?: IntFilter<"demandes_rh"> | number
    cycleRejetCount?: IntFilter<"demandes_rh"> | number
    documentUrl?: StringNullableFilter<"demandes_rh"> | string | null
    numeroTitre?: StringNullableFilter<"demandes_rh"> | string | null
    createdAt?: DateTimeFilter<"demandes_rh"> | Date | string
    updatedAt?: DateTimeFilter<"demandes_rh"> | Date | string
    typeDemande?: XOR<Types_demandeScalarRelationFilter, types_demandeWhereInput>
    validations?: Validations_demandeListRelationFilter
    piecesJointes?: Pieces_jointes_demandeListRelationFilter
    historique?: Historique_demandeListRelationFilter
  }

  export type demandes_rhOrderByWithRelationInput = {
    id?: SortOrder
    numeroDemande?: SortOrder
    salarieId?: SortOrder
    salarieNom?: SortOrderInput | SortOrder
    salarieEmail?: SortOrderInput | SortOrder
    salariePoste?: SortOrderInput | SortOrder
    salarieDirection?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    typeId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    demiJourneeDebut?: SortOrder
    demiJourneeFin?: SortOrder
    nombreJours?: SortOrder
    motif?: SortOrder
    destination?: SortOrderInput | SortOrder
    moyenTransport?: SortOrderInput | SortOrder
    fraisEstimes?: SortOrderInput | SortOrder
    statut?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    numeroTitre?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    typeDemande?: types_demandeOrderByWithRelationInput
    validations?: validations_demandeOrderByRelationAggregateInput
    piecesJointes?: pieces_jointes_demandeOrderByRelationAggregateInput
    historique?: historique_demandeOrderByRelationAggregateInput
  }

  export type demandes_rhWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numeroDemande?: string
    numeroTitre?: string
    AND?: demandes_rhWhereInput | demandes_rhWhereInput[]
    OR?: demandes_rhWhereInput[]
    NOT?: demandes_rhWhereInput | demandes_rhWhereInput[]
    salarieId?: StringFilter<"demandes_rh"> | string
    salarieNom?: StringNullableFilter<"demandes_rh"> | string | null
    salarieEmail?: StringNullableFilter<"demandes_rh"> | string | null
    salariePoste?: StringNullableFilter<"demandes_rh"> | string | null
    salarieDirection?: StringNullableFilter<"demandes_rh"> | string | null
    managerId?: StringNullableFilter<"demandes_rh"> | string | null
    typeId?: StringFilter<"demandes_rh"> | string
    dateDebut?: DateTimeFilter<"demandes_rh"> | Date | string
    dateFin?: DateTimeFilter<"demandes_rh"> | Date | string
    demiJourneeDebut?: BoolFilter<"demandes_rh"> | boolean
    demiJourneeFin?: BoolFilter<"demandes_rh"> | boolean
    nombreJours?: DecimalFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string
    motif?: StringFilter<"demandes_rh"> | string
    destination?: StringNullableFilter<"demandes_rh"> | string | null
    moyenTransport?: StringNullableFilter<"demandes_rh"> | string | null
    fraisEstimes?: DecimalNullableFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string | null
    statut?: StringFilter<"demandes_rh"> | string
    etapeCourante?: IntFilter<"demandes_rh"> | number
    cycleRejetCount?: IntFilter<"demandes_rh"> | number
    documentUrl?: StringNullableFilter<"demandes_rh"> | string | null
    createdAt?: DateTimeFilter<"demandes_rh"> | Date | string
    updatedAt?: DateTimeFilter<"demandes_rh"> | Date | string
    typeDemande?: XOR<Types_demandeScalarRelationFilter, types_demandeWhereInput>
    validations?: Validations_demandeListRelationFilter
    piecesJointes?: Pieces_jointes_demandeListRelationFilter
    historique?: Historique_demandeListRelationFilter
  }, "id" | "numeroDemande" | "numeroTitre">

  export type demandes_rhOrderByWithAggregationInput = {
    id?: SortOrder
    numeroDemande?: SortOrder
    salarieId?: SortOrder
    salarieNom?: SortOrderInput | SortOrder
    salarieEmail?: SortOrderInput | SortOrder
    salariePoste?: SortOrderInput | SortOrder
    salarieDirection?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    typeId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    demiJourneeDebut?: SortOrder
    demiJourneeFin?: SortOrder
    nombreJours?: SortOrder
    motif?: SortOrder
    destination?: SortOrderInput | SortOrder
    moyenTransport?: SortOrderInput | SortOrder
    fraisEstimes?: SortOrderInput | SortOrder
    statut?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    numeroTitre?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: demandes_rhCountOrderByAggregateInput
    _avg?: demandes_rhAvgOrderByAggregateInput
    _max?: demandes_rhMaxOrderByAggregateInput
    _min?: demandes_rhMinOrderByAggregateInput
    _sum?: demandes_rhSumOrderByAggregateInput
  }

  export type demandes_rhScalarWhereWithAggregatesInput = {
    AND?: demandes_rhScalarWhereWithAggregatesInput | demandes_rhScalarWhereWithAggregatesInput[]
    OR?: demandes_rhScalarWhereWithAggregatesInput[]
    NOT?: demandes_rhScalarWhereWithAggregatesInput | demandes_rhScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"demandes_rh"> | string
    numeroDemande?: StringWithAggregatesFilter<"demandes_rh"> | string
    salarieId?: StringWithAggregatesFilter<"demandes_rh"> | string
    salarieNom?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    salarieEmail?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    salariePoste?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    salarieDirection?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    managerId?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    typeId?: StringWithAggregatesFilter<"demandes_rh"> | string
    dateDebut?: DateTimeWithAggregatesFilter<"demandes_rh"> | Date | string
    dateFin?: DateTimeWithAggregatesFilter<"demandes_rh"> | Date | string
    demiJourneeDebut?: BoolWithAggregatesFilter<"demandes_rh"> | boolean
    demiJourneeFin?: BoolWithAggregatesFilter<"demandes_rh"> | boolean
    nombreJours?: DecimalWithAggregatesFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string
    motif?: StringWithAggregatesFilter<"demandes_rh"> | string
    destination?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    moyenTransport?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    fraisEstimes?: DecimalNullableWithAggregatesFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string | null
    statut?: StringWithAggregatesFilter<"demandes_rh"> | string
    etapeCourante?: IntWithAggregatesFilter<"demandes_rh"> | number
    cycleRejetCount?: IntWithAggregatesFilter<"demandes_rh"> | number
    documentUrl?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    numeroTitre?: StringNullableWithAggregatesFilter<"demandes_rh"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"demandes_rh"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"demandes_rh"> | Date | string
  }

  export type validations_demandeWhereInput = {
    AND?: validations_demandeWhereInput | validations_demandeWhereInput[]
    OR?: validations_demandeWhereInput[]
    NOT?: validations_demandeWhereInput | validations_demandeWhereInput[]
    id?: StringFilter<"validations_demande"> | string
    demandeId?: StringFilter<"validations_demande"> | string
    etape?: IntFilter<"validations_demande"> | number
    valideurId?: StringFilter<"validations_demande"> | string
    valideurNom?: StringNullableFilter<"validations_demande"> | string | null
    valideurRole?: StringNullableFilter<"validations_demande"> | string | null
    decision?: StringFilter<"validations_demande"> | string
    motif?: StringNullableFilter<"validations_demande"> | string | null
    dateDecision?: DateTimeFilter<"validations_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }

  export type validations_demandeOrderByWithRelationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    etape?: SortOrder
    valideurId?: SortOrder
    valideurNom?: SortOrderInput | SortOrder
    valideurRole?: SortOrderInput | SortOrder
    decision?: SortOrder
    motif?: SortOrderInput | SortOrder
    dateDecision?: SortOrder
    demande?: demandes_rhOrderByWithRelationInput
  }

  export type validations_demandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: validations_demandeWhereInput | validations_demandeWhereInput[]
    OR?: validations_demandeWhereInput[]
    NOT?: validations_demandeWhereInput | validations_demandeWhereInput[]
    demandeId?: StringFilter<"validations_demande"> | string
    etape?: IntFilter<"validations_demande"> | number
    valideurId?: StringFilter<"validations_demande"> | string
    valideurNom?: StringNullableFilter<"validations_demande"> | string | null
    valideurRole?: StringNullableFilter<"validations_demande"> | string | null
    decision?: StringFilter<"validations_demande"> | string
    motif?: StringNullableFilter<"validations_demande"> | string | null
    dateDecision?: DateTimeFilter<"validations_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }, "id">

  export type validations_demandeOrderByWithAggregationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    etape?: SortOrder
    valideurId?: SortOrder
    valideurNom?: SortOrderInput | SortOrder
    valideurRole?: SortOrderInput | SortOrder
    decision?: SortOrder
    motif?: SortOrderInput | SortOrder
    dateDecision?: SortOrder
    _count?: validations_demandeCountOrderByAggregateInput
    _avg?: validations_demandeAvgOrderByAggregateInput
    _max?: validations_demandeMaxOrderByAggregateInput
    _min?: validations_demandeMinOrderByAggregateInput
    _sum?: validations_demandeSumOrderByAggregateInput
  }

  export type validations_demandeScalarWhereWithAggregatesInput = {
    AND?: validations_demandeScalarWhereWithAggregatesInput | validations_demandeScalarWhereWithAggregatesInput[]
    OR?: validations_demandeScalarWhereWithAggregatesInput[]
    NOT?: validations_demandeScalarWhereWithAggregatesInput | validations_demandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"validations_demande"> | string
    demandeId?: StringWithAggregatesFilter<"validations_demande"> | string
    etape?: IntWithAggregatesFilter<"validations_demande"> | number
    valideurId?: StringWithAggregatesFilter<"validations_demande"> | string
    valideurNom?: StringNullableWithAggregatesFilter<"validations_demande"> | string | null
    valideurRole?: StringNullableWithAggregatesFilter<"validations_demande"> | string | null
    decision?: StringWithAggregatesFilter<"validations_demande"> | string
    motif?: StringNullableWithAggregatesFilter<"validations_demande"> | string | null
    dateDecision?: DateTimeWithAggregatesFilter<"validations_demande"> | Date | string
  }

  export type pieces_jointes_demandeWhereInput = {
    AND?: pieces_jointes_demandeWhereInput | pieces_jointes_demandeWhereInput[]
    OR?: pieces_jointes_demandeWhereInput[]
    NOT?: pieces_jointes_demandeWhereInput | pieces_jointes_demandeWhereInput[]
    id?: StringFilter<"pieces_jointes_demande"> | string
    demandeId?: StringFilter<"pieces_jointes_demande"> | string
    nomFichier?: StringFilter<"pieces_jointes_demande"> | string
    cheminFichier?: StringFilter<"pieces_jointes_demande"> | string
    mimeType?: StringFilter<"pieces_jointes_demande"> | string
    tailleOctets?: IntFilter<"pieces_jointes_demande"> | number
    createdAt?: DateTimeFilter<"pieces_jointes_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }

  export type pieces_jointes_demandeOrderByWithRelationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    nomFichier?: SortOrder
    cheminFichier?: SortOrder
    mimeType?: SortOrder
    tailleOctets?: SortOrder
    createdAt?: SortOrder
    demande?: demandes_rhOrderByWithRelationInput
  }

  export type pieces_jointes_demandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pieces_jointes_demandeWhereInput | pieces_jointes_demandeWhereInput[]
    OR?: pieces_jointes_demandeWhereInput[]
    NOT?: pieces_jointes_demandeWhereInput | pieces_jointes_demandeWhereInput[]
    demandeId?: StringFilter<"pieces_jointes_demande"> | string
    nomFichier?: StringFilter<"pieces_jointes_demande"> | string
    cheminFichier?: StringFilter<"pieces_jointes_demande"> | string
    mimeType?: StringFilter<"pieces_jointes_demande"> | string
    tailleOctets?: IntFilter<"pieces_jointes_demande"> | number
    createdAt?: DateTimeFilter<"pieces_jointes_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }, "id">

  export type pieces_jointes_demandeOrderByWithAggregationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    nomFichier?: SortOrder
    cheminFichier?: SortOrder
    mimeType?: SortOrder
    tailleOctets?: SortOrder
    createdAt?: SortOrder
    _count?: pieces_jointes_demandeCountOrderByAggregateInput
    _avg?: pieces_jointes_demandeAvgOrderByAggregateInput
    _max?: pieces_jointes_demandeMaxOrderByAggregateInput
    _min?: pieces_jointes_demandeMinOrderByAggregateInput
    _sum?: pieces_jointes_demandeSumOrderByAggregateInput
  }

  export type pieces_jointes_demandeScalarWhereWithAggregatesInput = {
    AND?: pieces_jointes_demandeScalarWhereWithAggregatesInput | pieces_jointes_demandeScalarWhereWithAggregatesInput[]
    OR?: pieces_jointes_demandeScalarWhereWithAggregatesInput[]
    NOT?: pieces_jointes_demandeScalarWhereWithAggregatesInput | pieces_jointes_demandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"pieces_jointes_demande"> | string
    demandeId?: StringWithAggregatesFilter<"pieces_jointes_demande"> | string
    nomFichier?: StringWithAggregatesFilter<"pieces_jointes_demande"> | string
    cheminFichier?: StringWithAggregatesFilter<"pieces_jointes_demande"> | string
    mimeType?: StringWithAggregatesFilter<"pieces_jointes_demande"> | string
    tailleOctets?: IntWithAggregatesFilter<"pieces_jointes_demande"> | number
    createdAt?: DateTimeWithAggregatesFilter<"pieces_jointes_demande"> | Date | string
  }

  export type historique_demandeWhereInput = {
    AND?: historique_demandeWhereInput | historique_demandeWhereInput[]
    OR?: historique_demandeWhereInput[]
    NOT?: historique_demandeWhereInput | historique_demandeWhereInput[]
    id?: StringFilter<"historique_demande"> | string
    demandeId?: StringFilter<"historique_demande"> | string
    auteurId?: StringFilter<"historique_demande"> | string
    auteurNom?: StringNullableFilter<"historique_demande"> | string | null
    action?: StringFilter<"historique_demande"> | string
    statutPrecedent?: StringNullableFilter<"historique_demande"> | string | null
    nouveauStatut?: StringFilter<"historique_demande"> | string
    commentaire?: StringNullableFilter<"historique_demande"> | string | null
    adresseIp?: StringNullableFilter<"historique_demande"> | string | null
    createdAt?: DateTimeFilter<"historique_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }

  export type historique_demandeOrderByWithRelationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    auteurId?: SortOrder
    auteurNom?: SortOrderInput | SortOrder
    action?: SortOrder
    statutPrecedent?: SortOrderInput | SortOrder
    nouveauStatut?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    adresseIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    demande?: demandes_rhOrderByWithRelationInput
  }

  export type historique_demandeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: historique_demandeWhereInput | historique_demandeWhereInput[]
    OR?: historique_demandeWhereInput[]
    NOT?: historique_demandeWhereInput | historique_demandeWhereInput[]
    demandeId?: StringFilter<"historique_demande"> | string
    auteurId?: StringFilter<"historique_demande"> | string
    auteurNom?: StringNullableFilter<"historique_demande"> | string | null
    action?: StringFilter<"historique_demande"> | string
    statutPrecedent?: StringNullableFilter<"historique_demande"> | string | null
    nouveauStatut?: StringFilter<"historique_demande"> | string
    commentaire?: StringNullableFilter<"historique_demande"> | string | null
    adresseIp?: StringNullableFilter<"historique_demande"> | string | null
    createdAt?: DateTimeFilter<"historique_demande"> | Date | string
    demande?: XOR<Demandes_rhScalarRelationFilter, demandes_rhWhereInput>
  }, "id">

  export type historique_demandeOrderByWithAggregationInput = {
    id?: SortOrder
    demandeId?: SortOrder
    auteurId?: SortOrder
    auteurNom?: SortOrderInput | SortOrder
    action?: SortOrder
    statutPrecedent?: SortOrderInput | SortOrder
    nouveauStatut?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    adresseIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: historique_demandeCountOrderByAggregateInput
    _max?: historique_demandeMaxOrderByAggregateInput
    _min?: historique_demandeMinOrderByAggregateInput
  }

  export type historique_demandeScalarWhereWithAggregatesInput = {
    AND?: historique_demandeScalarWhereWithAggregatesInput | historique_demandeScalarWhereWithAggregatesInput[]
    OR?: historique_demandeScalarWhereWithAggregatesInput[]
    NOT?: historique_demandeScalarWhereWithAggregatesInput | historique_demandeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"historique_demande"> | string
    demandeId?: StringWithAggregatesFilter<"historique_demande"> | string
    auteurId?: StringWithAggregatesFilter<"historique_demande"> | string
    auteurNom?: StringNullableWithAggregatesFilter<"historique_demande"> | string | null
    action?: StringWithAggregatesFilter<"historique_demande"> | string
    statutPrecedent?: StringNullableWithAggregatesFilter<"historique_demande"> | string | null
    nouveauStatut?: StringWithAggregatesFilter<"historique_demande"> | string
    commentaire?: StringNullableWithAggregatesFilter<"historique_demande"> | string | null
    adresseIp?: StringNullableWithAggregatesFilter<"historique_demande"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"historique_demande"> | Date | string
  }

  export type types_demandeCreateInput = {
    id?: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: number
    dureeMaxJours?: number | null
    actif?: boolean
    createdAt?: Date | string
    demandes?: demandes_rhCreateNestedManyWithoutTypeDemandeInput
  }

  export type types_demandeUncheckedCreateInput = {
    id?: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: number
    dureeMaxJours?: number | null
    actif?: boolean
    createdAt?: Date | string
    demandes?: demandes_rhUncheckedCreateNestedManyWithoutTypeDemandeInput
  }

  export type types_demandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demandes?: demandes_rhUpdateManyWithoutTypeDemandeNestedInput
  }

  export type types_demandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demandes?: demandes_rhUncheckedUpdateManyWithoutTypeDemandeNestedInput
  }

  export type types_demandeCreateManyInput = {
    id?: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: number
    dureeMaxJours?: number | null
    actif?: boolean
    createdAt?: Date | string
  }

  export type types_demandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type types_demandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldes_congesCreateInput = {
    id?: string
    salarieId: string
    annee: number
    joursAcquis?: Decimal | DecimalJsLike | number | string
    joursPris?: Decimal | DecimalJsLike | number | string
    joursEnAttente?: Decimal | DecimalJsLike | number | string
    reliquatN1?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldes_congesUncheckedCreateInput = {
    id?: string
    salarieId: string
    annee: number
    joursAcquis?: Decimal | DecimalJsLike | number | string
    joursPris?: Decimal | DecimalJsLike | number | string
    joursEnAttente?: Decimal | DecimalJsLike | number | string
    reliquatN1?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldes_congesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    annee?: IntFieldUpdateOperationsInput | number
    joursAcquis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldes_congesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    annee?: IntFieldUpdateOperationsInput | number
    joursAcquis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldes_congesCreateManyInput = {
    id?: string
    salarieId: string
    annee: number
    joursAcquis?: Decimal | DecimalJsLike | number | string
    joursPris?: Decimal | DecimalJsLike | number | string
    joursEnAttente?: Decimal | DecimalJsLike | number | string
    reliquatN1?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type soldes_congesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    annee?: IntFieldUpdateOperationsInput | number
    joursAcquis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type soldes_congesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    annee?: IntFieldUpdateOperationsInput | number
    joursAcquis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursPris?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    joursEnAttente?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reliquatN1?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type demandes_rhCreateInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    typeDemande: types_demandeCreateNestedOneWithoutDemandesInput
    validations?: validations_demandeCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUncheckedCreateInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    typeId: string
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    validations?: validations_demandeUncheckedCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeUncheckedCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeUncheckedCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeDemande?: types_demandeUpdateOneRequiredWithoutDemandesNestedInput
    validations?: validations_demandeUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validations?: validations_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUncheckedUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhCreateManyInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    typeId: string
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type demandes_rhUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type demandes_rhUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeCreateInput = {
    id?: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
    demande: demandes_rhCreateNestedOneWithoutValidationsInput
  }

  export type validations_demandeUncheckedCreateInput = {
    id?: string
    demandeId: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
  }

  export type validations_demandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
    demande?: demandes_rhUpdateOneRequiredWithoutValidationsNestedInput
  }

  export type validations_demandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeCreateManyInput = {
    id?: string
    demandeId: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
  }

  export type validations_demandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeCreateInput = {
    id?: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
    demande: demandes_rhCreateNestedOneWithoutPiecesJointesInput
  }

  export type pieces_jointes_demandeUncheckedCreateInput = {
    id?: string
    demandeId: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
  }

  export type pieces_jointes_demandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demande?: demandes_rhUpdateOneRequiredWithoutPiecesJointesNestedInput
  }

  export type pieces_jointes_demandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeCreateManyInput = {
    id?: string
    demandeId: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
  }

  export type pieces_jointes_demandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeCreateInput = {
    id?: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
    demande: demandes_rhCreateNestedOneWithoutHistoriqueInput
  }

  export type historique_demandeUncheckedCreateInput = {
    id?: string
    demandeId: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
  }

  export type historique_demandeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demande?: demandes_rhUpdateOneRequiredWithoutHistoriqueNestedInput
  }

  export type historique_demandeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeCreateManyInput = {
    id?: string
    demandeId: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
  }

  export type historique_demandeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    demandeId?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Demandes_rhListRelationFilter = {
    every?: demandes_rhWhereInput
    some?: demandes_rhWhereInput
    none?: demandes_rhWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type demandes_rhOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type types_demandeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    libelle?: SortOrder
    categorie?: SortOrder
    necessiteSolde?: SortOrder
    pieceRequise?: SortOrder
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
  }

  export type types_demandeAvgOrderByAggregateInput = {
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrder
  }

  export type types_demandeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    libelle?: SortOrder
    categorie?: SortOrder
    necessiteSolde?: SortOrder
    pieceRequise?: SortOrder
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
  }

  export type types_demandeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    libelle?: SortOrder
    categorie?: SortOrder
    necessiteSolde?: SortOrder
    pieceRequise?: SortOrder
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
  }

  export type types_demandeSumOrderByAggregateInput = {
    delaiMinJours?: SortOrder
    dureeMaxJours?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type soldes_congesSalarieIdAnneeCompoundUniqueInput = {
    salarieId: string
    annee: number
  }

  export type soldes_congesCountOrderByAggregateInput = {
    id?: SortOrder
    salarieId?: SortOrder
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldes_congesAvgOrderByAggregateInput = {
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
  }

  export type soldes_congesMaxOrderByAggregateInput = {
    id?: SortOrder
    salarieId?: SortOrder
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldes_congesMinOrderByAggregateInput = {
    id?: SortOrder
    salarieId?: SortOrder
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type soldes_congesSumOrderByAggregateInput = {
    annee?: SortOrder
    joursAcquis?: SortOrder
    joursPris?: SortOrder
    joursEnAttente?: SortOrder
    reliquatN1?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type Types_demandeScalarRelationFilter = {
    is?: types_demandeWhereInput
    isNot?: types_demandeWhereInput
  }

  export type Validations_demandeListRelationFilter = {
    every?: validations_demandeWhereInput
    some?: validations_demandeWhereInput
    none?: validations_demandeWhereInput
  }

  export type Pieces_jointes_demandeListRelationFilter = {
    every?: pieces_jointes_demandeWhereInput
    some?: pieces_jointes_demandeWhereInput
    none?: pieces_jointes_demandeWhereInput
  }

  export type Historique_demandeListRelationFilter = {
    every?: historique_demandeWhereInput
    some?: historique_demandeWhereInput
    none?: historique_demandeWhereInput
  }

  export type validations_demandeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pieces_jointes_demandeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type historique_demandeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type demandes_rhCountOrderByAggregateInput = {
    id?: SortOrder
    numeroDemande?: SortOrder
    salarieId?: SortOrder
    salarieNom?: SortOrder
    salarieEmail?: SortOrder
    salariePoste?: SortOrder
    salarieDirection?: SortOrder
    managerId?: SortOrder
    typeId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    demiJourneeDebut?: SortOrder
    demiJourneeFin?: SortOrder
    nombreJours?: SortOrder
    motif?: SortOrder
    destination?: SortOrder
    moyenTransport?: SortOrder
    fraisEstimes?: SortOrder
    statut?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
    documentUrl?: SortOrder
    numeroTitre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type demandes_rhAvgOrderByAggregateInput = {
    nombreJours?: SortOrder
    fraisEstimes?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
  }

  export type demandes_rhMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroDemande?: SortOrder
    salarieId?: SortOrder
    salarieNom?: SortOrder
    salarieEmail?: SortOrder
    salariePoste?: SortOrder
    salarieDirection?: SortOrder
    managerId?: SortOrder
    typeId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    demiJourneeDebut?: SortOrder
    demiJourneeFin?: SortOrder
    nombreJours?: SortOrder
    motif?: SortOrder
    destination?: SortOrder
    moyenTransport?: SortOrder
    fraisEstimes?: SortOrder
    statut?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
    documentUrl?: SortOrder
    numeroTitre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type demandes_rhMinOrderByAggregateInput = {
    id?: SortOrder
    numeroDemande?: SortOrder
    salarieId?: SortOrder
    salarieNom?: SortOrder
    salarieEmail?: SortOrder
    salariePoste?: SortOrder
    salarieDirection?: SortOrder
    managerId?: SortOrder
    typeId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    demiJourneeDebut?: SortOrder
    demiJourneeFin?: SortOrder
    nombreJours?: SortOrder
    motif?: SortOrder
    destination?: SortOrder
    moyenTransport?: SortOrder
    fraisEstimes?: SortOrder
    statut?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
    documentUrl?: SortOrder
    numeroTitre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type demandes_rhSumOrderByAggregateInput = {
    nombreJours?: SortOrder
    fraisEstimes?: SortOrder
    etapeCourante?: SortOrder
    cycleRejetCount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type Demandes_rhScalarRelationFilter = {
    is?: demandes_rhWhereInput
    isNot?: demandes_rhWhereInput
  }

  export type validations_demandeCountOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    etape?: SortOrder
    valideurId?: SortOrder
    valideurNom?: SortOrder
    valideurRole?: SortOrder
    decision?: SortOrder
    motif?: SortOrder
    dateDecision?: SortOrder
  }

  export type validations_demandeAvgOrderByAggregateInput = {
    etape?: SortOrder
  }

  export type validations_demandeMaxOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    etape?: SortOrder
    valideurId?: SortOrder
    valideurNom?: SortOrder
    valideurRole?: SortOrder
    decision?: SortOrder
    motif?: SortOrder
    dateDecision?: SortOrder
  }

  export type validations_demandeMinOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    etape?: SortOrder
    valideurId?: SortOrder
    valideurNom?: SortOrder
    valideurRole?: SortOrder
    decision?: SortOrder
    motif?: SortOrder
    dateDecision?: SortOrder
  }

  export type validations_demandeSumOrderByAggregateInput = {
    etape?: SortOrder
  }

  export type pieces_jointes_demandeCountOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    nomFichier?: SortOrder
    cheminFichier?: SortOrder
    mimeType?: SortOrder
    tailleOctets?: SortOrder
    createdAt?: SortOrder
  }

  export type pieces_jointes_demandeAvgOrderByAggregateInput = {
    tailleOctets?: SortOrder
  }

  export type pieces_jointes_demandeMaxOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    nomFichier?: SortOrder
    cheminFichier?: SortOrder
    mimeType?: SortOrder
    tailleOctets?: SortOrder
    createdAt?: SortOrder
  }

  export type pieces_jointes_demandeMinOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    nomFichier?: SortOrder
    cheminFichier?: SortOrder
    mimeType?: SortOrder
    tailleOctets?: SortOrder
    createdAt?: SortOrder
  }

  export type pieces_jointes_demandeSumOrderByAggregateInput = {
    tailleOctets?: SortOrder
  }

  export type historique_demandeCountOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    auteurId?: SortOrder
    auteurNom?: SortOrder
    action?: SortOrder
    statutPrecedent?: SortOrder
    nouveauStatut?: SortOrder
    commentaire?: SortOrder
    adresseIp?: SortOrder
    createdAt?: SortOrder
  }

  export type historique_demandeMaxOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    auteurId?: SortOrder
    auteurNom?: SortOrder
    action?: SortOrder
    statutPrecedent?: SortOrder
    nouveauStatut?: SortOrder
    commentaire?: SortOrder
    adresseIp?: SortOrder
    createdAt?: SortOrder
  }

  export type historique_demandeMinOrderByAggregateInput = {
    id?: SortOrder
    demandeId?: SortOrder
    auteurId?: SortOrder
    auteurNom?: SortOrder
    action?: SortOrder
    statutPrecedent?: SortOrder
    nouveauStatut?: SortOrder
    commentaire?: SortOrder
    adresseIp?: SortOrder
    createdAt?: SortOrder
  }

  export type demandes_rhCreateNestedManyWithoutTypeDemandeInput = {
    create?: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput> | demandes_rhCreateWithoutTypeDemandeInput[] | demandes_rhUncheckedCreateWithoutTypeDemandeInput[]
    connectOrCreate?: demandes_rhCreateOrConnectWithoutTypeDemandeInput | demandes_rhCreateOrConnectWithoutTypeDemandeInput[]
    createMany?: demandes_rhCreateManyTypeDemandeInputEnvelope
    connect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
  }

  export type demandes_rhUncheckedCreateNestedManyWithoutTypeDemandeInput = {
    create?: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput> | demandes_rhCreateWithoutTypeDemandeInput[] | demandes_rhUncheckedCreateWithoutTypeDemandeInput[]
    connectOrCreate?: demandes_rhCreateOrConnectWithoutTypeDemandeInput | demandes_rhCreateOrConnectWithoutTypeDemandeInput[]
    createMany?: demandes_rhCreateManyTypeDemandeInputEnvelope
    connect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type demandes_rhUpdateManyWithoutTypeDemandeNestedInput = {
    create?: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput> | demandes_rhCreateWithoutTypeDemandeInput[] | demandes_rhUncheckedCreateWithoutTypeDemandeInput[]
    connectOrCreate?: demandes_rhCreateOrConnectWithoutTypeDemandeInput | demandes_rhCreateOrConnectWithoutTypeDemandeInput[]
    upsert?: demandes_rhUpsertWithWhereUniqueWithoutTypeDemandeInput | demandes_rhUpsertWithWhereUniqueWithoutTypeDemandeInput[]
    createMany?: demandes_rhCreateManyTypeDemandeInputEnvelope
    set?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    disconnect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    delete?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    connect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    update?: demandes_rhUpdateWithWhereUniqueWithoutTypeDemandeInput | demandes_rhUpdateWithWhereUniqueWithoutTypeDemandeInput[]
    updateMany?: demandes_rhUpdateManyWithWhereWithoutTypeDemandeInput | demandes_rhUpdateManyWithWhereWithoutTypeDemandeInput[]
    deleteMany?: demandes_rhScalarWhereInput | demandes_rhScalarWhereInput[]
  }

  export type demandes_rhUncheckedUpdateManyWithoutTypeDemandeNestedInput = {
    create?: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput> | demandes_rhCreateWithoutTypeDemandeInput[] | demandes_rhUncheckedCreateWithoutTypeDemandeInput[]
    connectOrCreate?: demandes_rhCreateOrConnectWithoutTypeDemandeInput | demandes_rhCreateOrConnectWithoutTypeDemandeInput[]
    upsert?: demandes_rhUpsertWithWhereUniqueWithoutTypeDemandeInput | demandes_rhUpsertWithWhereUniqueWithoutTypeDemandeInput[]
    createMany?: demandes_rhCreateManyTypeDemandeInputEnvelope
    set?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    disconnect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    delete?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    connect?: demandes_rhWhereUniqueInput | demandes_rhWhereUniqueInput[]
    update?: demandes_rhUpdateWithWhereUniqueWithoutTypeDemandeInput | demandes_rhUpdateWithWhereUniqueWithoutTypeDemandeInput[]
    updateMany?: demandes_rhUpdateManyWithWhereWithoutTypeDemandeInput | demandes_rhUpdateManyWithWhereWithoutTypeDemandeInput[]
    deleteMany?: demandes_rhScalarWhereInput | demandes_rhScalarWhereInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type types_demandeCreateNestedOneWithoutDemandesInput = {
    create?: XOR<types_demandeCreateWithoutDemandesInput, types_demandeUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: types_demandeCreateOrConnectWithoutDemandesInput
    connect?: types_demandeWhereUniqueInput
  }

  export type validations_demandeCreateNestedManyWithoutDemandeInput = {
    create?: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput> | validations_demandeCreateWithoutDemandeInput[] | validations_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: validations_demandeCreateOrConnectWithoutDemandeInput | validations_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: validations_demandeCreateManyDemandeInputEnvelope
    connect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
  }

  export type pieces_jointes_demandeCreateNestedManyWithoutDemandeInput = {
    create?: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput> | pieces_jointes_demandeCreateWithoutDemandeInput[] | pieces_jointes_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: pieces_jointes_demandeCreateOrConnectWithoutDemandeInput | pieces_jointes_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: pieces_jointes_demandeCreateManyDemandeInputEnvelope
    connect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
  }

  export type historique_demandeCreateNestedManyWithoutDemandeInput = {
    create?: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput> | historique_demandeCreateWithoutDemandeInput[] | historique_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: historique_demandeCreateOrConnectWithoutDemandeInput | historique_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: historique_demandeCreateManyDemandeInputEnvelope
    connect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
  }

  export type validations_demandeUncheckedCreateNestedManyWithoutDemandeInput = {
    create?: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput> | validations_demandeCreateWithoutDemandeInput[] | validations_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: validations_demandeCreateOrConnectWithoutDemandeInput | validations_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: validations_demandeCreateManyDemandeInputEnvelope
    connect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
  }

  export type pieces_jointes_demandeUncheckedCreateNestedManyWithoutDemandeInput = {
    create?: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput> | pieces_jointes_demandeCreateWithoutDemandeInput[] | pieces_jointes_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: pieces_jointes_demandeCreateOrConnectWithoutDemandeInput | pieces_jointes_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: pieces_jointes_demandeCreateManyDemandeInputEnvelope
    connect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
  }

  export type historique_demandeUncheckedCreateNestedManyWithoutDemandeInput = {
    create?: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput> | historique_demandeCreateWithoutDemandeInput[] | historique_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: historique_demandeCreateOrConnectWithoutDemandeInput | historique_demandeCreateOrConnectWithoutDemandeInput[]
    createMany?: historique_demandeCreateManyDemandeInputEnvelope
    connect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type types_demandeUpdateOneRequiredWithoutDemandesNestedInput = {
    create?: XOR<types_demandeCreateWithoutDemandesInput, types_demandeUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: types_demandeCreateOrConnectWithoutDemandesInput
    upsert?: types_demandeUpsertWithoutDemandesInput
    connect?: types_demandeWhereUniqueInput
    update?: XOR<XOR<types_demandeUpdateToOneWithWhereWithoutDemandesInput, types_demandeUpdateWithoutDemandesInput>, types_demandeUncheckedUpdateWithoutDemandesInput>
  }

  export type validations_demandeUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput> | validations_demandeCreateWithoutDemandeInput[] | validations_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: validations_demandeCreateOrConnectWithoutDemandeInput | validations_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: validations_demandeUpsertWithWhereUniqueWithoutDemandeInput | validations_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: validations_demandeCreateManyDemandeInputEnvelope
    set?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    disconnect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    delete?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    connect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    update?: validations_demandeUpdateWithWhereUniqueWithoutDemandeInput | validations_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: validations_demandeUpdateManyWithWhereWithoutDemandeInput | validations_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: validations_demandeScalarWhereInput | validations_demandeScalarWhereInput[]
  }

  export type pieces_jointes_demandeUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput> | pieces_jointes_demandeCreateWithoutDemandeInput[] | pieces_jointes_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: pieces_jointes_demandeCreateOrConnectWithoutDemandeInput | pieces_jointes_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: pieces_jointes_demandeUpsertWithWhereUniqueWithoutDemandeInput | pieces_jointes_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: pieces_jointes_demandeCreateManyDemandeInputEnvelope
    set?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    disconnect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    delete?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    connect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    update?: pieces_jointes_demandeUpdateWithWhereUniqueWithoutDemandeInput | pieces_jointes_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: pieces_jointes_demandeUpdateManyWithWhereWithoutDemandeInput | pieces_jointes_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: pieces_jointes_demandeScalarWhereInput | pieces_jointes_demandeScalarWhereInput[]
  }

  export type historique_demandeUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput> | historique_demandeCreateWithoutDemandeInput[] | historique_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: historique_demandeCreateOrConnectWithoutDemandeInput | historique_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: historique_demandeUpsertWithWhereUniqueWithoutDemandeInput | historique_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: historique_demandeCreateManyDemandeInputEnvelope
    set?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    disconnect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    delete?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    connect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    update?: historique_demandeUpdateWithWhereUniqueWithoutDemandeInput | historique_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: historique_demandeUpdateManyWithWhereWithoutDemandeInput | historique_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: historique_demandeScalarWhereInput | historique_demandeScalarWhereInput[]
  }

  export type validations_demandeUncheckedUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput> | validations_demandeCreateWithoutDemandeInput[] | validations_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: validations_demandeCreateOrConnectWithoutDemandeInput | validations_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: validations_demandeUpsertWithWhereUniqueWithoutDemandeInput | validations_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: validations_demandeCreateManyDemandeInputEnvelope
    set?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    disconnect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    delete?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    connect?: validations_demandeWhereUniqueInput | validations_demandeWhereUniqueInput[]
    update?: validations_demandeUpdateWithWhereUniqueWithoutDemandeInput | validations_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: validations_demandeUpdateManyWithWhereWithoutDemandeInput | validations_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: validations_demandeScalarWhereInput | validations_demandeScalarWhereInput[]
  }

  export type pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput> | pieces_jointes_demandeCreateWithoutDemandeInput[] | pieces_jointes_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: pieces_jointes_demandeCreateOrConnectWithoutDemandeInput | pieces_jointes_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: pieces_jointes_demandeUpsertWithWhereUniqueWithoutDemandeInput | pieces_jointes_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: pieces_jointes_demandeCreateManyDemandeInputEnvelope
    set?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    disconnect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    delete?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    connect?: pieces_jointes_demandeWhereUniqueInput | pieces_jointes_demandeWhereUniqueInput[]
    update?: pieces_jointes_demandeUpdateWithWhereUniqueWithoutDemandeInput | pieces_jointes_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: pieces_jointes_demandeUpdateManyWithWhereWithoutDemandeInput | pieces_jointes_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: pieces_jointes_demandeScalarWhereInput | pieces_jointes_demandeScalarWhereInput[]
  }

  export type historique_demandeUncheckedUpdateManyWithoutDemandeNestedInput = {
    create?: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput> | historique_demandeCreateWithoutDemandeInput[] | historique_demandeUncheckedCreateWithoutDemandeInput[]
    connectOrCreate?: historique_demandeCreateOrConnectWithoutDemandeInput | historique_demandeCreateOrConnectWithoutDemandeInput[]
    upsert?: historique_demandeUpsertWithWhereUniqueWithoutDemandeInput | historique_demandeUpsertWithWhereUniqueWithoutDemandeInput[]
    createMany?: historique_demandeCreateManyDemandeInputEnvelope
    set?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    disconnect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    delete?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    connect?: historique_demandeWhereUniqueInput | historique_demandeWhereUniqueInput[]
    update?: historique_demandeUpdateWithWhereUniqueWithoutDemandeInput | historique_demandeUpdateWithWhereUniqueWithoutDemandeInput[]
    updateMany?: historique_demandeUpdateManyWithWhereWithoutDemandeInput | historique_demandeUpdateManyWithWhereWithoutDemandeInput[]
    deleteMany?: historique_demandeScalarWhereInput | historique_demandeScalarWhereInput[]
  }

  export type demandes_rhCreateNestedOneWithoutValidationsInput = {
    create?: XOR<demandes_rhCreateWithoutValidationsInput, demandes_rhUncheckedCreateWithoutValidationsInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutValidationsInput
    connect?: demandes_rhWhereUniqueInput
  }

  export type demandes_rhUpdateOneRequiredWithoutValidationsNestedInput = {
    create?: XOR<demandes_rhCreateWithoutValidationsInput, demandes_rhUncheckedCreateWithoutValidationsInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutValidationsInput
    upsert?: demandes_rhUpsertWithoutValidationsInput
    connect?: demandes_rhWhereUniqueInput
    update?: XOR<XOR<demandes_rhUpdateToOneWithWhereWithoutValidationsInput, demandes_rhUpdateWithoutValidationsInput>, demandes_rhUncheckedUpdateWithoutValidationsInput>
  }

  export type demandes_rhCreateNestedOneWithoutPiecesJointesInput = {
    create?: XOR<demandes_rhCreateWithoutPiecesJointesInput, demandes_rhUncheckedCreateWithoutPiecesJointesInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutPiecesJointesInput
    connect?: demandes_rhWhereUniqueInput
  }

  export type demandes_rhUpdateOneRequiredWithoutPiecesJointesNestedInput = {
    create?: XOR<demandes_rhCreateWithoutPiecesJointesInput, demandes_rhUncheckedCreateWithoutPiecesJointesInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutPiecesJointesInput
    upsert?: demandes_rhUpsertWithoutPiecesJointesInput
    connect?: demandes_rhWhereUniqueInput
    update?: XOR<XOR<demandes_rhUpdateToOneWithWhereWithoutPiecesJointesInput, demandes_rhUpdateWithoutPiecesJointesInput>, demandes_rhUncheckedUpdateWithoutPiecesJointesInput>
  }

  export type demandes_rhCreateNestedOneWithoutHistoriqueInput = {
    create?: XOR<demandes_rhCreateWithoutHistoriqueInput, demandes_rhUncheckedCreateWithoutHistoriqueInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutHistoriqueInput
    connect?: demandes_rhWhereUniqueInput
  }

  export type demandes_rhUpdateOneRequiredWithoutHistoriqueNestedInput = {
    create?: XOR<demandes_rhCreateWithoutHistoriqueInput, demandes_rhUncheckedCreateWithoutHistoriqueInput>
    connectOrCreate?: demandes_rhCreateOrConnectWithoutHistoriqueInput
    upsert?: demandes_rhUpsertWithoutHistoriqueInput
    connect?: demandes_rhWhereUniqueInput
    update?: XOR<XOR<demandes_rhUpdateToOneWithWhereWithoutHistoriqueInput, demandes_rhUpdateWithoutHistoriqueInput>, demandes_rhUncheckedUpdateWithoutHistoriqueInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type demandes_rhCreateWithoutTypeDemandeInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    validations?: validations_demandeCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUncheckedCreateWithoutTypeDemandeInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    validations?: validations_demandeUncheckedCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeUncheckedCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeUncheckedCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhCreateOrConnectWithoutTypeDemandeInput = {
    where: demandes_rhWhereUniqueInput
    create: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput>
  }

  export type demandes_rhCreateManyTypeDemandeInputEnvelope = {
    data: demandes_rhCreateManyTypeDemandeInput | demandes_rhCreateManyTypeDemandeInput[]
    skipDuplicates?: boolean
  }

  export type demandes_rhUpsertWithWhereUniqueWithoutTypeDemandeInput = {
    where: demandes_rhWhereUniqueInput
    update: XOR<demandes_rhUpdateWithoutTypeDemandeInput, demandes_rhUncheckedUpdateWithoutTypeDemandeInput>
    create: XOR<demandes_rhCreateWithoutTypeDemandeInput, demandes_rhUncheckedCreateWithoutTypeDemandeInput>
  }

  export type demandes_rhUpdateWithWhereUniqueWithoutTypeDemandeInput = {
    where: demandes_rhWhereUniqueInput
    data: XOR<demandes_rhUpdateWithoutTypeDemandeInput, demandes_rhUncheckedUpdateWithoutTypeDemandeInput>
  }

  export type demandes_rhUpdateManyWithWhereWithoutTypeDemandeInput = {
    where: demandes_rhScalarWhereInput
    data: XOR<demandes_rhUpdateManyMutationInput, demandes_rhUncheckedUpdateManyWithoutTypeDemandeInput>
  }

  export type demandes_rhScalarWhereInput = {
    AND?: demandes_rhScalarWhereInput | demandes_rhScalarWhereInput[]
    OR?: demandes_rhScalarWhereInput[]
    NOT?: demandes_rhScalarWhereInput | demandes_rhScalarWhereInput[]
    id?: StringFilter<"demandes_rh"> | string
    numeroDemande?: StringFilter<"demandes_rh"> | string
    salarieId?: StringFilter<"demandes_rh"> | string
    salarieNom?: StringNullableFilter<"demandes_rh"> | string | null
    salarieEmail?: StringNullableFilter<"demandes_rh"> | string | null
    salariePoste?: StringNullableFilter<"demandes_rh"> | string | null
    salarieDirection?: StringNullableFilter<"demandes_rh"> | string | null
    managerId?: StringNullableFilter<"demandes_rh"> | string | null
    typeId?: StringFilter<"demandes_rh"> | string
    dateDebut?: DateTimeFilter<"demandes_rh"> | Date | string
    dateFin?: DateTimeFilter<"demandes_rh"> | Date | string
    demiJourneeDebut?: BoolFilter<"demandes_rh"> | boolean
    demiJourneeFin?: BoolFilter<"demandes_rh"> | boolean
    nombreJours?: DecimalFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string
    motif?: StringFilter<"demandes_rh"> | string
    destination?: StringNullableFilter<"demandes_rh"> | string | null
    moyenTransport?: StringNullableFilter<"demandes_rh"> | string | null
    fraisEstimes?: DecimalNullableFilter<"demandes_rh"> | Decimal | DecimalJsLike | number | string | null
    statut?: StringFilter<"demandes_rh"> | string
    etapeCourante?: IntFilter<"demandes_rh"> | number
    cycleRejetCount?: IntFilter<"demandes_rh"> | number
    documentUrl?: StringNullableFilter<"demandes_rh"> | string | null
    numeroTitre?: StringNullableFilter<"demandes_rh"> | string | null
    createdAt?: DateTimeFilter<"demandes_rh"> | Date | string
    updatedAt?: DateTimeFilter<"demandes_rh"> | Date | string
  }

  export type types_demandeCreateWithoutDemandesInput = {
    id?: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: number
    dureeMaxJours?: number | null
    actif?: boolean
    createdAt?: Date | string
  }

  export type types_demandeUncheckedCreateWithoutDemandesInput = {
    id?: string
    code: string
    libelle: string
    categorie: string
    necessiteSolde?: boolean
    pieceRequise?: boolean
    delaiMinJours?: number
    dureeMaxJours?: number | null
    actif?: boolean
    createdAt?: Date | string
  }

  export type types_demandeCreateOrConnectWithoutDemandesInput = {
    where: types_demandeWhereUniqueInput
    create: XOR<types_demandeCreateWithoutDemandesInput, types_demandeUncheckedCreateWithoutDemandesInput>
  }

  export type validations_demandeCreateWithoutDemandeInput = {
    id?: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
  }

  export type validations_demandeUncheckedCreateWithoutDemandeInput = {
    id?: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
  }

  export type validations_demandeCreateOrConnectWithoutDemandeInput = {
    where: validations_demandeWhereUniqueInput
    create: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type validations_demandeCreateManyDemandeInputEnvelope = {
    data: validations_demandeCreateManyDemandeInput | validations_demandeCreateManyDemandeInput[]
    skipDuplicates?: boolean
  }

  export type pieces_jointes_demandeCreateWithoutDemandeInput = {
    id?: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
  }

  export type pieces_jointes_demandeUncheckedCreateWithoutDemandeInput = {
    id?: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
  }

  export type pieces_jointes_demandeCreateOrConnectWithoutDemandeInput = {
    where: pieces_jointes_demandeWhereUniqueInput
    create: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type pieces_jointes_demandeCreateManyDemandeInputEnvelope = {
    data: pieces_jointes_demandeCreateManyDemandeInput | pieces_jointes_demandeCreateManyDemandeInput[]
    skipDuplicates?: boolean
  }

  export type historique_demandeCreateWithoutDemandeInput = {
    id?: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
  }

  export type historique_demandeUncheckedCreateWithoutDemandeInput = {
    id?: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
  }

  export type historique_demandeCreateOrConnectWithoutDemandeInput = {
    where: historique_demandeWhereUniqueInput
    create: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type historique_demandeCreateManyDemandeInputEnvelope = {
    data: historique_demandeCreateManyDemandeInput | historique_demandeCreateManyDemandeInput[]
    skipDuplicates?: boolean
  }

  export type types_demandeUpsertWithoutDemandesInput = {
    update: XOR<types_demandeUpdateWithoutDemandesInput, types_demandeUncheckedUpdateWithoutDemandesInput>
    create: XOR<types_demandeCreateWithoutDemandesInput, types_demandeUncheckedCreateWithoutDemandesInput>
    where?: types_demandeWhereInput
  }

  export type types_demandeUpdateToOneWithWhereWithoutDemandesInput = {
    where?: types_demandeWhereInput
    data: XOR<types_demandeUpdateWithoutDemandesInput, types_demandeUncheckedUpdateWithoutDemandesInput>
  }

  export type types_demandeUpdateWithoutDemandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type types_demandeUncheckedUpdateWithoutDemandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    categorie?: StringFieldUpdateOperationsInput | string
    necessiteSolde?: BoolFieldUpdateOperationsInput | boolean
    pieceRequise?: BoolFieldUpdateOperationsInput | boolean
    delaiMinJours?: IntFieldUpdateOperationsInput | number
    dureeMaxJours?: NullableIntFieldUpdateOperationsInput | number | null
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeUpsertWithWhereUniqueWithoutDemandeInput = {
    where: validations_demandeWhereUniqueInput
    update: XOR<validations_demandeUpdateWithoutDemandeInput, validations_demandeUncheckedUpdateWithoutDemandeInput>
    create: XOR<validations_demandeCreateWithoutDemandeInput, validations_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type validations_demandeUpdateWithWhereUniqueWithoutDemandeInput = {
    where: validations_demandeWhereUniqueInput
    data: XOR<validations_demandeUpdateWithoutDemandeInput, validations_demandeUncheckedUpdateWithoutDemandeInput>
  }

  export type validations_demandeUpdateManyWithWhereWithoutDemandeInput = {
    where: validations_demandeScalarWhereInput
    data: XOR<validations_demandeUpdateManyMutationInput, validations_demandeUncheckedUpdateManyWithoutDemandeInput>
  }

  export type validations_demandeScalarWhereInput = {
    AND?: validations_demandeScalarWhereInput | validations_demandeScalarWhereInput[]
    OR?: validations_demandeScalarWhereInput[]
    NOT?: validations_demandeScalarWhereInput | validations_demandeScalarWhereInput[]
    id?: StringFilter<"validations_demande"> | string
    demandeId?: StringFilter<"validations_demande"> | string
    etape?: IntFilter<"validations_demande"> | number
    valideurId?: StringFilter<"validations_demande"> | string
    valideurNom?: StringNullableFilter<"validations_demande"> | string | null
    valideurRole?: StringNullableFilter<"validations_demande"> | string | null
    decision?: StringFilter<"validations_demande"> | string
    motif?: StringNullableFilter<"validations_demande"> | string | null
    dateDecision?: DateTimeFilter<"validations_demande"> | Date | string
  }

  export type pieces_jointes_demandeUpsertWithWhereUniqueWithoutDemandeInput = {
    where: pieces_jointes_demandeWhereUniqueInput
    update: XOR<pieces_jointes_demandeUpdateWithoutDemandeInput, pieces_jointes_demandeUncheckedUpdateWithoutDemandeInput>
    create: XOR<pieces_jointes_demandeCreateWithoutDemandeInput, pieces_jointes_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type pieces_jointes_demandeUpdateWithWhereUniqueWithoutDemandeInput = {
    where: pieces_jointes_demandeWhereUniqueInput
    data: XOR<pieces_jointes_demandeUpdateWithoutDemandeInput, pieces_jointes_demandeUncheckedUpdateWithoutDemandeInput>
  }

  export type pieces_jointes_demandeUpdateManyWithWhereWithoutDemandeInput = {
    where: pieces_jointes_demandeScalarWhereInput
    data: XOR<pieces_jointes_demandeUpdateManyMutationInput, pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeInput>
  }

  export type pieces_jointes_demandeScalarWhereInput = {
    AND?: pieces_jointes_demandeScalarWhereInput | pieces_jointes_demandeScalarWhereInput[]
    OR?: pieces_jointes_demandeScalarWhereInput[]
    NOT?: pieces_jointes_demandeScalarWhereInput | pieces_jointes_demandeScalarWhereInput[]
    id?: StringFilter<"pieces_jointes_demande"> | string
    demandeId?: StringFilter<"pieces_jointes_demande"> | string
    nomFichier?: StringFilter<"pieces_jointes_demande"> | string
    cheminFichier?: StringFilter<"pieces_jointes_demande"> | string
    mimeType?: StringFilter<"pieces_jointes_demande"> | string
    tailleOctets?: IntFilter<"pieces_jointes_demande"> | number
    createdAt?: DateTimeFilter<"pieces_jointes_demande"> | Date | string
  }

  export type historique_demandeUpsertWithWhereUniqueWithoutDemandeInput = {
    where: historique_demandeWhereUniqueInput
    update: XOR<historique_demandeUpdateWithoutDemandeInput, historique_demandeUncheckedUpdateWithoutDemandeInput>
    create: XOR<historique_demandeCreateWithoutDemandeInput, historique_demandeUncheckedCreateWithoutDemandeInput>
  }

  export type historique_demandeUpdateWithWhereUniqueWithoutDemandeInput = {
    where: historique_demandeWhereUniqueInput
    data: XOR<historique_demandeUpdateWithoutDemandeInput, historique_demandeUncheckedUpdateWithoutDemandeInput>
  }

  export type historique_demandeUpdateManyWithWhereWithoutDemandeInput = {
    where: historique_demandeScalarWhereInput
    data: XOR<historique_demandeUpdateManyMutationInput, historique_demandeUncheckedUpdateManyWithoutDemandeInput>
  }

  export type historique_demandeScalarWhereInput = {
    AND?: historique_demandeScalarWhereInput | historique_demandeScalarWhereInput[]
    OR?: historique_demandeScalarWhereInput[]
    NOT?: historique_demandeScalarWhereInput | historique_demandeScalarWhereInput[]
    id?: StringFilter<"historique_demande"> | string
    demandeId?: StringFilter<"historique_demande"> | string
    auteurId?: StringFilter<"historique_demande"> | string
    auteurNom?: StringNullableFilter<"historique_demande"> | string | null
    action?: StringFilter<"historique_demande"> | string
    statutPrecedent?: StringNullableFilter<"historique_demande"> | string | null
    nouveauStatut?: StringFilter<"historique_demande"> | string
    commentaire?: StringNullableFilter<"historique_demande"> | string | null
    adresseIp?: StringNullableFilter<"historique_demande"> | string | null
    createdAt?: DateTimeFilter<"historique_demande"> | Date | string
  }

  export type demandes_rhCreateWithoutValidationsInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    typeDemande: types_demandeCreateNestedOneWithoutDemandesInput
    piecesJointes?: pieces_jointes_demandeCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUncheckedCreateWithoutValidationsInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    typeId: string
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    piecesJointes?: pieces_jointes_demandeUncheckedCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeUncheckedCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhCreateOrConnectWithoutValidationsInput = {
    where: demandes_rhWhereUniqueInput
    create: XOR<demandes_rhCreateWithoutValidationsInput, demandes_rhUncheckedCreateWithoutValidationsInput>
  }

  export type demandes_rhUpsertWithoutValidationsInput = {
    update: XOR<demandes_rhUpdateWithoutValidationsInput, demandes_rhUncheckedUpdateWithoutValidationsInput>
    create: XOR<demandes_rhCreateWithoutValidationsInput, demandes_rhUncheckedCreateWithoutValidationsInput>
    where?: demandes_rhWhereInput
  }

  export type demandes_rhUpdateToOneWithWhereWithoutValidationsInput = {
    where?: demandes_rhWhereInput
    data: XOR<demandes_rhUpdateWithoutValidationsInput, demandes_rhUncheckedUpdateWithoutValidationsInput>
  }

  export type demandes_rhUpdateWithoutValidationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeDemande?: types_demandeUpdateOneRequiredWithoutDemandesNestedInput
    piecesJointes?: pieces_jointes_demandeUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateWithoutValidationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    piecesJointes?: pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUncheckedUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhCreateWithoutPiecesJointesInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    typeDemande: types_demandeCreateNestedOneWithoutDemandesInput
    validations?: validations_demandeCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUncheckedCreateWithoutPiecesJointesInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    typeId: string
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    validations?: validations_demandeUncheckedCreateNestedManyWithoutDemandeInput
    historique?: historique_demandeUncheckedCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhCreateOrConnectWithoutPiecesJointesInput = {
    where: demandes_rhWhereUniqueInput
    create: XOR<demandes_rhCreateWithoutPiecesJointesInput, demandes_rhUncheckedCreateWithoutPiecesJointesInput>
  }

  export type demandes_rhUpsertWithoutPiecesJointesInput = {
    update: XOR<demandes_rhUpdateWithoutPiecesJointesInput, demandes_rhUncheckedUpdateWithoutPiecesJointesInput>
    create: XOR<demandes_rhCreateWithoutPiecesJointesInput, demandes_rhUncheckedCreateWithoutPiecesJointesInput>
    where?: demandes_rhWhereInput
  }

  export type demandes_rhUpdateToOneWithWhereWithoutPiecesJointesInput = {
    where?: demandes_rhWhereInput
    data: XOR<demandes_rhUpdateWithoutPiecesJointesInput, demandes_rhUncheckedUpdateWithoutPiecesJointesInput>
  }

  export type demandes_rhUpdateWithoutPiecesJointesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeDemande?: types_demandeUpdateOneRequiredWithoutDemandesNestedInput
    validations?: validations_demandeUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateWithoutPiecesJointesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validations?: validations_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUncheckedUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhCreateWithoutHistoriqueInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    typeDemande: types_demandeCreateNestedOneWithoutDemandesInput
    validations?: validations_demandeCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhUncheckedCreateWithoutHistoriqueInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    typeId: string
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    validations?: validations_demandeUncheckedCreateNestedManyWithoutDemandeInput
    piecesJointes?: pieces_jointes_demandeUncheckedCreateNestedManyWithoutDemandeInput
  }

  export type demandes_rhCreateOrConnectWithoutHistoriqueInput = {
    where: demandes_rhWhereUniqueInput
    create: XOR<demandes_rhCreateWithoutHistoriqueInput, demandes_rhUncheckedCreateWithoutHistoriqueInput>
  }

  export type demandes_rhUpsertWithoutHistoriqueInput = {
    update: XOR<demandes_rhUpdateWithoutHistoriqueInput, demandes_rhUncheckedUpdateWithoutHistoriqueInput>
    create: XOR<demandes_rhCreateWithoutHistoriqueInput, demandes_rhUncheckedCreateWithoutHistoriqueInput>
    where?: demandes_rhWhereInput
  }

  export type demandes_rhUpdateToOneWithWhereWithoutHistoriqueInput = {
    where?: demandes_rhWhereInput
    data: XOR<demandes_rhUpdateWithoutHistoriqueInput, demandes_rhUncheckedUpdateWithoutHistoriqueInput>
  }

  export type demandes_rhUpdateWithoutHistoriqueInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeDemande?: types_demandeUpdateOneRequiredWithoutDemandesNestedInput
    validations?: validations_demandeUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateWithoutHistoriqueInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    typeId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validations?: validations_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhCreateManyTypeDemandeInput = {
    id?: string
    numeroDemande: string
    salarieId: string
    salarieNom?: string | null
    salarieEmail?: string | null
    salariePoste?: string | null
    salarieDirection?: string | null
    managerId?: string | null
    dateDebut: Date | string
    dateFin: Date | string
    demiJourneeDebut?: boolean
    demiJourneeFin?: boolean
    nombreJours: Decimal | DecimalJsLike | number | string
    motif: string
    destination?: string | null
    moyenTransport?: string | null
    fraisEstimes?: Decimal | DecimalJsLike | number | string | null
    statut?: string
    etapeCourante?: number
    cycleRejetCount?: number
    documentUrl?: string | null
    numeroTitre?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type demandes_rhUpdateWithoutTypeDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validations?: validations_demandeUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateWithoutTypeDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    validations?: validations_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    piecesJointes?: pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeNestedInput
    historique?: historique_demandeUncheckedUpdateManyWithoutDemandeNestedInput
  }

  export type demandes_rhUncheckedUpdateManyWithoutTypeDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroDemande?: StringFieldUpdateOperationsInput | string
    salarieId?: StringFieldUpdateOperationsInput | string
    salarieNom?: NullableStringFieldUpdateOperationsInput | string | null
    salarieEmail?: NullableStringFieldUpdateOperationsInput | string | null
    salariePoste?: NullableStringFieldUpdateOperationsInput | string | null
    salarieDirection?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    demiJourneeDebut?: BoolFieldUpdateOperationsInput | boolean
    demiJourneeFin?: BoolFieldUpdateOperationsInput | boolean
    nombreJours?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    motif?: StringFieldUpdateOperationsInput | string
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    moyenTransport?: NullableStringFieldUpdateOperationsInput | string | null
    fraisEstimes?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    statut?: StringFieldUpdateOperationsInput | string
    etapeCourante?: IntFieldUpdateOperationsInput | number
    cycleRejetCount?: IntFieldUpdateOperationsInput | number
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    numeroTitre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeCreateManyDemandeInput = {
    id?: string
    etape: number
    valideurId: string
    valideurNom?: string | null
    valideurRole?: string | null
    decision: string
    motif?: string | null
    dateDecision?: Date | string
  }

  export type pieces_jointes_demandeCreateManyDemandeInput = {
    id?: string
    nomFichier: string
    cheminFichier: string
    mimeType: string
    tailleOctets: number
    createdAt?: Date | string
  }

  export type historique_demandeCreateManyDemandeInput = {
    id?: string
    auteurId: string
    auteurNom?: string | null
    action: string
    statutPrecedent?: string | null
    nouveauStatut: string
    commentaire?: string | null
    adresseIp?: string | null
    createdAt?: Date | string
  }

  export type validations_demandeUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeUncheckedUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type validations_demandeUncheckedUpdateManyWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    etape?: IntFieldUpdateOperationsInput | number
    valideurId?: StringFieldUpdateOperationsInput | string
    valideurNom?: NullableStringFieldUpdateOperationsInput | string | null
    valideurRole?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: StringFieldUpdateOperationsInput | string
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    dateDecision?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeUncheckedUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pieces_jointes_demandeUncheckedUpdateManyWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomFichier?: StringFieldUpdateOperationsInput | string
    cheminFichier?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    tailleOctets?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeUncheckedUpdateWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type historique_demandeUncheckedUpdateManyWithoutDemandeInput = {
    id?: StringFieldUpdateOperationsInput | string
    auteurId?: StringFieldUpdateOperationsInput | string
    auteurNom?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    statutPrecedent?: NullableStringFieldUpdateOperationsInput | string | null
    nouveauStatut?: StringFieldUpdateOperationsInput | string
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    adresseIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}