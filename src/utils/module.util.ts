// esm通过cjs引入
export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);
