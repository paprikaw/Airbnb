function isObjectEmpty (obj) {
  return !Object.getOwnPropertyNames(obj).length >= 1
}
export default isObjectEmpty;
