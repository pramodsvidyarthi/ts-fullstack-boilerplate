const { exec } = require('child_process');

/**
 * Checks if we are under Git version control
 * @returns {Promise<boolean>}
 */
function hasGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git status', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }

      const regex = new RegExp(/fatal:\s+Not\s+a\s+git\s+repository/, 'i');

      /* eslint-disable-next-line no-unused-expressions */
      regex.test(stdout) ? resolve(false) : resolve(true);
    });
  });
}

/**
 * Checks if this is a clone from our repo
 * @returns {Promise<any>}
 */
function checkIfRepositoryIsAClone() {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }

      const isClonedRepo = stdout
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('origin'))
        .filter((line) =>
          /pramodsvidyarthi\/ts-fullstack-boilerplate\.git/.test(line),
        ).length;

      resolve(!!isClonedRepo);
    });
  });
}

/**
 * Remove the current Git repository
 * @returns {Promise<any>}
 */
function removeGitRepository() {
  return new Promise((resolve, reject) => {
    exec('rm -rf .git/', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
};
