module.exports = function(context) {
    console.log('Updating appxmanifests with ToastCapable=true...');
    var path = require('path');
    var fs = require('fs');

    var platformProjPath = path.resolve(context.opts.projectRoot);
    var manifestPath;
    if (fs.existsSync(path.resolve(platformProjPath, './cordova/lib/AppxManifest.js'))){
        manifestPath = path.resolve(platformProjPath, './cordova/lib/AppxManifest.js'));
    } else {
        manifestPath = path.resolve(platformProjPath, './platforms/windows/cordova/lib/AppxManifest.js'));
    }

    var AppxManifest = require(manifestPath);
    ['package.phone.appxmanifest', 'package.windows.appxmanifest'].forEach(function(manifestPath) {
        var manifest = AppxManifest.get(path.join(platformProjPath, manifestPath));
        manifest.getVisualElements().setToastCapable(true);
        manifest.write();
    });
}
