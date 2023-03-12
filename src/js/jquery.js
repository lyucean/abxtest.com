import $ from 'jquery'

// наша маршрутизация
function Route () {
  switch (window.location.hash) {
    case '#choice':
      $('#app').load('/choice.html', function () {
        initChoice()
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
Route()

// init page Choice
function initChoice () {
  // подгрузим варианты форматов для сравнения
  $.getJSON('http://localhost/api/get/formats.json', function (data) {


    RenderChoice("a", data.formats);
    RenderChoice("b", data.formats);

  }).fail(function () {
    // спросим через ещё раз
    setTimeout(() => {
      initChoice()
    }, 3000)
  })
}
function RenderChoice(variant, formats){
  let items_a = [], status = '', id

  $.each(formats, function (key, item) {

    id = variant + '_' + item['name'] + '_' + key

    status = ''
    if (item.hasOwnProperty('checked')) {
      status = 'checked'
    }

    items_a.push('<div class="form-check">' +
      '<input class="form-check-input" type="radio" ' +
      'name="radio_' + variant + '" ' +
      'id="' + id + '" ' +
      status + ' >' +
      '<label class="form-check-label w-100" ' +
      'for="' + id + '">' +
      item['title'] +
      '</label>' +
      '</div>')
  })

  $('#variant_' + variant).html(items_a.join(''))
}
