/* eslint-disable no-console */
const { restoreCurrentChanges, execGit } = require('./_shared');

async function main() {
    // discard all changes after prepack
    console.log('Discarding all changes after prepack...');
    await execGit('reset --hard');
    await execGit('clean -fd');

    console.log('Restoring current changes from git stash...');
    // restore changes before prepack if any
    await restoreCurrentChanges();
}

main();
