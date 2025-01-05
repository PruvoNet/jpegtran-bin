'use strict';
const { getFilename } = require('./filename.js');
const path = require('path');
const BinWrapper = require('bin-wrapper');
const packageJson = require('../package.json');
const url = `https://raw.githubusercontent.com/PruvoNet/jpegtran-bin/v${packageJson.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}macos/arm64/jpegtran.macho`, 'darwin', 'arm64')
	.src(`${url}macos/x64/jpegtran.macho`, 'darwin', 'x64')
	.src(`${url}linux/arm64/jpegtran.elf`, 'linux', 'arm64')
	.src(`${url}linux/x64/jpegtran.elf`, 'linux', 'x64')
	.src(`${url}win/x64/jpegtran.exe`, 'win32', 'x64')
	.src(`${url}win/x64/libjpeg-62.dll`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(getFilename());