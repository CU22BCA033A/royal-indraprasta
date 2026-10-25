// Lighthouse CI: mobile, simulated throttling, against the static build.
// CHROME_PATH can point at a local Chromium when Lighthouse cannot find one.
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/menu/',
        'http://localhost/banquet/',
        'http://localhost/visit/',
        'http://localhost/contact/',
        'http://localhost/faq/',
        'http://localhost/kn/',
      ],
      numberOfRuns: 1,
      chromePath: process.env.CHROME_PATH || undefined,
      settings: {
        chromeFlags: '--headless=new --no-sandbox --no-zygote --disable-gpu',
        formFactor: 'mobile',
        throttlingMethod: 'simulate',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
};
