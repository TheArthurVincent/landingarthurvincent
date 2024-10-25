export const readText = (text: string, restart: boolean, lang?: string) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("speechSynthesis não está disponível.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Definir o idioma
    switch (lang) {
      case "pt":
        utterance.lang = "pt-BR";
        break;
      case "fr":
        utterance.lang = "fr-FR";
        break;
      case "it":
        utterance.lang = "it-IT";
        break;
      case "de":
        utterance.lang = "de-DE";
        break;
      case "en":
      default:
        utterance.lang = "en-US";
        break;
    }

    // Eventos de controle
    utterance.onstart = () => console.log("Leitura iniciada.");
    utterance.onend = () => console.log("Leitura finalizada.");
    utterance.onerror = (e) => console.error("Erro na leitura:", e);

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
    alert("Seu navegador não suporta a síntese de fala!");
    console.log("Erro: text-to-speech não suportado.");
  }
};

export const pauseSpeech = () => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.pause();
    }
  } else {
    alert("Seu navegador não suporta a síntese de fala!");
    console.log("Erro: text-to-speech não suportado.");
  }
};
