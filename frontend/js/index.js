
import '../css/bootstrap.css';
import '../css/style.css';

import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "https://82495f8ea55a1fdac19bb8bd074c1169@o443919.ingest.us.sentry.io/4507962216939520",
    release: `abx@${process.env.RELEASE || 'dev'}`,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [/^https:\/\/abxtest\.com\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

