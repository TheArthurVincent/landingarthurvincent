export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  voiceBoolean?: boolean
) => {
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
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

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
