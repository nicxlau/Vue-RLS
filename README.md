

# Vue-RLS
#### Reactive wrapper over browser storage for Vue.js

#### :squirrel: [Investigate the live demo](https://jco666.github.io/Vue-RLS/)

## CDN Installation

```html
<script src="https://cdn.jsdelivr.net/gh/jco666/Vue-RLS@latest/dist/vue-rls.min.js"></script>
```

* This package is not on NPM, use GitHub source only.

## Why ?

`window.localStorage` cannot be reactive if you use it directly with Vue, example:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>Vue-RLS basic example</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>

	<div id="app"></div>

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<script>
	new Vue({
		el: '#app',
		data:{
			localStorage: window.localStorage
		},
		template: `<center><br>My name is <input v-model="localStorage.name"><br>{{ localStorage.name }}</center>`,
		created: function(){
			this.localStorage.name = "Jacob";
		}
	});
	</script>
</body>
</html>
```

Code above will not react, even bind to view. So...

### How to use

```js
// Set initial configs
Vue.use(VueRLS, {
	prefix: 'app_',
	driver: 'local',
	ttl: 1571540807106
});
```

Now you can acess `localStorage` or `sessionStorage` with namespace `storage` in Vue.

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>Vue-RLS basic example</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>

	<div id="app"></div>

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/jco666/Vue-RLS@latest/dist/vue-rls.min.js"></script>
	<script>
	// Set initial configs
	Vue.use(VueRLS, {
		prefix: 'app_',
		driver: 'local',
		ttl: 1571540807106
	});
	new Vue({
		el: '#app',
		template: `<center><br>My name is <input v-model="storage.name"><br>{{ storage.name }}</center>`
	});
	</script>
</body>
</html>
```

## Options
| Option | Type | Default | Description |
| - | - | - | - |
**`prefix`** | String | `app_` | Variable name prefix
**`driver`** | String | `local` | Driver name, it can be: `local`, `session` or `memory`
**`ttl`** | Integer \| Boolean| `false` | Expiration time in milliseconds

## Public methods
| Method | Parameters | Description |
| - | - | - |
**`get(name)`** | String | Search for a variable in storage and returns its value
**`set(name, value)`** | String, Mixed | Create or assign the value of a variable
**`remove(name)`** | String | Destroys a variable
**`delete(name)`** | String | Alias of `remove()` method
**`clear()`** | - | Destroys all variables with prefix defined in the settings
**`options(options)`** | Object | Assign settings

## All usage methods
```js
storage.name = 'Jacob';  // creat a variable in storage
storage.name;            // return a variable value from storage
storage.get('name');     // another way to return a variable value from storage
storage.options({        // change drive to sessionStorage
	'driver': 'session'
});
storage.set('name', 'Jacob');        // creat a variable in storage
storage.set('last_name', 'Kuuhaku'); // creat another variable in storage
storage.delete('last_name');         // destroy a variable
storage.clear();                     // destroy all variable from selected storage in options

```

## License

[MIT](LICENSE) © [Jacob K.](http://lsdev.cf)
