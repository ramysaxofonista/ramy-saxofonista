function reproducir(id){
    let audio = document.getElementById(id);

    // Detiene todos los audios
    document.querySelectorAll("audio").forEach(a=>{
        if(a !== audio){
            a.pause();
            a.currentTime = 0;
        }
    });

    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0;
    }
}
