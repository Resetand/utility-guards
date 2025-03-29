 
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const cp = require('child_process');
const groupBy = require('lodash.groupby');

const { glob } = require('glob');

const TMP_DIR = path.join(os.tmpdir(), `npm-pack-${Date.now()}`);
const PROJECT_ROOT = path.resolve(__dirname, '..');

async function main(buildDirName = 'lib') {
    await copyPackageFilesToTmp();

    const buildFiles = await glob(`${buildDirName}/**/*`, { cwd: '.' });
    await copyToTmp(...buildFiles);

    await extendsPackageJson(path.join(TMP_DIR, 'package.json'), buildFiles);

    // run npm pack command
    await exec(`npm pack ${TMP_DIR} --pack-destination ${PROJECT_ROOT}`);
}

/**
 * Copy package files to tmp directory. EG: `package.json`, `README.md`, etc.
 */
async function copyPackageFilesToTmp() {
    const packageFiles = ['package.json', 'README.md', '.npmignore'];
    const filePathsToCopy = await glob(packageFiles, { cwd: '.' });
    await copyToTmp(...filePathsToCopy);
}

async function copyToTmp(...paths) {
    await fs.mkdir(TMP_DIR, { recursive: true });

    for (const p of paths) {
        const basename = path.basename(p);
        const dest = path.join(TMP_DIR, basename);
        await fs.copyFile(p, dest);
    }
}

/**
 * @param {string} pathToPackageJson - path to package.json
 * @param {string[]} exposedFiles - list of files to expose in package.json
 */
async function extendsPackageJson(pathToPackageJson, exposedFiles) {
    const packageJson = require(pathToPackageJson);
    // each [name].js – is module to expose with name [name]
    const modulesMap = groupBy(exposedFiles, (f) => path.basename(f).split('.')[0]);

    // creates `exports` section in package.json
    // modulesMap presents a map with module name as a key and dist files with (.js, .d.ts, .mjs) files as a value
    const exportsFiled = Object.entries(modulesMap)
        .filter(([name]) => !name.startsWith('_'))
        .reduce((acc, [name]) => {
            const specifiers = {
                types: `./${name}.d.ts`,
                require: `./${name}.js`,
                import: `./${name}.mjs`,
                default: `./${name}.js`,
            };

            const moduleImport = name === 'index' ? '.' : `./${name}`;
            return { ...acc, [moduleImport]: specifiers };
        }, {});

    packageJson.exports = exportsFiled;

    await fs.writeFile(pathToPackageJson, JSON.stringify(packageJson, null, 2));
}

/**
 *
 * @param {String} command
 * @returns Promise<{stdout: String, stderr: String}>
 * @throws Error – if the command fails (stderr is not empty)
 */
function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(`cd ${PROJECT_ROOT} && ${command}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}

main();
