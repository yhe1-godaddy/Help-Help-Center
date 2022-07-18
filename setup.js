const inquirer = require('inquirer');
const replace = require('replace-in-file');
const fs = require('fs').promises;

const deleteLine = async (filepath, str) => {
  try {
    const fileData = await fs.readFile(filepath, 'utf8');
    // const linesExceptFirst = fileData.split('\n').slice(1).join('\n');
    await fs.writeFile(filepath, fileData.replace(new RegExp(`^.*${str}.*\n`, 'm'), ''));
  } catch (err) {
    if (err) {
      // check and handle err
    }
  }
};

//inquirer
//replace-in-file

const questions = [
  {
    type: 'input',
    name: 'hostname',
    message: 'Hostname (Ex: for `test-app.demo.godaddy.com` the hostname is `test-app.demo`)',
    default: '',
    validate(value) {
      const pass = value.match(
        /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid hostname';
    }
  },
  {
    type: 'input',
    name: 'appName',
    message: 'App Name',
    default: '',
    validate(value) {
      if (!!value) {
        return true;
      }

      return 'Please enter a valid app name';
    }
  },
  {
    type: 'input',
    name: 'slack',
    message: 'Slack Channel',
    default: '',
    validate(value) {
      const pass = value.match(/^\#[a-z0-9-]{1}[a-z0-9-]{0,20}$/i);
      if (pass) {
        return true;
      }

      return 'Please enter a valid slack channel';
    }
  },
  {
    type: 'confirm',
    name: 'appConfig',
    message: 'With AppConfig?',
    default: true,
    callback: async answers => {
      if (!answers.appConfig) {
        await fs.unlink(__dirname + '/lifecycles/utils/fetch-appconfig.js');
        await fs.unlink(__dirname + '/lifecycles/app-request-config.js');
        await deleteLine(__dirname + '/lifecycles/init-redux-state.js', 'appConfig: req.config.appConfig,');
      }
      return true;
    }
  },
  {
    type: 'confirm',
    name: 'sharedHeader',
    message: 'With SharedHeader?',
    default: true,
    callback: async answers => {
      return true;
    }
  },
  {
    type: 'confirm',
    name: 'redux',
    message: 'With Redux?',
    default: true,
    callback: async answers => {
      return true;
    }
  },
  {
    type: 'confirm',
    name: 'reduxful',
    message: 'With reduxful?',
    default: true,
    when(answers) {
      return !!answers.redux;
    },
    callback: async answers => {
      return true;
    }
  },
  {
    type: 'confirm',
    name: 'jss',
    message: 'With JSS?',
    default: true,
    callback: async answers => {
      return true;
    }
  }
];

(async () => {
  try {
    const answers = await inquirer.prompt(questions);

    replace.sync({
      files: ['ts', 'tsx', 'js', 'jsx'].reduce(
        (acc, ext) => [
          ...acc,
          __dirname + `/src/*.${ext}`,
          __dirname + `/config/*.${ext}`,
          __dirname + `/public/*.${ext}`,
          __dirname + `/lifecycles/*.${ext}`,
          __dirname + `/test/*.${ext}`
        ],
        [
          __dirname + `/app.config.js`,
          __dirname + `/cicd.yaml`,
          __dirname + `/Dockerfile`,
          __dirname + `/gasket.config.js`,
          __dirname + `/jest.config.js`,
          __dirname + `/README.md`
        ]
      ),
      from: [/\{\{context.host}}/g, /\{\{context.appname}}/g, /\{\{context.slack}}/g],
      to: [answers.host, answers.appName, answers.slack]
    });

    for (const fn of questions
      .filter(question => !!question.callback)
      .map(question => question.callback)) {
      await fn(answers);
    }

    console.log('answers', answers);
  } catch (error) {
    console.log('error', error);
    // if (error.isTtyError) {
    //   // Prompt couldn't be rendered in the current environment
    // } else {
    //   // Something else went wrong
    // }
  }
})();
