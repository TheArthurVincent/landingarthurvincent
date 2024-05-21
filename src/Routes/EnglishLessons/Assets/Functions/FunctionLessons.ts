export const readText = (text: string) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    console.log(text);
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
