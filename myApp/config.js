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
        'rxjs': {
            defaultExtension: 'js'
        }
    },
    map: {
        'rxjs':"/node_modules/rxjs"

    }
});
System.import('app/main')
    .then(null, console.error.bind(console));

