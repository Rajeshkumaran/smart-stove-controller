import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from '../src/routes';
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
      <title>Smart stove controller</title>
      <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height, viewport-fit=cover"
    />
    <link rel="manifest" href="/manifest.json" />

    <link href="https://fonts.googleapis.com/css?family=Marck+Script|Montserrat:600&display=swap" rel="stylesheet">
    
    </head>
    <body>
    <script>${initialState}</script>
    <div id="root">${root}</div>
    <script src="/bundle.js"></script>
    <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('worker.js').then(function(registration) {
          console.log('Worker registration successful', registration.scope);
        }, function(err) {
          console.log('Worker registration failed', err);
        }).catch(function(err) {
          console.log(err);
        });
      });
    } else {
      console.log('Service Worker is not supported by browser.');
    }
  </script>
    </body>
  </html>
    `;
}
export default Html;
// <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css?family=Marck+Script|Montserrat:600&display=swap" rel="stylesheet">
