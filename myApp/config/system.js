/**
 * Created by Younes on 23/02/2016.
 */
System.config({
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    },
    packages: {
        'app': {
            defaultExtension: 'ts'
        },
        "angular2-jwt": {
            "defaultExtension": "js"
        },
        "angular2-tag-input": {
            "defaultExtension": "ts"
        },
        "node_modules/ng2-bootstrap": {
            "defaultExtension": "js"
        }
    },
    map: {
        "angular2-jwt": "node_modules/angular2-jwt/angular2-jwt.js",
        "angular2-tag-input": "node_modules/angular2-tag-input/dist/tag-input.component.d.ts",
        moment: 'node_modules/moment/moment.js',
        "ng2-bootstrap/ng2-bootstrap":   "node_modules/ng2-bootstrap/ng2-bootstrap"
    }

});
System.import('app/main')
    .then(null, console.error.bind(console));

