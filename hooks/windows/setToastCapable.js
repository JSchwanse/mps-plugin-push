module.exports = function(context) {
    console.log('Updating appxmanifests with ToastCapable=true...');
    var path = require('path');
    var fs = require('fs');

    var localBuildPathAddition = 'platforms/windows/';
    var manifestPath = 'cordova/lib/AppxManifest.js';

    var platformProjPath;
    if (fs.existsSync(path.resolve(context.opts.projectRoot, './' + manifestPath))){
        platformProjPath = path.resolve(context.opts.projectRoot);
    } else {
        platformProjPath = path.resolve(context.opts.projectRoot, './' + localBuildPathAddition);
    }

    var AppxManifest = require(path.join(platformProjPath, manifestPath));
    ['package.phone.appxmanifest', 'package.windows.appxmanifest'].forEach(function(manifestPath) {
        var manifest = AppxManifest.get(path.join(platformProjPath, manifestPath));
        manifest.getVisualElements().setToastCapable(true);
        manifest.write();
    });
}
