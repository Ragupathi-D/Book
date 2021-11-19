export const uuid = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const getObjectData = (array, value, objName) => {
  const result = array.find( x => x[objName] == value )
  console.log('find result', result)
  return result;
}