words = wordList.filter(e => e.length > 3)

let answer = 1,
    score = 0,
    options = $('.option'),
    arr = [0, 1, 2];

function choice(iterable) { return iterable[(Math.random() * iterable.length) << 0] }

function checkRomaji(kata) {
    var romaji = wanakana.toRomaji(kata);
    return (romaji != kata) ? romaji : -1;
}


function newWord() {
    var keyword = choice(words),
        hiragana = wanakana.toHiragana(keyword),
        parts = hiragana.split(''),
        romajisCheck = hiragana.split('').map(checkRomaji)
    if (!romajisCheck.includes(-1) && !romajisCheck.includes('')) {
        var romajis = parts.map(wanakana.toRomaji);
        answer = choice(arr)
        $.each(options, (i, e) => {
            e.innerText = romajis[i];
        });
        $('#hiragana').text(parts[3]);
        options[answer].innerText = romajis[3];
    } else {
        newWord();
    }
}

function checkAnswer(n) {
    if (n == answer){
        score++;
        $('#score').text('score: ' + score);
    }
    $('#output').text($('#hiragana').text() + ' : ' + options[answer].innerText);
    newWord();
}

$(document).ready(function() {
    newWord();
    
});
