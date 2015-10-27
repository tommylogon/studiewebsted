window.onload=oppstart;

function oppstart(){
	document.getElementById("btnStart").onclick = main;
	document.getElementById("btnAiOn").onclick = AIOn;
	document.getElementById("btnAiOff").onclick = AIOff;
	document.getElementById("btnMissile").onclick = fireMissileOn;
	document.getElementById("btnPause").onclick = pause;
	
	alert("This is a game based on selecting the right ship to destroy your opponents, you select your ship in the left side and can select your own ships to fight in the other side");
}
var barLength = [200,200,200,200,200,200];
var imgLength = [100,120,150,180,200,250];
var dead = [0,0,0,0,0,0];
var chargeTime = [0,0,0,0,0,0];
var tick;
var tick2;
var AI;
var a=0;
var fireMissile=0;
function AIOn(){
	AI=true;
}
function AIOff(){
	AI=false;
}
function fireMissileOn(){
		fireMissile=1;
}
function pause(){
	clearInterval(tick);
}
function main(){
		document.getElementById("slot0").innerHTML = "";
		document.getElementById("slot1").innerHTML = "";
		document.getElementById("slot2").innerHTML = "";
		document.getElementById("slot3").innerHTML = "";
		document.getElementById("slot4").innerHTML = "";
		document.getElementById("slot5").innerHTML = "";
			barLength = [200,200,200,200,200,200];
			dead = [0,0,0,0,0,0];
			chargeTime = [0,0,0,0,0,0];
			
		var selectedShips = findSelectedShips();
		var ships = stats();
		var slot = [document.getElementById("slot0"),document.getElementById("slot1"),document.getElementById("slot2"),document.getElementById("slot3"),document.getElementById("slot4"),document.getElementById("slot5"),];
		var healthLeft = findHealthLeft(selectedShips,ships);
		var powerLeft = findPowerLeft (selectedShips,ships);
		var ammoLeft = findAmmoLeft (selectedShips,ships);
		var missileLeft = findMissileLeft (selectedShips,ships);
		displayPicture(selectedShips,ships,slot);
		lifeBarSetup(selectedShips,ships,slot,healthLeft);
		tick = setInterval(function(){targeting(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft);},250);

	
}
function displayPicture(selectedShips,ships,slot){
		document.getElementById("slot0").innerHTML = "";
		document.getElementById("slot1").innerHTML = "";
		document.getElementById("slot2").innerHTML = "";
		document.getElementById("slot3").innerHTML = "";
		document.getElementById("slot4").innerHTML = "";
		document.getElementById("slot5").innerHTML = "";
		
		for(var i=0;i<=5;i++){
			var	img = document.createElement("img");
			if(i<=2){
				img.src=ships[selectedShips[i]].imageLeft;
				img.id="shipPicture"+i;
				img.width=ships[selectedShips[i]].imageWidth;
				if(i===0){
					slot[i].appendChild(img);
					slot[i].innerHTML += "<br/>"
				}
				else if(i===1){
					slot[i].appendChild(img);
					slot[i].innerHTML += "<br/>"
				}
				else if(i===2){
					slot[i].appendChild(img);
					slot[i].innerHTML += "<br/>"
				}
				
			}
			else{						
				img.src=ships[selectedShips[i]].image;
				img.id="shipPicture"+i;
				img.width=ships[selectedShips[i]].imageWidth;
				if(i===3){
					slot[i].appendChild(img);	
					slot[i].innerHTML += "<br/>"					
				}
				else if(i===4){
					slot[i].appendChild(img);
					slot[i].innerHTML += "<br/>"
				}
				else if(i===5){
					slot[i].appendChild(img);
					slot[i].innerHTML += "<br/>"
				}
			}
		}		
}
function stats(){
	var merlin		= {rofPhysical:600,rofEnergy:400,rofDisrupt:0,damagePhysical:27,damageEnergy:64,damageDisrupt:0,damageMissile:0,numMissiles:0,powerLimit:500,ammoCap:420,powerConsumtion:25,powerChargeRate:25,health:2400,dodge:35,imageWidth:60,image:"colorpictures/merlinRight.jpg",imageLeft:"colorpictures/merlinLeft.jpg",name:"Merlin"};
	var gladius		= {rofPhysical:750,rofEnergy:1100,rofDisrupt:0,damagePhysical:25,damageEnergy:34,damageDisrupt:0,damageMissile:275+600,numMissiles:6,powerLimit:500,ammoCap:1000,powerConsumtion:30,powerChargeRate:44,health:2730,dodge:23,imageWidth:100,image:"colorpictures/gladiusRight.jpg",imageLeft:"colorpictures/gladiusLeft.jpg",name:"Gladius"};
	var avenger		= {rofPhysical:600,rofEnergy:0,rofDisrupt:240,damagePhysical:21,damageEnergy:0,damageDisrupt:150,damageMissile:275,numMissiles:8,powerLimit:500,ammoCap:1200,powerConsumtion:100,powerChargeRate:27,health:3400,dodge:16,imageWidth:150,image:"colorpictures/avengerRight.jpg",imageLeft:"colorpictures/avengerLeft.jpg",name:"Avenger"};
	var hornet		= {rofPhysical:1800,rofEnergy:1100,rofDisrupt:0,damagePhysical:56,damageEnergy:92,damageDisrupt:0,damageMissile:175,numMissiles:8,powerLimit:500,ammoCap:900,powerConsumtion:60,powerChargeRate:22,health:3725,dodge:12,imageWidth:160,image:"colorpictures/hornetRight.jpg",imageLeft:"colorpictures/hornetLeft.jpg",name:"Hornet"};
	var redeemer	= {rofPhysical:900,rofEnergy:300,rofDisrupt:0,damagePhysical:180,damageEnergy:150,damageDisrupt:0,damageMissile:450,numMissiles:10,powerLimit:500,ammoCap:2880,powerConsumtion:15,powerChargeRate:13,health:7230,dodge:9,imageWidth:200,image:"colorpictures/redeemerRight.jpg",imageLeft:"colorpictures/redeemerLeft.jpg",name:"Redeemer"};
	var retaliator	= {rofPhysical:0,rofEnergy:1100,rofDisrupt:0,damagePhysical:0,damageEnergy:170,damageDisrupt:0,damageMissile:1500,numMissiles:6,powerLimit:500,ammoCap:0,powerConsumtion:150,powerChargeRate:8.9,health:18800,dodge:4,imageWidth:300,image:"colorpictures/retaliatorRight.jpg",imageLeft:"colorpictures/retaliatorLeft.jpg",name:"Retaliator"};
	return [merlin,gladius,avenger,hornet,redeemer,retaliator];
}

function findSelectedShips(){
	var ship1 = document.getElementById("ship1").value;
	var ship2 = document.getElementById("ship2").value;
	var ship3 = document.getElementById("ship3").value;
	if(AI === true){
		var ship4 =Math.floor(Math.random()*6) ;
		var ship5 =Math.floor(Math.random()*6) ;
		var ship6 =Math.floor(Math.random()*6) ;
	}
	else{
		var ship4 = document.getElementById("ship4").value;
		var ship5 = document.getElementById("ship5").value;
		var ship6 = document.getElementById("ship6").value;	
	}
	return[ship1,ship2,ship3,ship4,ship5,ship6];
}
function findHealthLeft(selectedShips,ships){
	var healthArray=[];
	for(var i=0;i<=5;i++){
		healthArray[i]=ships[selectedShips[i]].health;
	}
	return healthArray;
}

function findPowerLeft (selectedShips,ships){
	var charge=[];
	for(var i=0;i<=5;i++){
		charge[i]=0//ships[selectedShips[i]].powerLimit;
	}
	return charge;
}
function findAmmoLeft (selectedShips,ships){
	var ammo=[];
	for(var i=0;i<=5;i++){
		ammo[i]=ships[selectedShips[i]].ammoCap;
	}
	return ammo;
}
function findMissileLeft (selectedShips,ships){
	var ammo=[];
	for(var i=0;i<=5;i++){
		ammo[i]=ships[selectedShips[i]].numMissiles;
	}
	return ammo;
}
function lifeBarSetup(selectedShips,ships,slot,healthLeft){
	
	
	for(var i=0;i<=5;i++){
		var shrinker =healthLeft[i]/ships[selectedShips[i]].health;
		
		var newLifeBar = document.createElement("img");
			newLifeBar.src = "green.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*shrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+Math.floor(healthLeft[i])+"/"+ships[selectedShips[i]].health+"HP"+"<br/>";
		
	}
}

function chargePower(selectedShips,ships,powerLeft,num1){
	if(chargeTime[num1]===0){
		chargeTime[num1]=ships[selectedShips[num1]].powerLimit/ships[selectedShips[num1]].powerChargeRate;
		chargeTime[num1]=Math.floor(chargeTime[num1]) ;

	}
}
function newChargeBar(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft){
	for(var i=0;i<=5;i++){
		var powerShrinker = powerLeft[i]/ships[selectedShips[i]].powerLimit;
		var shipStatus = checkShipStatus(selectedShips,ships,slot,healthLeft,i);
		
		if(dead[i] ===1){
			continue;
		}
		if(chargeTime[i]!=0){
			powerLeft[i]+=ships[selectedShips[i]].powerChargeRate;
			
			var newLifeBar = document.createElement("img");
			newLifeBar.src = "yellow.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*powerShrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+powerLeft[i]+"/"+ships[selectedShips[i]].powerLimit+" Power"+"<br/>";
			
			chargeTime[i]--;
			continue;
		}
		
		powerLeft[i] -=ships[selectedShips[i]].powerConsumtion;
		
		var newLifeBar = document.createElement("img");
			newLifeBar.src = "yellow.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*powerShrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+powerLeft[i]+"/"+ships[selectedShips[i]].powerLimit+" Power"+"<br/>";
		
		
		if(powerLeft[i]>=ships[selectedShips[i]].powerConsumtion){
			shooter=ships[selectedShips[i]];
			findTargetEnergy(selectedShips,ships,slot,shooter,healthLeft,i,powerLeft,ammoLeft);
		}
		else if(powerLeft[i]<=0){
			if(i===6){
				i=-1;
			setTimeout(function(){chargePower(selectedShips,ships,powerLeft,i);},ships[selectedShips[i]].speed*1000);

			}
			else{
				chargePower(selectedShips,ships,powerLeft,i);
			}
		}
	}
	
}
function newAmmoBar(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft){
	for(var i=0;i<=5;i++){
		var ammoShrinker = ammoLeft[i]/ships[selectedShips[i]].ammoCap;
		var shipStatus = checkShipStatus(selectedShips,ships,slot,healthLeft,i);
		
		if(dead[i] ===1){
			continue;
		}
		if(powerLeft[i]<=0){
			var newLifeBar = document.createElement("img");
			newLifeBar.src = "red.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*ammoShrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+ammoLeft[i]+"/"+ships[selectedShips[i]].ammoCap+" Ammo"+"<br/>";
			slot[i].innerHTML+="<br/>"+missileLeft[i]+"/"+ships[selectedShips[i]].numMissiles+" missiles"+"<br/>";
			continue;
		}
		
		var newLifeBar = document.createElement("img");
			newLifeBar.src = "red.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*ammoShrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+ammoLeft[i]+"/"+ships[selectedShips[i]].ammoCap+" Ammo"+"<br/>";
			slot[i].innerHTML+="<br/>"+missileLeft[i]+"/"+ships[selectedShips[i]].numMissiles+" missiles"+"<br/>";
			
		if(ammoLeft[i]>=ships[selectedShips[i]].rofPhysical/60){
			shooter=ships[selectedShips[i]];
			findTargetPhysical(selectedShips,ships,slot,shooter,healthLeft,i,powerLeft,ammoLeft);
		}
	}
}	
function targeting(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft){
	document.getElementById("pTicks").innerHTML = a;
	a++;
	if(fireMissile===1){
		fireMissile=0;
		var selSide=1;
		selSide+Math.random();
		if(selSide>0.5){
		var num1=	Math.floor(Math.random()*3)
		var num2 = 3+Math.floor(Math.random()*2)
		}
		else{
		var num2=	Math.floor(Math.random()*3)
		var num1 = 3+Math.floor(Math.random()*2)
		}
		findTargetMissile(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft,num1,num2)
	}
	var shrinker=1;
	displayPicture(selectedShips,ships,slot);
	lifeBar(selectedShips,ships,slot,healthLeft,shrinker);
	newChargeBar(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft);
	newAmmoBar(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft);
	checkIfWon();

}
function lifeBar(selectedShips,ships,slot,healthLeft,shrinker){
		
	
	for(var i=0;i<=5;i++){
			
		shrinker= healthLeft[i]/ships[selectedShips[i]].health;
		if(dead[i] ===1){
			continue;
		}
		var shipStatus = checkShipStatus(selectedShips,ships,slot,healthLeft,i);
		
		if(healthLeft[i]===ships[selectedShips[i]].health){
			
			var newLifeBar = document.createElement("img");
			newLifeBar.src = "green.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i];
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+Math.floor(healthLeft[i])+"/"+ships[selectedShips[i]].health+" Hp"+"<br/>";
			
		}
		else{
			var newLifeBar = document.createElement("img");
			newLifeBar.src = "green.png";
			newLifeBar.height="10";
			newLifeBar.width= barLength[i]*shrinker;
			slot[i].appendChild(newLifeBar);
			slot[i].innerHTML+="<br/>"+Math.floor(healthLeft[i])+"/"+ships[selectedShips[i]].health+" Hp"+"<br/>";

		}
		
				
	}
}

function checkShipStatus(selectedShips,ships,slot,healthLeft,i){
	
	for(i=0;i<=5;i++){
		if(dead[i] == 1){
			continue;
		}
		if(healthLeft[i]<=0){
			alert(ships[selectedShips[i]].name + "  is destroyed.");
			dead[i] = 1;
			return dead;
		}
	}
}
function findTargetEnergy(selectedShips,ships,slot,shooter,healthLeft,num1,powerLeft,ammoLeft){
	var target=0;
	var shooter = num1;
	var player1=[0,1,2];
	var player2=[-1,-1,-1,3,4,5];
	var shotPerSecEnergy = ships[selectedShips[num1]].rofEnergy/120;
	var shotPerSecDisrupt = ships[selectedShips[num1]].rofDisrupt/120;
	var powerPerShot  =  ships[selectedShips[num1]].powerConsumtion;
		powerLeft[num1] -= powerPerShot;
		powerLeft[num1]=Math.floor(powerLeft[num1]);
		if(player1[shooter]==shooter){
			var num2 = 3+Math.floor(Math.random()*3);
			if(dead[num2]===1){
				var num2 = 3+Math.floor(Math.random()*3);
			}
			else{
				if(powerLeft[num1]!=0 || powerLeft[num1]<0){
					healthLeft[num2]-=ships[selectedShips[shooter]].damageEnergy*Math.random()*shotPerSecEnergy;
					powerLeft[num2]-=ships[selectedShips[shooter]].damageDisrupt*Math.random()*shotPerSecDisrupt;
				}

			}
				
		}
		if(player2[shooter]==shooter){
			var num2 = Math.floor(Math.random()*3);
			if(dead[num2]===1){
					num2 = Math.floor(Math.random()*3);
			}
			else{
				if(powerLeft[num1]!=0 || powerLeft[num1]<0){
				healthLeft[num2]-=ships[selectedShips[shooter]].damageEnergy*Math.random()*shotPerSecEnergy;
					
				}

			}
		
		
		
		
			
	}
}
function findTargetPhysical(selectedShips,ships,slot,shooter,healthLeft,num1,powerLeft,ammoLeft){
	var target=0;
	var shooter = num1;
	var player1=[0,1,2];
	var player2=[-1,-1,-1,3,4,5];
	var shotPerSecPhysical = ships[selectedShips[num1]].rofPhysical/120;
		var powerPerShot  =  shotPerSecPhysical;
		powerLeft[num1] -= powerPerShot;
		ammoLeft[num1]-= shotPerSecPhysical;
		
		if(player1[shooter]==shooter){
			var num2 = 3+Math.floor(Math.random()*3);
			if(dead[num2]===1){
				var num2 = 3+Math.floor(Math.random()*3);
			}
			else{
				if(ammoLeft[num1]!=0 || !ammoLeft[num1]<0){
					healthLeft[num2]-=ships[selectedShips[shooter]].damagePhysical *Math.random()*shotPerSecPhysical;
				}

			}
				
		}
		if(player2[shooter]==shooter){
			var num2 = Math.floor(Math.random()*3);
			if(dead[num2]===1){
					num2 = Math.floor(Math.random()*3);
			}
			else{
					
				if(ammoLeft[num1]!=0 || !ammoLeft[num1]<0){
					healthLeft[num2]-=ships[selectedShips[shooter]].damagePhysical *Math.random()*shotPerSecPhysical;
				}

			}
		}
}
function findTargetMissile(selectedShips,ships,slot,healthLeft,powerLeft,ammoLeft,missileLeft,num1,num2){
	var target=num2;
	var shooter = num1;
	var player1=[0,1,2];
	var player2=[-1,-1,-1,3,4,5];
		
		if(player1[shooter]==shooter){
			if(missileLeft[num1]===0){
				
			}
			else{
				healthLeft[num2]-=ships[selectedShips[shooter]].damageMissile*Math.random();
					missileLeft[num1]--;
			}
					
				
		}
		if(player2[shooter]==shooter){
			if(missileLeft[num1]===0){
				
			}
			else{
				healthLeft[num2]-=ships[selectedShips[shooter]].damageMissile*Math.random();
					missileLeft[num1]--;
			}
				
	}
}

function checkIfWon(){
		if(dead[0]===1&&dead[1]===1&&dead[2]===1){
			clearInterval(tick);
			alert("player1 lost")
		}
		if(dead[3]===1&&dead[4]===1&&dead[5]===1){
			clearInterval(tick);
			alert("player2 lost")
		}
}