export const isUndefined = (value) => typeof value === 'undefined';
export const isNull = (value) => value === null;
export const isNullOrUndefined = (value) => isUndefined(value) || isNull(value);

export const negateFn = (fn) => (...args) => !fn(...args);

/**
 * Return an object key/value of given array
 * baseArrayToObject(['test-1', 'test-2'], undefined, 'item-') // { item-test-1: true, item-test-2: true}
 * baseArrayToObject(['test-1', 'test-2'], undefined, 'item-', 1) // { item-test-1: 1, item-test-2: 1}
 *
 * @param {[]} array
 * @param {string} valueField
 * @param {string} prefix
 * @param {*} defaultValue (required)
 * @returns {{}}
 */
export const baseArrayToObject = (array, valueField, prefix, defaultValue) => array.reduce((acc, item) => {
  if (isNullOrUndefined(defaultValue)) {
    throw new Error('defaultValue must be defined.');
  }

  if (typeof item === 'object' && isNullOrUndefined(item[valueField])) {
    throw new Error(`Property ${valueField} is undefined.`);
  }

  const value = typeof item === 'object' ? item[valueField] : item;

  return { ...acc, [`${prefix}${value}`]: defaultValue };
}, {});

export const objectArrayToObject = (array, valueField = 'id', prefix = '', defaultValue = true) => (
  baseArrayToObject(array, valueField, prefix, defaultValue)
);

export const valueArrayToObject = (array, prefix = '', defaultValue = true) => (
  baseArrayToObject(array, undefined, prefix, defaultValue)
);

export const filterByGivenObjects = (objects = [], valueField = 'id') => {
  const prefix = 'item-';
  const translatedObject = objectArrayToObject(objects, valueField, prefix);

  return (item) => translatedObject[`${prefix}${item[valueField]}`];
};

export const filterByGivenValues = (values = []) => {
  const prefix = 'item-';
  const translatedObject = valueArrayToObject(values, prefix);

  return (item) => translatedObject[`${prefix}${item}`];
};

export const sortArrayBy = (predicateFn, ...args) => (allItems, selectedItems) => {
  const filterFn = predicateFn(selectedItems, ...args);

  const selected = allItems.filter(filterFn);
  const notSelected = allItems.filter(negateFn(filterFn));

  return [...selected, ...notSelected];
};
