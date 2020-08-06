const { exec } = require('child_process');

/**
 * Checks if we are under Git version control
 * @returns {Promise<boolean>}
 */
function hasGitRepository(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('git status', (err: any, stdout: any) => {
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
function checkIfRepositoryIsAClone(): Promise<any> {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err: any, stdout: any) => {
      if (err) {
        reject(new Error(err));
      }

      const isClonedRepo = stdout
        .split(/\r?\n/)
        .map((line: string) => line.trim())
        .filter((line: string) => line.startsWith('origin'))
        .filter((line: string) =>
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
    exec('rm -rf .git/', (err: any, stdout: any) => {
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
