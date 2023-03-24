document.addEventListener('DOMContentLoaded', () => {
    const progressRing = document.querySelector('.progress-ring__circle');
    const countdownText = document.querySelector('.progress-ring__text');
    const radius = progressRing.getAttribute('r');
    const circumference = 2 * Math.PI * radius;

    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let timeRemaining = 60; // 1 minute
    countdownText.textContent = formatTime(timeRemaining);

    function updateProgressBar() {
        const percent = ((60 - timeRemaining) / 60) * 100;
        setProgress(percent);
        countdownText.textContent = formatTime(timeRemaining);
        timeRemaining--;

        if (timeRemaining >= 0) {
            setTimeout(updateProgressBar, 1000);
        }
    }

    updateProgressBar();
});
