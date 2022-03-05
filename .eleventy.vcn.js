const {version} = require('@11ty/eleventy/package.json');

module.exports = (config) => {
    return {
        dir: {
            includes: '../../includes/',
            layouts: '../../layouts/',
            input: './11ty/video-clip-notes/docs/',
            output: `./video-clip-notes/${version}/`,
        },
    };
};
