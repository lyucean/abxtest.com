(()=>{"use strict";var e,n={102:(e,n,i)=>{i.d(n,{P:()=>s});const s={ru:{title:"Добро пожаловать на тест качества звука",description:"Наш проект поможет оценить качество вашей акустики и слуха, проверяя, как вы различаете аудиоформаты.",start:"Начать тест",faq:"Как это работает?",loading:"Загрузка следующего теста...",completed:"Тест завершен",restart:"Начать заново",audioA:"Аудио A",audioB:"Аудио B",audioX:"Аудио X (A или B?)",choiceA:"X это A",choiceB:"X это B",choiceUnknown:"Я не знаю",currentQuality:"Текущее качество mp3:",trackName:"Название трека:",selectLanguage:"Выберите язык:",canHearDifference:"Вы слышите разницу даже между 320kbps и Lossless!",cannotHearDifference:"Вы не слышите разницу между {quality} и Lossless.",failedToLoad:"Не удалось загрузить треки. Пожалуйста, попробуйте позже.",testResults:"Результаты тестов:",correct:"Верно",incorrect:"Неверно",unknown:"Не знаю",maxDiscernibleQuality:"Максимально различимое качество:",comparedFormats:"Сравниваемые форматы:",faqContent:'\n    <div class="faq">\n        <ol>\n            <li>\n                <strong>Что это за тест?</strong>\n                <p>Этот тест предназначен для проверки вашей способности различать качество аудио. Мы предлагаем вам два варианта аудио: один в сжатом формате (например, MP3) и другой в формате без сжатия (например, WAV). Вам нужно выбрать, какой из них звучит лучше или определить, если вы не можете заметить разницы.</p>\n            </li>\n            <li>\n                <strong>Как проходит тест?</strong>\n                <p>После нажатия кнопки «Начать тест», вам будет предложено прослушать три версии одного и того же трека:</p>\n                <ul>\n                    <li><strong>Аудио A:</strong> Трек в одном из качеств (сжатый формат).</li>\n                    <li><strong>Аудио B:</strong> Тот же трек в формате lossless (без сжатия).</li>\n                    <li><strong>Аудио X:</strong> Это будет либо версия A, либо версия B. Ваша задача — определить, соответствует ли аудио X треку A или B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Какие форматы вы сравниваете и почему их?</strong>\n                <p>Мы сравниваем следующие форматы:</p>\n                <ul>\n                    <li><strong>96 кбит/с</strong> - Используется в интернет-радио и подкастах.</li>\n                    <li><strong>128 кбит/с</strong> - Качество бесплатных версий стриминговых сервисов (TIDAL Free, Deezer Free, Spotify Free).</li> \n                    <li><strong>192 кбит/с</strong> - Приемлемое качество для Spotify, Apple Music и других.</li>\n                    <li><strong>256 кбит/с</strong> - Высокое качество в премиум-подписках (YouTube Music Premium, SoundCloud Go+).</li>\n                    <li><strong>320 кбит/с</strong> - Наивысшее качество MP3 (SoundCloud HQ, Spotify Premium).</li>\n                    <li><strong>Lossless</strong> - Формат без потерь для аудиофилов (Deezer HiFi, Amazon Music Unlimited).</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Что такое lossless и сжатый формат?</strong>\n                <p><strong>Lossless:</strong> Аудио в формате без потерь (например, WAV или FLAC). Это формат, который сохраняет исходное качество звука без сжатия данных.<br>\n                <strong>Сжатый формат:</strong> Это формат, при котором данные сжимаются для уменьшения размера файла, что может привести к потере качества звука (например, MP3).</p>\n            </li>\n            <li>\n                <strong>Как мне выбрать, какая версия лучше?</strong>\n                <p>Вы прослушиваете аудио и выбираете, какая версия кажется вам лучше. После этого вы выбираете:</p>\n                <ul>\n                    <li><strong>A:</strong> Если вы считаете, что аудио X — это версия A.</li>\n                    <li><strong>B:</strong> Если вы считаете, что аудио X — это версия B.</li>\n                    <li><strong>Не знаю:</strong> Если вы не можете определить разницу между версиями A и B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Что происходит, если я выбрал правильный ответ?</strong>\n                <p>Если вы выберете правильный вариант два раза подряд, тест автоматически перейдет на аудио с более высоким качеством сжатия. Цель теста — определить максимальное качество сжатия, которое вы способны различить.</p>\n            </li>\n            <li>\n                <strong>Что происходит, если я выбрал неправильный ответ?</strong>\n                <p>Если вы дважды подряд выберете неправильный вариант, тест завершится, и вам будет показано, что вы больше не можете различать улучшение качества аудио.</p>\n            </li>\n            <li>\n                <strong>Сколько длится тест?</strong>\n                <p>Тест продолжается до тех пор, пока вы дважды подряд правильно различаете аудио или, наоборот, не делаете два подряд неверных выбора. Также есть возможность перезапустить тест, если вы захотите пройти его заново.</p>\n            </li>\n            <li>\n                <strong>Могу ли я пропустить какой-то трек, если не слышу разницы?</strong>\n                <p>Да, если вы не уверены в ответе, вы можете выбрать вариант «Не знаю», что не повлияет на прогресс теста. Вы продолжите прослушивание следующих треков.</p>\n            </li>\n            <li>\n                <strong>Для чего нужен этот тест?</strong>\n                <p>Этот тест поможет вам понять, насколько вы восприимчивы к различным уровням качества аудио. Это может быть полезно для аудиофилов, музыкантов или просто любителей музыки, которые хотят узнать, насколько хорошо они различают качество звука.</p>\n            </li>\n            <li>\n                <strong>Что делать, если я не слышу разницы?</strong>\n                <p>Не переживайте, если вы не можете различить разницу между треками. Это нормальная ситуация, и многие люди не замечают различий между качествами аудио, особенно если у вас нет специального аудиооборудования или условий для прослушивания.</p>\n            </li>\n            <li>\n                <strong>Почему треки загружаются медленно?</strong>\n                <p>Загрузка треков может зависеть от вашего интернет-соединения и размера файлов. Треки в формате lossless могут быть значительно больше по объему, чем сжатые версии, что влияет на время их загрузки.</p>\n            </li>\n        </ol>\n    </div>\n'},en:{title:"Welcome to The Sound Quality test",description:"Our project will help assess the quality of your acoustics and hearing by checking how you distinguish audio formats.",start:"Start Test",faq:"FAQ",loading:"Loading next test...",completed:"Test Completed",restart:"Restart",audioA:"Audio A",audioB:"Audio B",audioX:"Audio X (A or B?)",choiceA:"X is A",choiceB:"X is B",choiceUnknown:"I don't know",currentQuality:"Current mp3 quality:",trackName:"Track name:",selectLanguage:"Select language:",canHearDifference:"You can hear the difference even between 320kbps and Lossless!",cannotHearDifference:"You can't hear the difference between {quality} and Lossless.",failedToLoad:"Failed to load tracks. Please try again later.",testResults:"Test Results:",correct:"Correct",incorrect:"Incorrect",unknown:"Unknown",maxDiscernibleQuality:"Maximum discernible quality:",comparedFormats:"Compared formats:",faqContent:"\n    <div class=\"faq\">\n        <ol>\n            <li>\n                <strong>What is this test?</strong>\n                <p>This test is designed to check your ability to discern audio quality. We offer you two audio options: one in compressed format (e.g., MP3) and another in lossless format (e.g., WAV). You need to choose which one sounds better or determine if you cannot notice a difference.</p>\n            </li>\n            <li>\n                <strong>How does the test work?</strong>\n                <p>After clicking the \"Start Test\" button, you will be asked to listen to three versions of the same track:</p>\n                <ul>\n                    <li><strong>Audio A:</strong> The track in one quality (compressed format).</li>\n                    <li><strong>Audio B:</strong> The same track in lossless format (uncompressed).</li>\n                    <li><strong>Audio X:</strong> This will either be version A or version B. Your task is to determine whether audio X matches track A or B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Which formats do you compare and why?</strong>\n                <p>We compare the following formats:</p>\n                <ul>\n                    <li><strong>96 kbps</strong> - Used in internet radio and podcasts.</li>\n                    <li><strong>128 kbps</strong> - Quality of free versions of streaming services (<em>TIDAL Free</em>, <em>Deezer Free</em>, <em>Spotify Free</em>).</li> \n                    <li><strong>192 kbps</strong> - Acceptable quality for <em>Spotify</em>, <em>Apple Music</em>, and others.</li>\n                    <li><strong>256 kbps</strong> - High quality in premium subscriptions (<em>YouTube Music Premium</em>, <em>SoundCloud Go+</em>).</li>\n                    <li><strong>320 kbps</strong> - Highest quality MP3 (<em>SoundCloud HQ</em>, <em>Spotify Premium</em>).</li>\n                    <li><strong>Lossless</strong> - Lossless format for audiophiles (<em>Deezer HiFi</em>, <em>Amazon Music Unlimited</em>).</li>\n                </ul>\n            </li>\n            <li>\n                <strong>What is lossless and compressed format?</strong>\n                <p><strong>Lossless:</strong> Audio in a lossless format (e.g., WAV or FLAC). This format preserves the original sound quality without data compression.<br>\n                <strong>Compressed format:</strong> A format where data is compressed to reduce file size, which may result in a loss of sound quality (e.g., MP3).</p>\n            </li>\n            <li>\n                <strong>How do I choose which version is better?</strong>\n                <p>You listen to the audio and decide which version sounds better. Afterward, you select:</p>\n                <ul>\n                    <li><strong>A:</strong> If you think that audio X is version A.</li>\n                    <li><strong>B:</strong> If you think that audio X is version B.</li>\n                    <li><strong>I don't know:</strong> If you can't tell the difference between versions A and B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>What happens if I choose the correct answer?</strong>\n                <p>If you select the correct option two times in a row, the test will automatically switch to audio with a higher compression quality. The goal of the test is to determine the highest compression quality you can distinguish.</p>\n            </li>\n            <li>\n                <strong>What happens if I choose the wrong answer?</strong>\n                <p>If you choose the wrong option two times in a row, the test will end, and you'll be informed that you can no longer perceive an improvement in audio quality.</p>\n            </li>\n            <li>\n                <strong>How long does the test last?</strong>\n                <p>The test continues until you correctly identify the audio two times in a row or make two incorrect choices in a row. You can also restart the test if you want to take it again.</p>\n            </li>\n            <li>\n                <strong>Can I skip a track if I can't hear a difference?</strong>\n                <p>Yes, if you're unsure of the answer, you can select \"I don't know,\" which will not affect the test's progress. You will continue to the next tracks.</p>\n            </li>\n            <li>\n                <strong>What is the purpose of this test?</strong>\n                <p>This test helps you understand how sensitive you are to different levels of audio quality. It can be useful for audiophiles, musicians, or anyone who wants to learn how well they can discern sound quality.</p>\n            </li>\n            <li>\n                <strong>What if I can't hear a difference?</strong>\n                <p>Don't worry if you can't hear a difference between the tracks. This is a normal situation, and many people don't notice differences in audio quality, especially if they don't have specialized audio equipment or listening conditions.</p>\n            </li>\n            <li>\n                <strong>Why are the tracks loading slowly?</strong>\n                <p>Track loading time depends on your internet connection and the file size. Lossless tracks can be significantly larger than compressed versions, affecting loading times.</p>\n            </li>\n        </ol>\n    </div>\n"},es:{title:"Bienvenido a la prueba de calidad de audio",description:"Nuestro proyecto ayudará a evaluar la calidad de su acústica y audición al verificar cómo distingue los formatos de audio.",start:"Iniciar prueba",faq:"FAQ",loading:"Cargando la siguiente prueba...",completed:"Prueba completada",restart:"Reiniciar",audioA:"Audio A",audioB:"Audio B",audioX:"Audio X (¿A o B?)",choiceA:"X es A",choiceB:"X es B",choiceUnknown:"No lo sé",currentQuality:"Calidad actual del mp3:",currentTrack:"Nombre de la pista:",selectLanguage:"Seleccionar idioma:",canHearDifference:"¡Puedes escuchar la diferencia incluso entre 320kbps y Lossless!",cannotHearDifference:"No puedes escuchar la diferencia entre {quality} y Lossless.",failedToLoad:"No se pudieron cargar las pistas. Por favor, inténtalo de nuevo más tarde.",testResults:"Resultados de la prueba:",correct:"Correcto",incorrect:"Incorrecto",unknown:"Desconocido",maxDiscernibleQuality:"Calidad máxima discernible:",comparedFormats:"Formatos comparados:",faqContent:'\n    <div class="faq">\n        <ol>\n            <li>\n                <strong>¿Qué es esta prueba?</strong>\n                <p>Esta prueba está diseñada para verificar tu capacidad para distinguir la calidad del audio. Te ofrecemos dos opciones de audio: una en formato comprimido (por ejemplo, MP3) y otra en formato sin pérdida (por ejemplo, WAV). Debes elegir cuál suena mejor o determinar si no puedes notar la diferencia.</p>\n            </li>\n            <li>\n                <strong>¿Cómo funciona la prueba?</strong>\n                <p>Después de hacer clic en el botón "Iniciar prueba", se te pedirá que escuches tres versiones de la misma pista:</p>\n                <ul>\n                    <li><strong>Audio A:</strong> La pista en una calidad (formato comprimido).</li>\n                    <li><strong>Audio B:</strong> La misma pista en formato sin pérdida (sin compresión).</li>\n                    <li><strong>Audio X:</strong> Esta será la versión A o la versión B. Tu tarea es determinar si el audio X coincide con la pista A o B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>¿Qué es el formato sin pérdida y el formato comprimido?</strong>\n                <p><strong>Sin pérdida:</strong> Audio en un formato sin pérdida (por ejemplo, WAV o FLAC). Este formato conserva la calidad de sonido original sin compresión de datos.<br>\n                <strong>Formato comprimido:</strong> Un formato donde los datos se comprimen para reducir el tamaño del archivo, lo que puede resultar en una pérdida de calidad de sonido (por ejemplo, MP3).</p>\n            </li>\n            <li>\n                <strong>¿Cómo elijo qué versión es mejor?</strong>\n                <p>Escuchas el audio y decides cuál versión suena mejor. Después seleccionas:</p>\n                <ul>\n                    <li><strong>A:</strong> Si crees que el audio X es la versión A.</li>\n                    <li><strong>B:</strong> Si crees que el audio X es la versión B.</li>\n                    <li><strong>No lo sé:</strong> Si no puedes notar la diferencia entre las versiones A y B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>¿Qué sucede si elijo la respuesta correcta?</strong>\n                <p>Si seleccionas la opción correcta dos veces seguidas, la prueba cambiará automáticamente a audio con una mayor calidad de compresión. El objetivo de la prueba es determinar la mayor calidad de compresión que puedes distinguir.</p>\n            </li>\n            <li>\n                <strong>¿Qué sucede si elijo la respuesta incorrecta?</strong>\n                <p>Si eliges la opción incorrecta dos veces seguidas, la prueba finalizará y se te informará que ya no puedes percibir una mejora en la calidad del audio.</p>\n            </li>\n            <li>\n                <strong>¿Cuánto dura la prueba?</strong>\n                <p>La prueba continúa hasta que identifiques correctamente el audio dos veces seguidas o hagas dos elecciones incorrectas seguidas. También puedes reiniciar la prueba si deseas realizarla de nuevo.</p>\n            </li>\n            <li>\n                <strong>¿Puedo omitir una pista si no escucho la diferencia?</strong>\n                <p>Sí, si no estás seguro de la respuesta, puedes seleccionar "No lo sé", lo que no afectará el progreso de la prueba. Continuarás con las siguientes pistas.</p>\n            </li>\n            <li>\n                <strong>¿Para qué sirve esta prueba?</strong>\n                <p>Esta prueba te ayuda a comprender cuán sensible eres a los diferentes niveles de calidad de audio. Puede ser útil para audiófilos, músicos o cualquier persona que quiera saber qué tan bien distingue la calidad del sonido.</p>\n            </li>\n            <li>\n                <strong>¿Qué hago si no escucho la diferencia?</strong>\n                <p>No te preocupes si no puedes escuchar la diferencia entre las pistas. Es una situación normal, y muchas personas no notan diferencias en la calidad del audio, especialmente si no tienen equipos o condiciones especiales de escucha.</p>\n            </li>\n            <li>\n                <strong>¿Por qué las pistas se cargan lentamente?</strong>\n                <p>El tiempo de carga de las pistas depende de tu conexión a internet y del tamaño del archivo. Las pistas sin pérdida pueden ser significativamente más grandes que las versiones comprimidas, lo que afecta el tiempo de carga.</p>\n            </li>\n        </ol>\n    </div>\n'},zh:{title:"欢迎来到音频质量测试",description:"我们的项目将帮助您评估音响和听力的质量，通过检查您对音频格式的识别能力。",start:"开始测试",faq:"常见问题",loading:"加载下一次测试...",completed:"测试完成",restart:"重新开始",audioA:"音频 A",audioB:"音频 B",audioX:"音频 X (A 还是 B?)",choiceA:"X 是 A",choiceB:"X 是 B",choiceUnknown:"我不知道",currentQuality:"当前 mp3 质量:",trackName:"曲目名称:",selectLanguage:"选择语言:",canHearDifference:"您可以听到 320kbps 和 Lossless 之间的差异！",cannotHearDifference:"您听不到 {quality} 和 Lossless 之间的差异。",failedToLoad:"无法加载曲目。请稍后再试。",testResults:"测试结果:",correct:"正确",incorrect:"不正确",unknown:"未知",maxDiscernibleQuality:"最大可辨别质量:",comparedFormats:"比较格式:",faqContent:'\n    <div class="faq">\n        <ol>\n            <li>\n                <strong>这是什么测试？</strong>\n                <p>此测试旨在检查您分辨音频质量的能力。我们提供两种音频选项：一种是压缩格式（例如 MP3），另一种是无损格式（例如 WAV）。您需要选择哪一个听起来更好，或者如果您无法注意到差异，则可以做出相应选择。</p>\n            </li>\n            <li>\n                <strong>测试如何进行？</strong>\n                <p>点击“开始测试”按钮后，您将被要求收听同一曲目的三个版本：</p>\n                <ul>\n                    <li><strong>音频 A：</strong> 以一种质量（压缩格式）播放的曲目。</li>\n                    <li><strong>音频 B：</strong> 以无损格式（未压缩）播放的相同曲目。</li>\n                    <li><strong>音频 X：</strong> 这将是版本 A 或版本 B。您的任务是确定音频 X 是曲目 A 还是 B。</li>\n                </ul>\n            </li>\n            <li>\n                <strong>什么是无损和压缩格式？</strong>\n                <p><strong>无损：</strong> 无损格式的音频（例如 WAV 或 FLAC）。这种格式保留了原始音质，没有数据压缩。<br>\n                <strong>压缩格式：</strong> 数据被压缩以减小文件大小，这可能会导致音质损失（例如 MP3）。</p>\n            </li>\n            <li>\n                <strong>我如何选择哪个版本更好？</strong>\n                <p>您听完音频后，选择哪个版本听起来更好。之后，您可以选择：</p>\n                <ul>\n                    <li><strong>A：</strong> 如果您认为音频 X 是版本 A。</li>\n                    <li><strong>B：</strong> 如果您认为音频 X 是版本 B。</li>\n                    <li><strong>不知道：</strong> 如果您无法分辨 A 和 B 版本之间的差异。</li>\n                </ul>\n            </li>\n            <li>\n                <strong>如果我选择正确答案会发生什么？</strong>\n                <p>如果您连续两次选择正确选项，测试将自动切换到压缩质量更高的音频。测试的目的是确定您能分辨的最高压缩质量。</p>\n            </li>\n            <li>\n                <strong>如果我选择错误答案会发生什么？</strong>\n                <p>如果您连续两次选择错误选项，测试将结束，并通知您已无法感知音频质量的改进。</p>\n            </li>\n            <li>\n                <strong>测试持续多长时间？</strong>\n                <p>测试会持续到您连续两次正确识别音频或连续两次选择错误答案。您也可以在任何时候重新开始测试。</p>\n            </li>\n            <li>\n                <strong>如果我听不出差异，可以跳过曲目吗？</strong>\n                <p>可以，如果您不确定答案，可以选择“我不知道”，这不会影响测试进度，您将继续听下一首曲目。</p>\n            </li>\n            <li>\n                <strong>此测试的目的是什么？</strong>\n                <p>该测试帮助您了解自己对不同音质的敏感度。这对发烧友、音乐人或任何想了解自己听力能力的人都很有用。</p>\n            </li>\n            <li>\n                <strong>如果我听不出差异怎么办？</strong>\n                <p>如果您听不出曲目之间的差异，不必担心。这是正常现象，尤其是如果您没有专门的音频设备或收听条件，很多人无法注意到音质的差异。</p>\n            </li>\n            <li>\n                <strong>为什么曲目加载很慢？</strong>\n                <p>曲目的加载时间取决于您的网络连接和文件大小。无损格式的曲目通常比压缩格式的版本要大得多，这会影响加载时间。</p>\n            </li>\n        </ol>\n    </div>\n'},de:{title:"Willkommen beim Audioqualitätstest",description:"Unser Projekt wird Ihnen helfen, die Qualität Ihrer Akustik und Ihres Gehörs zu bewerten, indem es überprüft, wie gut Sie Audioformate unterscheiden.",start:"Test starten",faq:"FAQ",loading:"Lade den nächsten Test...",completed:"Test abgeschlossen",restart:"Neu starten",audioA:"Audio A",audioB:"Audio B",audioX:"Audio X (A oder B?)",choiceA:"X ist A",choiceB:"X ist B",choiceUnknown:"Ich weiß es nicht",currentQuality:"Aktuelle mp3-Qualität:",trackName:"Titelname:",selectLanguage:"Sprache auswählen:",canHearDifference:"Sie können den Unterschied sogar zwischen 320kbps und Lossless hören!",cannotHearDifference:"Sie können den Unterschied zwischen {quality} und Lossless nicht hören.",failedToLoad:"Die Titel konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",testResults:"Testergebnisse:",correct:"Richtig",incorrect:"Falsch",unknown:"Unbekannt",maxDiscernibleQuality:"Maximal wahrnehmbare Qualität:",comparedFormats:"Vergleichene Formate:",faqContent:'\n    <div class="faq">\n        <ol>\n            <li>\n                <strong>Was ist dieser Test?</strong>\n                <p>Dieser Test wurde entwickelt, um Ihre Fähigkeit zur Unterscheidung der Audioqualität zu überprüfen. Wir bieten Ihnen zwei Audiooptionen: eine im komprimierten Format (z.B. MP3) und eine im verlustfreien Format (z.B. WAV). Sie müssen auswählen, welche besser klingt, oder feststellen, ob Sie keinen Unterschied bemerken können.</p>\n            </li>\n            <li>\n                <strong>Wie funktioniert der Test?</strong>\n                <p>Nach dem Klicken auf den Button "Test starten" werden Ihnen drei Versionen desselben Tracks zum Anhören angeboten:</p>\n                <ul>\n                    <li><strong>Audio A:</strong> Der Track in einer bestimmten Qualität (komprimiertes Format).</li>\n                    <li><strong>Audio B:</strong> Derselbe Track im verlustfreien Format (unkomprimiert).</li>\n                    <li><strong>Audio X:</strong> Dies wird entweder Version A oder Version B sein. Ihre Aufgabe ist es, herauszufinden, ob Audio X dem Track A oder B entspricht.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Was ist verlustfreies und komprimiertes Format?</strong>\n                <p><strong>Verlustfrei:</strong> Audio im verlustfreien Format (z.B. WAV oder FLAC). Dieses Format bewahrt die ursprüngliche Klangqualität ohne Datenkompression.<br>\n                <strong>Komprimiertes Format:</strong> Ein Format, bei dem Daten komprimiert werden, um die Dateigröße zu verringern, was zu einem Qualitätsverlust führen kann (z.B. MP3).</p>\n            </li>\n            <li>\n                <strong>Wie wähle ich, welche Version besser ist?</strong>\n                <p>Sie hören das Audio an und entscheiden, welche Version besser klingt. Danach wählen Sie:</p>\n                <ul>\n                    <li><strong>A:</strong> Wenn Sie denken, dass Audio X die Version A ist.</li>\n                    <li><strong>B:</strong> Wenn Sie denken, dass Audio X die Version B ist.</li>\n                    <li><strong>Ich weiß es nicht:</strong> Wenn Sie keinen Unterschied zwischen den Versionen A und B feststellen können.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Was passiert, wenn ich die richtige Antwort wähle?</strong>\n                <p>Wenn Sie zwei Mal hintereinander die richtige Option wählen, wechselt der Test automatisch zu einer Audioqualität mit stärkerer Kompression. Ziel des Tests ist es, die höchste Kompressionsqualität zu ermitteln, die Sie unterscheiden können.</p>\n            </li>\n            <li>\n                <strong>Was passiert, wenn ich die falsche Antwort wähle?</strong>\n                <p>Wenn Sie zwei Mal hintereinander die falsche Option wählen, endet der Test, und es wird Ihnen angezeigt, dass Sie keine Verbesserung der Audioqualität mehr wahrnehmen können.</p>\n            </li>\n            <li>\n                <strong>Wie lange dauert der Test?</strong>\n                <p>Der Test dauert so lange, bis Sie zwei Mal hintereinander das richtige Audio identifizieren oder zwei falsche Antworten hintereinander geben. Sie können den Test auch neu starten, wenn Sie ihn erneut durchführen möchten.</p>\n            </li>\n            <li>\n                <strong>Kann ich einen Track überspringen, wenn ich keinen Unterschied höre?</strong>\n                <p>Ja, wenn Sie sich unsicher sind, können Sie "Ich weiß es nicht" wählen, was den Fortschritt des Tests nicht beeinträchtigt. Sie hören dann die nächsten Tracks weiter.</p>\n            </li>\n            <li>\n                <strong>Wozu dient dieser Test?</strong>\n                <p>Dieser Test hilft Ihnen, zu verstehen, wie empfindlich Sie auf verschiedene Audioqualitäten reagieren. Es kann für Audiophile, Musiker oder jeden, der seine Fähigkeiten zur Klangunterscheidung testen möchte, nützlich sein.</p>\n            </li>\n            <li>\n                <strong>Was soll ich tun, wenn ich keinen Unterschied höre?</strong>\n                <p>Machen Sie sich keine Sorgen, wenn Sie keinen Unterschied zwischen den Tracks hören können. Dies ist eine normale Situation, und viele Menschen bemerken keine Unterschiede in der Audioqualität, insbesondere wenn sie keine speziellen Audiogeräte oder -bedingungen zum Anhören haben.</p>\n            </li>\n            <li>\n                <strong>Warum laden die Tracks so langsam?</strong>\n                <p>Die Ladezeit der Tracks hängt von Ihrer Internetverbindung und der Dateigröße ab. Verlustfreie Tracks können erheblich größer sein als komprimierte Versionen, was die Ladezeit beeinflusst.</p>\n            </li>\n        </ol>\n    </div>\n'},fr:{title:"Bienvenue au test de qualité audio",description:"Notre projet aidera à évaluer la qualité de votre acoustique et de votre audition en vérifiant comment vous différenciez les formats audio.",start:"Démarrer le test",faq:"FAQ",loading:"Chargement du prochain test...",completed:"Test terminé",restart:"Redémarrer",audioA:"Audio A",audioB:"Audio B",audioX:"Audio X (A ou B ?)",choiceA:"X est A",choiceB:"X est B",choiceUnknown:"Je ne sais pas",currentQuality:"Qualité mp3 actuelle :",trackName:"Nom de la piste :",selectLanguage:"Sélectionner la langue :",canHearDifference:"Vous pouvez entendre la différence même entre 320kbps et Lossless !",cannotHearDifference:"Vous n'entendez pas la différence entre {quality} et Lossless.",failedToLoad:"Échec du chargement des pistes. Veuillez réessayer plus tard.",testResults:"Résultats du test :",correct:"Correct",incorrect:"Incorrect",unknown:"Inconnu",maxDiscernibleQuality:"Qualité maximale discernable :",comparedFormats:"Formats comparés :",faqContent:"\n    <div class=\"faq\">\n        <ol>\n            <li>\n                <strong>Che cos'è questo test?</strong>\n                <p>Questo test è progettato per verificare la tua capacità di distinguere la qualità audio. Ti offriamo due opzioni audio: una in formato compresso (ad esempio MP3) e l'altra in formato lossless (ad esempio WAV). Devi scegliere quale suona meglio o determinare se non riesci a notare alcuna differenza.</p>\n            </li>\n            <li>\n                <strong>Come funziona il test?</strong>\n                <p>Dopo aver cliccato sul pulsante \"Inizia il test\", ti verrà chiesto di ascoltare tre versioni dello stesso brano:</p>\n                <ul>\n                    <li><strong>Audio A:</strong> Il brano in una qualità specifica (formato compresso).</li>\n                    <li><strong>Audio B:</strong> Lo stesso brano in formato lossless (non compresso).</li>\n                    <li><strong>Audio X:</strong> Sarà la versione A o la versione B. Il tuo compito è determinare se l'audio X corrisponde al brano A o B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Che cos'è il formato lossless e il formato compresso?</strong>\n                <p><strong>Lossless:</strong> Audio in un formato lossless (ad esempio WAV o FLAC). Questo formato preserva la qualità audio originale senza compressione.<br>\n                <strong>Formato compresso:</strong> Un formato in cui i dati vengono compressi per ridurre la dimensione del file, il che può portare a una perdita di qualità audio (ad esempio MP3).</p>\n            </li>\n            <li>\n                <strong>Come faccio a scegliere quale versione è migliore?</strong>\n                <p>Ascolti l'audio e decidi quale versione suona meglio. Successivamente scegli:</p>\n                <ul>\n                    <li><strong>A:</strong> Se pensi che l'audio X sia la versione A.</li>\n                    <li><strong>B:</strong> Se pensi che l'audio X sia la versione B.</li>\n                    <li><strong>Non lo so:</strong> Se non riesci a distinguere la differenza tra le versioni A e B.</li>\n                </ul>\n            </li>\n            <li>\n                <strong>Cosa succede se scelgo la risposta corretta?</strong>\n                <p>Se selezioni l'opzione corretta due volte di seguito, il test passerà automaticamente a un audio con una qualità di compressione più alta. L'obiettivo del test è determinare la massima qualità di compressione che riesci a distinguere.</p>\n            </li>\n            <li>\n                <strong>Cosa succede se scelgo la risposta sbagliata?</strong>\n                <p>Se scegli l'opzione sbagliata due volte di seguito, il test terminerà e ti verrà mostrato che non riesci più a percepire miglioramenti nella qualità audio.</p>\n            </li>\n            <li>\n                <strong>Quanto dura il test?</strong>\n                <p>Il test continua finché non identifichi correttamente l'audio due volte di seguito o non fai due scelte sbagliate consecutive. Puoi anche riavviare il test se desideri rifarlo.</p>\n            </li>\n            <li>\n                <strong>Posso saltare un brano se non sento alcuna differenza?</strong>\n                <p>Sì, se non sei sicuro della risposta, puoi selezionare \"Non lo so\", il che non influirà sul progresso del test. Continuerai con i brani successivi.</p>\n            </li>\n            <li>\n                <strong>A cosa serve questo test?</strong>\n                <p>Questo test ti aiuta a capire quanto sei sensibile ai diversi livelli di qualità audio. Può essere utile per audiofili, musicisti o chiunque voglia sapere quanto bene riesce a distinguere la qualità del suono.</p>\n            </li>\n            <li>\n                <strong>Cosa devo fare se non sento la differenza?</strong>\n                <p>Non preoccuparti se non riesci a sentire la differenza tra i brani. È una situazione normale e molte persone non notano differenze nella qualità audio, soprattutto se non dispongono di apparecchiature audio specializzate o condizioni di ascolto adeguate.</p>\n            </li>\n            <li>\n                <strong>Perché i brani si caricano lentamente?</strong>\n                <p>Il tempo di caricamento dei brani dipende dalla tua connessione internet e dalla dimensione del file. I brani in formato lossless possono essere significativamente più grandi rispetto alle versioni compresse, il che influisce sui tempi di caricamento.</p>\n            </li>\n        </ol>\n    </div>\n"}}}},i={};function s(e){var o=i[e];if(void 0!==o)return o.exports;var t=i[e]={exports:{}};return n[e].call(t.exports,t,t.exports,s),t.exports}s.m=n,e=[],s.O=(n,i,o,t)=>{if(!i){var r=1/0;for(u=0;u<e.length;u++){for(var[i,o,t]=e[u],a=!0,l=0;l<i.length;l++)(!1&t||r>=t)&&Object.keys(s.O).every((e=>s.O[e](i[l])))?i.splice(l--,1):(a=!1,t<r&&(r=t));if(a){e.splice(u--,1);var d=o();void 0!==d&&(n=d)}}return n}t=t||0;for(var u=e.length;u>0&&e[u-1][2]>t;u--)e[u]=e[u-1];e[u]=[i,o,t]},s.d=(e,n)=>{for(var i in n)s.o(n,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},s.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={543:0};s.O.j=n=>0===e[n];var n=(n,i)=>{var o,t,[r,a,l]=i,d=0;if(r.some((n=>0!==e[n]))){for(o in a)s.o(a,o)&&(s.m[o]=a[o]);if(l)var u=l(s)}for(n&&n(i);d<r.length;d++)t=r[d],s.o(e,t)&&e[t]&&e[t][0](),e[t]=0;return s.O(u)},i=self.webpackChunkabxtest=self.webpackChunkabxtest||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))})();var o=s(102);o=s.O(o)})();