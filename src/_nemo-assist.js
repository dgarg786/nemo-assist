#!/usr/bin/env node

/**
 * Module dependencies.
 */

'use strict';


var program = require('commander');
var fs = require('fs');
var path = require('path');
const shell = require('shelljs');
const nemoPath = '$(npm bin)/nemo';
const configFilePath = path.resolve(__dirname, './nemo-defaults/config/config.js');
const initFilesPath = path.resolve(__dirname, './init-files/');
const serverPath = path.resolve(__dirname, './server.js');

program
    .version(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version);



program
    .command('run')
    .description('run a particular ft')
    .option('-f, --folderPath <path>', 'path of the base folder', '.')
    .option('-q, --queryString <querystring>', 'queryString matching the params')
    .option('-n, --flowName <flowName>', 'name of the flow')
    .option('-n, --flowName <flowName>', 'name of the flow')
    .action(function(options) {
        process.env.nafolderPath =  path.resolve(process.cwd(), options.folderPath);
        process.env.naflowName = options.flowName;
        shell.exec(`${nemoPath} -C ${configFilePath} -P base`);
    });



program
    .command('gui')
    .description('run a particular ft')
    .option('-f, --folderPath <path>', 'path of the base folder', '.')
    .option('-p, --port <flowName>', 'port no')
    .action(function(options) {
        process.env.nafolderPath =  path.resolve(process.cwd(), options.folderPath);
        process.env.naPORT = options.port || 8081;
        shell.exec(`node ${serverPath}`);
    });



program
    .command('init')
    .description('init nemo-assist')
    .option('-f, --folderPath <path>', 'path of the base folder', '.')
    .action(function(options) {
        let basedirPath = path.resolve(process.cwd(), options.folderPath);
        shell.exec(`cp -r ${initFilesPath} ${basedirPath}`);
    });



program.parse(process.argv);

// if (program.scaffold) {
//     console.log(program.scaffold);
//     console.log(__dirname);
//     console.log(process.cwd());
// }
//
// console.log(process.argv);
//
// if(command) {
//     console.log(command, "yehi");
//     console.log(args, "yehi");
// }