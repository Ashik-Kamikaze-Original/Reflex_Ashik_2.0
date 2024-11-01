const audioPlayer = document.getElementById("audioPlayer");
const playButtons = document.querySelectorAll(".play-btn");

// Add event listener to all play buttons
playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const track = button.getAttribute("data-track");

    // Set the audio source and play
    audioPlayer.src = track;
    audioPlayer
      .play()
      .then(() => {
        console.log(`Playing: ${track}`);
      })
      .catch((error) => {
        console.error("Audio playback failed:", error);
        alert("Failed to play audio. Check your files and try again.");
      });
  });
});
