const path = require('path');
const fs = require('fs');
const basePath = process.env.nafolderPath || '../example';
const naflowName = process.env.naflowName;
const isEmpty = require('lodash/isEmpty');

const flowsPath = path.resolve(basePath, 'flows');

const plugins = {
    'view': {
        'module': 'nemo-view',
        'arguments': [path.resolve(basePath, 'locator')]
    }
};
const baseProfile = {
    'tests': path.resolve(__dirname, '../run.js'),
    'parallel': 'data',
    'driver': {
        'browser': process.env.TARGET_BROWSER || 'chrome',
        'server': process.env.TARGET_SERVER,
        'builders': {
            'withCapabilities': [{
                'browserName': process.env.TARGET_BROWSER || 'chrome',
                'chromeOptions': {
                    'args': ['window-size=1200,800']
                }
            }]
        }
    },
    'data': {},
    'mocha': {
        'timeout': 180000,
        'reporter': 'mochawesome',
        'retries': process.env.RETRIES || 2,
        'reporterOptions': {
            'output': true
        }
    },
    'maxConcurrent': process.env.MAX_CONCURRENT || 3
};
let nemoRunnerConfig = {
    'plugins': plugins,
    'output': {
        'reports':  path.resolve(basePath, 'report')
    },
    'profiles': {
        'base': baseProfile
    }
};
const getFileName = (filePath) => {
    let fileName = filePath.split('/').pop();
    let fileNameParts = fileName.split('.');
    fileNameParts.pop();
    return fileNameParts.join('.');
};
const readJsonFile = (filePath) => {
    try {
        return require(filePath);
    }
    catch (ex){
        return;
    }
};

const regexMatch = (matchExp, val) => {
    console.log(val);
    return (matchExp === val)
};

const flowFilter = (flowConfig) => {
    if(naflowName) {
        return regexMatch(naflowName, flowConfig.name);
    }
};

let dirContents =  fs.readdirSync(flowsPath) || [];
let subDirs = dirContents.filter((cont)=> (fs.lstatSync(path.resolve(flowsPath, cont)).isDirectory()));
subDirs.forEach((subDir) => {
    const dirPath = path.resolve(flowsPath, subDir);
    const profile = { [subDir]: {
        data: {}
    }};

    (fs.readdirSync(dirPath) || []).filter((cont)=> (fs.lstatSync(path.resolve(dirPath, cont)).isFile())).forEach((file) => {
        const fileContents = readJsonFile(path.resolve(dirPath, file));
        if(fileContents) {
            profile[subDir].data = { ...profile[subDir].data, [getFileName(file)]: fileContents}
        }
    });
    if(!isEmpty(profile[subDir].data)) {
        nemoRunnerConfig.profiles = { ...nemoRunnerConfig.profiles, ...profile};
    }
});

let subFiles = dirContents.filter((cont)=> (fs.lstatSync(path.resolve(flowsPath, cont)).isFile()));

console.log("subfiles", subFiles);
subFiles.forEach((file)=> {
    const fileContents = readJsonFile(path.resolve(flowsPath, file));
    console.log("subfiles1", fileContents);
    console.log("subfiles2", naflowName);
    if(fileContents && flowFilter(fileContents)) {
        nemoRunnerConfig.profiles.base.data = { ...nemoRunnerConfig.profiles.base.data, [getFileName(file)]: fileContents};
    }
});

console.log(nemoRunnerConfig.profiles);


console.log("yehi h ", nemoRunnerConfig);

module.exports = nemoRunnerConfig;
