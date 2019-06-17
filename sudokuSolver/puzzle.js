"use strict";


const inputs = [];

function createCellWithInputAt(x,y,side){

	let cell;
	let color = "background-color: #ffffff;";

	if(grid[x][y] != 0){
		cell = createInput(grid[x][y].toString());
		cell.attribute("readonly",true);
		color = "color:#62fc79; background-color: #000000;";
	}else{
		cell = createInput("");
	}


	cell.attribute("style","font-size:35px;" + color);
	cell.size(side,side);
	cell.position(side * y,side * x);

	return cell;
}


function createCellAt(x,y,side){

	let cell = createCellWithInputAt(x,y,side);

	// + is added to transform the input into a number
	cell.input((e) => {

		let input = +e.data;
		if(!Number.isNaN(input) && input > 0){
			cell.value(input);
		}else{

			if(!Number.isNaN(+(cell.value()[0]))){
				cell.value(cell.value()[0]);
			}else{
				cell.value("");
			}

		}	

	}); 

	
	return cell;
}


function getCellAt(x,y){

	return inputs[x*9 + y];
}


function createSudoku(){

	const side = 50; 
	for(let i = 0;i < 9;++i){
		for(let j = 0;j < 9;++j){
			inputs.push(createCellAt(i,j,side));
		}
	}
}

function updateSudoku(){

	for(let i = 0;i < 9;++i){
		for(let j = 0;j < 9;++j){
			let cell = getCellAt(i,j);
			cell.value(grid[i][j]);
			cell.attribute("readonly",true);
		}
	}
}

	
function setup(){

	createCanvas(450,450);
	createSudoku();
}


