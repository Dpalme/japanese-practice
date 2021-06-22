let msg;
if (SpeechSynthesisUtterance) {
    msg = new SpeechSynthesisUtterance();
    msg.pitch = 2
    msg.rate = 0.2
    msg.lang = "ja";
}

function newWord() {
    var keyword = wordList[Math.floor(Math.random() * wordList.length)];
    var apiurl = 'https://jisho.org/api/v1/search/words?keyword=' + keyword;
    $.get(apiurl, function (data) {
        var result = data["data"][0];
        var kanji = result["japanese"][0]["word"];
        var hiragana = result["japanese"][0]["reading"];
        var romaji = hiragana.split('').map(wanakana.toRomaji).join('\xa0\xa0');
        var katakana = wanakana.toKatakana(hiragana);
        var senses = "(" + result["senses"][0]["parts_of_speech"].join(', ') + ')'
        var definitions = result["senses"][0]["english_definitions"].join(', ')
        msg.text = romaji.split('\xa0').join('');

        $('#hiragana').text(hiragana);
        $('#romaji').text(romaji);
        $('#definition').text(definitions);
        $('#type').text(senses);
        $('#kanji').text(kanji ? kanji : "no kanji");
        $('#katakana').text(katakana);
    })
}


function soundWord() {
    if (window.speechSynthesis) {
        window.speechSynthesis.speak(msg);
    }
}

newWord();
