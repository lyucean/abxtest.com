// Пол
$.urlGET = function (name) {
  let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)

  if (results != null && results.length > 0
    && results[1] !== null && results[1] !== '') {
    return results[1]
  } else {
    return null
  }

}