import util from 'util';

import {
  ClassConstructor,
  classToPlain,
  deserialize,
  plainToClass,
  serialize,
} from 'class-transformer';

/**
 * Check if given object empty of null
 * @param {Object} obj
 * @returns {Boolean}
 */
const isEmptyOrNull = <T>(obj: T | T[]): boolean => {
  if (obj instanceof Array) {
    return obj.length === 0;
  }
  return !obj || Object.getOwnPropertyNames(obj).length === 0;
};

/**
 * Check if given object is null or undefined
 * @param {Object} obj
 * @returns {Boolean}
 */
const isNull = <T>(obj: T): boolean => !obj;

/**
 * Check if given object is non empty or null
 * @param {Object} obj
 */
const isNonNullOrEmpty = <T>(obj: T): boolean => !isEmptyOrNull(obj);

/**
 *
 * @param obj
 * @returns
 */
const isNullOrUndefined = <T>(obj: T): boolean => {
  if (
    obj === null ||
    obj === undefined ||
    !Object.getOwnPropertyNames(obj).length
  ) {
    return true;
  }

  return false;
};

/**
 *
 * @param obj
 * @returns
 */
const isNotNullOrUndefined = <T>(obj: T): boolean => !isNullOrUndefined(obj);

/**
 * Create deep copy of given object
 * returns new object
 * @param {Object} obj
 * @returns {Object}
 */
const deepCopy = <T>(obj: T): T => {
  if (isNull(obj)) {
    throw new Error('Object can not be null or empty when making deep copy');
  }
  return JSON.parse(JSON.stringify(obj));
};

/**
 *
 * @param json
 */
const jsonStringToPlainObject = <T>(json: string): T => {
  const obj = JSON.parse(json) as T;
  return obj;
};

/**
 *
 * @param json
 */
const jsonToInstance = <T>(json: string, cls: ClassConstructor<T>): T => {
  const clazz = deserialize<T>(cls, json);
  return clazz;
};

/**
 *
 * @param {Record<string, unknown>} obj
 * @param {ClassType<T>} cls
 * @returns {T}
 */
const objectToInstance = <T>(
  obj: Record<string, unknown>,
  cls: ClassConstructor<T>,
): T => {
  const instance = plainToClass<T, Record<string, unknown>>(cls, obj, {
    excludeExtraneousValues: true,
  });
  return instance;
};

/**
 *
 * @param instance
 */
const instanceToPlain = <T>(instance: T): Record<string, unknown> =>
  classToPlain(instance);

/**
 *
 * @param k
 */
const getPropertyName = <T, K extends keyof T>(k: K): string => k.toString();

/**
 *
 * @param obj
 */
const serializeObject = <T>(obj: T | T[]): string => serialize(obj);

/**
 *
 * @param obj
 */
const deserializeJson = <T>(json: string, cls: ClassConstructor<T>): T | T[] =>
  deserialize(cls, json);

/**
 *
 * @param obj
 */
const serializeArray = <T>(array: T[]): string => serialize(array);

/**
 *
 * @param obj
 * @returns
 */
const stringify = <T>(obj: T) => util.inspect(obj);

export {
  isEmptyOrNull,
  isNull,
  isNonNullOrEmpty,
  isNullOrUndefined,
  isNotNullOrUndefined,
  deepCopy,
  jsonStringToPlainObject,
  jsonToInstance,
  instanceToPlain,
  objectToInstance,
  getPropertyName,
  serializeObject,
  serializeArray,
  deserializeJson,
  stringify,
};
