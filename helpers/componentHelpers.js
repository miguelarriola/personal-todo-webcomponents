// used by edit panel
export const notifyEvent = function (name, detail) {
  this.dispatchEvent(new CustomEvent(name, { detail }));
};

export const notifyEvent_v2 = function (name, options) {
  this.dispatchEvent(new CustomEvent(name, options));
};

export const updateProperty = function (property, defaultValue) {
  if (this.hasOwnProperty(property)) {
    const value = this[property];
    delete this[property];
    this[property] = value;
  } else {
    this[property] = defaultValue;
  }
};

export const updatePropertyV2 = function (property, defaultValue) {
  // const isEmty =
  //   value === null ||
  //   value === undefined ||
  //   value === NaN ||
  //   String(value).trim();
  if (isEmty(this[property])) {
    this[property] = defaultValue;
  } else {
    const value = this[property];
    delete this[property];
    this[property] = value;
  }
};

export const formatString = function (value) {
  const trimmed = String(value).trim();
  return value ? trimmed.replace(/(\r\n|\n|\r)/gm, ' ') : '';
};

export const isEmtyString = function (value) {
  return String(value).trim().length === 0;
};

export const isEmtyValue = function (value) {
  return (
    value === null || value === undefined || isNaN(value) || isEmtyString(value)
  );
};

export default {
  notifyEvent,
  fallBackValue: formatString,
};
