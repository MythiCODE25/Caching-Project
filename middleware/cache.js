let cache = {}
const TTL = 60 * 1000

function cacheMiddleware(req,res,next){
    let key = req.originalUrl
    let value = cache[key]

    if(value){
        let age = Date.now() - value.createdAt

        if(age < TTL){
            res.setHeader("X-Cache","HIT")
            return res.json(value.data)
        }

        delete cache[key]
    }

    res.setHeader("X-Cache","MISS")

    let oldJson = res.json.bind(res)
    res.json = (data) => {
        cache[key] = {
            data,
            createdAt: Date.now()
        }
        return oldJson(data)
    }

    next()
}

function invalidateCache(req,res,next){
    res.on("finish",() => {
        if(res.statusCode >= 200 && res.statusCode < 300){
            cache = {}
        }
    })
    next()
}

module.exports = {
    cacheMiddleware,
    invalidateCache
}
