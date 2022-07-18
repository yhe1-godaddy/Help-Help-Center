import React from 'react';
import GasketDocument from '@godaddy/gasket-next/document';
import { DocumentContext } from 'next/document';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';

/**
 * Used to inject JSS at the server level so it always works
 */
class AppDocument extends GasketDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        )
      });

    const parentInitialProps = await super.getInitialProps(ctx);

    return {
      ...parentInitialProps,
      locale: parentInitialProps.lang,
      styles: (
        <>
          {parentInitialProps.styles}
          <style id='server-side-styles'>{registry.toString()}</style>
        </>
      ),
      html: `<html>${parentInitialProps.html}</html>`
    };
  }
}

// eslint-disable-next-line import/no-default-export
export default AppDocument;
