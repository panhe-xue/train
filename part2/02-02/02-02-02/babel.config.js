 module.exports = {
	"presets": [
		["@babel/preset-env", {
		  "useBuiltIns": "usage",
		  "corejs": 2
		}],
		'@babel/preset-react',
	],
	"plugins": [
		"react-refresh/babel"
	],
}