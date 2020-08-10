const fs = require('fs');
const { exec } = require('child_process');
/**
 * Adds mark tick symbol
 */
function addTickMark(callback) {
  process.stdout.write(' ✅');
  if (callback) callback();
}

/**
 * Adds mark cross symbol
 */
function addCrossMark(callback) {
  process.stdout.write(' ❌');
  if (callback) callback();
}

/**
 * Adds mark cross symbol
 */
function addLoadingMark(callback) {
  process.stdout.write(' ⏳');
  if (callback) callback();
}

/**
 * End the setup process
 */
function endProcess() {
  addTickMark(() => process.stdout.write(' Done!\n'));
  process.exit(0);
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
function reportError(error) {
  if (error) {
    process.stdout.write('\n\n');
    addCrossMark(() => process.stderr.write(` ${error}\n`));
    process.exit(1);
  }
}

/**
 *
 * Reads a file from the given path
 * @param {string} path
 * @returns Promise<any>
 */
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (readErr, data) => {
      if (readErr) {
        reject(new Error(readErr));
      }
      resolve(data);
    });
  });
}

/**
 * Write to the path the contents provided
 *
 * @param {String} path
 * @param {any} data
 * @returns Promise<any>
 */
function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (writeError) => {
      if (writeError) {
        reject(new Error(writeError));
      }
      resolve();
    });
  });
}

/**
 * delete a directory from a given path
 *
 * @param {String} path
 * @returns Promise<any>
 */
function removeDirectory(path) {
  return new Promise((resolve, reject) => {
    exec(`rm -rf ${path}`, (err) => {
      if (err) {
        reject(new Error(err));
      }
      resolve();
    });
  });
}

module.exports = {
  addLoadingMark,
  addTickMark,
  addCrossMark,
  endProcess,
  reportError,
  readFile,
  writeFile,
  removeDirectory,
};
