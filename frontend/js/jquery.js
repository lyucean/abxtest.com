// ---------------------------------------------------------
// Определение качества аудио
const qualities = ['96kbps', '128kbps', '256kbps', '320kbps'];

// API домен (локальный или продакшн)
const API_DOMAIN = process.env.API_DOMAIN || 'https://abxtest.com/';

// ---------------------------------------------------------
// Глобальные переменные состояния для управления тестом
let isStarted = false;
let currentQuality = '96kbps';
let consecutiveCorrect = 0;
let consecutiveIncorrect = 0;
let isTestComplete = false;
let finalResult = '';
let xIsA = Math.random() < 0.5;
let cardNumber = 1;
let isLoading = false;
let currentTrack = '';
let tracks = []; // Треки, которые будут загружены из API
let currentLanguage = 'en'; // Язык по умолчанию — Английский
let testResults = []; // Массив для хранения результатов тестов
let maxDiscernibleQuality = '96kbps'; // Максимально различимое качество

// ---------------------------------------------------------
// Подгружаем доступные языки
import { translations } from './translations.js';

// ---------------------------------------------------------
// Функция для получения перевода
function t(key) {
    return translations[currentLanguage][key] || key;
}

// ---------------------------------------------------------
// Функция для получения URL аудио файла
function getAudioUrl(trackId, quality) {
    const extension = quality === 'wav' ? '.wav' : '.mp3';
    return `${API_DOMAIN}/files/${trackId}_${quality}${extension}`;
}

// ---------------------------------------------------------
// Функция для выбора случайного трека
function selectRandomTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
}

// ---------------------------------------------------------
// Функция для рендеринга начальной карточки
function renderStartCard() {
    return `
        <div class="card">
            <div class="card-body text-center">
                <br/>
                <br/>
                <h1 class="fs-3 card-title mb-4">${t('title')}!</h1>
                <p>${t('description')}</p>
                <div class="d-grid gap-2 col-sm-6 col-12 mx-auto">
                    <button id="startButton" class="btn btn-primary btn-lg">${t('start')}</button>
                </div>
                <br/>
                <div class="d-grid gap-2 col-sm-4 col-8 mx-auto">
                    <button id="faqButton" class="btn btn-sm btn-outline-secondary">${t('faq')}</button>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    `;
}

// ---------------------------------------------------------
// Функция для рендеринга карточки с FAQ
function renderFAQ() {
    return `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title mb-4 text-center">${t('faq')}</h2>
                ${t('faqContent')}
                <br/>
                <p class="text-center"><button id="backButton" class="btn btn-primary">${t('start')}</button></p>
            </div>
        </div>
    `;
}

// ---------------------------------------------------------
// Функция для рендеринга карточки теста
function renderTestCard() {
    return `
        <div class="card fade-in">
            <div class="card-body"> 
                <div class="audio-block mb-4 bg-success text-white">
                    <h3 class="h5 mb-3">${t('audioA')} (${currentQuality})</h3>
                    ${renderCustomAudioPlayer('audio-a', getAudioUrl(currentTrack.id, currentQuality))}
                </div>
                <div class="audio-block mb-4 bg-primary text-white">
                    <h3 class="h5 mb-3">${t('audioB')} (lossless)</h3>
                    ${renderCustomAudioPlayer('audio-b', getAudioUrl(currentTrack.id, 'wav'))}
                </div>
                <div class="audio-block mb-4 bg-secondary text-white">
                    <h3 class="h5 mb-3">${t('audioX')}</h3>
                    ${renderCustomAudioPlayer('audio-x', xIsA ? getAudioUrl(currentTrack.id, currentQuality) : getAudioUrl(currentTrack.id, 'wav'))}
                </div>

                <p class="text-center">
                    <small class="text-secondary">${t('currentQuality')}</small> ${currentQuality}
                    <br class="d-block d-lg-none"/>
                    <small class="text-secondary">${t('currentTrack')}</small>
                    <br class="d-block d-sm-none"/> ${currentTrack.name}
                </p>
                
                <div class="d-flex justify-content-between mb-4">
                    <button class="btn btn-success choice-btn" data-choice="A">${t('choiceA')}</button>
                    <button class="btn btn-primary choice-btn" data-choice="B">${t('choiceB')}</button>
                    <button class="btn btn-warning choice-btn" data-choice="Unknown">${t('choiceUnknown')}</button>
                </div>
                
        
                <div class="text-secondary text-center"><small>${cardNumber}</small></div>
            </div>
        </div>
    `;
}

// ---------------------------------------------------------
// Функция для рендеринга пользовательского аудиоплеера
function renderCustomAudioPlayer(id, audioUrl) {
    return `
        <div id="${id}-player" class="custom-audio-player d-flex align-items-center">
            <button id="${id}-play-pause" class="btn btn-dark me-3">Play</button>
            <input id="${id}-slider" type="range" class="bg-info flex-grow-1 me-3" value="0" min="0" max="100" step="1">
            <span id="${id}-time" class="text-black d-none d-sm-block">0:00 / 0:00</span>
        </div>
        <audio id="${id}" style="display:none;">
            <source src="${audioUrl}" type="audio/mpeg">${t('browserDoesNotSupport')}
        </audio>
    `;
}

// ---------------------------------------------------------
// Функция для рендеринга карточки загрузки
function renderLoadingCard() {
    return `
        <div class="card">
            <div class="card-body">
                <br/>
                <br/>
                <h2 class="card-title mb-4 text-center">${t('loading')}</h2>
                <br/>
                <div class="progress">
                    <div id="loadingProgress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0"></div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    `;
}

// ---------------------------------------------------------
// Функция для рендеринга карточки завершения теста
function renderCompleteCard() {
    let resultsList = testResults.map((result, index) => {
        let statusBadge = '';

        if (result.isCorrect) {
            statusBadge = `<span class="badge rounded-pill alert-success">${t('correct')}</span>`;
        } else if (result.choice === 'Unknown') {
            statusBadge = t('unknown');
        } else {
            statusBadge = `<span class="badge rounded-pill alert-danger">${t('incorrect')}</span>`;
        }

        return `
            <li class="list-group-item">
                Test ${index + 1}: ${statusBadge}
                <br>${t('comparedFormats')} ${result.quality} vs Lossless
            </li>
        `;
    }).join('');

    return `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title mb-4 text-center">${t('completed')}</h2>
                <p class="mb-4 lead">${finalResult}
                    <br/>
                    ${t('maxDiscernibleQuality')} <b>${maxDiscernibleQuality}</b></p>
                <h3>${t('testResults')}</h3>
                <ul class="list-group mb-4">${resultsList}</ul>
                <div class="text-center">
                    <button id="resetButton" class="btn btn-primary btn-lg">${t('restart')}</button>
                </div>
            </div>
        </div>
    `;
}


// ---------------------------------------------------------
// Функция для обработки начала теста
function handleStart() {
    isStarted = true;
    currentTrack = selectRandomTrack();
    xIsA = Math.random() < 0.5;
    render();
}

// ---------------------------------------------------------
// Функция для обработки выбора пользователя
function handleChoice(choice) {
    // Устанавливаем флаг загрузки и обновляем интерфейс
    isLoading = true;
    render();

    let loadedFiles = 0; // Счетчик загруженных файлов
    const filesToLoad = 2; // Загружаем только два файла (A и B)
    const minLoadTime = 2000; // Минимальное время загрузки в миллисекундах (2 секунды)
    const startTime = Date.now(); // Сохраняем текущее время, когда начинается загрузка

    // Функция для обновления прогресса загрузки
    function updateProgress() {
        loadedFiles++; // Увеличиваем счетчик загруженных файлов
        const progress = (loadedFiles / filesToLoad) * 100; // Вычисляем процент загрузки
        $('#loadingProgress').css('width', `${progress}%`).attr('aria-valuenow', progress); // Обновляем прогресс-бар
    }

    // Выбираем случайный трек для следующего шага
    const nextTrack = selectRandomTrack();

    // Определяем, будет ли трек X являться треком A
    const nextXIsA = Math.random() < 0.5;

    // Загружаем два файла: трек A в MP3 формате и трек B в WAV формате
    const trackAPromise = $.get(getAudioUrl(nextTrack.id, currentQuality)).always(updateProgress);
    const trackBPromise = $.get(getAudioUrl(nextTrack.id, 'wav')).always(updateProgress);

    // Дожидаемся загрузки обоих файлов
    $.when(trackAPromise, trackBPromise).then((trackAResponse, trackBResponse) => {
        const actualLoadTime = Date.now() - startTime; // Вычисляем фактическое время загрузки
        const remainingTime = minLoadTime - actualLoadTime; // Рассчитываем оставшееся время, чтобы загрузка длилась минимум minLoadTime/1000 секунды

        // Если фактическое время меньше минимального, ждем оставшееся время
        setTimeout(() => {
            // После завершения минимального времени обработки продолжаем логику теста
            processTestResult(choice, nextTrack, nextXIsA);
        }, Math.max(remainingTime, 0)); // Ждем только если нужно
    });
}

// ---------------------------------------------------------
// Функция для обработки результатов теста
function processTestResult(choice, nextTrack, nextXIsA) {
    // Проверяем, был ли выбор пользователя правильным
    const isCorrect = (choice === 'A' && xIsA) || (choice === 'B' && !xIsA);

    // Добавляем результаты текущего теста в массив
    testResults.push({
        isCorrect: isCorrect, // Верен ли выбор пользователя
        choice: choice, // Какой был сделан выбор
        quality: currentQuality // Качество аудио, которое сейчас тестируется
    });

    // Обновляем состояние правильных/неправильных ответов
    if (choice !== 'Unknown') {
        if (isCorrect) {
            consecutiveCorrect++; // Увеличиваем счетчик правильных ответов
            consecutiveIncorrect = 0; // Сбрасываем счетчик неправильных ответов
            maxDiscernibleQuality = currentQuality; // Обновляем максимальное различимое качество
        } else {
            consecutiveIncorrect++; // Увеличиваем счетчик неправильных ответов
            consecutiveCorrect = 0; // Сбрасываем счетчик правильных ответов
        }
    }

    // Переходим к следующему треку
    cardNumber++; // Увеличиваем номер текущей карточки теста
    currentTrack = nextTrack; // Устанавливаем следующий трек
    xIsA = nextXIsA; // Устанавливаем, является ли трек X треком A

    // Если дважды подряд был правильный ответ, повышаем качество теста
    if (consecutiveCorrect === 2) {
        const currentIndex = qualities.indexOf(currentQuality); // Определяем текущее качество
        if (currentIndex < qualities.length - 1) {
            currentQuality = qualities[currentIndex + 1]; // Переходим на следующее качество
        } else {
            finalResult = t('canHearDifference'); // Пользователь может различить все качества
            isTestComplete = true; // Завершаем тест
        }
        consecutiveCorrect = 0; // Сбрасываем счетчик правильных ответов
    }

    // Если дважды подряд был неправильный ответ, завершаем тест
    if (consecutiveIncorrect === 2) {
        finalResult = t('cannotHearDifference').replace('{quality}', currentQuality); // Сообщаем пользователю, что он не различает качество
        isTestComplete = true; // Завершаем тест
    }

    // Снимаем флаг загрузки и обновляем интерфейс
    isLoading = false;
    render(); // Обновляем интерфейс после завершения процесса
}



// ---------------------------------------------------------
// Функция для сброса теста
function resetTest() {
    isStarted = false;
    currentQuality = '96kbps';
    consecutiveCorrect = 0;
    consecutiveIncorrect = 0;
    isTestComplete = false;
    finalResult = '';
    xIsA = Math.random() < 0.5;
    cardNumber = 1;
    isLoading = false;
    currentTrack = '';
    testResults = [];
    maxDiscernibleQuality = '96kbps';
    render();
}

// ---------------------------------------------------------
// Основная функция рендеринга
function render() {
    const $content = $('#content');
    $content.empty();

    if (!isStarted) {
        $content.html(renderStartCard());
    } else if (isTestComplete) {
        $content.html(renderCompleteCard());
    } else if (isLoading) {
        $content.html(renderLoadingCard());
    } else {
        $content.html(renderTestCard());
        initializeCustomAudioPlayers(); // Инициализация аудиоплееров после рендеринга
    }
}

// ---------------------------------------------------------
// Функция для загрузки списка треков с API
function loadTracks() {
    return $.ajax({
        url: `${API_DOMAIN}/api/tracks`,
        method: 'GET',
        dataType: 'json'
    });
}

// ---------------------------------------------------------
// Функция для изменения языка
function changeLanguage(lang) {
    currentLanguage = lang;
    render();
}

// ---------------------------------------------------------
// Функция для инициализации всех аудиоплееров
function initializeCustomAudioPlayers() {
    const audioElements = ['audio-a', 'audio-b', 'audio-x'];

    audioElements.forEach(audioId => {
        const audio = document.getElementById(audioId);
        const playPauseButton = document.getElementById(`${audioId}-play-pause`);
        const slider = document.getElementById(`${audioId}-slider`);
        const timeDisplay = document.getElementById(`${audioId}-time`);

        if (audio && playPauseButton && slider && timeDisplay) {
            $(playPauseButton).off('click');
            $(audio).off('timeupdate');
            $(slider).off('input');

            playPauseButton.addEventListener('click', () => {
                if (audio.paused) {
                    pauseOtherPlayers(audioId);
                    audio.play();
                    playPauseButton.textContent = 'Pause';
                } else {
                    audio.pause();
                    playPauseButton.textContent = 'Play';
                }
            });

            audio.addEventListener('timeupdate', () => {
                slider.value = (audio.currentTime / audio.duration) * 100;
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            });

            audio.addEventListener('ended', () => {
                playPauseButton.textContent = 'Play';
                slider.value = 0;
            });

            slider.addEventListener('input', () => {
                audio.currentTime = (slider.value / 100) * audio.duration;
            });
        } else {
            console.error(`Element(s) not found for ${audioId}`);
        }
    });
}

// ---------------------------------------------------------
// Функция для форматирования времени в формате мм:сс
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------
// Функция для остановки всех других плееров, кроме текущего
function pauseOtherPlayers(currentAudioId) {
    const audioElements = ['audio-a', 'audio-b', 'audio-x'];

    audioElements.forEach(audioId => {
        if (audioId !== currentAudioId) {
            const otherAudio = document.getElementById(audioId);
            const otherPlayPauseButton = document.getElementById(`${audioId}-play-pause`);

            if (otherAudio && !otherAudio.paused) {
                otherAudio.pause();
                otherPlayPauseButton.textContent = 'Play';
            }
        }
    });
}

// ---------------------------------------------------------
// Инициализация приложения после загрузки DOM
$(document).ready(function() {
    loadTracks().done(function(data) {
        tracks = data;
        render();
    }).fail(function() {
        console.error('Failed to load tracks');
        $('#content').html(`<div class="alert alert-danger">${t('failedToLoad')}</div>`);
    });

    $(document).off('click', '#startButton').on('click', '#startButton', handleStart);
    $(document).off('click', '#faqButton').on('click', '#faqButton', function() {
        $('#content').html(renderFAQ());
    });
    $(document).off('click', '#backButton').on('click', '#backButton', function() {
        render();
    });
    $(document).off('click', '#resetButton').on('click', '#resetButton', resetTest);
    $(document).off('click', '.choice-btn').on('click', '.choice-btn', function() {
        handleChoice($(this).data('choice'));
    });
    $(document).off('click', '.language-btn').on('click', '.language-btn', function() {
        changeLanguage($(this).data('lang'));
    });
});
