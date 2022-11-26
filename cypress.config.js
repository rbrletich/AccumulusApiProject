const { defineConfig } = require('cypress')

module.exports = defineConfig({

  // The following group of configurations are used for the html reporting function
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Accumulus API Project',
    embeddedScreenshots: true,
    inlineAssets: true, // Adds the asserts inline
    debug: true
  },

  projectId: 'jnp8cq',

  e2e: {

    setupNodeEvents (on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    baseUrl: 'https://637d2c3e9c2635df8f833d30.mockapi.io'
  }
})
