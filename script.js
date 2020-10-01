const playAgainBtn = document.getElementById('replay-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification');
const finalMessage = document.getElementById('final-message');
const figure = document.querySelectorAll('.figure-parts');
const word = document.getElementById('word');
const wrongLetter = document.getElementById('wrong-letter')

const words = ['programming', 'coding', 'education', 'history','encyclopedia','examination', 'congragulation'];
let selectedWords = words[Math.floor(Math.random() * words.length)];

const correctWords = [];
const wrongWords = [];


function displayWord () {
	word.innerHTML=
		`${selectedWords.split('')
		.map(letter => 
			`<span class='letter'>
				${correctWords.includes(letter) ? letter : ' '}
			</span>`
		)
		.join('')
	}`;
	const innerWord = word.innerText.replace(/\n/g , '');
	
	if(innerWord === selectedWords){
		finalMessage.innerText='Congragulation you have won!😍';
		popup.style.display='flex';
	}
} 
displayWord()


//WRONG WORD FUNCTION

//WRONG WORDS
function showWrongMessage(){
	wrongLetter.innerHTML=`
	${wrongWords.length > 0 ? '<p>Wrong Words</p>' : ''}
	${wrongWords.map((letter)=>
		`<span>${letter}</span>`
	)}
	`;

//FIGURE PARTS	
	figure.forEach((part, index)=>{

		const errors = wrongWords.length;
		if(index < errors){
			part.style.display='block'
		}else{
			part.style.display='none'
		}
	})

//GAME END FUNCTION CALL	
	gameend();
}

//GAME END FUNCTION
function gameend(){
	if (wrongWords.length==figure.length){
		finalMessage.innerText='You have lost';
		popup.style.display='flex';
	}
}

//SHOW NOTIFICATION FUNCTION
function showNotification(){
	notification.classList.add('show');

	setTimeout(()=>{
		notification.classList.remove('show')
	},2000)
}

//ADD KEYPRESS EVENT
window.addEventListener('keydown',(e)=>{
	if(e.keyCode >=65 && e.keyCode <= 90){
		const letter = e.key;
		 
		 if(selectedWords.includes(letter)){
		 	if(!correctWords.includes(letter)){
		 		correctWords.push(letter)

		 		displayWord()
		 	}else{
		 		showNotification();
		 	}
		 }else{
		 	if(!wrongWords.includes(letter)){
		 		wrongWords.push(letter)
		 	}else{
		 		showWrongMessage();
		 	}
		 }
	}
});

//RESTART THE GAME 
playAgainBtn.addEventListener('click', function(){
//EMPTY ARRAY
	correctWords.splice(0);
	wrongWords.splice(0);

	selectedWords = words[Math.floor(Math.random() * words.length)];
	displayWord();

	showWrongMessage();
	popup.style.display='none';
})