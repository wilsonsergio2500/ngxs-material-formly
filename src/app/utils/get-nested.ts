export function getNestedSafely<T>(obj: any, key: string) {
  return key.split(".").reduce(function (o, x) {
    return (typeof o == "undefined" || o === null) ? o : o[x];
  }, obj) as T;
}
