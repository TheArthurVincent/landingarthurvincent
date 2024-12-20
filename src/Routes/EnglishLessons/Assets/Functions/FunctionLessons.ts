export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  voiceNumber?: boolean
) => {
  const evenOddKey = "evenOdd";
  const theSentenceKey = "theSentence";
  const theRateKey = "theRate";

  const currentEvenOdd = localStorage.getItem(evenOddKey);
  const currentSentence = localStorage.getItem(theSentenceKey);
  let theRate = parseFloat(localStorage.getItem(theRateKey) || "1");

  if (currentEvenOdd === null) {
    localStorage.setItem(evenOddKey, "1");
  } else {
    const newEvenOdd = currentEvenOdd === "1" ? "0" : "1";
    localStorage.setItem(evenOddKey, newEvenOdd);
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
    const filteredVoices = voices.filter(
      (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
    );

    let selectedVoice;
    if (voiceNumber) {
      const voiceEdge = voiceNumber ? filteredVoices[7] : filteredVoices[10];
      const voiceChrome = voiceNumber ? filteredVoices[2] : filteredVoices[3];
      selectedVoice = voiceEdge || voiceChrome;
      utterance.rate = 1;
    } else {
      const voiceEdge = filteredVoices[10];
      const voiceChrome = filteredVoices[3];
      selectedVoice = voiceEdge || voiceChrome;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("Voz selecionada:", selectedVoice);
    } else {
      console.warn("Nenhuma voz correspondente encontrada. Usando a padrão.");
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
    console.log("Erro: text-to-speech não suportado.");
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
    console.log("Vozes disponíveis:", voices);
    return voices;
  } else {
    console.error("speechSynthesis não está disponível no navegador.");
    return [];
  }
};
