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
Route();

// init page Choice
function initChoice () {
  // подгрузим варианты форматов для сравнения
  $.getJSON('http://localhost/api/get/formats.json', function (data) {

    let items_a = [], items_b = [], status = '', id_a, id_b;

    $.each(data.formats, function (key,item) {

      id_a = 'a_' + item['name'] + '_' + key
      id_b = 'b_' + item['name'] + '_' + key

      status = "";
      if(item.hasOwnProperty('checked')){
        status = "checked";
      }

      items_a.push('<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="radio_a" id="' + id_a + '" ' + status + ' >' +
        '<label class="form-check-label w-100" for="' + id_a + '">' +
        item['title'] +
        '</label>' +
        '</div>')

      items_b.push('<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="radio_b" id="' + id_b + '" ' + status + ' >' +
        '<label class="form-check-label w-100" for="' + id_b + '">' +
        item['title'] +
        '</label>' +
        '</div>')
    })

    $('#variant_a').html(items_a.join(''))
    $('#variant_b').html(items_b.join(''))
  }).fail(function () {
    // спросим через ещё раз
    setTimeout(() => {
      initChoice ();
    }, 3000);
  })
}