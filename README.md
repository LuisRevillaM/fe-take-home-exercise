### Implementation

This repo implements the editor by matching the markdown syntax with regex patterns and replacing it with native JS `string.prototype.replace`.

We rely on React's `dangerouslySetInnerHTML` to render the string output on the web browser.

### Available Scripts

This project contains all of scripts shipped with Create React App, see [CRA documentation](https://create-react-app.dev/docs/available-scripts/) for more information. We will outline the scripts most relevant to our exercise below.

#### `yarn start`

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.
