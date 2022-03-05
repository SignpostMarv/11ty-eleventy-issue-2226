const {LoremIpsum} = require('lorem-ipsum');
const {v4:uuid} = require('uuid');
const {writeFileSync} = require('fs');

const lipsum = new LoremIpsum({
    sentencesPerParagraph: {
        min: 1,
        max: 8,
    },
    wordsPerSentence: {
        min: 1,
        max: 32,
    },
});

const [,,maybe] = process.argv;

const count = Math.max(1, maybe && /^\d+$/.test(maybe) ? parseInt(maybe, 10) : 1);

const data = {};

for (let i=0; i< count; ++i) {
    const id = uuid();
    data[id] = {
        id,
        text: lipsum.generateParagraphs(1 + Math.floor(Math.random() * 5)),
    };
}

writeFileSync(
    `${__dirname}/11ty/data/test.json`,
    JSON.stringify(Object.values(data), null, '\t')
);

console.log(`${Object.keys(data).length} written`);
