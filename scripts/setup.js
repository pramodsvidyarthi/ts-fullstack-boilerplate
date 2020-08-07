// inspired from react-boilerplate

const fs = require('fs');
const path = require('path');
const { reportError, addCheckMark, endProcess } = require('./utils.js');
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

  process.stdout.write('Removing git repository\n');
  await removeGitRepository().catch((reason) => reportError(reason));
  addCheckMark(() => process.stderr.write(` Removed git repo\n`));
}

/**
 * removes the setup script from the package.json file
 */
function removeSetupScriptFromPackageJson() {
  const file = path.join(__dirname, 'package.json');
  process.stdout.write(` Removing setup script from ${file}\n`);
  try {
    // read and parse package.json
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    // edit the json
    delete json.scripts.setup;
    //write file
    fs.writeFileSync(file, JSON.stringify(json, null, 2));
    addCheckMark(() =>
      process.stderr.write(` Removed setup script from ${file}\n`),
    );
  } catch (error) {
    reportError(new Error(error));
  }
}

/**
 * recuresively delete the scripts directory and its content
 */

function removeScriptsFolder() {
  const dir = path.join(__dirname, 'scripts');
  process.stderr.write(` Removing ${dir} directory\n`);
  try {
    fs.rmdirSync(dir, { recursive: true });
    addCheckMark(() => process.stderr.write(` Removed ${dir} directory\n`));
  } catch (error) {
    reportError(new Error(error));
  }
}

(async () => {
  await cleanGitRepository();
  removeSetupScriptFromPackageJson();
  removeScriptsFolder();
  endProcess();
})();

// the script in package.json if the ts-node can be run via npx command but it requires typescript as well
// using the -p flag with npx does not help so changing all files to .js and running using node in the script
// "setup": "ts-node  -O \"{\\\"module\\\": \\\"commonjs\\\"}\" scripts/setup.ts"
