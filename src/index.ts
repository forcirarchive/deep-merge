/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-use-before-define */
type PlainObject<K extends string | number | symbol = string, T = any> = Record<K, T>;
type EmptyArray = Array<never>;

function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isPlainObject(value: any): boolean {
  // object of any kind
  if (isObject(value) === false) return false;

  // has modified constructor
  // this is for Object.create(null)
  if (value.constructor === undefined) return true;

  // constructor has prototype
  if (isObject(value.constructor.prototype) === false) return false;

  // constructor prototype has object-specific method
  // eslint-disable-next-line no-prototype-builtins
  if (value.constructor.prototype.hasOwnProperty('isPrototypeOf') === false) return false;

  // likely a plain object
  return true;
}

function emptyTarget(value: PlainObject): PlainObject;
function emptyTarget(value: Array<any>): EmptyArray;
function emptyTarget(value: PlainObject | Array<any>): PlainObject | EmptyArray {
  const isArray = Array.isArray(value);

  if (!isPlainObject(value) && !isArray) {
    throw new Error(`Expected \`value\` parameter to be a plain \`object\` or \`array\`, got \`${typeof value}\`.`);
  }

  return isArray ? [] : {};
}

function getEnumerableOwnPropertySymbols(value: PlainObject): Array<string> {
  if (!isPlainObject(value)) {
    throw new Error(`Expected \`value\` parameter to be a plain \`object\`, got \`${typeof value}\`.`);
  }

  return (
    Object.getOwnPropertySymbols(value)
      // eslint-disable-next-line no-prototype-builtins
      .filter((symbol) => value.propertyIsEnumerable(symbol))
      .map((symbol) => symbol.toString())
  );
}

function getKeys(object: PlainObject): Array<string> {
  return [...Object.keys(object), ...getEnumerableOwnPropertySymbols(object)];
}

function objectHasProperty(object: PlainObject, property: string): boolean {
  try {
    return property in object;
  } catch {
    return false;
  }
}

function objectPropertyIsUnsafe(object: PlainObject, property: string): boolean {
  const exists = objectHasProperty(object, property);
  const existsOnPrototype = Object.hasOwnProperty.call(object, property);
  const isEnumerable = Object.propertyIsEnumerable.call(object, property);

  return exists && !(existsOnPrototype && isEnumerable);
}

function isSpecialObject(value: PlainObject): boolean {
  return ['[object RegExp]', '[object Date]'].includes(Object.prototype.toString.call(value));
}

function isNonNullObject(value: PlainObject): boolean {
  return !!value && typeof value === 'object';
}

function canMerge(value: PlainObject): boolean {
  return isNonNullObject(value) && !isSpecialObject(value);
}

function mergeArray(target: Array<any>, source: Array<any>): Array<any> {
  return [...target, ...source].map((item) => mergeOrReturn(item));
}

function mergeObject(target: PlainObject, source: PlainObject): PlainObject {
  if (!isPlainObject(target)) {
    throw new Error(`Expected \`target\` parameter to be a plain \`object\`, got \`${typeof target}\`.`);
  }

  if (!isPlainObject(source)) {
    throw new Error(`Expected \`source\` parameter to be a plain \`object\`, got \`${typeof source}\`.`);
  }

  const destination: Record<string, any> = {};

  if (isPlainObject(target)) {
    for (const key of getKeys(target)) {
      destination[key] = mergeOrReturn(target[key]);
    }
  }

  if (canMerge(target)) {
    for (const key of getKeys(target)) {
      destination[key] = mergeOrReturn(target[key]);
    }
  }

  for (const key of getKeys(source)) {
    if (objectPropertyIsUnsafe(target, key)) {
      continue;
    }

    if (objectHasProperty(target, key) && canMerge(source[key])) {
      destination[key] = mergeArrayOrObject(target[key], source[key]);
    } else {
      destination[key] = mergeOrReturn(source[key]);
    }
  }

  return destination;
}

function mergeArrayOrObject(target: PlainObject, source: PlainObject): PlainObject;
function mergeArrayOrObject(target: Array<any>, source: Array<any>): Array<any>;
function mergeArrayOrObject(
  target: PlainObject | Array<any>,
  source: PlainObject | Array<any>
): PlainObject | Array<any> {
  const targetIsArray = Array.isArray(target);
  const sourceIsArray = Array.isArray(source);
  const targetAndSourceTypesMatch = sourceIsArray === targetIsArray;

  if (!targetAndSourceTypesMatch) {
    throw new Error(
      `Expected \`target\` and \`source\` parameter types to match, got \`${typeof target}\` (target) and \`${typeof source}\` (source).`
    );
  }

  if (targetIsArray && sourceIsArray) {
    return mergeArray(target, source);
  } else {
    return mergeObject(target, source);
  }
}

function mergeOrReturn(value: PlainObject): PlainObject;
function mergeOrReturn(value: Array<any>): Array<any>;
function mergeOrReturn(value: PlainObject | Array<any>): PlainObject | Array<any> {
  return canMerge(value) ? mergeArrayOrObject(emptyTarget(value), value) : value;
}

export function merge(target: PlainObject, source: PlainObject): PlainObject {
  if (!isPlainObject(target)) {
    throw new Error(`Expected \`target\` parameter to be a plain \`object\`, got \`${typeof target}\`.`);
  }

  if (!isPlainObject(source)) {
    throw new Error(`Expected \`source\` parameter to be a plain \`object\`, got \`${typeof source}\`.`);
  }

  return mergeObject(target, source);
}
