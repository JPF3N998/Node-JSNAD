import os from 'node:os';
import { readdir, mkdir } from 'node:fs/promises';
import { createWriteStream, createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import fibonacci from './utils/fibonacci.js';
import randomPokemon from './utils/randomPokemon.js';
// console.log(fibonacci(0));
// console.log(fibonacci(1));
// console.log(fibonacci(3));
// console.log(fibonacci(5));

// console.log(await randomPokemon());
// console.log(await randomPokemon());
// console.log(await randomPokemon());

// const b = Buffer.from('abba');
// console.log(b);

/**
 * File handling
 *
 * 1. List all files in the `resources/src` dir
 * 2. Duplicate them from `resources/src` to `resources/dst` dir via read and write streams
 */

const RESOURCES_DIR = 'resources/';

/**
 * Returns files from a specified dir path
 */
const ls = async (dirPath) => {
  try {
    const files = await readdir(dirPath);
    return files;
  } catch {
    throw Error('Error listing files');
  }
};

const createDstDir = async (dstDirPath) => {
  try {
    await mkdir(dstDirPath);
  } catch (e) {
    if (e.errno === -17) {
      return;
    }
  }
};

/**
 * Copy specified source file to destination path
 */
const cp = (srcPath, dstPath, file) => {
  try {
    const dstFile = resolve(dstPath, file);
    const srcFile = resolve(srcPath, file);

    const writeStream = createWriteStream(dstFile);
    const readStream = createReadStream(srcFile);

    readStream.pipe(writeStream);
    console.log(`${file} copied successfully.`);
  } catch {
    throw Error('Error copying file');
  }
};

const srcPath = resolve(RESOURCES_DIR, 'src');
const dstPath = resolve(RESOURCES_DIR, 'dst');

// const files = await ls(srcPath);

// createDstDir(resolve('resources', 'dst'));

// files.forEach(file => {
//   cp(srcPath, dstPath, file);
// });

// Buffers
// const b = Buffer.alloc(8);
// console.log(b, b.length);

// b.write('aloha');
// console.log(b);

// console.log(Buffer.from('string'));

// const b2 = Buffer.from([1, 2, 3]);
// console.log(b2);

const {
  platform,
  arch,
  release,
} = os;

const getCPUs = () => {
  const output = [];
  const cpus = os.cpus();
  for (let i = 0; i < cpus.length; i++) {
    const { model, speed } = cpus[i];
    output.push(`Core ${i + 1}: ${model} - ${speed}\n`);
  }
  return output;
};

const sysInfo = `
  platform: ${platform}
  Architecture: ${arch}
  OS: ${release}
  # CPUs: ${'\n' + getCPUs()}
`;

console.log(sysInfo);