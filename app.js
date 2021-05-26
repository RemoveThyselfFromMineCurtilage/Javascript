
//Dinosaur Constructor
function Dinosaur(dino){
	this.species = dino.species;
	this.weight = dino.weight;
	this.height = dino.height;
	this.diet = dino.diet;
	this.where = dino.where;
	this.when = dino.when;
	this.fact = dino.fact;
}

// Create Dinosaur Objects from dinosaur data
function getDinosaurs(dinos){
	var dinoArray = [];
	dinos.forEach(function(dino){
		dinoArray.push(new Dinosaur(dino));
	});
	return dinoArray;
}

//Human Constructor
function Human(){
	this.name = null;
	//height in inches
	this.height = null;
	//weight in pounds
	this.weight = null;
	this.diet = null;
}

const GetHuman = (function () {
	
	const humanData = new Human();
	
	return function GetHuman(){
		humanData.name = document.getElementById("name").value;

		//Get the height fields from the form and convert to inches for easy comparison
		let formFeet = document.getElementById("feet").value;
		let formInches = document.getElementById("inches").value;
		humanData.height = Number(formFeet) * 12 + Number(formInches);
		
		humanData.weight = document.getElementById("weight").value;
	
		humanData.diet = document.getElementById("diet").value;
		
		return humanData;
	};
		
})();

//The multiplicative factor between an argument larger and smaller number
function diffFactor(largerNum, smallerNum){
	return Math.round((largerNum / smallerNum + Number.EPSILON  ) * 100) / 100;
}

//Compare the weight difference between argument dinosaur and human
function compareWeight(dino, human){
	let returnFact = "";
	let diff = 1;
	if(dino.weight > human.weight + 6)
	{
		diff = diffFactor(dino.weight, human.weight);
		returnFact = dino.species + " weighed about " + diff + " times more than you!";
	}	
	else if (dino.weight < human.weight - 6)
	{
		diff = diffFactor(human.weight, dino.weight);
		returnFact = "You weigh about " + diff + " times more than " + dino.species +" did!";
	}
	else 
	{
		returnFact = dino.species + " weighed about as much as you!";
	}
	return returnFact;
}

//Compare height between argument dinosaur and human
function compareHeight(dino, human){
	let returnFact = "";
	let diff = 1;
	if(dino.height > human.height + 6)
	{
		diff = diffFactor(dino.height, human.height);
		returnFact = dino.species + " was about " + diff + " times taller than you!";
	}	
	else if (dino.height < human.height - 6)
	{
		diff = diffFactor(human.height, dino.height);
		returnFact = "You were about " + diff + " times taller than " + dino.species +" !";
	}
	else 
	{
		returnFact = dino.species + " was about as tall as you!";
	}
	return returnFact;
}
    
//Compare the eating habits of the argument dinosaur and human
function compareDiet(dino, human){
	let returnFact = "";
	if(dino.diet == human.diet.toLowerCase())
	{
		returnFact = dino.species + " was a " + dino.diet + " like you!";
	}
	else if (dino.diet == "carnivor")
	{
		returnFact = dino.species + " might have thought you looked tasty!";
	}
	else if (dino.diet == "herbavor")
	{
		returnFact = dino.species + " might have stolen your lunch!";
	}
	return returnFact;
}

//Generate a fact to display for the argument dinosaur
function generateFact(dino, human){
	let dinoFact = "";
	let factNum = Math.floor(Math.random() * 5);	
	
	if(dino.species.toLowerCase() == "pigeon")
	{
		dinoFact = dino.fact;
		factNum = -1; //skip the switch
	}
	
	switch (factNum){
		case 0: //fact
			dinoFact = dino.fact;
			break;
		case 1: //when
			dinoFact = dino.species + " lived in the " + dino.when + " Period";
			break;
		case 2: //where
			dinoFact = dino.species + " lived in present-day " + dino.where;
			break;
		case 3: //diet
			dinoFact = compareDiet(dino, human);
			break;
		case 4: //height
			dinoFact = compareHeight(dino, human);
			break;
		case 5: //weight
			dinoFact = compareWeight(dino, human);
			break;		
		default: //The pigeon case
		break;
	}
	
	return dinoFact;
}


// Generate Tiles for each Dino in Array
function generateDinoTile(dino,human){
	var newTile = document.createElement("div");
	newTile.classList.add("grid-item");
	
	var tileH3 = document.createElement("h3");
	tileH3.innerHTML = dino.species;
	newTile.appendChild(tileH3);
	
	var tileImage = document.createElement("img");
	tileImage.setAttribute("src", "images/"+dino.species.toLowerCase()+".png")
	newTile.appendChild(tileImage);
	
	var tileFact = document.createElement("p");
	tileFact.innerHTML = generateFact(dino, human);
	newTile.appendChild(tileFact);
	
	return newTile;
}

// Generate Human Tile
function generateHumanTile(human){
	var newTile = document.createElement("div");
	newTile.classList.add("grid-item");
	
	var tileH3 = document.createElement("h3");
	tileH3.innerHTML = human.name;
	newTile.appendChild(tileH3);
	
	var tileImage = document.createElement("img");
	tileImage.setAttribute("src", "images/human.png")
	newTile.appendChild(tileImage);
	
	return newTile;
}
  
//Create and add tiles to the display
function displayTiles(human){
	//Get Dinosaurs
	var dinoObjects = getDinosaurs(DINO_DATA);
	
	//Generate tiles and add them to the grid
	var mainGrid = document.getElementById("grid");
	
	for(let i = 0; i < dinoObjects.length; i++){
		mainGrid.appendChild(generateDinoTile(dinoObjects[i], human));
		if(i == 3){
			mainGrid.appendChild(generateHumanTile(human));
		}
	}
}	

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function(){	
	var humanData = GetHuman();
	
	// Hide form
	document.getElementById("dino-compare").style.display = "none";
	
	// Display Tiles
	displayTiles(humanData);
});


//Provided Dinosaur data
const DINO_DATA = [
	{
		"species": "Triceratops",
		"weight": 13000,
		"height": 114,
		"diet": "herbavor",
		"where": "North America",
		"when": "Late Cretaceous",
		"fact": "First discovered in 1889 by Othniel Charles Marsh"
	},
	{
		"species": "Tyrannosaurus Rex",
		"weight": 11905,
		"height": 144,
		"diet": "carnivor",
		"where": "North America",
		"when": "Late Cretaceous",
		"fact": "The largest known skull measures in at 5 feet long."
	},
	{
		"species": "Anklyosaurus",
		"weight": 10500,
		"height": 55,
		"diet": "herbavor",
		"where": "North America",
		"when": "Late Cretaceous",
		"fact": "Anklyosaurus survived for approximately 135 million years."
	},
	{
		"species": "Brachiosaurus",
		"weight": 70000,
		"height": "372",
		"diet": "herbavor",
		"where": "North America",
		"when": "Late Jurasic",
		"fact": "An asteroid was named 9954 Brachiosaurus in 1991."
	},
	{
		"species": "Stegosaurus",
		"weight": 11600,
		"height": 79,
		"diet": "herbavor",
		"where": "North America, Europe, Asia",
		"when": "Late Jurasic to Early Cretaceous",
		"fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
	},
	{
		"species": "Elasmosaurus",
		"weight": 16000,
		"height": 59,
		"diet": "carnivor",
		"where": "North America",
		"when": "Late Cretaceous",
		"fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
	},
	{
		"species": "Pteranodon",
		"weight": 44,
		"height": 20,
		"diet": "carnivor",
		"where": "North America",
		"when": "Late Cretaceous",
		"fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
	},
	{
		"species": "Pigeon",
		"weight": 0.5,
		"height": 9,
		"diet": "herbavor",
		"where": "World Wide",
		"when": "Holocene",
		"fact": "All birds are living dinosaurs."
	}
    ];