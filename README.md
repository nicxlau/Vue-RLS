
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
	<title>teste</title>
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
	<title>teste</title>
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
		template: `<center><br>My name is <input v-model="storage.name"><br>{{ storage.name }}</center>`,
		created: function(){
			this.storage.name = "Jacob";
		}
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
**`ttl`** | Integer | `false` | Expiration time in milliseconds

## License

[MIT](LICENSE) © [Jacob K.](http://lsdev.cf)
