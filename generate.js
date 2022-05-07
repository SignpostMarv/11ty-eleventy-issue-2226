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

function video_object() {
    if (Math.random() > .2) {
        return null;
    }

    const name = lipsum.generateWords(1 + Math.floor(Math.random() * 5));
    const description_count = 1 + Math.floor(Math.random() * 5);
    const description = lipsum.generateParagraphs(description_count);
    const thumbnailUrl = `https://example.com/${uuid()}`;
    const contentUrl = `https://example.com/${uuid()}`;
    const url_count = 1 + Math.floor(Math.random() * 5);
    const url = lipsum.generateWords(url_count).split(' ');
    const uploadDate = (new Date(Date.now() * Math.random())).toISOString();

    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name,
        description,
        thumbnailUrl,
        contentUrl,
        url,
        uploadDate,
    };
}

function parts() {
    if (Math.random() > .2) {
        return false;
    }

    const count = 1 + Math.floor(Math.random() * 10);
    const header = 1 + Math.floor(Math.random() * 10);

    return [
        lipsum.generateWords(header),
        arr(count, () => {
            return [
                lipsum.generateWords(1 + Math.floor(Math.random() * 3)),
                uuid(),
            ];
        })
    ];
}

function arr(limit, cb) {
    let i = 0;
    const arr = [];

    while (i < limit) {
        arr.push(cb());
        ++i;
    }

    return arr;
}

for (let i=0; i< count; ++i) {
    const text_count = 1 + Math.floor(Math.random() * 5);

    const id = uuid();
    const url = `https://example.com/${uuid()}`;
    const date = (new Date(Date.now() * Math.random()));
    const dateTitle = `${date.toLocaleString()} ${lipsum.generateWords()}`;
    const description_count = 1 + Math.floor(Math.random() * 5);
    const description = lipsum.generateParagraphs(description_count);
    const transcript = lipsum.generateParagraphs(text_count).split('. ');

    data[id] = {
        id,
        url,
        date,
        dateTitle,
        description,
        topics: arr(Math.random() * 10, () => uuid()),
        other_parts: parts(),
        is_replaced: false,
        is_duplicate: false,
        has_duplicates: parts(),
        seealsos: parts(),
        transcript,
        like_count: Math.floor(Math.random() * 1000),
        video_object: video_object(),
    };
}

writeFileSync(
    `${__dirname}/11ty/data/test.json`,
    JSON.stringify(Object.values(data), null, '\t')
);

console.log(`${Object.keys(data).length} written`);
