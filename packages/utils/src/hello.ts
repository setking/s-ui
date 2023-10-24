export function hello(to: string = 'World') {
  const txt = `Hello ${to}`;
  // eslint-disable-next-line no-console
  console.log(txt);
  return txt;
}
