export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  voiceBoolean?: boolean
) => {
  const theSentenceKey = "theSentence";
  const theRateKey = "theRate";
  console.log("voiceBoolean: ", voiceBoolean);
  const currentEvenOdd = localStorage.getItem("evenOdd");
  const currentSentence = localStorage.getItem(theSentenceKey);
  let theRate = parseFloat(localStorage.getItem(theRateKey) || "1");

  if (currentEvenOdd === null) {
    //@ts-ignore
    localStorage.setItem("evenOdd", true);
  } else {
    //@ts-ignore
    localStorage.setItem("evenOdd", voiceBoolean ? false : true);
  }

  if (currentSentence === null) {
    localStorage.setItem(theSentenceKey, text);
    localStorage.setItem(theRateKey, "1");
  } else if (currentSentence === text) {
    theRate = theRate === 0.8 ? 1 : 0.8;
    localStorage.setItem(theRateKey, theRate.toString());
  } else {
    theRate = 1;
    localStorage.setItem(theSentenceKey, text);
    localStorage.setItem(theRateKey, "1");
  }

  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    if (!synth) {
      console.error("speechSynthesis não está disponível.");
      return;
    }

    if (restart) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = getLanguageCode(lang);
    utterance.rate = theRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = synth.getVoices();
    const filteredVoices = voices.filter((voice) => voice.lang == "en-US");
    const filteredVoicesUK = voices.filter((voice) => voice.lang == "en-GB");

    let selectedVoice;

    const userAgent = navigator.userAgent;
    if (voiceBoolean && !userAgent.includes("iOS")) {
      console.log("currentEvenOdd: ", currentEvenOdd);
      const voiceEdge = currentEvenOdd ? filteredVoices[4] : filteredVoices[5];
      const generalVoices = currentEvenOdd ? filteredVoices[0] : filteredVoicesUK[0];
      selectedVoice = voiceEdge || generalVoices;
      utterance.rate = 1;
      utterance.voice = selectedVoice;

    } else if (userAgent.includes("iOS")) {
      utterance.rate = 1;
      utterance.voice = filteredVoices[0];
    } else {
      const voiceEdge = filteredVoices[4];
      const generalVoices = filteredVoices[0];
      selectedVoice = voiceEdge || generalVoices;
      utterance.rate = 1;
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => console.log("Leitura iniciada.");
    utterance.onend = () => console.log("Leitura finalizada.");
    utterance.onerror = (e) => console.error("Erro na leitura:", e);

    if (restart || !synth.speaking || synth.paused) {
      synth.speak(utterance);
    } else if (synth.speaking) {
      synth.pause();
    }
  } else {
    alert("Seu navegador não suporta a síntese de fala!");
  }
};

const getLanguageCode = (lang?: string): string => {
  switch (lang) {
    case "pt":
      return "pt-BR";
    case "fr":
      return "fr-FR";
    case "it":
      return "it-IT";
    case "de":
      return "de-DE";
    case "en":
    default:
      return "en-US";
  }
};

export const listVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    return voices;
  } else {
    console.error("speechSynthesis não está disponível no navegador.");
    return [];
  }
};
