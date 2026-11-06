// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-edge-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      jasmine: {
        // You can add Jasmine configuration here if needed
        // For example, to set random order:
        // random: false
      },
      clearContext: false // Leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // remains as default
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/merum-fe'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    reporters: ['progress', 'kjhtml'],
    // Default browser is Firefox in headless mode. To run tests in a different browser:
    // - npm run test (FirefoxHeadless - default)
    // - npm run test:firefox (FirefoxHeadless)
    // - npm run test:firefox:headed (Firefox with visible browser)
    // - npm run test:edge (EdgeHeadless)
    // - npm run test:edge:headed (Edge with visible browser)
    // - npm run test:chrome (ChromeHeadless)
    // - npm run test:chrome:headed (Chrome with visible browser)
    // - ng test --browsers=FirefoxHeadless,EdgeHeadless (multiple headless browsers)
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['--headless']
      },
      EdgeHeadless: {
        base: 'Edge',
        flags: ['--headless']
      },
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox']
      }
    },
    browsers: ['FirefoxHeadless'],
    restartOnFileChange: true
  });
};
