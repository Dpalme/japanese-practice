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
        clearContent();
        var result = data["data"][0];
        var kanji = result["japanese"][0]["word"];
        var hiragana = result["japanese"][0]["reading"];
        var romaji = hiragana.split('').map(wanakana.toRomaji).join('\xa0\xa0');
        var katakana = wanakana.toKatakana(hiragana);
        var senses = "(" + result["senses"][0]["parts_of_speech"].join(', ') + ')'
        var definitions = result["senses"][0]["english_definitions"].join(', ')
        msg.text = romaji.split('\xa0').join('');


        objectToContent({
            type: 'span',
            class: 'mono title-3',
            style: 'letter-spacing: 3rem; margin-right: -3rem',
            innerText: hiragana
        });

        objectToContent({
            type: 'div',
            class: 'title-4 mono mb-1',
            innerText: romaji
        });

        // remove strings from objects and prettify
        objectToContent({
            type: 'div',
            class: 'body-text mb-sm',
            innerText: definitions
        });

        // remove strings from objects and prettify
        objectToContent({
            type: 'p',
            class: 'small-body mb-1',
            innerText: senses
        });


        objectToContent({
            type: 'div',
            class: 'container mb-1',
            children: [
                object({
                    type: 'span',
                    class: 'col-h h3',
                    innerText: kanji ? kanji : "no kanji"
                }), object({
                    type: 'span',
                    class: 'col-h h3',
                    innerText: katakana
                })
            ]
        });

        objectToContent({
            type: 'button',
            class: 'col-4 yellow-btn-bg',
            innerText: 'speak',
            onclick: 'javascript:soundWord()'
        })

        objectToContent({
            type: 'button',
            class: 'col-4 yellow-btn-bg',
            innerText: 'night',
            onclick: 'javascript:document.body.classList.toggle("night")'
        })
        
        objectToContent({
            type: 'button',
            class: 'col-4 blue-btn-bg',
            innerText: 'new',
            onclick: 'javascript:newWord()'
        })
    })
}


function soundWord() {
    if (window.speechSynthesis) {
        window.speechSynthesis.speak(msg);
    }
}

newWord();
