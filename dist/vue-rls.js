! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : (t = t || self, e(t.VueRLS = {}))
}(this, function(t) {
    "use strict";
var options = {};
class c {
	get length() {
		return Object.keys(this.storage).length
	}
	get storage() {
		return s
	}
	getItem(t) {
		return t in this.storage ? this.storage[t] : null
	}
	setItem(t, e) {
		this.storage[t] = e
	}
	removeItem(t) {
		t in this.storage && delete this.storage[t]
	}
	clear() {
		const t = Object.keys(this.storage);
		for (let e = 0; e <= t.length; e++) try {
			delete this.storage[t[e]]
		} catch (t) {}
	}
}
var f = new c;

var store = {
    _initialize: function _initialize(t){
		this.setOptions(t)
    },
    _objectDefaults: function _objectDefaults(object, storage) {
        var this$1 = this;

        Object.keys(object).reduce(function (acc, key) {
            var value = object[key];
            if (typeof value === "object") {
                this$1._objectDefaults(storage[key], value);
            } else {
                if (!storage.hasOwnProperty(key)) {
                    storage[key] = value;
                }
            }
            return acc;
        }, []);
    },
	setOptions(t){
		this._objectDefaults({
			prefix: "app_",
			driver: 'local',
			//ttl: 1571540807106
			ttl: !1
		}, t);
		this.options(Object.freeze(t));
	},
	prefix(){
		return this.options().prefix
	},
	options(n){
		if (n){
			options = n;
		}
		return options;
	},
	driver(){
		switch (this.options().driver){
			case 'local':default:
				return "undefined" != typeof window ? window.localStorage : f;
			case 'session':
				return "undefined" != typeof window ? window.sessionStorage : f;
			case 'memory':
				return f
		}
	},
	removePrefix(t){
		return t.replace(new RegExp(`^${this.prefix()}`), "")
	},
  	getRaw() {
		var r = {};
		var keys = this.keys();
		for (var k in keys){
			r[this.removePrefix(keys[k])] = this.deserialize(this.driver().getItem(keys[k]));
		}
		return r;
    },
    setRaw(object){
		for(var k in object){
			if(typeof object[k] != "function")
				this.driver().setItem(this.prefix() + k, JSON.stringify(object[k]));
		}
    },
    get(key, defaultValue){
        var value = this.driver().getItem(this.prefix() + key);
        return value === null ? defaultValue||null : this.deserialize(value)||defaultValue;
    },
    set(key, value) {
        if (value === undefined) {
            return this.remove(key);
        }
		this.driver().setItem(this.prefix() + key, this.serialize(value));
		this[key] = value;
        return value;
    },
    delete(key){
        this.remove(key);
    },
    remove(key){
		name = this.prefix() + key;
        this.driver().removeItem(name);
		this[key] = undefined;
		delete this[key];
    },
    keys(){
		return Object.keys(this.driver()).filter(t => t.startsWith(this.prefix()))
    },
    clear(){
		var keys = this.keys();
		for (var k in keys){
			this.remove(this.removePrefix(keys[k]));
		}
    },
    serialize(object){
        return JSON.stringify(object);
    },
    deserialize(json){
		try{
			return JSON.parse(json);
		}catch(e){
			return null;
		}
    }
};

var VueRLS = {
    store: store,
    install(Vue, options) {
        store._initialize(options);
        var values = store.getRaw();

        Vue.mixin({
            data() {
                return {
                    storage: Object.assign(store, values)
                }
            },
            watch: {
                storage: {
                    handler(){
                        store.setRaw(this.storage);
                    },
                    deep: true
                }
            }
        });
    }
};
    "undefined" != typeof window && (window.VueRLS = VueRLS), t.VueRLS = VueRLS, t.default = VueRLS, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});