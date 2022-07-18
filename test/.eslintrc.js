module.exports = {
  rules: {
    'max-len': 'off', // since test names tend to be long
    'max-statements': 'off', // tests are all inside arrow functions so we run in  to this a lot
    'max-nested-callbacks': 'off', // since we nest with extra description blocks
    'no-undefined': 'off', // since we frequently want to test for cases with undefined values
    'no-process-env': 'off', // disabled due to frequent calls to process.env
    'no-console': 'off' // disabled due to use in logging issues
  }
};
