"use strict";

// great thanks to  mr srini devadas from MIT :)
// such a great lecture !

// hey there ! 
// if  you want to change the grid 
// then do so by changing "grid" variable
// no more !
// make sure it stays X by X puzzle :x

const grid=[
[0,0,1,4,0,5,0,0,2],
[0,6,7,0,0,1,0,0,0],
[9,0,0,0,8,0,7,3,0],
[0,0,0,0,0,9,3,4,8],
[0,0,0,0,1,6,0,0,9],
[7,2,0,0,0,0,0,5,0],
[0,0,0,2,0,0,0,0,0],
[5,4,0,0,0,0,6,0,0],
[8,0,0,3,0,0,0,1,4],
];
const l=grid.length;

// rotate the matirx 
// transpose in place
for(let i=0;i<l-1;++i){
	for(let j=i+1;j<l;++j){
		let tmp=grid[i][j];
		grid[i][j]=grid[j][i];
		grid[j][i]=tmp;
	}
}



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
				return [i,j];
		}
	}
	// if the whole grid  has been scanned;
	return [-1,-1];
}

function solve(i=0,j=0){
	// find grid *coughs blood*	
	if(i == -1){
		alert("solved !");
		return true;
	}
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

	// if no value was found to be put into that grid
	// than backtrack
	// smthng is wrong with the previous choices !
	return false;

}

//fin.
