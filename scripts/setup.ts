// inspired from react-boilerplate

import fs from 'fs';
import { reportError, addCheckMark, endProcess } from './utils';
import {
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
} from './git-utils';

/**
 * Checks if we are under Git version control.
 * If we are and this a clone of our repository the user is given a choice to
 * either keep it or start with a new repository.
 * @returns {Promise<boolean>}
 */
async function cleanCurrentRepository(): Promise<boolean> {
  const hasGitRepo = await hasGitRepository().catch((reason: Error) =>
    reportError(reason),
  );

  // We are not under Git version control. So, do nothing
  if (hasGitRepo === false) {
    return false;
  }

  const isClone = await checkIfRepositoryIsAClone().catch((reason: Error) =>
    reportError(reason),
  );

  // Not our clone so do nothing
  if (isClone === false) {
    return false;
  }

  process.stdout.write('Removing git repository');
  await removeGitRepository().catch((reason: Error) => reportError(reason));
  addCheckMark(() => process.stderr.write(` remved git repo\n`));
}

function removeSetupScriptFromPackageJson() {
  try {
    // read and parse package.json
    const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    // edit the json
    delete json.scripts.setup;
    //write file
    fs.writeFileSync('file.json', JSON.stringify(json, null, 2));
  } catch (error) {
    reportError(new Error(error));
  }
}

/**
 * Run
 */
(async () => {
  await cleanCurrentRepository();
  removeSetupScriptFromPackageJson();
  endProcess();
})();
