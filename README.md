<p align="center">
  <a href="https://moodys.com" rel="noopener" target="_blank"><img width="72" src="./public/assets/images/icons/logo72.png" alt="Moodys"/>
  </a>
</p>

<div align="center">

![badge](https://img.shields.io/static/v1.svg?label=version&message=skeleton&color=red)
![badge](https://img.shields.io/static/v1.svg?label=team&message=Digital%20Insights)

</div>
<h1 align="center">MDC Screener</h1>
<h3 align="center">@owner - di-screener-squad </h3>

# Overview

Front-End repo for Screening and Benchmarking application.

Screener confluence page can be found [here](https://moodysanalytics.atlassian.net/wiki/spaces/CAAS/pages/437108870/Screener).

# Local Development

Make sure you have the `.env` setup in this repo's root folder (found in dev Slack or ask a developer)

```bash
$ npm install
$ npm run start
```

A browser will open and should automatically navigate you to: `localhost:3001`

If you are making code changes, you'll need to make sure your git hooks are setup:

```bash
$ npx simple-git-hooks
```

# Local development with mock data

To run the app locally with mock data, follow the instructions below,

1. Add the following variables to the `.env` file in the root directory.

```bash
REACT_APP_API_GATEWAY=http://localhost:3001
```

2. Run npm command

```bash
npm run start:with-mock
```

# Local development connecting to local lambda backend

To connect to the local lambda backend, update your .env `REACT_APP_API_GATEWAY=http://localhost:5001`. This will enable the proxy.

Most screener/api calls will automatically be pointed to your local running lambda but you can choose which ones by updating the proxy section in `webpack.config.ts`.

# Avo Analytics

## General Workflow

We start the application and call `useAnalyticsForApps` at a high level. This will setup the connection/listener that exists on the core mfe. Since Screener has only one main route, we call a static `useAnalyticsPageLoading` when someone enters the page. Whereever you want to trigger an Avo event, you'll use this function:

```bash
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerScoreCommentOpened, <-- event imported from Avo.ts
      eventDetails: {
        ...defaultEventDetails,
        name: field, <-- additional levels of detail go here. what these need to be are listed under the event on the Avo website.
      },
    });
```

## Updating Avo Events

When you need to update Avo events, run this command:

```bash
avo pull
```

This will update the Avo.ts file which you will be importing Avo functions from.

### Confirming Avo Events are Firing

Since we are now having Adobe Analytics load through the shell, you will no longer see events emitting in the console automatically. However, you can still check/confirm events are firing if you look at `window.digitalData.event` inside the console log. The `event` value of this object will be the last event emitted.
