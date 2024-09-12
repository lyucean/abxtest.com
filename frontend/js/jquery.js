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
    const extension = quality === 'wav' ? '.wav' : '.mp3';
    return `${API_DOMAIN}/files/${trackId}_${quality}${extension}`;
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
                        <div class="d-grid gap-2 col-sm-6 col-12 mx-auto">
                            <button id="startButton" class="btn btn-primary btn-lg">
                                ${t('start')}
                            </button>
                        </div>
                        <br/>
                        <br/>
                        <div class="d-grid gap-2 col-sm-2 col-6 mx-auto">
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
                <h2 class="card-title mb-4 text-left">${cardNumber}</h2>
                
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
                    <small class="text-secondary">${t('currentTrack')}</small> <br class="d-block d-sm-none"/> ${currentTrack.name}
                </p>
                <div class="d-flex justify-content-between mb-4">
                    <button class="btn btn-success choice-btn" data-choice="A">${t('choiceA')}</button>
                    <button class="btn btn-primary choice-btn" data-choice="B">${t('choiceB')}</button>
                    <button class="btn btn-warning choice-btn" data-choice="Unknown">${t('choiceUnknown')}</button>
                </div>
            </div>
        </div>
    `;
}

// Функция для рендеринга пользовательского аудиоплеера
function renderCustomAudioPlayer(id, audioUrl) {
    return `
        <div id="${id}-player" class="custom-audio-player d-flex align-items-center">
            <button id="${id}-play-pause" class="btn btn-dark me-3">Play</button>
            <div class="progress flex-grow-1 me-3" style="height: 8px;">
                <div id="${id}-progress" class="progress-bar" role="progressbar" style="width: 0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span id="${id}-time" class="text-black">0:00 / 0:00</span>
        </div>
        <audio id="${id}" style="display:none;">
            <source src="${audioUrl}" type="audio/mpeg">
            ${t('browserDoesNotSupport')}
        </audio>
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
                    <br>${t('comparedFormats')} ${result.quality} vs Lossless
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
        $.get(getAudioUrl(nextTrack.id, 'wav')).always(updateProgress),
        $.get(getAudioUrl(nextTrack.id, nextXIsA ? currentQuality : 'wav')).always(updateProgress)
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
// Основная функция рендеринга
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

        // Инициализация аудиоплееров только после рендеринга карточки теста
        initializeCustomAudioPlayers();
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

// Функция для инициализации всех аудиоплееров
function initializeCustomAudioPlayers() {
    const audioElements = ['audio-a', 'audio-b', 'audio-x'];

    audioElements.forEach(audioId => {
        const audio = document.getElementById(audioId);
        const playPauseButton = document.getElementById(`${audioId}-play-pause`);
        const progressBar = document.getElementById(`${audioId}-progress`);
        const timeDisplay = document.getElementById(`${audioId}-time`);

        // Проверяем существование аудиоэлемента и связанных элементов управления
        if (audio && playPauseButton && progressBar && timeDisplay) {
            // Обработчик Play/Pause
            playPauseButton.addEventListener('click', () => {
                if (audio.paused) {
                    pauseOtherPlayers(audioId); // Остановить все остальные плееры
                    audio.play();
                    playPauseButton.textContent = 'Pause';
                } else {
                    audio.pause();
                    playPauseButton.textContent = 'Play';
                }
            });

            // Обновление прогресса трека
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;

                // Обновляем текущее время и общую продолжительность
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            });

            // Обработка окончания трека
            audio.addEventListener('ended', () => {
                playPauseButton.textContent = 'Play';
            });
        } else {
            console.error(`Element(s) not found for ${audioId}`);
        }
    });
}

// Функция для форматирования времени в мм:сс
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
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

    // После рендеринга карточки инициализируем плееры
    $(document).on('click', '#startButton', handleStart);
    $(document).on('click', '.choice-btn', function() {
        handleChoice($(this).data('choice'));
    });

    // Инициализируем кастомные аудиоплееры после рендеринга
    initializeCustomAudioPlayers();
});


