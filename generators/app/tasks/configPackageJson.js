const generateRARScript = (command, options) =>
  `react-app-rewired ${command} --scripts-version wolox-react-scripts${options ? ` ${options}` : ''}`;

const getPackageJsonAttributes = (projectName, projectVersion, repoUrl, features) => {
  const attributes = {
    name: projectName,
    title: projectName,
    version: projectVersion,
    repository: {
      type: 'git',
      url: repoUrl
    },
    scripts: {
      start: generateRARScript('start'),
      build: generateRARScript('build'),
      test: generateRARScript('test', '--env=jsdom'),
      eject: './node_modules/react-scripts/bin/react-scripts.js eject',
      deploy: generateRARScript('build'),
      lint: './node_modules/eslint/bin/eslint.js src',
      'lint-fix': './node_modules/eslint/bin/eslint.js src --fix',
      'lint-diff': 'git diff --name-only --cached --relative | grep \\.js$ | xargs eslint',
      precommit: 'npm run lint-diff'
    }
  };

  if (features.flow) {
    attributes.scripts.flow = 'flow';
  }
  return attributes;
};

module.exports = function configPackageJson() {
  const pjson = this.fs.readJSON(`./${this.projectName}/package.json`);
  const newpjson = Object.assign(
    pjson,
    getPackageJsonAttributes(this.projectName, '1.0.0', this.repoUrl, this.features)
  );
  this.fs.writeJSON(`./${this.projectName}/package.json`, newpjson);
};
