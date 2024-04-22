var list1 = []; //разделенный на элементы, введенный текст из fld1
var list2 = []; // список нажатых кнопок из right-panel
var var0 = 0; // Объявляем переменную для хранения количества элементов в list1
var var1 = ''; //текст введенный в поле fld1
var var2 = ''; //шаблон текста с XXX
var var3 = 0; //счетчик для btn_back
var rightPanel = document.querySelector('.right-panel'); //панель справа, где размещаются кнопки
var hiddenButtons = []; //список кнопок справа

// Экспортируем функцию закрытия всплывающего окна
window.closePopup = function () {
    document.getElementById("popup").style.display = "none";
};

//Функция замены слов на XXX
function replaceWords(stroke, list) {
    // Проходим по каждому слову из списка
    for (let i = 0; i < list.length; i++) {
        let word = list[i];
        // Ищем первое вхождение слова в строке
        let index = stroke.indexOf(word);
        // Если слово найдено, заменяем его и помечаем как уже замененное
        if (index !== -1) {
            stroke = stroke.substring(0, index) + "XXX" + stroke.substring(index + word.length);
        };
    };
    return stroke;
};

//Функция замены слов на XXX с разбивкой на абзацы
function replaseAbzac() {
    let lines = var1.split('\n');
    // Проходим по каждой строке
    for (let j = 0; j < lines.length; j++) {
        let line = lines[j];
        // Регулярное выражение для разделения текста по указанным символам
        let regex = /[^\wА-Яа-яЁё\n]+/;
        // Разделение текста с помощью регулярного выражения
        let words = line.split(regex);
        // Удаление пустых элементов
        words = words.filter(function (word) {   //список как list1
            return word !== '';
        });
        lines[j] = replaceWords(line, words);
    };
    var2 = lines.join('\n');
};

//Функция создания списка list1 (список из слов поля ввода)
function splitText(text) {
    // Регулярное выражение для разделения текста по указанным символам
    let regex = /[^\wА-Яа-яЁё]+/;
    // Разделение текста с помощью регулярного выражения
    let words = text.split(regex);
    // Удаление пустых элементов
    words = words.filter(function (word) {
        return word !== '';
    });
    // Добавление полученных слов в список list1
    list1 = words;
};

//Функция очистки поля ввода
function clearTextarea() {
    document.getElementById('fld1').value = '';
};

//Функция подсчета кол-ва слов в тексте
function countElements(list) {
    var0 = list.length;
};

// Функция для перемешивания массива случайным образом
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

// Функция для генерации кнопок с названиями из списка в произвольном порядке
function generateButtons() {
    // Очищаем содержимое rightPanel перед добавлением новых кнопок
    rightPanel.innerHTML = '';
    // Перемешиваем список вариантов ответа
    let shuffledList = shuffleArray(list1);
    // Создаем кнопки для каждого элемента списка
    shuffledList.forEach(function (item, index) {
        let button = document.createElement('button');
        button.textContent = item;
        // Добавляем обработчик события click
        button.addEventListener('click', function () {
            hiddenButtons.push({ button: button });
            list2.push(item);
            var2 = var2.replace(/XXX/, item);
            clearTextarea();
            document.getElementById('fld1').value = var2;
            var3 += 1;
            if (var3 >= 1) {
                document.getElementById("btn_back").style.display = "block";
            };
            button.style.display = "none";
        });
        rightPanel.appendChild(button);
    });
};

//Функция возвращения кнопки в right-panel при нажатии на кнопку "Назад"
function showLastHidden() {
    if (hiddenButtons.length > 0) {
        const lastHidden = hiddenButtons.pop();
        lastHidden.button.style.display = "block";
    };
};

//Функция замены последнего введенного слова на XXX при нажатии на кнопку "Назад"
function replaceLastOccurrence(text, list2) {
    // Разделить текст на строки по абзацам
    let lines = text.split('\n');
    // Взять последнее значение из list1
    let lastValue = list2[list2.length - 1];
    // Начать поиск с последней строки
    for (let i = lines.length - 1; i >= 0; i--) {
        // Найти первое вхождение с конца
        let index = lines[i].lastIndexOf(lastValue);
        if (index !== -1) {
            // Заменить найденное слово на 'XXX'
            lines[i] = lines[i].substring(0, index) + 'XXX' + lines[i].substring(index + lastValue.length);
            // Прекратить поиск
            break;
        };
    };
    // Объединить строки обратно в текст
    var2 = lines.join('\n');
    list2 = list2.pop();
};

//Функция завершения
function ending() {
    clearTextarea();
    document.getElementById('fld1').value = var1;
    document.getElementById("btn_back").style.display = "none";
    document.getElementById("btn_stop").style.display = "none";
    document.getElementById("btn_start").style.display = "block";
    list1 = []; //разделенный на элементы введенный текст из fld1
    list2 = []; // список нажатых кнопок из right-panel
    var0 = 0; // Объявляем переменную для хранения количества элементов в list1
    var1 = ''; //текст введенный в поле fld1
    var2 = ''; //шаблон текста с XXX
    var3 = 0;
    hiddenButtons = [];
    rightPanel.innerHTML = '';
};

//Функция проверки набранного текста с исходным
function audit() {
    if (var2 === var1) {
        document.getElementById("popupText").innerText = "Верно!";
        document.getElementById("popup").style.display = "block";
        ending();
    }
    else {
        document.getElementById("popupText").innerText = "Неправильно!";
        document.getElementById("popup").style.display = "block";
        ending();
    }
};

//Функция таймера
function timer(seconds) {
    let timer = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timer);
            document.getElementById("popupText").innerText = "Время вышло. Попробуйте снова";
            document.getElementById("popup").style.display = "block";
            ending();
        } else {
            seconds -= 0.3; // Уменьшаем время на 0.3 секунды
            let allButtonsHidden = true;
            // Проверяем все кнопки внутри rightPanel
            for (let i = 0; i < rightPanel.children.length; i++) {
                if (rightPanel.children[i].style.display !== "none") {
                    // Если хотя бы одна кнопка видима, обновляем флаг
                    allButtonsHidden = false;
                    break;
                };
            };
            // Проверяем флаг
            if (allButtonsHidden) {
                audit();
                clearInterval(timer);
            };
        };
    }, 300); // Интервал в 300 миллисекунд (0.3 секунды)
};

//Обработка нажатия кнопки btn_stop
document.getElementById('btn_stop').addEventListener('click', function () {
    pass
});

//Обработка нажатия кнопки btn_start
document.getElementById('btn_start').addEventListener('click', function () {
    var1 = document.getElementById('fld1').value.trim();
    if (var1 !== '') {
        //создаем список из слов list1
        splitText(var1);
        //считаем кол-во слов в тексте и записываем в var0
        countElements(list1);
        //если в поле ввода fld1 введен текст
        if (var0 > 0) {
            //меняем слова в тексте на XXX и сохраняем в var2
            replaseAbzac();
            clearTextarea();
            document.getElementById("btn_start").style.display = "none";
            document.getElementById("btn_stop").style.display = "block";
            document.getElementById('fld1').value = var2;
            generateButtons();
            timer(var0 * 5);
        };
    }
    //если в поле ввода текста пусто - выводим предупреждение
    else {
        document.getElementById("popupText").innerText = "Поле не заполнено!";
        document.getElementById("popup").style.display = "block";
    };
});

//Обработка нажатия кнопки "btn_back"
document.getElementById('btn_back').addEventListener('click', function () {
    if (var3 > 0) {
        var3 -= 1;
    };
    if (var3 == 0) {
        document.getElementById("btn_back").style.display = "none";
    };
    showLastHidden();
    replaceLastOccurrence(var2, list2);
    clearTextarea();
    document.getElementById('fld1').value = var2;
});
