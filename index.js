class LRUCache {
    constructor(capacity) {
        this.lruQueue = [];
        this.lruCache = {};
        this.capacity = capacity;
        this.cacheLen = 0;
    }

    updateQueue = function(key) {
       //if queue contains the key
       if(this.lruQueue.includes(key)) {
          //remove the key from the queue
          let idx = this.lruQueue.indexOf(key)
          this.lruQueue.splice(idx, 1)
       }

       //if queue is at capacity
       if(this.lruQueue.length === this.capacity) {
          //remove the least recently used key from the front of the queue   
          this.lruQueue.shift();
       }

       //add key to the back of the queue
       this.lruQueue.push(key);
    }

    put = function(key, value) {
       //if cache is at capacity and the key is not in the cache
       if(this.lruQueue.length === this.capacity && !this.lruCache[key]) {
          //remove the least recently used key from the cache
          let lruKey = this.lruQueue[0];
          delete this.lruCache[lruKey];
       }
       //update the key value pair
       this.lruCache[key] = value;
       //update the queue
       this.updateQueue(key);  
    }

    get = function(key, value) {
       //if key does not exist in the cache 
       if(!this.lruCache[key]) {
          return -1;
       }
       this.updateQueue(key);
       return this.lruCache[key];   
    }
}

module.exports = {
    LRUCache
}