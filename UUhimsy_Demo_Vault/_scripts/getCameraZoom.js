async function getCameraZoom(vaultPath) {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    try {
    const { stdout, stderr } = await exec(`${vaultPath}/uvc-util -I 0 -o zoom-abs`);
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
    return stdout.replace(/\n/g, "");

    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
  }

  module.exports = getCameraZoom;