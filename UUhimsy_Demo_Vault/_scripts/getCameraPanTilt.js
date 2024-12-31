async function getCameraPanTilt(vaultPath) {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    try {
    const { stdout, stderr } = await exec(`${vaultPath}/uvc-util -I 0 -o pan-tilt-abs`);
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
    pt = stdout.toString();
    result = pt.replace(/\n/g,'').replace('pan','"pan"').replace('}',', "zoom": ').replace(/=/g,': ').replace('tilt','"tilt"')
    return result;
    
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
  }

  module.exports = getCameraPanTilt;