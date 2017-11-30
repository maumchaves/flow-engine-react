# Flow Engine

[Live application here](http://flow-engine.s3-website-eu-west-1.amazonaws.com), hosted on [AWS S3](https://aws.amazon.com/es/s3).

### Features

- Takes [incoming data](https://github.com/maumchaves/flow-engine-react/blob/master/src/data/sample.json) and a [set of rules](https://github.com/maumchaves/flow-engine-react/blob/master/src/data/rules.json) to be applied from `json` files.
- Each rule consists of an `id`, a function `body` the returns a boolean according to the incoming data, a `true_id` property that specifies the `id` of the next rule to be applied in case that the rule's function returns `true` and a `false_id` property that specifies the `id` of the next rule to be applied in case that the function returns `false`.
- The flow ends either when the next rule `id` is null or the next rule has already been applied (so the flow never gets circular).
- The resulting path of applying the set of rules to the incoming data is shown to the user. Each "step card" is marked with the green color if the rule was passed or red if it didn't.
- Step cards also show their `true_id` and the `false_id` (next rules depending on the result) so that the path can be visually validated.
- Click on a step card shows the rule's function.

## Setup

Run `npm install`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
