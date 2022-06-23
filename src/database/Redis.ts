import ioredis from 'ioredis';

class Cache {

    private redis: ioredis.Redis;

    constructor() {
        this.redis = new ioredis({
            host: 'localhost',
            port: 6379,
            keyPrefix: 'cache'
        })
    };

    async get(key: string) {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    };

    set(key: string, value: string, timeExp: number) {
        return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
    };

    del(key: string) {
        return this.redis.del(key);
    };

    async delPrefix(prefix: string) {
        const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key: string) => key.replace('cache:', ''));
    }
}

export { Cache }