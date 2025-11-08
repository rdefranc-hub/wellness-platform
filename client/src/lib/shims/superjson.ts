// superjson shim – só para build
export const parse = (s: string) => JSON.parse(s);
export const stringify = (v: any) => JSON.stringify(v);
export const serialize = (v: any) => ({ json: JSON.stringify(v) });
export const deserialize = (o: { json: string }) => JSON.parse(o?.json ?? 'null');
export default { parse, stringify, serialize, deserialize };
