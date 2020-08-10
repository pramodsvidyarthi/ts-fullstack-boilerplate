// inspired from react-boilerplate

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const {
  reportError,
  addTickMark,
  endProcess,
  addLoadingMark,
} = require('./utils.js');
const {
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
} = require('./git-utils');

/**
 * Checks if we are under Git version control.
 * If we are and this a clone of our repository the user is given a choice to
 * either keep it or start with a new repository.
 * @returns {Promise<boolean>}
 */
async function cleanGitRepository() {
  const hasGitRepo = await hasGitRepository().catch((reason) =>
    reportError(reason),
  );

  // We are not under Git version control. So, do nothing
  if (hasGitRepo === false) {
    return false;
  }

  const isClone = await checkIfRepositoryIsAClone().catch((reason) =>
    reportError(reason),
  );

  // Not our clone so do nothing
  if (isClone === false) {
    return false;
  }

  addLoadingMark(() => process.stdout.write(' Removing git repository\n'));
  await removeGitRepository().catch((reason) => reportError(reason));
  addTickMark(() => process.stderr.write(' Removed git repo\n'));
}

/**
 * removes the setup script from the package.json file
 */
function removeSetupScriptFromPackageJson() {
  const file = path.join(__dirname, '../package.json');
  addLoadingMark(() =>
    process.stdout.write(` Removing setup script from package.json\n`),
  );
  return new Promise((resolve, reject) => {
    // read and parse package.json
    fs.readFile(file, 'utf8', (readErr, data) => {
      if (readErr) {
        reject(new Error(readErr));
      }
      // edit the json
      const json = JSON.parse(data);
      delete json.scripts.setup;
      //write file
      fs.writeFile(file, JSON.stringify(json, null, 2), (writeError) => {
        if (writeError) {
          reject(new Error(writeError));
        }
        addTickMark(() =>
          process.stderr.write(` Removed setup script from ${file}\n`),
        );
        resolve();
      });
    });
  });
}

/**
 * recuresively delete the scripts directory and its content
 */

function removeScriptsFolder() {
  const dir = path.join(__dirname, '../scripts');
  addLoadingMark(() => process.stdout.write(` Removing scripts directory\n`));
  return new Promise((resolve, reject) => {
    exec(`rm -rf ${dir}`, (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }
      addTickMark(() => process.stderr.write(` Removed ${dir} directory\n`));
      resolve(stdout);
    });
  });
}

(async () => {
  await cleanGitRepository();
  await removeSetupScriptFromPackageJson().catch((reason) =>
    reportError(reason),
  );
  await removeScriptsFolder().catch((reason) => reportError(reason));
  endProcess();
})();

// the script in package.json if the ts-node can be run via npx command but it requires typescript as well
// using the -p flag with npx does not help so changing all files to .js and running using node in the script
// "setup": "ts-node  -O \"{\\\"module\\\": \\\"commonjs\\\"}\" scripts/setup.ts"
