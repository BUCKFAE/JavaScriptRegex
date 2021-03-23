test()

function formatSentence(sentence) {
    console.log("Formating sentence: " + sentence)

    // Sentence split into words
    let splited = sentence.split(" ")
    let result = []

    // Adding all words
    for (let currentWordID = 0; currentWordID < splited.length; currentWordID++) {

        let currentWord = splited[currentWordID]
        let currentWordResult = ""

        // Seperating punctuation
        for (let currentCharacter = 0; currentCharacter < currentWord.length; currentCharacter++) {

            // Splitting if the current char is not a letter or a number
            if (checkIfCharIsPunctuation(currentWord[currentCharacter])) {
                currentWordResult += " "
                currentWordResult += currentWord[currentCharacter]
                currentWordResult += " "
            } else {
                currentWordResult += currentWord[currentCharacter]
            }

        }
        // Adding the current word to the result
        result = result.concat(currentWordResult.split(" ").filter(Boolean))
    }

    console.log("Formatted sentence: %o\n", result)
    return result
}

// Checks if the given character is a letter or a number
function checkIfCharIsPunctuation(character) {
    return (character.toLowerCase() === character.toUpperCase()) && !(character >= '0' && character <= '9')
}

function test() {

    sentences = []

    sentences.push("Hallo, Welt!")
    sentences.push("Hallo-Welt!")
    sentences.push("Hallo (?) Welt!")
    sentences.push("Hallo,  Welt!")
    sentences.push("Hallo\nWelt!")
    sentences.push("Hallöchen, Welt!")
    sentences.push("Hallo liebe Straße!")
    sentences.push("»Hallo, Welt!«, sagte Julian.")

    sentences.forEach(sentence => {
        formatSentence(sentence)
    });
}