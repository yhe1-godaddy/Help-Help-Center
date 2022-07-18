# gasket-webapp-typescript-boilerplate

A Gasket Webapp Boilerplate built in Typescript. A Gasket Webapp that does something really cool.

### host name

The host will be needed when creating the local certs and update the params in the code base. For the host,
it should be everything before the godaddy domain.

Example: Example, for `test-app.marketing.dev-godaddy.com` the host is `test-app.marketing`


### Before start

Download certs from [here](https://cloud.int.godaddy.com/security/certs/list). 

- Download the .crt, .key and \_intermediate_chain.crt
- Rename it `_.{{context.host}}.dev-godaddy.com` for all three
- Create a cert directory at the root project: `mkdir certs`

Once downloaded, install the certs in the /certs directory and make sure the file names match what's in
the `app.config.js`, `gasket.config.js` and `cicd.yaml` files. Prefix the cert with an underscore `_.`

The SUB-DOMAIN-NAME-HERE should be everything before the domain and after the wildcard. Example, for `*.test-app.marketing.dev-godaddy.com` the SUB-DOMAIN-NAME-HERE is `test-app.marketing`

Then run `sudo vi \etc\hosts` to add 
```
127.0.0.1  local.{{context.host}}.dev-godaddy.com
```
Remember to save before quit.

## Initialize the app from project root

```bash
nvm use

npm install
```

## Start the app from project root

```bash
nvm use

npm run local
```

The app should now be accessible over https on port 8444 at:

```
https://local.{{context.host}}.dev-godaddy.com:8444
```

_The local port can be updated in the gasket.config.local_

## Running test

```bash
nvm use

npm run test
```

### Coverage

```bash
nvm use

npm run test:coverage
```

## CICD Certs Errors

- When deploying for the first time, CICD can have issues with creating/updating/finding the certs. If this happens, wait 
  a couple of hours and try again. Attempting two or three times usually resolves the issue.

## Running a production build locally

To test a production build locally you can run the following commands

```bash
npm run build -- --env=production
npm start -- --env=local
```

## Routing

Routing can be configured at `/config/routes`.

- routes map to a page file in the src/pages dir
- path uses react routes logic:
  - `:urlParam`
  - `?` after urlParam makes the param optional
  - `(value1|value2)` after a urlParam restrict the param to the values
  - urlParam restriction and optional flag can be commanded, `:urlParam(value1|value2)?`

```
[routeName]: {
   name: 'routeName',
   page: 'pageFileName', /** file name in /src/pages/ dir **/
   path: '/sample/:urlParam/:url_param__restricted(must-be-this|or-this)/:url_param__optional?'
}
```

## Access urlParam

### Lifecycles files

Current Route `http://domain/:urlParam1/:urlParam2`

```
module.exports = async function(gasket, req) {
  const { path } = req;
  const { query } = Routes.match(path) || {};
  const { urlParam1, urlParam2 } = query;

  ...
}
```

### React Component

Current Route `http://domain/:urlParam1/:urlParam2`

```
import { useRouter } from 'next/router';

export const Component = () => {
  const router = useRouter();
  const { query } = router;
  const { urlParam1, urlParam2 } = query;

  ...
};
```

### Redirecting in React

Current Route `http://domain/:urlParam1/:urlParam2`

### Change whole route

```
import { useRouter } from 'next/router';

export const Component = () => {
  const router = useRouter();
  const { query } = router;

  router.push('http://domain/newParam/secondNewParam');

  ...
};
```

### Change one param of current route

```
import { useRouter } from 'next/router';

export const Component = () => {
  const router = useRouter();
  const { query } = router;

  router.push(
    urlBuilder(route.path, { ...router.query, urlParam2: 'newValue' })
  );

  ...
};
```

## Internationalization and localization (i18n)

Language packs should be added to the /locales dir

To help catch errors a IntlKeys model has been created to help implement
the language pack in the code. You no longer need to refer to the
language items using strings

Using the IntlKeys model will give you code sense in you IDE and
typechecking to catch errors on missing/misspelled items

### Example

In en-US.json

```
{
  "APP_HEADING": "App Title",
}
```

```
import { IntlKeys } from '../../constants';

export const Component = () => (
  <div>
    <FormattedMessage id={ IntlKeys.APP_HEADING } />
  </div>
);
```

### Caveats

- An en-US.json must exist. The IntlKeys model uses this file to
  create the Type casting

# Testing

For testing samples please see test/samples/ dir.


