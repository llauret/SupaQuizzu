export const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = 0.5;
    audio.play().catch((error) => {
        console.error('Error playing sound:', error);
    });
}