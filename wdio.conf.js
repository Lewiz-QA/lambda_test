//require('dotenv').config();
const {join} = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter')
const True = true

exports.config = {
    //hostname: 'localhost', //Comentários para rodar no Emulador. Atualmente está para rodar no LambdaTest
    //port: 4725,
    //path: '/wd/hub',
    product: 'appAutomation',
    user: process.env.LT_USERNAME || "lewizmenon",
    key: process.env.LT_ACCESS_KEY || "7wtlbyNURkepIBNATaQxeRb6VDejGimxS9hIEwC5qGtrqyr5Gd",
    logFile : './logDir/api.log',
    hostname: 'https://mobile-hub.lambdatest.com',
    path: '/wd/hub',
    port: 80,

    //services: ['appium'],
    services: [
      ['lambdatest', {
          tunnel: True
      }]
  ],
    specs: [
        './test/specs/*.spec.js'
    ],
    framework: 'mocha',
    
    capabilities: [{
      "user": "lewizmenon",
      "accessKey": "7wtlbyNURkepIBNATaQxeRb6VDejGimxS9hIEwC5qGtrqyr5Gd",
      "deviceName": "Galaxy S20",
      "platformName": "Android",
      "platformVersion": "10",
      "app": "loja-ebac",
      "visual": True,
      "console": True,
      "deviceOrientation": "PORTRAIT",
      "isRealMobile": True,
  }],

      waitForTimeout: 20000,
      mochaOpts: {
        timeout: 300000
      },

      reporters: ['spec',
        ['allure', {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: true,
    }],
    [video, {
      saveAllVideos: true,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }]
  ],

      onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },

    afterStep: async function (step, scenario, { error, duration, passed }, context) {

        await driver.takeScreenshot()
      
    }

}
