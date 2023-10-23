import lodash from "lodash";
function hello(to = "World") {
  const txt = `Hello ${to}`;
  console.log(txt);
  return txt;
}
function useLodash() {
  return lodash;
}
export {
  hello,
  useLodash
};
