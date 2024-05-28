export const readText = (text: string, restart: boolean) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (restart) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      synth.speak(utterance);
    } else if (synth.speaking) {
      synth.pause();
    } else if (synth.paused) {
      synth.resume();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      synth.speak(utterance);
    }
  } else {
    alert("Sorry, your browser doesn't support text to speech!");
    console.log("error", text);
  }
};


export const pauseSpeech = () => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.pause();
    }
  } else {
    alert("Sorry, your browser doesn't support text to speech!");
    console.log("Error: Text to speech is not supported in this browser.");
  }
};
