/* eslint-disable no-console */
const cp = require('child_process');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const BACKUP_STASH_NAME = `prepack-tmp-backup-${Date.now()}`;

/**
 * Saving current changes to git stash.
 */
async function saveCurrentChanges() {
    return execGit(`stash push -m ${BACKUP_STASH_NAME} -u`);
}

/**
 * Restoring current changes from git stash if it exists.
 */
async function restoreCurrentChanges() {
    const { stdout } = await execGit('stash list');

    if (stdout.includes(BACKUP_STASH_NAME)) {
        console.log('Restoring current changes from git stash...');
        await execGit(`stash pop --index`);
    }
}

/**
 *
 * @param {String} command
 * @returns Promise<{stdout: String, stderr: String}>
 * @throws Error – if the command fails (stderr is not empty)
 */
function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}

/**
 * Exec project root git command.
 *
 * @example
 * execGit('status --porcelain');
 * execGit('stash list');
 *
 * @param {String} command
 */
function execGit(command) {
    // git executable is located in the root of the project
    // we should run git commands from the project root
    return exec(`git -C ${PROJECT_ROOT} ${command}`);
}

module.exports = {
    saveCurrentChanges,
    restoreCurrentChanges,
    execGit,
    exec,
};
