// @ts-nocheck
import { merge } from '../src';

const testClass = new (class TestClass {})();

test(`expect merge function to reject all non-object \`target\` parameter combinations`, () => {
  expect(() => merge(testClass, {})).toThrowError();
  expect(() => merge(() => {}, {})).toThrowError();
  expect(() => merge([], {})).toThrowError();
  expect(() => merge(1n, {})).toThrowError();
  expect(() => merge(true, {})).toThrowError();
  expect(() => merge(false, {})).toThrowError();
  expect(() => merge(null, {})).toThrowError();
  expect(() => merge(0, {})).toThrowError();
  expect(() => merge('test', {})).toThrowError();
  expect(() => merge(Symbol('test'), {})).toThrowError();
  expect(() => merge(undefined, {})).toThrowError();
});

test(`expect merge function to reject all non-object \`source\` parameter combinations`, () => {
  expect(() => merge({}, testClass)).toThrowError();
  expect(() => merge({}, () => {})).toThrowError();
  expect(() => merge({}, [])).toThrowError();
  expect(() => merge({}, 1n)).toThrowError();
  expect(() => merge({}, true)).toThrowError();
  expect(() => merge({}, false)).toThrowError();
  expect(() => merge({}, null)).toThrowError();
  expect(() => merge({}, 0)).toThrowError();
  expect(() => merge({}, 'test')).toThrowError();
  expect(() => merge({}, Symbol('test'))).toThrowError();
  expect(() => merge({}, undefined)).toThrowError();
});

test(`expect merge function to reject an object with unsafe modified property`, () => {
  expect(() => merge({ hello: false, constructor: false }, {})).toThrowError();
});

test(`expect merge function to correctly merge two objects with a depth of 1`, () => {
  expect(merge({ foo: true }, { bar: true })).toStrictEqual({ foo: true, bar: true });
  expect(merge({ foo: false, array: [1] }, { foo: true, bar: true, array: [2] })).toStrictEqual({
    foo: true,
    bar: true,
    array: [1, 2],
  });
});

test(`expect merge function to correctly merge/overwrite two objects with a depth of 2`, () => {
  expect(merge({ depth1: false, depth2: { depth2: false } }, { depth1: true, depth2: { depth2: true } })).toStrictEqual(
    { depth1: true, depth2: { depth2: true } }
  );
});

test(`expect merge function to correctly merge/overwrite two objects with a depth of 3`, () => {
  expect(
    merge(
      { depth1: false, depth2: { depth2: false, depth3: { depth3: false } } },
      { depth1: true, depth2: { depth2: true, depth3: { depth3: true } } }
    )
  ).toStrictEqual({ depth1: true, depth2: { depth2: true, depth3: { depth3: true } } });
});
