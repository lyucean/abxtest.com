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
        } else {
          // если что-то не так, отправим выбрать формат
          window.location.href = '#choice'
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

let button_icon_play = '<i class="bi bi-play-fill"></i>',
  button_icon_pause = '<i class="bi bi-pause-fill"></i>'

function initTest () {

  let audio = document.createElement('audio')
  // соберём аргументы для url
  let arg_url = '?v1=' + $.urlGET('v1') + '&v2=' + $.urlGET('v2')

  // подгрузим варианты теста
  $.getJSON('http://localhost/api/get/test.json' + arg_url, function (data) {

    // API вернёт ответ
    // if (typeof data['tracks'] !== "undefined") {
    //
    // }else{
    //   //ключа нет
    //   console.log(1)
    //
    // }

    $('#button_play_a').click(function () {
      audioPlayer($(this), audio, data.tracks.urls.a)
    })
    $('#button_play_b').click(function () {
      audioPlayer($(this), audio, data.tracks.urls.b)
    })
    $('#button_play_x').click(function () {
      audioPlayer($(this), audio, data.tracks.urls.x)
    })

    // arr.indexOf(data.tracks) != -1

  }).fail(function () {
    // спросим через ещё раз
    setTimeout(() => {
      initTest()
    }, 3000)
  })
}

function audioPlayer (button, audio, data) {

  // остановим воспроизведение
  audio.pause()

  // если мы кликаем по той же кнопке, просто сбросим её состояние на паузу
  if (button.html() === button_icon_pause) {
    button.html(button_icon_play)
  } else {
    // Если это не так, для начала сбросим состояние всех кнопок
    $('.answer-options button.card-body-play').html(button_icon_play)
    // Сменим ресурс и запустим проигрыватель
    audio.setAttribute('src', data)
    audio.play()
    // сменим иконку на воспроизведение
    button.html(button_icon_pause)
  }

  // по завершению, сбросим состояние кнопки
  audio.addEventListener('ended', function() {
    this.pause();
    button.html(button_icon_play)
  }, false);
}