"use strict";

// great thanks to  mr srini devadas from MIT :)
// such a great lecture !

// hey there ! 
// if  you want to change the grid 
// then do so by changin "grid" varriable
// no more !
// make sure it stays X by X puzzle :x

let grid=[
[7,0,0,0,0,0,2,0,0],
[4,0,2,0,0,0,0,0,3],
[0,0,0,2,0,1,0,0,0],
[3,0,0,1,8,0,0,9,7],
[0,0,9,0,7,0,6,0,0],
[6,5,0,0,3,2,0,0,1],
[0,0,0,4,0,9,0,0,0],
[5,0,0,0,0,0,1,0,6],
[0,0,6,0,0,0,0,0,8],
];

let l=grid.length;

function isValid(i,j,e){
	//check hor and ver 
	for(let k=0;k<l;++k){
		if(grid[i][k] == e || grid[k][j] == e)
			return false;
	}
	let topX = i-i%3;
	let topY=j-j%3;

	for(let i=topX;i<topX+3;++i){
		for(let j=topY;j<topY+3;++j)
			if(grid[i][j] == e)
				return false;
	}
	return true;
}

function findNext(){
	// might as well start from the last grid r8 ?
	for(let i=0;i<l;++i){
		for(let j=0;j<l;++j){
			if(grid[i][j] == 0)
				return new Array(i,j);
		}
	}
	// if the whole grid is finished;
	return new Array(-1,-1);
}

function solve(i=0,j=0){
	// find grid *coughs blood*	
	if(i == -1)
		return true;
	// fin ;
	// if i've reached the end of the sudoku 

	// if not then solve :
	for(let h=1;h<=9;++h){
		if(isValid(i,j,h)){
			grid[i][j]=h;
			if(solve(...findNext()))
				return true;
			
			else
				grid[i][j]=0;
				// clean my mess
				// yup go and try another h !	
		}
	
	}

	return false;

}

//solve();
// print solved grid;
/*
for(let i of grid){
	console.log(i);
	console.log("");
}
*/
