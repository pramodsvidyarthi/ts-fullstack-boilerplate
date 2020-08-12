// inspired from react-boilerplate

const path = require('path');
const { exec } = require('child_process');
const {
  reportError,
  addTickMark,
  endProcess,
  addLoadingMark,
  readFile,
  writeFile,
  removeDirectory,
} = require('./utils.js');
const {
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
} = require('./git-utils');

/**
 * Checks if we are under Git version control.
 * @returns {Promise}
 */
async function cleanGitRepository() {
  const hasGitRepo = await hasGitRepository().catch(reportError);

  // We are not under Git version control. So, do nothing
  if (hasGitRepo === false) {
    return false;
  }

  const isClone = await checkIfRepositoryIsAClone().catch(reportError);

  // Not our clone so do nothing
  if (isClone === false) {
    return false;
  }

  addLoadingMark(() => process.stdout.write(' Removing git repository\n'));
  await removeGitRepository().catch(reportError);
  addTickMark(() => process.stderr.write(' Removed git repo\n'));
}

/**
 * removes the setup script from the package.json file
 * @returns {Promise}
 */
async function removeSetupScriptFromPackageJson() {
  const filePath = path.join(__dirname, '../package.json');
  addLoadingMark(() =>
    process.stdout.write(` Removing setup script from package.json\n`),
  );
  const content = await readFile(filePath).catch(reportError);
  const packageJSON = JSON.parse(content);
  delete packageJSON.scripts.setup;
  await writeFile(filePath, JSON.stringify(packageJSON)).catch(reportError);
  addTickMark(() =>
    process.stderr.write(' Removed setup script from package.json\n'),
  );
}

/**
 *  delete the scripts directory and its content
 */
async function removeScriptsFolder() {
  const dirPath = path.join(__dirname, '../scripts');
  addLoadingMark(() => process.stdout.write(` Removing scripts directory\n`));
  await removeDirectory(dirPath).catch(reportError);
  addTickMark(() => process.stderr.write(` Removed scripts directory\n`));
}

/**
 * install dependencies
 * @returns {Promise<any>}
 */
function installDependencies() {
  return new Promise((resolve, reject) => {
    addLoadingMark(() =>
      process.stdout.write(' Installing project dependencies...\n'),
    );

    // using npm over yarn
    exec('npm install', (err) => {
      if (err) {
        reject(new Error(err));
      }

      addTickMark(() => process.stdout.write(' Dependencies installed\n'));
      resolve();
    });
  });
}

(async () => {
  await cleanGitRepository();
  await installDependencies().catch(reportError);
  await removeSetupScriptFromPackageJson();
  await removeScriptsFolder();
  endProcess();
})();

// the script in package.json if the ts-node can be run via npx command but it requires typescript as well
// using the -p flag with npx does not help so changing all files to .js and running using node in the script
// "setup": "ts-node  -O \"{\\\"module\\\": \\\"commonjs\\\"}\" scripts/setup.ts"
