# 📄 Sentence Parse
A simple utility to parse text into sentences.

![sentence-parse](https://raw.githubusercontent.com/jparkerweb/sentence-parse/refs/heads/main/docs/sentence-parse.jpg)

## Installation

```bash
npm install sentence-parse
```

## Usage

The parser can be used to split text into sentences with various options. Here's a basic example:

```javascript
import { parseSentences } from 'sentence-parse';

// Parse from string
const text = "Hello world! This is a test.";
const sentences = await parseSentences(text);
console.log(sentences);
// Output: ["Hello world!", "This is a test."]

// Parse from file
import { readFile } from 'fs/promises';
import { join } from 'path';

const fileText = await readFile(join(process.cwd(), 'text-file.txt'), 'utf8');
const fileSentences = await parseSentences(fileText);
console.log(fileSentences);
```

### Options

- **observeMultipleLineBreaks**: Treats two or more consecutive line breaks as separate sentences. Default is `false`.
- **removeStartLineSequences**: Removes specified sequences at the start of each line. Default is an empty array `[]`.
- **preserveHTMLBreaks**: Preserves HTML `<br>` and `<p>` tags as line breaks in the text. Default is `true`.
- **preserveListItems**: Preserves list items by adding a prefix to each `<li>` element. Default is `true`.
- **listItemPrefix**: Specifies the prefix to use for list items when `preserveListItems` is `true`. Default is `'- '`.
- **excludeNonLetterSentences**: Excludes segments that contain no letters (only numbers, symbols, etc). Default is `false`.

## Examples

### Using observeMultipleLineBreaks
```javascript
import { parseSentences } from 'sentence-parse';

const text = "Hello world!\n\nThis is a test.";
const sentences = await parseSentences(text, { observeMultipleLineBreaks: true });
console.log(sentences);
// Output: ["Hello world!", "This is a test."]
```

### Using removeStartLineSequences
```javascript
import { parseSentences } from 'sentence-parse';

const text = "> Hello world!\n> This is a test.";
const sentences = await parseSentences(text, { removeStartLineSequences: ['>'] });
console.log(sentences);
// Output: ["Hello world!", "This is a test."]
```

### Using HTML Options
```javascript
import { parseSentences } from 'sentence-parse';

const htmlText = `
<p>Hello world!<br>This is a test.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
`;

const sentences = await parseSentences(htmlText, {
  preserveHTMLBreaks: true,
  preserveListItems: true,
  listItemPrefix: '* '
});

console.log(sentences);
// Output: ["Hello world!", "This is a test.", "* First item", "* Second item"]
```

### Using excludeNonLetterSentences
```javascript
import { parseSentences } from 'sentence-parse';

const text = "Hello world! $4,000,000. This is a test.";
const sentences = await parseSentences(text, { excludeNonLetterSentences: true });
console.log(sentences);
// Output: ["Hello world!", "This is a test."]
```

## Example

Check out `example/example.js` for a working example that parses sentences from a text file.

Run the example:
```bash
cd example
node example
```
