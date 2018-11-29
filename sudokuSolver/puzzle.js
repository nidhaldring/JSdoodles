"use strict";

let canvas=document.getElementById("canvas");
let cxt=canvas.getContext("2d");
// create grid ;
let r=canvas.width/l;
// a constant used to better align numbers
let c=r/2;

function drawSudoku(){
	//clear everything 
	cxt.clearRect(0, 0, canvas.width, canvas.height);
	// draw grid lines ;
	cxt.beginPath();
	cxt.lineWidth=1.75;
	for(let i=0;i<=canvas.width;i+=r){
		cxt.moveTo(i,0);
		cxt.lineTo(i,canvas.height);
		cxt.moveTo(0,i);
		cxt.lineTo(canvas.width,i);
		cxt.strokeStyle="red";
		cxt.stroke();
	}

	// draw grid numbers ;
	cxt.beginPath();
	cxt.font="30px Arial";
	for(let i=0;i<l;++i){
		for(let j=0;j<l;++j){
			cxt.fillText(grid[i][j],i*r+c,j*r+c);
		}
	}
	cxt.strokeStyle="black";
	cxt.stroke();
}

// when included draw provided grid
drawSudoku();
