export const notifyEvent = function (name, detail) {
  this.dispatchEvent(new CustomEvent(name, { detail }));
};

export const fallBackValue = function (value) {
  return value
    ? String(value)
        .trim()
        .replace(/(\r\n|\n|\r)/gm, ' ')
    : '';
};

export default {
  notifyEvent,
  fallBackValue,
};
