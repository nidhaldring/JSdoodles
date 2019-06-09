

class Grid{

	constructor(){

		this.grid = this.createGrid();
		this.score = 0;

		this.blocked = false;
	}

	getRandomCell(){

		let x = Math.floor(Math.random() * 4);
		let y = Math.floor(Math.random() * 4)
		return [x,y];
	}

	createGrid(){

		let grid = [

			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],

		];

		let [x,y] = this.getRandomCell();
		grid[x][y] = 2;

		return grid;
	}

	draw(){

		background(0);
		stroke(255,0,0);
		rect(0,0,400,400);

		const side = Math.trunc(400 / this.grid.length);
		for(let i = 0;i < this.grid.length;++i){
			for(let j = 0;j < this.grid.length;++j){
				fill(120,100,0);
				square(j * side,i * side,side,10);

				if(this.grid[i][j] != 0){
					fill(0,255,20);
					textSize(side - (this.grid[i][j] + "").length);
					textAlign(LEFT, TOP);
					text(this.grid[i][j],j * side,i * side);
				}
			}
		}
	}

	moveCell(x,y,i,j){

		let nextX = x + i; 
		let nextY = y + j;

		if(this.grid[x][y] == 0 
			|| nextX < 0 
			|| nextX >= this.grid.length 
			|| nextY < 0 
			|| nextY >= this.grid.length){

			return;
		}

		if(this.grid[nextX][nextY] == 0){
			this.grid[nextX][nextY] = this.grid[x][y];
			this.grid[x][y] = 0;
			this.moveCell(nextX,nextY,i,j);
		}else if(this.grid[nextX][nextY] == this.grid[x][y]){
			this.grid[nextX][nextY] *= 2;
			this.score += this.grid[nextX][nextY];
			this.grid[x][y] = 0;
		}
	}


	moveUp(){

		for(let i = 1;i < this.grid.length;++i){
			for(let j = 0;j < this.grid.length;++j){
				this.moveCell(i,j,-1,0);
			}
		}	
	}

	moveDown(){

		for(let i = this.grid.length - 2;i >= 0;--i){
			for(let j = 0;j < this.grid.length;++j){
				this.moveCell(i,j,1,0);	
			}	
		}
	}

	// <-
	moveLeft(){

		for(let i = 0;i < this.grid.length;++i){
			for(let j = 1;j < this.grid.length;++j){
				this.moveCell(i,j,0,-1);
			}
		}
	}

	// ->
	moveRight(){

		for(let i = 0;i < this.grid.length;++i){
			for(let j = this.grid.length - 2;j >= 0;--j){
				this.moveCell(i,j,0,1);
			}
		}

	}


	move(key){

		switch(key){
			case UP_ARROW:
				this.moveUp();
				break;
			case DOWN_ARROW:
				this.moveDown();
				break;
			case LEFT_ARROW:
				this.moveLeft();
				break;
			case RIGHT_ARROW:
				this.moveRight();
				break;
		}
	}

	isBlocked(){

		if(this.blocked){
			return true;
		}

		let unmovableCells = 0;
		for(let i = 0;i < this.grid.length;++i){
			for(let j = 0;j < this.grid.length;++j){

				if(this.grid[i][j] == 0){
					return false;
				}

				if( (i < (this.grid.length - 1) 
						&& this.grid[i][j] != this.grid[i+1][j])
					|| (i > 0 && this.grid[i][j] != this.grid[i-1][j])
					|| (j < (this.grid.length - 2) 
							&& this.grid[i][j] != this.grid[i][j+1])
					|| (j > 0 && this.grid[i][j] != this.grid[i][j-1])){
					
					unmovableCells++;
				}
			}
		}

		return unmovableCells === Math.pow(this.grid.length,2);
	}

	createRandomCell(value){

		let x,y;
		do{
			[x,y] = this.getRandomCell();
		}while(this.grid[x][y] != 0);

		const random = () => ([2,4,8])[Math.floor(Math.random() * 3)];
		this.grid[x][y] = value || random();
	}
	

	update(key){

		this.move(key);
		if(!this.isBlocked()){
			this.createRandomCell();
		}else{
			this.blocked = true;
		}
	}

}