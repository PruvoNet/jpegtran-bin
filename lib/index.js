import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import BinWrapper from '@xhmikosr/bin-wrapper';
import { getFilename } from './filename.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/PruvoNet/jpegtran-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/arm64/jpegtran.macho`, 'darwin', 'arm64')
	.src(`${url}macos/x64/jpegtran.macho`, 'darwin', 'x64')
	.src(`${url}linux/arm64/jpegtran.elf`, 'linux', 'arm64')
	.src(`${url}linux/x64/jpegtran.elf`, 'linux', 'x64')
	.src(`${url}win/x64/jpegtran.exe`, 'win32', 'x64')
	.src(`${url}win/x64/libjpeg-62.dll`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(getFilename());

export default binWrapper;