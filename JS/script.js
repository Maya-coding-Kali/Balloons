const colors = ['yellow', 'blue', 'violet', 'green', 'red']
let WindowWidth = window.innerWidth;
let Body = document.body;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 10;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow')
let UserClicks = 1;
function CreateBalloon() {
    let div = document.createElement('div');
    let randColor = Math.floor( Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[randColor];
   let  randLeft = Math.floor( Math.random() * (WindowWidth - 100));
    div.style.left = randLeft + 'px';
    div.dataset.number = currentBalloon;
    ++currentBalloon;
    Body.appendChild(div);
    animateBalloon(div)
}
function animateBalloon(elem)
{
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3)
    let interval = setInterval(frame, 12 -Math.floor( num / 10) + random);
        function frame(){
        if(pos >= windowHeight + 200 && document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)
        {
            clearInterval(interval)
            gameOver = true;
        }
        else
        {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
      
        console.log(time)
    }

}
function startGame()
{
    restartGame();
   // PlayBackgroundMusic();
    let timeOut = 0 ;
   let loop = setInterval(() => {
    
       timeOut = Math.floor( Math.random() * 600 - 100);
        if (!gameOver && num !== total) {
        CreateBalloon();
       
        }
        else if(num !== total)
        {
            clearInterval(loop)
           totalShadow.style.display = 'flex';
           totalShadow.querySelector('.lose').style.display = 'block'
        }
        else
        {
            clearInterval(loop)
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block'
          
        }
        
    
    }, 800 + timeOut);
}
function PlayBallSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}
function PlayBackgroundMusic() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/bg-music.mp3';
    audio.play();
}
function deleteBalloon(elem)
{
        elem.remove();
        PlayBallSound();
        ++num
        updateScore();
  
    
}
function updateScore()
{
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
        
    }
}
document.addEventListener('click', function(event){
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target)
        UserClicks++;
    }
    console.log(event);
})
function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon')
    for (let index = 0; index < forRemoving.length; index++) {
        forRemoving[index].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}
document.querySelector('.restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none'
    totalShadow.querySelector('.lose').style.display = 'none'
    startGame()
})
document.querySelector('.cancel').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    startGame()

})
document.querySelector('.start-game-button').addEventListener('click', function () {
    document.querySelector('.start-game-window').style.display = 'none';
    PlayBackgroundMusic();
    startGame();

})
   
    

