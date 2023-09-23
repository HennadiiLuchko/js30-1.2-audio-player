import playList from './playList.js';

const body = document.querySelector('body');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const progress = document.querySelector('.progress');
const progressСontainer = document.querySelector('.progress-container');
const audioTimer = document.querySelector('.audio-timer');
const muteButton = document.getElementById('muteButton');
const soundVolume = document.getElementById('soundVolume');
const songTitle = document.querySelector('.song-title');
const songAuthor = document.querySelector('.song-author');
const folder = document.querySelector('.folder');
const playlistInfo = document.querySelector('.playlist-info');
const iconСontent = document.querySelector('.icon-content');
// const playItems = document.querySelectorAll('.play-item');


const audio = new Audio();
let isPlay = false;
let playNum = 0;
let restoreValue;

// LISTENERS
play.addEventListener('click', playAudio);
playPrev.addEventListener('click', getPlayPrev);
playNext.addEventListener('click', getPlayNext);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', getPlayNext);
progressСontainer.addEventListener('click', setProgress);
muteButton.addEventListener("click", muter);

soundVolume.addEventListener('input', function() { 
	audio.volume = soundVolume.value;
	if ( audio.volume === 0) {
		muteButton.style.opacity =  0.4;
	} else {
		muteButton.style.opacity = 1;
	}
});


playlistInfo.addEventListener('click', () => {
	playListContainer.classList.toggle('hidden');
	iconСontent.classList.toggle('rotate');

})

// FUNCTIONS

function playAudio() {
	if(!isPlay) {
		audio.src = playList[playNum].src;
  		audio.currentTime = 0;
  		audio.play();
  		isPlay = true;       
  		play.classList.add('pause');
		renderPlayer();
       
	} else  {
  		audio.pause();
  		isPlay = false;
  		play.classList.remove('pause');
	}

	for(let i=0; i<playListContainer.children.length; i++){
		if(playListContainer.children[i].classList.contains('current')){
			playListContainer.children[i].classList.remove('current');
			break;
		} 
	}

	playListContainer.children[playNum].classList.add('current');
};

function getPlayNext() {
	if(isPlay) {
		isPlay = false;
	} else {
		isPlay = true;
	}

	playNum++;
	if (playNum > playList.length-1) {
		playNum = 0;
	}
	folder.src = playList[playNum].folder;
	playAudio();
	renderPlayer();	
};

function getPlayPrev() {
	if(isPlay) {
		isPlay = false;
	} else {
		isPlay = true;
	}
	playNum--;
	if (playNum < 0) {
		playNum = playList.length-1;
	}
	folder.src = playList[playNum].folder;
	playAudio();
	renderPlayer();
};



function renderPlayList() {
	playList.forEach(el => {
		const li = document.createElement('li');
		li.classList.add('play-item');
		li.textContent =  el.title + " (" + el.author +")";
		playListContainer.append(li);
		playListContainer.children[0].classList.add('current');
	 })
};

setTimeout(() => {
	const playItems = document.querySelectorAll('.play-item');
    if(playItems) {
		playItems.forEach((element, index) => {
			element.addEventListener('click', () => {
				// if(isPlay) {
				// 	isPlay = false;
				// } else {
				// 	isPlay = true;
				// }
				
				playNum = index;
				isPlay = false;
				playAudio();
				renderPlayer();
			})
		})
	}
}, 800);  

  
function updateProgress (e) {
	const duration = audio.duration;
	const currentTime = audio.currentTime;	
	const progressPercent = (currentTime /duration) * 100;
	progress.style.width = progressPercent +'%';
	let formatDuration = formatTime(duration);
	if (formatDuration === "NaN:NaN") {
		formatDuration = "0:00";
	};
	const formatCurrentTime = formatTime(currentTime);
	if (formatCurrentTime === "NaN:NaN") {
		formatCurrentTime = "0:00";
	};
	const audioText = `${formatCurrentTime} / ${formatDuration}`;
	audioTimer.textContent = audioText;
};


function setProgress (e) {
	const width = this.clientWidth;
	const duration = audio.duration;
	const clickX = e.offsetX;
	audio.currentTime = (clickX / width) * duration
};


// // convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = 0;
	let sec = 0;
	min = min + Math.floor((seconds / 60));
    sec = sec + Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};



function muter() {
  if ( audio.volume === 0) {
	soundVolume.value = restoreValue;
	audio.volume = soundVolume.value;
    muteButton.style.opacity = 1;
  } else {
	 restoreValue = soundVolume.value;
    soundVolume.value = 0;
	audio.volume = soundVolume.value;
    muteButton.style.opacity = 0.4;
  }
};


function renderPlayer() {
	songAuthor.innerText = playList[playNum].author;
	songTitle.innerText = playList[playNum].title;
	// folder.src = playList[playNum].folder;
	folder.style.backgroundImage = `url("../assets/images/img/folders/folder${playNum}.jpg")`;
	setBg();
};

function setBg() {
	body.style.backgroundImage = `url("../assets/images/img/background/bg${playNum}.jpg")`;
}

setBg();
renderPlayer();
renderPlayList();

console.log('Самопроверка:');
console.log('1.	Вёрстка +10\n- вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека;\n- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс,');
console.log('2. Кнопка Play/Pause +10\n- есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека;\n- внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек.');
console.log('3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10');
console.log('4. При смене аудиотрека меняется изображение - обложка аудиотрека +10');
console.log('5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека.\n   ДЛЯ УЛУЧШЕНИЯ ДИЗАЙНА  ПРОГРЕСС-БАР СДЕЛАН КАСТОМНЫМ. Вместо ползунка реагирует на мышку +10 ');
console.log('6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10');
console.log('7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10:');
console.log('    Добавлен фунционал:');
console.log('      7.1 Управление звуком:\n       - добавлена кнопка вкл/выкл. звука;\n       - добавлено управление громкостью звука. Прогресс-бар управления громкостью стилизован.');
console.log('      7.2 Добавлена генерация и выведение плей-листа треков:\n       - выводится список треков в плей-листе;\n       - текущий элемент выделен;\n       - при нажатии мышкой на любой элемент  плей-листа – запускается проигрывание этого элемента.');
console.log('      7.3 Добавлена возможность скрыть/открыть плей-лист.');
console.log('      7.4 При смене аудиотреков меняется background на странице.');
console.log('      7.5 Для улучшения дизайна  прогресс-бар сделан кастомным. Стилизован. Вместо ползунка реагирует на мышку.');
console.log('ИТОГО: 60+++/60');


