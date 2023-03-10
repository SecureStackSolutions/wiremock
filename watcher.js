const chokidar = require('chokidar');
const axios = require('axios');
const chalk = require('chalk');

const watcher = chokidar.watch(`/mocks/mappings/**/*.{json,json.vm}`, {
  interval: 500,
  persistent: true,
});

// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher.on('change', async (path) => {
  await resetWiremock();
  // log(`'The file that has been changed is ${path}`);
});

const resetWiremock = async (port) => {
  const wiremockApi = `http://localhost:8080`;
  try {
    await axios({
      method: 'post',
      url: `${wiremockApi}/__admin/mappings/reset`,
    });
    console.log(chalk.green(`[WIREMOCK]: Mappings reset successful`));
  } catch (error) {
    console.log(
      chalk.red(`[WIREMOCK POST ERROR]: Problem with request: ${error.message}`)
    );
    console.error(error);
  }
};

process.on('SIGTERM', function () {
  watcher.close();
});
