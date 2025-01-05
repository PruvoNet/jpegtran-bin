'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('./index.js');
const fs = require('node:fs');

(async () => {
	const args = [
		'-copy',
		'none',
		'-optimize',
		'-outfile',
		path.join(__dirname, '../test/fixtures/test-optimized.jpg'),
		path.join(__dirname, '../test/fixtures/test.jpg'),
	];

	try {
		await bin.run(args)
		console.log('jpegtran pre-build test passed successfully');
	} catch (error) {
		console.warn(error.message);
		console.warn('jpegtran pre-build test failed');
		console.info('compiling from source');
	
		const cfg = [
			'./configure --disable-shared',
			`--prefix="${bin.dest()}/temp" --bindir="${bin.dest()}/temp"`,
		].join(' ');
	
		try {
			const source = path.join(__dirname, '../vendor/source/libjpeg-turbo-1.5.1.tar.gz');
			await binBuild.file(source, [
				'touch configure.ac aclocal.m4 configure Makefile.am Makefile.in',
				cfg,
				'make install',
			]);
			fs.renameSync(`${bin.dest()}/temp/jpegtran`, bin.path());
			console.log('jpegtran built successfully');
		} catch (error) {
			console.error(error.stack);
	
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}
})();
