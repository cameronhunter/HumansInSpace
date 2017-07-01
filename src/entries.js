export default function(object) {
  return Object.keys(object || {}).map(key => [key, object[key]]);
}
