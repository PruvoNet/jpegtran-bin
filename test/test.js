import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {temporaryDirectory} from 'tempy';
import jpegtran from '../index.js';

test('binary runs (responds to -h)', t => {
	// jpegtran has no exit-0 version flag; `-h` prints usage and exits 1
	// on every libjpeg-turbo build — but only after the process has
	// successfully loaded, which is the thing we want to verify.
	const result = spawnSync(jpegtran, ['-h'], {encoding: 'utf8'});
	t.not(result.status, null);
	t.is(result.signal, null);
	t.regex((result.stderr || '') + (result.stdout || ''), /usage|jpegtran|options/i);
});

test('minifies a jpg', t => {
	const tmp = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.jpg', import.meta.url));
	const dst = path.join(tmp, 'test.jpg');

	const result = spawnSync(jpegtran, ['-copy', 'none', '-optimize', '-outfile', dst, src]);
	t.is(result.status, 0);

	const srcSize = fs.statSync(src).size;
	const dstSize = fs.statSync(dst).size;
	t.true(dstSize < srcSize, `expected ${dstSize} < ${srcSize}`);
});
