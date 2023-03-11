import $ from 'jquery'

// наша маршрутизация
function Route () {
  switch (window.location.hash) {
    case '#choice':
      $('#app').load('/choice.html', function () {
        loadFormats()
      })
      break
    case '#faq':
      $('#app').load('/faq.html')
      break
    case '#result':
      $('#app').load('/result.html')
      break
    case '#test':
      $('#app').load('/test.html')
      break
    default:
      $('#app').load('/home.html')
  }
}

$(window).on('hashchange', function () {
  Route()
})
$(document).ready(function () {
  Route()
})

// loaf
function loadFormats () {

}