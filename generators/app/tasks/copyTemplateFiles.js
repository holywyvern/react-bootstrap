const mkdirp = require('mkdirp');

const { TEMPLATE_FILES, LINTER_PATH, LOCAL_STORAGE_FILE, FLOWCONFIG_PATH } = require('../constants');

const { copyTpl, copy } = require('./utils');

module.exports = function copyTemplateFiles() {
  const bindedCopyTpl = copyTpl.bind(this);
  const bindedCopy = copy.bind(this);

  TEMPLATE_FILES.forEach(path => bindedCopy(path, path, null, { projectName: this.projectName }));

  mkdirp(this.destinationPath(`${this.projectName}/src/app/assets/`));

  if (this.features.flow) {
    bindedCopy(FLOWCONFIG_PATH.src, FLOWCONFIG_PATH.destination);
  }

  bindedCopy(LINTER_PATH.src, LINTER_PATH.destination);

  bindedCopyTpl('public/_index.html', 'public/index.html', {
    title: this.projectName
  });

  bindedCopyTpl(LOCAL_STORAGE_FILE, LOCAL_STORAGE_FILE, {
    projectName: this.projectName
  });

  bindedCopyTpl(LINTER_PATH.src, LINTER_PATH.destination, {
    flow: this.features.flow
  });
};
