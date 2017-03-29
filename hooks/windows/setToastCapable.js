module.exports = function(context) {
    console.log('Updating appxmanifests with ToastCapable=true...');
    var path = require('path');
    var platformProjPath = path.join(context.opts.projectRoot, 'platforms/windows');

    const fs = require('fs');
    fs.readdirSync(context.opts.projectRoot, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });

    var AppxManifest = require('./AppxManifest.js');
    ['package.phone.appxmanifest', 'package.windows.appxmanifest'].forEach(function(manifestPath) {
        var manifest = AppxManifest.get(path.join(platformProjPath, manifestPath));
        manifest.getVisualElements().setToastCapable(true);
        manifest.write();
    });
}
