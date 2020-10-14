var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var luces = [{
  "ID":"1",
  "ubicacion":"Patio",
  "estado":"on",
  "IP":"192.168.1.45"
},
{
  "ID":"2",
  "ubicacion":"Patio trasero",
  "estado":"off",
  "IP":"192.168.1.49"
},
{
  "ID":"3",
  "ubicacion":"Cocina",
  "estado":"on",
  "IP":"192.168.1.47"
}]

var sensores = [{
    "Tipo": "Temperatura",
    "ID": "1",
    "valor": 24.0,
    "unidad": "°C",
    "estado": "off"
    },
    {
    "Tipo": "Humedad",
    "ID": "2",
    "valor": 45,
    "unidad": "%",
    "estado": "on"
    },  
    {
    "Tipo": "Velocidad del viento",
    "ID": "3",
    "valor": 9.7,
    "unidad": "km/h",
    "estado": "on"
    },
    {
    "Tipo": "Precipitaciones",
    "ID": "4",
    "valor":  0,
    "unidad": "mm",
    "estado": "off"
    },
    {
    "Tipo": "Presión atmosférica",
    "ID": "5",
    "valor": 1002.2,
    "unidad": "hPa",
    "estado": "on"
    }]



var idSensores =20;
var idLuces =20;

function simuladorSensores() {
  // función que simula mediciones con los sensores.
  sensores.forEach(item=>{
      if (item.estado=="on"){
        item.valor = Number(item.valor*(1+(Math.random()-0.4999)/20)).toFixed(2);
      //console.log(item);
      }
    }); 
}

function simuladorLuces() {
  // función que simula encendido apagado de luces aleatoriamente.
  luces.forEach(item=>{
       let val = Math.random()*100;
       if (val<20){
        if(item.estado=="on")
          item.estado="off";
        else if (item.estado=="off")
            item.estado="on";
        //sconsole.log(item)
       }
      }); 
    }
setInterval(simuladorSensores, 1000);
setInterval(simuladorLuces, 3000);
      
// sensores
app.get("/sensores",function(req,res){

	 res.send(sensores);    
});

app.get("/sensores/:ID",function(req,res){
    console.log(req.params.ID);
      if(req.params.ID>0){
        var sensor={};
         sensores.forEach(item=>{
      
          if(item.ID==req.params.ID){
          
            sensor = item;
           
          }
        });
        res.send(sensor);
        return; 
       
      }else{
          res.send({'type': 'error'});
          return; 
      }
    });

app.put("/sensores/:ID",function(req,res){
  
 if((req.body.Tipo!= undefined) && (req.body.estado!= undefined)){
            for(var i=0;i<sensores.length;i++){
              if(req.params.ID == sensores[i].ID){
                console.log("Actualiza sensor")
                sensores[i].Tipo=req.body.Tipo;
                sensores[i].valor=req.body.valor;
                sensores[i].unidad=req.body.unidad;
                sensores[i].estado=req.body.estado;
                res.send(req.body);    
                return;
              }
            }
        
          }
            res.send({'type': 'error'});
});
    
// luces
app.get("/luces",function(req,res){
      res.send(luces);    
});

app.get("/luces/:ID",function(req,res){
  console.log(req.params.ID);
    if(req.params.ID>0){
      var luz={};
       luces.forEach(item=>{
    
        if(item.ID==req.params.ID){
        
          luz = item;
         
        }
      });
      res.send(luz);
      return; 
     
    }else{
        res.send({'type': 'error'});
        return; 
    }
  });

app.post("/luces",function(req,res){
    console.log(req.body);
    if((req.body.ubicacion!= undefined&&req.body.ubicacion!= "") &&(req.body.estado != undefined) 
        &&  (req.body.IP!= undefined)) {
        idLuces = idLuces +1;
        var data = {"ID":idLuces,"ubicacion":req.body.ubicacion,"estado":req.body.estado,"IP":req.body.IP};
        luces.push(data);
        res.send(data);    
        return;
        }
    res.send({'type': 'error'});    
});

app.put("/luces/:ID",function(req,res){
  
  if((req.body.ubicacion!= undefined)  
			&&  (req.body.IP!= undefined) && (req.body.estado!= undefined)){
				for(var i=0;i<luces.length;i++){
					if(req.params.ID == luces[i].ID){
            console.log("Actualiza luz")
						luces[i].ubicacion=req.body.ubicacion;
						luces[i].IP=req.body.IP;
            luces[i].estado=req.body.estado;
            console.log(luces[i]);
						res.send(req.body);    
						return;
					}
				}
		
      }
        res.send({'type': 'error'});
});

app.delete("/luces/:ID",function(req,res){
  console.log(req.params.ID);
  if(req.params.ID!= undefined){
	  for(var i =0;i<luces.length;i++){
					if(req.params.ID== luces[i].ID){
						luces.splice(i,1);
        	  var data = {"type":"ok"};
            res.send(data);
						return;
					}
				}
      }
  res.send({'type': 'error'});
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});