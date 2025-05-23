const modules = import.meta.glob( './modules/*.ts', { eager: true } )

const languages:{[key:string]:Object} = {}
Object.keys( modules ).forEach( ( key ) => {
    const regex = /\/([^/]+)\.ts$/
    let result = key.match( regex )
    const mod = ( modules[ key ] as any ).default || {}
    if(result) {
        const keyName =  result[ 1 ]
        languages[keyName] = mod
    }

} )
export default languages
