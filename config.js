let dir = __dirname;

const config = {
    libraryName: 'Shono',
    entryFile: dir + '/src/Shono.js',
    output: {
        filename: 'shono.js',
        dest: dir + '/dest/'
    },
    paths: {
        'js': dir + '/src/*.js'
    }
};

export default config;
