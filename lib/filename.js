import process from 'node:process';

const FILENAME_LIST = {
	darwin: 'jpegtran.macho',
	linux: 'jpegtran.elf',
	win32: 'jpegtran.exe',
};

export const getFilename = () => {
	const filename = FILENAME_LIST[process.platform];
	if (!filename) {
		throw new Error('Unsupported platform');
	}

	return filename;
};
