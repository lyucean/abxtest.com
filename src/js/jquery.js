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


// Методы работы со страницей Выбора форматов
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


// Методы работы со страницей тестов
let audio = document.createElement('audio'), // Общий аудио-элемент
    progressBarListener, // функция изменения состояния прогресс-бара
    button_icon_play = '<i class="bi bi-play-fill"></i>', // иконка кнопки Играть
    button_icon_pause = '<i class="bi bi-pause-fill"></i>' // иконка кнопки Пауза

function initTest () {
  // соберём аргументы для url
  let arg_url = '?v1=' + $.urlGET('v1') + '&v2=' + $.urlGET('v2')

  // подгрузим варианты теста
  $.getJSON('http://localhost/api/get/test.json' + arg_url, function (data) {

    $('#button_play_a').click(function () {
      audioPlayer($(this), data.tracks.urls.a)
    })
    $('#button_play_b').click(function () {
      audioPlayer($(this), data.tracks.urls.b)
    })
    $('#button_play_x').click(function () {
      audioPlayer($(this), data.tracks.urls.x)
    })

  }).fail(function () {
    // спросим через ещё раз
    setTimeout(() => {
      initTest()
    }, 3000)
  })
}
function audioPlayer (button, data) {

  // остановим воспроизведение
  audio.pause()
  $('.progress-bar').css( "width", "100%" ) // и всех прогресс-баров
  audio.removeEventListener('timeupdate', progressBarListener, false) // удалим элемент обновление прогресс - бара

  // если мы кликаем по той же кнопке, просто сбросим её состояние на паузу
  if (button.html() === button_icon_pause) {
    button.html(button_icon_play)
  } else {
    // Если это не так, для начала сбросим состояние всех кнопок
    $('.answer-options button.card-body-play').html(button_icon_play)

    // Сменим ресурс и запустим проигрыватель
    audio.setAttribute('src', data)

    // сменим иконку на воспроизведение
    button.html(button_icon_pause)

    // как только загрузиться - запустим воспроизведение
    audio.addEventListener("loadeddata", () => {
      // progressEl.css( "width", "0%" );
      audio.play()
    });

    // обновим метод обновление состояния прогресс-бара
    progressBarListener = function () {
      button.next().children('.progress-bar').css( "width", audio.currentTime / audio.duration * 100 + "%" );
    };

    // повесим изменение на прогресс бар кнопки
    audio.addEventListener("timeupdate", progressBarListener);
  }

  // по завершению, сбросим состояние кнопки
  audio.addEventListener('ended', function() {
    this.pause();
    button.html(button_icon_play)
  }, false);
}