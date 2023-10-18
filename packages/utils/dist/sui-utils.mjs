import lodash from "lodash";
function hello(to = "World") {
  const txt = `Hello ${to}`;
  alert(txt);
  return txt;
}
function useLodash() {
  return lodash;
}
export {
  hello,
  useLodash
};
