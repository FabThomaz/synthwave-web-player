document.addEventListener('DOMContentLoaded', function() {
    // Lista de músicas online (royalty free)
    const songs = [
        {
            title: "80s Retro Synthwave",
            artist: "Unknown Artist",
            src: "https://drive.google.com/file/d/11dlge5_FEqpsxRs4HMTYet_vip3GPOGG/view?usp=drive_link",
            cover: "https://drive.google.com/file/d/1konAT1FVwlPZLmWN9TmgojUDK-ZoAGp2/view?usp=drive_link"
        },
        {
            title: "80s-Pulse Synthwave Dude",
            artist: "Unknown Artist",
            src: "music/80s-Pulse Synthwave Dude.mp3",
            cover: "images/image_2.jpg"
        },
        {
            title: "Neon Mirage",
            artist: "Unknown Artist",
            src: "music/Neon Mirage.mp3",
            cover: "images/image_3.jpg"
        },
        {
            title: "Shattered",
            artist: "Unknown Artist",
            src: "music/Shattered.mp3",
            cover: "images/image_4.jpg"
        },
        {
            title: "Synthwave Retro 80s",
            artist: "Unknown Artist",
            src: "music/Synthwave Retro 80s.mp3",
            cover: "images/image_5.jpg"
        }
    ];

    let songIndex = 0;

    // Seletores
    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistUl = document.getElementById('playlist');
    const musicContainer = document.querySelector('.music-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');

    function loadSong(song) {
        title.textContent = song.title;
        artist.textContent = song.artist;
        audio.src = song.src;
        cover.src = song.cover;
        updatePlaylistHighlight();
    }

    function playSong() {
        musicContainer.classList.add('play');
        const icon = playBtn.querySelector('i.fas');
        if (icon) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
        audio.play();
    }

    function pauseSong() {
        musicContainer.classList.remove('play');
        const icon = playBtn.querySelector('i.fas');
        if (icon) {
            icon.classList.add('fa-play');
            icon.classList.remove('fa-pause');
        }
        audio.pause();
    }

    function displayPlaylist() {
        playlistUl.innerHTML = '';
        songs.forEach((song, idx) => {
            const li = document.createElement('li');
            li.textContent = song.title + ' - ' + song.artist;
            li.addEventListener('click', function() {
                songIndex = idx;
                loadSong(songs[songIndex]);
                playSong();
            });
            playlistUl.appendChild(li);
        });
        updatePlaylistHighlight();
    }

    function updatePlaylistHighlight() {
        const items = playlistUl.querySelectorAll('li');
        items.forEach((li, idx) => {
            li.classList.toggle('playing', idx === songIndex);
        });
    }

    // Atualiza barra de progresso e tempo
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    // Permite clicar na barra de progresso para avançar/retroceder
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60) || 0;
        const seconds = Math.floor(time % 60) || 0;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    nextBtn.addEventListener('click', () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    });

    prevBtn.addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    });

    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
    });

    audio.addEventListener('error', function() {
        alert('Erro ao carregar o arquivo de áudio: ' + audio.src);
    });

    // Inicialização
    loadSong(songs[songIndex]);
    displayPlaylist();
    audio.volume = volumeSlider.value;
});
