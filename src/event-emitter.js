define(function() {

    var slice = Array.prototype.slice;

    /**
     * Defines the base class for all event emitting objects to extend.
     * @exports streamhub-sdk/event-emitter
     * @constructor
     */
    var EventEmitter = function() {
        this._listeners = {};
    };

    /**
     * Binds a listener function to an event name.
     * @param name {string} The event name to bind to.
     * @param fn {function} The callback function to call whenever the event is emitted.
     * @returns {EventEmitter} Returns 'this' for chaining
     */
    EventEmitter.prototype.on = function(name, fn) {
        this._listeners[name] = this._listeners[name] || [];
        this._listeners[name].push(fn);
        return this;
    };

    /**
     * Removes a bound listener from the named event.
     * @param name {string} The name of the event to remove this listener from.
     * @param fn {function} The original callback function to remove.
     */
    EventEmitter.prototype.removeListener = function(name, fn) {
        if (fn && this._listeners[name]) {
            this._listeners[name].splice(this._listeners[name].indexOf(fn), 1);
        }
    };

    /**
     * Emits an event from the object this is called on. Iterates through bound
     * listeners and passes through the arguments emit was called with.
     * @param name {string} The name of the event to emit.
     * @param {...Object} Optional arguments to pass to each listener's callback.
     */
    EventEmitter.prototype.emit = function(name) {
        var listeners = this._listeners[name] || [];
        var args = slice.call(arguments, 1);
        
        for (var i in listeners) {
            try {
                listeners[i].apply(this, args); 
            } catch(err) {
                this.emit('error', err);
            }
        }
    };

    return EventEmitter;
});