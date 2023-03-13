import $ from 'jquery'

// наша маршрутизация
function Route () {

  // получим hesh страницы
  let url_hash = ((window.location.hash.substring(1).split('#', 1)) + '?').split('?', 1)[0]
  let div_app = $('#app')

  switch (url_hash) {

    case 'choice':
      div_app.load('/choice.html', function () {
        initChoice()
      })
      break
    case 'test':
      div_app.load('/test.html', function () {

        // проверка, что выбран формат
        if ($.urlGET('v1') && $.urlGET('v2')) {
          initTest()
        }
      })
      break
    case 'result':
      div_app.load('/result.html')
      break
    case 'faq':
      div_app.load('/faq.html')
      break
    default:
      div_app.load('/home.html')
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

    RenderChoice('a', data.formats)
    RenderChoice('b', data.formats)

    // отобразим кнопку перехода и повесим событие перехода событие
    $('#button-compare').click(function () {
      window.location.href = window.location.origin
        + '#test?v1=' + $('input[name=radio_a]:checked').val()
        + '&v2=' + $('input[name=radio_b]:checked').val()
    })

  }).fail(function () {
    // спросим через ещё раз
    setTimeout(() => {
      initChoice()
    }, 3000)
  })
}

function RenderChoice (variant, formats) {
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
      'value="' + item['name'] + '" ' +
      status + ' >' +
      '<label class="form-check-label w-100" ' +
      'for="' + id + '">' +
      item['title'] +
      '</label>' +
      '</div>')
  })

  $('#variant_' + variant).html(items_a.join(''))
}

function initTest(){

// подгрузим тесты
  $.getJSON('http://localhost/api/get/test.json', function (data) {

    console.log(data)

  }).fail(function () {
    // спросим через ещё раз
    initTest(() => {
      initChoice()
    }, 3000)
  })
}
