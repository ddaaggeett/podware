import {
    db_name,
    tables,
} from '../../config'
var r = require('rethinkdb')

export const dbSetup = (connection) => {
    r.dbCreate(db_name).run(connection, function(err, result) {
        if(err) console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", db_name, err.name, err.msg, err.message)
        else console.log("[INFO ] RethinkDB database '%s' created", db_name)
        for(var tbl in tables) {
            (function (tableName) {
                r.db(db_name).tableCreate(tableName).run(connection, function(err, result) {
                    if(err) console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message)
                    else console.log("[INFO ] RethinkDB table '%s' created", tableName)
                })
            })(tbl)
        }
    })
}
