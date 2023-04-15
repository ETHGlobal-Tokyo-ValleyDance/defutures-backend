import { Cache } from "cache-manager";
export declare class CacheService {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    set<T>(key: string, value: T, ttl?: number): Promise<T>;
    get<T>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
}
