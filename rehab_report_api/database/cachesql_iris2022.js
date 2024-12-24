const exec = require('child_process').exec

let _config = ''

function CACHESQL_iris2022() {

}

function clean(text) {
    return text.replace(/\s+/g, ' ').trim()
}

CACHESQL_iris2022.config = function (conf) {
    _config = 'connect ' + conf.url + ' ' + conf.username + ' ' + conf.password
}

CACHESQL_iris2022.query = function (sql) {
    return new Promise((resolve, reject) => {
        let jarpath = __dirname + '/libcache/ProdTrak.jar'
        let cmd = `java -jar ${jarpath} ${_config} "${clean(sql)}"`
        //console.log(cmd)
        exec(cmd, { maxBuffer: 1024 * 1024 * 1024 }, function (error, stdout, stderr) {
            if (error) {
                console.log('===== show error =====')
                console.log(error)
                resolve({ status: 'E', message: error })
            }
            if (stderr) {
                console.log('===== show stderr =====')
                console.log(stderr)
                resolve({ status: 'E', message: stderr })
            }
            try {
                resolve(JSON.parse(stdout))
            } catch (e) {
                console.log(e.message)
                resolve({ status: 'E', message: e.message })
            }
        })
    })
}

module.exports = CACHESQL_iris2022