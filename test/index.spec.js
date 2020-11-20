const assert = require('assert');
const { LRUCache } = require('../index');


describe('LRUCache - capacity', () => {
    it('initializing cache with capacity 2 should set cache capacity to 2', () => {
        let cache = new LRUCache(2);
        assert.equal(cache.capacity, 2);
    });
});

describe('LRUCache - update queue', () => {
    it('adds the key to the empty queue', () => {
        let cache = new LRUCache(2);
        cache.updateQueue(1);
        let result = [1];
        assert.deepEqual(cache.lruQueue, result);
    });

    it('moves the existing key to the back of the queue', () => {
        let cache = new LRUCache(2);
        cache.updateQueue(1);
        cache.updateQueue(2);
        cache.updateQueue(1);
        let result = [2, 1];
        assert.deepEqual(cache.lruQueue, result);
    });

    it('when at capacity, removes the least recently used key from the front of the queue', () => {
        let cache = new LRUCache(2);
        cache.updateQueue(1);
        cache.updateQueue(2);
        cache.updateQueue(3);
        let result = [2, 3];
        assert.deepEqual(cache.lruQueue, result);
    });
})

describe('LRUCache - put function tests', () => {
    it('adds the key-value to the empty cache', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        let result = {"1": 1};
        assert.deepEqual(cache.lruCache, result);
    });

    it('updates the value for existing key', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(1, 2);
        let result = {"1": 2};
        assert.deepEqual(cache.lruCache, result);
    });

    it('when the cache is at capacity, removes least recently used key and adds new key-value pair', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);
        let result = {"2": 2, "3": 3};
        assert.deepEqual(cache.lruCache, result);
    });
})

describe('LRUCache - get function tests', () => {
    it('returns the value from the corresponding key', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        let result = 1;
        assert.deepEqual(cache.get(1), result);
    });

    it('returns -1 if the key does not exist in the cache', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        let result = -1;
        assert.deepEqual(cache.get(2), result);
    });

    it('updates the queue accordingly when the key exists', () => {
        let cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);
        let result = [2, 1];
        assert.deepEqual(cache.lruQueue, result);
    });
})