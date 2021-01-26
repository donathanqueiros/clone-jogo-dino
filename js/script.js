const dino = document.querySelector('.dinossauro');
const background = document.querySelector('.background-screen');
const numScore = document.querySelector('.numScore');
const maxScoreDoc = document.querySelector('.maxScore');
const buttonStart = document.querySelector('.startButton');

const velocidadePulo = 5;

let isJumping = false;
let isDown = false;
let isCounting = false;
let position = 0;


let veloDecidaDown = 1;
let velocidadeCactus = 30;

let tamanhoTela = window.screen.availWidth;

let maxScore = 0;


function start(){
	buttonStart.disabled = true;
	startScore();
	createCactus();
	background.removeChild(0);

}


function gameOver(){
	buttonStart.disabled = false;
	stopScore();
	document.body.innerHTML = '<h1 class="game-over">Fim de jogo </h1><div class = "contStart"><button class="startButton" onclick="window.location.reload();">Restart</button></div>';

}


function createCactus(){
	const cactus = document.createElement('div');
	let cactusPosition = tamanhoTela;
	var stop = false;

	let randomTime =  Math.random() * 6000;

	if (randomTime < 800){
		randomTime = 800;
	}

	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = tamanhoTela + 'px';

	let leftInterval = setInterval(() =>{
		
		if(cactusPosition < -60){
			//limpar cactus

			clearInterval(leftInterval);
			background.removeChild(cactus);
			
		} else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			// Game over

			clearInterval(leftInterval);
			gameOver();
	


		}else{
			// mover cactus

			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';

		}



	}, velocidadeCactus); 

		setTimeout(createCactus, randomTime);

}



function jump(){	

	isJumping = true;

	let upInterval = setInterval(() =>{
		if(position >=150 || isDown){
			clearInterval(upInterval);

			let downInterval = setInterval(() =>{
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false;
				}else if(position - veloDecida > 0){
					position -= veloDecida;
				}else{
					position = 0;
				}

				dino.style.bottom = position + 'px';

			}, velocidadePulo);


		}else{

			position += pos;
			dino.style.bottom = position + 'px';

		};
	}, velocidadePulo);
}




function handleKeyUp(event){

	isDown = false;
	dino.style.backgroundImage = "url('./img/dino.png')"
	dino.style.width = 60 +'px';
	dino.style.height = 60 + 'px';
	veloDecidaDown = 10;
	veloDecida = 2;

}

function handleKeyDown(event){

	if(event.keyCode === 32 || event.keyCode === 38){
		if(!isJumping){
			jump();	
		}
	}

	if(event.keyCode === 40 ){
		if (!event.repeat){

			down();
		}else{
			down();
		}
	}
};

let pos = 3;
let veloDecida = 2;




function down(){

	isDown = true;

	if(isDown){
		dino.style.backgroundImage = "url('./img/dinoDeitado.png')";
		dino.style.backgroundPosition = 'bottom left';
		dino.style.width = 75 +'px';
		dino.style.height = 40 + 'px';
	}
	
	veloDecida +=2;
}

let veloScore = 100; 

function Score(){
	let cont = 0;
	let startContador = setInterval(() =>{
		if(isCounting){
			numScore.innerHTML = cont.toString(); 
			cont++;	
		}else{
			clearInterval(startContador);
			maxScore = cont > maxScore ? cont : maxScore;
			maxScoreDoc.innerHTML = maxScore.toString();
		}
		

	},veloScore);
}

function startScore(){
	isCounting = true;
	Score();
}

function stopScore(){
	isCounting = false;
	
}


document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keydown', handleKeyDown);