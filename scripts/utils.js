/**
 * Adds mark tick symbol
 */
function addCheckMark(callback?: Function) {
  process.stdout.write(' ✅');
  if (callback) callback();
}

/**
 * Adds mark cross symbol
 */
function addXMark(callback: Function) {
  process.stdout.write(' ❌');
  if (callback) callback();
}

/**
 * End the setup process
 */
function endProcess() {
  addCheckMark(() => process.stdout.write(' Done!\n'));
  process.exit(0);
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
function reportError(error?: string | Error) {
  if (error) {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(` ${error}\n`));
    process.exit(1);
  }
}

module.exports = {
  addCheckMark,
  addXMark,
  endProcess,
  reportError,
};
