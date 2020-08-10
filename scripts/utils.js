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

module.exports = {
  addLoadingMark,
  addTickMark,
  addCrossMark,
  endProcess,
  reportError,
};
