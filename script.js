// Testing the function
test()

function tokenizeSentence(sentence) {

    // Escaping tabs and new lines with two empty spaces to ensure coordinates are correct
    // \n and \t are counted like two characters
    sentence = sentence.replace(/\n/g, "  ")
    sentence = sentence.replace(/\t/g, "  ")

    // Appendig whitespace to ensure the last word is added
    sentence += " "

    // Storing token as well as their coordinates relative to the sentece start
    let token = []
    let sentenceTokenCoordinates = []

    // Start of the current word
    let currentWord = ""

    // Adding all words
    for (let currentCharacterID = 0; currentCharacterID < sentence.length; currentCharacterID++) {

        // Splitting if the current char is not a letter or a number
        if (checkIfCharIsPunctuation(sentence[currentCharacterID])) {

            // Adding the last word if it's not empty
            if (currentWord !== "") {

                // Adding the coordinates of the current word
                let currentWordCoordinates = [currentCharacterID - currentWord.length, currentCharacterID - 1]
                sentenceTokenCoordinates.push(currentWordCoordinates)

                // Adding the current word to the collection of token
                token.push(currentWord)

                // Resetting the current word
                currentWord = ""

            }

            // If the current char is a token
            if (sentence[currentCharacterID] !== " ") {
                sentenceTokenCoordinates.push([currentCharacterID, currentCharacterID])
                token.push(sentence[currentCharacterID])
            }


        } else {
            // Appending the current character to the current word
            currentWord += sentence[currentCharacterID]
        }

    }

    return [token, sentenceTokenCoordinates]
}

// Checks if the given character is a letter or a number
function checkIfCharIsPunctuation(character) {
    return (character.toLowerCase() === character.toUpperCase()) && !(character >= '0' && character <= '9')
}

function test() {

    sentences = []

    sentences.push(["Hallo", [[0, 4]]])
    sentences.push(["Hallo Welt", [[0, 4], [6, 9]]])
    sentences.push(["  Hallo  Welt  ", [[2, 6], [9, 12]]])
    sentences.push([" Hallo, Welt!", [[1, 5], [6, 6], [8, 11], [12, 12]]])
    sentences.push(["Hallo-Welt", [[0, 4], [5, 5], [6, 9]]])
    sentences.push(["Hallo (?)  Welt!", [[0, 4], [6, 6], [7, 7], [8, 8], [11, 14], [15, 15]]])
    sentences.push(["  Hö?  ll-o  W! »lt'", [[2, 3], [4, 4], [7, 8], [9, 9], [10, 10], [13, 13], [14, 14], [16, 16], [17, 18], [19, 19]]])
    sentences.push(["Hallo\nWelt", [[0, 4], [7, 10]]])
    sentences.push(["das \t\t  ist \n\n\nein test", [[0, 2], [10, 12], [20, 22], [24, 27]]])


    sentences.forEach(sentence => {
        const [token, coordinates] = tokenizeSentence(sentence[0])

        console.log("\n")

        console.log("Sentence: " + sentence[0])
        console.log("Token: " + JSON.stringify(token))

        // Checking if we got the correct coordinates
        if (JSON.stringify(coordinates) === JSON.stringify(sentence[1])) {
            console.log("Coorrdinates: " + JSON.stringify(coordinates))
        } else {
            console.log("Expected: " + JSON.stringify(sentence[1]))
            console.log("Actual  : " + JSON.stringify(coordinates))
            throw Error("Coordinates did not match!")
        }

        console.log("\n")
    });
}
