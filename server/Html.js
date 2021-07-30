import React from "react";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import routes from "../src/routes";
function Html({ store, url }) {
  let root = null;
  const state = store.getState();
  const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;
  try {
    root = renderStylesToString(
      renderToString(
        <Provider store={store}>
          <StaticRouter location={url} context={{}}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      ),
    );
  } catch (err) {
    root = null;
  }
  return `<!doctype html>
  <html>
    <head>
      <title>Ally</title>
      <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height, viewport-fit=cover"
    />
    </head>
    <body>
    <script>${initialState}</script>
    <div id="root">${root}</div>
    <script src="/bundle.js"></script>

    </body>
  </html>
    `;
}
export default Html;
// <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css?family=Marck+Script|Montserrat:600&display=swap" rel="stylesheet">
