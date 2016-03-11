/**
 * Created by Younes on 23/02/2016.
 */
System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: {
        'app': {
            defaultExtension: 'ts'
        },
        'ng2-material': {
            defaultExtension: 'js'
        }
    },
    map: {
        'ng2-material':"/node_modules/ng2-material"

    }
});
System.import('app/main')
    .then(null, console.error.bind(console));

