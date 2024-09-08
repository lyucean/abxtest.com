import $ from 'jquery'

// наша маршрутизация -----------------------------------------------
function Route () {

  // получим hesh страницы
  let url_hash = ((window.location.hash.substring(1).split('#', 1)) + '?').split('?', 1)[0]
  let div_app = $('#app')

  switch (url_hash) {

    case 'test':
      div_app.load('/test.html', function () {
          initTest()
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

// Методы работы со страницей тестов -----------------------------------------------
let audio = document.createElement('audio'), // Общий аудио-элемент
    progressBarListener, // функция изменения состояния прогресс-бара
    button_icon_play = '<i class="bi bi-play-fill"></i>', // иконка кнопки Играть
    button_icon_pause = '<i class="bi bi-pause-fill"></i>' // иконка кнопки Пауза

// метод загрузки треков для сравнения
function initTest () {

  // подгрузим варианты теста
  $.getJSON(window.location.origin.replace(window.location.port, '81') + '/api/get/test.json', function (data) {

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

// метод управления / сброса состояния плеера и кнопок воспроизведения
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