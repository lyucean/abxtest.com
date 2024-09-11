// Определение качества аудио
const qualities = ['96kbps', '128kbps', '256kbps', '320kbps'];

// API домен
const API_DOMAIN = 'http://localhost';

// Глобальные переменные состояния
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
let tracks = []; // Будет заполнено данными из API
let currentLanguage = 'ru'; // Текущий язык (по умолчанию русский)
let testResults = []; // Массив для хранения результатов тестов
let maxDiscernibleQuality = '96kbps'; // Максимально различимое качество


// подгрузим доступные языки
import { translations } from './translations.js';

// Функция для получения перевода
function t(key) {
    return translations[currentLanguage][key] || key;
}


// Функция для получения URL аудио файла
function getAudioUrl(trackId, quality) {
    return `${API_DOMAIN}/api/files/${trackId}_${quality}.mp3`;
}

// Функция для выбора случайного трека
function selectRandomTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
}

// Функция для рендеринга начальной карточки
function renderStartCard() {
    return `
                <div class="card">
                    <div class="card-body text-center">
                        <br/>
                        <br/>
                        <br/>
                        <h2 class="card-title mb-4">${t('title')}</h2>
                        <br/>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button id="startButton" class="btn btn-primary btn-lg">
                                ${t('start')}
                            </button>
                        </div>
                        <br/>
                        <br/>
                        <div class="d-grid gap-2 col-2 mx-auto">
                            <button id="faqButton" class="btn btn-outline-secondary ">
                                ${t('faq')}
                            </button>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            `;
}

// Функция для рендеринга FAQ
function renderFAQ() {
    //<p>${t('faqContent')}</p>
    return `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title mb-4">${t('faq')}</h2>
                        <button id="backButton" class="btn btn-primary">
                            ${t('start')}
                        </button>
                    </div>
                </div>
            `;
}

// Функция для рендеринга карточки теста
function renderTestCard() {
    return `
                <div class="card fade-in">
                    <div class="card-body">
                        <h2 class="card-title mb-4 text-center">${t('currentTrack')} ${cardNumber}</h2>
                        <div class="audio-block mb-4">
                            <h3 class="h5 mb-3">${t('audioA')} (${currentQuality})</h3>
                            <audio id="audio-a" class="custom-audio-player" controls src="${getAudioUrl(currentTrack.id, currentQuality)}">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div class="audio-block mb-4">
                            <h3 class="h5 mb-3">${t('audioB')} (FLAC)</h3>
                            <audio id="audio-b" class="custom-audio-player" controls src="${getAudioUrl(currentTrack.id, 'flac')}">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div class="audio-block mb-4">
                            <h3 class="h5 mb-3">${t('audioX')}</h3>
                            <audio id="audio-x" class="custom-audio-player" controls src="${xIsA ? getAudioUrl(currentTrack.id, currentQuality) : getAudioUrl(currentTrack.id, 'flac')}">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div class="d-flex justify-content-between mb-4">
                            <button class="btn btn-primary choice-btn" data-choice="A">${t('choiceA')}</button>
                            <button class="btn btn-primary choice-btn" data-choice="B">${t('choiceB')}</button>
                            <button class="btn btn-secondary choice-btn" data-choice="Unknown">${t('choiceUnknown')}</button>
                        </div>
                        <p>${t('currentQuality')} ${currentQuality}</p>
                        <p>${t('currentTrack')} ${currentTrack.name}</p>
                    </div>
                </div>
            `;
}

// Функция для рендеринга карточки загрузки
function renderLoadingCard() {
    return `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title mb-4">${t('loading')}</h2>
                        <div class="progress">
                            <div id="loadingProgress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0"></div>
                        </div>
                    </div>
                </div>
            `;
}

// Функция для рендеринга карточки завершения теста
function renderCompleteCard() {
    let resultsList = testResults.map((result, index) => `
                <li class="list-group-item">
                    Test ${index + 1}: ${t(result.isCorrect ? 'correct' : (result.choice === 'Unknown' ? 'unknown' : 'incorrect'))}
                    <br>${t('comparedFormats')} ${result.quality} vs FLAC
                </li>
            `).join('');

    return `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title mb-4">${t('completed')}</h2>
                        <p class="mb-4">${finalResult}</p>
                        <p>${t('maxDiscernibleQuality')} ${maxDiscernibleQuality}</p>
                        <h3>${t('testResults')}</h3>
                        <ul class="list-group mb-4">
                            ${resultsList}
                        </ul>
                        <div class="text-center">
                            <button id="resetButton" class="btn btn-primary btn-lg">
                                ${t('restart')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
}

// Обработчик начала теста
function handleStart() {
    isStarted = true;
    currentTrack = selectRandomTrack();
    xIsA = Math.random() < 0.5;
    render();
}

// Обработчик выбора пользователя
function handleChoice(choice) {
    isLoading = true;
    render();

    // Загрузка аудио файлов для следующего теста
    let loadedFiles = 0;
    const filesToLoad = 3; // A, B, и X аудио файлы

    function updateProgress() {
        loadedFiles++;
        const progress = (loadedFiles / filesToLoad) * 100;
        $('#loadingProgress').css('width', `${progress}%`).attr('aria-valuenow', progress);
    }

    const nextTrack = selectRandomTrack();
    const nextXIsA = Math.random() < 0.5;

    $.when(
        $.get(getAudioUrl(nextTrack.id, currentQuality)).always(updateProgress),
        $.get(getAudioUrl(nextTrack.id, 'flac')).always(updateProgress),
        $.get(getAudioUrl(nextTrack.id, nextXIsA ? currentQuality : 'flac')).always(updateProgress)
    ).always(() => {
        const isCorrect = (choice === 'A' && xIsA) || (choice === 'B' && !xIsA);

        testResults.push({
            isCorrect: isCorrect,
            choice: choice,
            quality: currentQuality
        });

        if (choice !== 'Unknown') {
            if (isCorrect) {
                consecutiveCorrect++;
                consecutiveIncorrect = 0;
                maxDiscernibleQuality = currentQuality;
            } else {
                consecutiveIncorrect++;
                consecutiveCorrect = 0;
            }
        }

        cardNumber++;
        currentTrack = nextTrack;
        xIsA = nextXIsA;

        // Проверка на завершение теста или переход к следующему качеству
        if (consecutiveCorrect === 2) {
            const currentIndex = qualities.indexOf(currentQuality);
            if (currentIndex < qualities.length - 1) {
                currentQuality = qualities[currentIndex + 1];
            } else {
                finalResult = t('canHearDifference');
                isTestComplete = true;
            }
            consecutiveCorrect = 0;
        }

        if (consecutiveIncorrect === 2) {
            finalResult = t('cannotHearDifference').replace('{quality}', currentQuality);
            isTestComplete = true;
        }

        isLoading = false;
        render();
    });
}

// Функция сброса теста
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
    }
}

// Функция для загрузки списка треков
function loadTracks() {
    return $.ajax({
        url: `${API_DOMAIN}/api/tracks`,
        method: 'GET',
        dataType: 'json'
    });
}

// Функция для изменения языка
function changeLanguage(lang) {
    currentLanguage = lang;
    render();
}

// Инициализация приложения после загрузки DOM
$(document).ready(function() {
    // Загрузка списка треков
    loadTracks().done(function(data) {
        tracks = data;
        render();
    }).fail(function() {
        console.error('Failed to load tracks');
        $('#content').html(`<div class="alert alert-danger">${t('failedToLoad')}</div>`);
    });

    // Привязка обработчиков событий
    $(document).on('click', '#startButton', handleStart);
    $(document).on('click', '#faqButton', function() {
        $('#content').html(renderFAQ());
    });
    $(document).on('click', '#backButton', function() {
        render();
    });
    $(document).on('click', '#resetButton', resetTest);
    $(document).on('click', '.choice-btn', function() {
        handleChoice($(this).data('choice'));
    });
    $(document).on('click', '.language-btn', function() {
        changeLanguage($(this).data('lang'));
    });
    $(document).on('play', 'audio', function() {
        $('audio').not(this).each(function(index, audio) {
            audio.pause();
        });
    });
});