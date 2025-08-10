import { splitBySentence } from "string-segmenter"
import * as cheerio from 'cheerio';


// --------------------
// -- Normalize Text --
// --------------------
function normalizeText(text, { observeMultipleLineBreaks = false, removeStartLineSequences = [] } = {}) {
    // Remove specified characters from start of each line
    for (const sequence of removeStartLineSequences) {
        text = text.split('\n')
            .map(line => line.startsWith(sequence) ? line.slice(sequence.length) : line)
            .join('\n');
    }

    if (observeMultipleLineBreaks) {
        // replace a single line (not following a line break) with a space
        text = text.replace(/\n(?!\n)/g, " ").trim();
        //replace two or more line breaks with a single line break
        text = text.replace(/\n\n+/g, "\n").trim();
        // replace multiple white space characters on the same line with a single space
        text = text.replace(/[ \t]+/g, " ");
    } else {
        // replace all whitespace with a single space
        text = text.replace(/\s+/g, " ").trim();
    }
    return text
}

// ------------------
// -- HTML to Text --
// ------------------
function htmlToText(html, {
    listItemPrefix = '- ',
    preserveListItems = true,
    preserveHTMLBreaks = true
} = {}) {
    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    if (preserveHTMLBreaks) {
        // Replace each <br> with a newline character
        $('br').replaceWith('\n');
        // Add newline characters before and after <p> to separate paragraphs
        $('p').before('\n\n').after('\n\n');
    }

    if (preserveListItems) {
        // Add newline characters before and after <ul> and <ol> to separate lists
        $('ul, ol').before('\n\n').after('\n\n');
        // Replace <li> with '- ' followed by the list item text
        $('li').prepend(`\n\n${listItemPrefix}`);
    }

    
    // Extract the text content
    let text = $('div').text();
    
    // If no text is found in <div>, extract from the entire body
    if (!text) {
        text = $.text();
    }
    
    return text;
}


// ---------------------
// -- Parse Sentences --
// ---------------------
export async function parseSentences(text, { 
    observeMultipleLineBreaks = false,
    removeStartLineSequences = [],
    preserveHTMLBreaks = true,
    preserveListItems = true,
    listItemPrefix = '- ',
    excludeNonLetterSentences = false
} = {}) {
    text = htmlToText(text, { preserveHTMLBreaks, preserveListItems, listItemPrefix })
    text = normalizeText(text, { observeMultipleLineBreaks, removeStartLineSequences })
    const sentences = []

    for (const { segment } of splitBySentence(text)) {
        if (excludeNonLetterSentences && segment.match(/^\P{L}*$/u)) continue // skip segments that contain NO letters
        sentences.push(segment.trim())
    }

    return sentences
}
