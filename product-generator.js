var fs = require('fs');
var path =require('path')
var hbs= require('handlebars');
var recursiveReadSync = require('recursive-readdir-sync')
var data= require(path.join(__dirname,'src/views/data'));
var products= require(path.join(__dirname,'src/views/productos')).products;

//mis partials
var partialsDir = path.join(__dirname,"src","views","partials")
var filenames = fs.readdirSync(partialsDir)

//registro mis partials
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = recursiveReadSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
  console.log("partial registrado")
});

//mi plantilla
hbs.registerHelper(require('handlebars-helpers'))
hbs.registerHelper('addCommas', function(num) {
  return num;
});

var source=fs.readFileSync(path.join(__dirname,"src","views","pages","productos","producto-plantilla.hbs"),"utf8")
var template = hbs.compile(source);
//genero mis archivos
for (var i = 0, len = products.length; i < len; i++) {
	console.log("iniciar compilacion")
	var myData={ data : data,
				 front: products[i]}
	var result = template(myData);
	console.log(result)
}