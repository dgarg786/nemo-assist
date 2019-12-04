const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const open = require('open');
const app = express();
const fs = require('fs');
const shell = require('shelljs');
const nemoPath = '$(npm bin)/nemo';
const configFilePath = path.resolve(__dirname, './nemo-defaults/config/config.js');
const legoDefaults = require('./nemo-defaults/lego-config.json');
const baseDirPath = require('./constants/baseDirPath');

function requireUncached(module){
    delete require.cache[require.resolve(module)];
    return require(module)
}

const readJsonFile = function (filePath) {
    try {
        return requireUncached(filePath);
    } catch (ex) {
        return;
    }
};

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/ping', function(req, res) {
    return res.send('pong');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/edit/:structureType/:structureId', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.get('/create/:structureType', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/run/ft', function(req, res) {
    fs.writeFileSync(path.resolve(__dirname, baseDirPath, 'flows/nemo-assist-test/test.json'), JSON.stringify(req.body));

    shell.exec(`${nemoPath} -C ${configFilePath} -P nemo-assist-test`);
    res.status(200).end(JSON.stringify());
});

app.post('/save/block', function(req, res) {
    fs.writeFileSync(path.resolve(__dirname, baseDirPath, 'blocks', `${req.body.name}.json`), JSON.stringify(req.body));
    res.status(200).end(JSON.stringify({ success: true }));
});

app.post('/save/flow', function(req, res) {
    fs.writeFileSync(path.resolve(__dirname, baseDirPath, 'flows', `${req.body.name}.json`), JSON.stringify(req.body));
    res.status(200).end(JSON.stringify({ success: true }));
});

app.get('/blocks', function(req, res) {
    let blockPath = path.resolve(__dirname, baseDirPath, 'blocks');
    let blockDirContents = fs.readdirSync(blockPath) || [];
    let blockFiles = blockDirContents.filter(cont => fs.lstatSync(path.resolve(blockPath, cont)).isFile());
    let blockFilesData = blockFiles.map(file => {
        const fileContents = readJsonFile(path.resolve(blockPath, file));
        if (fileContents) {
            return fileContents;
        }
    });
    return res.status(200).end(JSON.stringify(blockFilesData));
});


app.get('/flows', function(req, res) {
    let flowPath = path.resolve(__dirname, baseDirPath, 'flows');
    let flowDirContents = fs.readdirSync(flowPath) || [];
    let flowFiles = flowDirContents.filter(cont => fs.lstatSync(path.resolve(flowPath, cont)).isFile());
    let flowFilesData = flowFiles.map(file => {
        const fileContents = readJsonFile(path.resolve(flowPath, file));
        if (fileContents) {
            return fileContents;
        }
    });
    return res.status(200).end(JSON.stringify(flowFilesData));
});






app.get('/legos', function(req, res) {
    let legoPath = path.resolve(__dirname, baseDirPath, 'legos');
    let legoConfig = readJsonFile(path.resolve(legoPath, 'index.json'))
    if(!Array.isArray(legoConfig)) { legoConfig = [];}
    legoConfig = legoConfig.concat(legoDefaults);
    return res.status(200).end(JSON.stringify(legoConfig));
});

app.get('/block/:blockId', function(req, res) {
    let blockFilePath = path.resolve(__dirname, baseDirPath, 'blocks', `${req.params.blockId}.json`);
    let blockValue = readJsonFile(blockFilePath);
    if(blockValue) {
        return res.status(200).end(JSON.stringify(blockValue));
    }
    return res.status(404).end();
});


app.get('/flow/:flowId', function(req, res) {
    let flowFilePath = path.resolve(__dirname, baseDirPath, 'flows', `${req.params.flowId}.json`);
    let flowValue = readJsonFile(flowFilePath);
    if(flowValue) {
        return res.status(200).end(JSON.stringify(flowValue));
    }
    return res.status(404).end();
});

app.post('/delete/block/:blockId', function(req, res) {
    console.log(req.params.blockId);
    let blockFilePath = path.resolve(__dirname, baseDirPath, 'blocks', `${req.params.blockId}.json`);
    try {
        fs.unlinkSync(blockFilePath);
    }  catch (e) {
        return res.status(404).end();
    }
    return res.status(200).end();
});

app.listen((process.env.naPORT) || 8081, () => {
    console.log("The app is running at:");
    console.log(`http://localhost:${process.env.naPORT || 8081}/`)
    open(`http://localhost:${process.env.naPORT}/`)
});
