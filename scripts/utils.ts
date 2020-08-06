/**
 * Adds mark tick symbol
 */
export function addCheckMark(callback?: Function) {
  process.stdout.write(' ✅');
  if (callback) callback();
}

/**
 * Adds mark cross symbol
 */
export function addXMark(callback: Function) {
  process.stdout.write(' ❌');
  if (callback) callback();
}

/**
 * End the setup process
 */
export function endProcess() {
  addCheckMark(() => process.stdout.write(' Done!\n'));
  process.exit(0);
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
export function reportError(error?: string | Error) {
  if (error) {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(` ${error}\n`));
    process.exit(1);
  }
}
