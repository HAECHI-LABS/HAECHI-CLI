module.exports = async function(name, options) {
  const path = require('path');
  const fs = require('fs-extra');
  const chalk = require('chalk');

  const { SERVICE_FILE, DEFAULT_CONFIG_FILE } = require('../config/Constant');

  const { printOrSilent } = require('@haechi-labs/vvisp-utils');

  const PACKAGE_JSON = path.join(__dirname, '../package.json');

  let rootDir = path.join('./');
  if (name) {
    fs.ensureDirSync(path.join('./', name));
    rootDir = path.join(name);
  }

  if (fs.readdirSync(rootDir).length > 0) {
    throw new Error(
      'There are some files in directory. Please call vvisp init at empty directory.'
    );
  } else {
    main(rootDir);
  }

  function main(rootDir) {
    printLogo(options);

    printInitialMsg(options);

    initializeDirectory(options, rootDir);

    printEndMsg(options);
  }

  function printLogo(options) {
    printOrSilent('', options);
    printOrSilent(
      chalk.hex('#19b4ff')(
        `
                                                       
    \`7MMF'   \`7MF'\`7MMF'   \`7MF'\`7MMF' .M"""bgd \`7MM"""Mq. 
      \`MA     ,V    \`MA     ,V    MM  ,MI    "Y   MM   \`MM.
       VM:   ,V      VM:   ,V     MM  \`MMb.       MM   ,M9 
        MM.  M'       MM.  M'     MM    \`YMMNq.   MMmmdM9  
        \`MM A'        \`MM A'      MM  .     \`MM   MM       
         :MM;          :MM;       MM  Mb     dM   MM       
          VF            VF      .JMML.P"Ybmmd"  .JMML.     

        `
      ),
      options
    );
    printOrSilent('', options);
  }

  function printInitialMsg(options) {
    const packageJson = fs.readJsonSync(PACKAGE_JSON);
    printOrSilent(
      chalk.bold(`${packageJson.name} v${packageJson.version}`),
      options
    );
    printOrSilent(`  ${packageJson.description}`, options);
    printOrSilent('', options);
    printOrSilent(`Initializing Directory...`, options);
  }

  function initializeDirectory(options, rootDir) {
    fs.copySync(path.join(__dirname, '../referenceFiles'), rootDir);
    let platform = 'ethereum';
    if (options.klaytn) {
      platform = 'klaytn';
    }
    fs.copySync(
      path.join(__dirname, '../referenceFiles/platform', platform),
      rootDir
    );
    fs.removeSync(path.join(rootDir, 'platform'));

    fs.renameSync(
      path.join(rootDir, 'example.vvisp-config.js'),
      path.join(rootDir, DEFAULT_CONFIG_FILE)
    );
    fs.renameSync(
      path.join(rootDir, 'example.service.vvisp.json'),
      path.join(rootDir, SERVICE_FILE)
    );
    fs.renameSync(
      path.join(rootDir, 'example.gitignore'),
      path.join(rootDir, '.gitignore')
    );

    const pkg = fs.readJsonSync(path.join(rootDir, 'package.json'));

    pkg.name = name ? name : path.parse(path.resolve(rootDir)).name;
    fs.writeFileSync(
      path.join(rootDir, 'package.json'),
      JSON.stringify(pkg, null, '  '),
      'utf8'
    );

    const serviceFile = fs.readJsonSync(path.join(rootDir, SERVICE_FILE));

    serviceFile.serviceName = name
      ? name
      : path.parse(path.resolve(rootDir)).name;
    fs.writeFileSync(
      path.join(rootDir, SERVICE_FILE),
      JSON.stringify(serviceFile, null, '  '),
      'utf8'
    );
  }

  function printEndMsg(options) {
    const packageJson = fs.readJsonSync(PACKAGE_JSON);
    printOrSilent(`${chalk.green('Success')}!`, options);
    printOrSilent('', options);
    printOrSilent(
      `  Run ${chalk.bold.cyan('vvisp -h')} for more information`,
      options
    );
    printOrSilent(
      `  Clone ${chalk.bold(packageJson.repository.url)} for ${chalk.green(
        'Contributing!'
      )}`,
      options
    );
  }
};
