"use strict";

/* 
*
* great thanks to  mr srini devadas from MIT :)
* such a great lecture !
* N.B:if  you want to change the grid 
* then do so by changing "grid" variable
* and no more !
* make sure it stays an X by X puzzle :x
*
*/

const grid=[

    [0,0,6,0,8,9,0,0,0],
    [7,5,4,2,0,3,0,0,0],
    [8,0,0,0,7,0,2,0,3],
    [5,0,8,9,1,0,3,0,2],
    [0,0,0,0,0,0,0,0,0],
    [9,0,2,0,4,5,8,0,7],
    [6,0,5,0,3,0,0,0,8],
    [0,0,0,4,0,6,5,3,1],
    [0,0,0,8,5,0,9,0,0],

];


function isLineValid(i,j,e){

    // check if e can be put on :
    // the vertical jth line 
    // or the horizental ith line

    for(let k = 0;k < grid.length;++k){

        if((grid[i][k] == e && k != j)
            ||(grid[k][j] == e && k != i)){

            return false;
        }
    }

    return true;
}

function isSquareValid(i,j,e){

    // check the 3X3 square
    let squareLeftTopX = i - (i % 3); // top is always  multiple of 3
    let squareLeftTopY = j - (j % 3);

    for(let k = squareLeftTopX;k < squareLeftTopX + 3;++k){
        for(let q = squareLeftTopY;q < squareLeftTopY + 3;++q){
            if(grid[k][q] == e && k != i && q != j){
                return false;
            }
        }
    }

    return true;
}


function isValid(i,j,e){

    //check if e can be put in postion (i,j)
    return isLineValid(i,j,e) && isSquareValid(i,j,e);
}


function findNext(){

    // might as well start from the last grid r8 ?
    for(let i = 0;i < grid.length;++i){
        for(let j = 0;j < grid.length;++j){
            if(grid[i][j] == 0){
                return [i,j];
            }
        }
    }

    // if the whole grid  has been scanned;
    return [-1,-1];
}


function sudokuIsCompleted(){

    for(let i = 0;i < 9;++i){
        for(let j = 0;j < 9;++j){
            if(!isValid(i,j,grid[i][j])){
                return false;
            }
        }
    }

    return true;
}

function solve(i=0,j=0){

    if(i == -1 && j == -1){
        return true;
    }

    for(let e = 1;e <= 9;++e){

        if(isValid(i,j,e)){

            grid[i][j] = e; // put e in pos(i,j)

            if(solve(...findNext())){
                return true;
            }else{
                grid[i][j] = 0; // cleanup
            }  
        }
    
    }


    return false;

}

//fin.
