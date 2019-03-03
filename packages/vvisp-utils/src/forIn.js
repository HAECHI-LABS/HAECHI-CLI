module.exports = function(object, logic) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      logic(object[key], key);
    }
  }
};
