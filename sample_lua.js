const redis = require('./redis-promise');

var lua = {};
lua.sample = function(key1,key2,first,second){
    return [
        "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}",
        2,
        key1, key2,
        first, second
    ]
}
lua.echo = function(value){
    return [
        "return ARGV[1]",
        0,
        value
    ]
}
lua.get = function(key){
    return [
        "return redis.call('get',KEYS[1])",
        1,
        key
    ]
}

const cli = redis.createClient();
cli.evalAsync(lua.get("hoge")).then(_=>{
    console.log(_);
}).catch(e => {
    console.log(e);
}).then(_=> cli.quit())

