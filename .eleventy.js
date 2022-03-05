const {createHash} = require('crypto');
const {readFileSync} = require('fs');
const {version} = require('@11ty/eleventy/package.json');

const file = readFileSync(`${__dirname}/11ty/data/test.json`);

const file_hash = createHash('sha256');
file_hash.update(file);

module.exports = (config) => {
    return {
        dir: {
            data: '../data/',
            input: './11ty/pages/',
            output: `./output/${version}/${JSON.parse(file).length}/${file_hash.digest('hex')}`,
        },
    };
};
