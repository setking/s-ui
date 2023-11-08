import lodash from "lodash";
function hello(to = "World") {
  const txt = `Hello ${to}`;
  return txt;
}
function useLodash() {
  return lodash;
}
function isObjectLike(val) {
  return val !== null && typeof val === "object";
}
function isFunction(val) {
  return typeof val === "function";
}
export {
  hello,
  isFunction,
  isObjectLike,
  useLodash
};
