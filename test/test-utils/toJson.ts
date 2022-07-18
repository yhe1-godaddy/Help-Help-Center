import enzymeToJson, { Json, Options } from 'enzyme-to-json';
import { CommonWrapper } from 'enzyme';

const removeTheme = (json: Json) => {
  if (json.type === 'ThemeProvider') {
    return {
      ...json,
      props: {
        ...json.props,
        theme: {}
      }
    };
  }

  return json;
};

const removeIntMessages = (json: Json) => {
  if ('intMessages' in json.props) {
    return {
      ...json,
      props: {
        ...json.props,
        intMessages: {}
      }
    };
  }

  if (json.type === 'IntlProvider') {
    return {
      ...json,
      props: {
        ...json.props,
        messages: {}
      }
    };
  }

  return json;
};

const removePortalContainerInfo = (json: Json) => {
  if (json.type === 'Portal') {
    return {
      ...json,
      props: {
        ...json.props,
        containerInfo: undefined
      }
    };
  }
  return json;
};

const jsonMap = (json: Json) => {
  json = removeIntMessages(json);
  json = removePortalContainerInfo(json);
  json = removeTheme(json);
  return json;
};

export const toJson = <P, S>(
  wrapper: CommonWrapper<P, S> | cheerio.Cheerio,
  options: Options = {}
) => {
  return enzymeToJson(wrapper, {
    map: jsonMap,
    ...options
  });
};
