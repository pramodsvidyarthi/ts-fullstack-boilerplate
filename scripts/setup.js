// inspired from react-boilerplate

const fs = require('fs');
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
async function cleanCurrentRepository() {
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

  process.stdout.write('Removing git repository');
  await removeGitRepository().catch((reason) => reportError(reason));
  addCheckMark(() => process.stderr.write(` remved git repo\n`));
}

function removeSetupScriptFromPackageJson() {
  try {
    // read and parse package.json
    const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    // edit the json
    delete json.scripts.setup;
    //write file
    fs.writeFileSync('package.json', JSON.stringify(json, null, 2));
  } catch (error) {
    reportError(new Error(error));
  }
}

(async () => {
  await cleanCurrentRepository();
  removeSetupScriptFromPackageJson();
  endProcess();
})();

// the script in package.json if the ts-node can be run via npx command but it requires typescript as well
// using the -p flag with npx does not help so changing all files to .js and running using node in the script
// "setup": "ts-node  -O \"{\\\"module\\\": \\\"commonjs\\\"}\" scripts/setup.ts"
