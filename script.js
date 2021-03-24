
test()

function tokenizeSentence(sentence) {

    // Sentence split into words
    let splited = sentence.split(" ")

    // Storing token as well as their coordinates relative to the sentece start
    let token = []
    let sentenceTokenCoordinates = []

    // Counts the amount of characters
    let currentCharacterCoordinate = 0
    let lastWordEnd = 0

    // Adding all words
    for (let currentWordID = 0; currentWordID < splited.length; currentWordID++) {

        let currentWord = splited[currentWordID]
        let currentWordResult = ""

        // Skipping empty words
        if(currentWord === "") {
            currentCharacterCoordinate++
            continue
        }

    
        // Default coordinates for word are it's start and end
        sentenceTokenCoordinates.push([currentCharacterCoordinate, currentCharacterCoordinate + currentWord.length - 1])

        // Seperating punctuation
        for (let currentCharacter = 0; currentCharacter < currentWord.length; currentCharacter++) {

            currentCharacterCoordinate++

            // Splitting if the current char is not a letter or a number
            if (checkIfCharIsPunctuation(currentWord[currentCharacter])) {
                currentWordResult += " "
                currentWordResult += currentWord[currentCharacter]
                currentWordResult += " "

                // Making the last coordinate short by one
                sentenceTokenCoordinates[sentenceTokenCoordinates.length - 1][1] = lastWordEnd

                // Adding coordinates of punctuation
                let currentCharTokenCoordinates = [currentCharacterCoordinate - 1, currentCharacterCoordinate - 1]
                sentenceTokenCoordinates.push(currentCharTokenCoordinates)

            } else {
                currentWordResult += currentWord[currentCharacter]
            }

        }

        currentCharacterCoordinate++

        // Adding the current word to the result
        token = token.concat(currentWordResult.split(" ").filter(Boolean))

        // console.log("Coordinates: %o", currentWordCoordinates)

        //sentenceTokenCoordinates.push(currentWordCoordinates)
        
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
    sentences.push(["Hallo (?)  Welt!", [[0, 4], [6, 6], [7, 7], [8, 8], [11, 15], [15, 15]]])
    sentences.push([" Hö?  ll-o  W! »lt'", [[2, 3], [4, 4], [7, 8], [9, 9], [10, 10], [13, 13], [14, 14], [16, 16], [17, 18], [19, 19]]])
    sentences.push(["Hallo\nWelt", [0, 4], [7, 10]])
    sentences.push(["das \t\t  ist \n\n\nein test", [0, 2], [10, 12], [20, 22], [24, 27]])
    
    
    sentences.forEach(sentence => {
        const [token, coordinates] = tokenizeSentence(sentence[0])

        console.log("\n\n")

        console.log("Sentence: " + sentence[0])
        console.log("Token: " + JSON.stringify(token))

        // Checking if we got the correct coordinates
        if (JSON.stringify(coordinates) === JSON.stringify(sentence[1])) {
            console.log("Coorrdinates: " + JSON.stringify(coordinates))
        } else {
            console.log("Expected: " + JSON.stringify(sentence[1]))
            console.log("Actual  : " + JSON.stringify(coordinates))
        }

        console.log("\n\n")
    });
}
