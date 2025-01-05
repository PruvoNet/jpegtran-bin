'use strict';
const process = require('node:process');

const FILENAME_LIST = {
	darwin: 'jpegtran.macho',
	linux: 'jpegtran.elf',
	win32: 'jpegtran.exe',
};

const getFilename = () => {
	const filename = FILENAME_LIST[process.platform];
	if (!filename) {
		throw new Error('Unsupported platform');
	}

	return filename;
};

module.exports = {
	getFilename,
};