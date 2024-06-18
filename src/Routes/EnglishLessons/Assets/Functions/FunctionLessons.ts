export const readText = (text: string, restart: boolean, lang?: string) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang == "pt") {
      utterance.lang = "pt-BR";
    } else if (lang == "fr") {
      utterance.lang = "fr-FR";
    } else if (lang == "it") {
      utterance.lang = "it-IT";
    } else if (lang == "de") {
      utterance.lang = "de-DE";
    } else if (lang == "en") {
      utterance.lang = "en-US";
    } else if (!lang) {
      utterance.lang = "en-US";
    }

    if (restart) {
      synth.cancel();
      synth.speak(utterance);
    } else if (synth.speaking) {
      synth.pause();
    } else if (synth.paused) {
      synth.resume();
    } else {
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
