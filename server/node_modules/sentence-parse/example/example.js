import { parseSentences } from "../sentenceParse.js"
import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get directory name regardless of how script is run
const __dirname = dirname(fileURLToPath(import.meta.url))

// Read the text file
const text = await readFile(join(__dirname, 'example-text.txt'), 'utf8')

const sentences = await parseSentences(text, { 
    observeMultipleLineBreaks: true,
    removeStartLineSequences: ['>'],
    preserveListItems: true,
    listItemPrefix: '- ',
    preserveHTMLBreaks: true,
    excludeNonLetterSentences: true
})

for (const [index, sentence] of sentences.entries()) {
    console.log(index + 1, sentence)
}
