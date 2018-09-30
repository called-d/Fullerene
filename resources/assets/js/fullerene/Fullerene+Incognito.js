import Fullerene from './Fullerene'
import Crypto from './crypto-wrapper'

export default class extends Fullerene {
    static get Crypto() { return Crypto }// TODO 試験用

    constructor(dbName, dbVersion, iv) {
        super()
        this.iv = iv
    }

    import(db, password, iv) {
        iv = iv || this.iv
        if (this.iv) {
            return Crypto.decrypt(db, password, iv).then(db => super.import(JSON.parse(db)))
        }
    }
    export(password, iv) {
        return super.export().then(db => Crypto.encrypt(JSON.stringify(db), password, iv)).then( result => {
            this.iv = result.iv
            return {
                db: result.encBuffer,
                iv: result.iv,
            }
        })
    }
}