export const readText = (text: string, restart: boolean, lang?: string) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    if (!synth) {
      console.error("speechSynthesis não está disponível.");
      return;
    }
    // Limpa qualquer fala em andamento
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Definir o idioma
    utterance.lang = lang === "pt" ? "pt-BR" : 
                      lang === "fr" ? "fr-FR" : 
                      lang === "it" ? "it-IT" : 
                      lang === "de" ? "de-DE" : "en-US";

    // Eventos de controle
    utterance.onstart = () => console.log("Leitura iniciada.");
    utterance.onend = () => console.log("Leitura finalizada.");
    utterance.onerror = (e) => {
      console.error("Erro na leitura:", e);

      // Se a leitura foi interrompida, tenta reiniciar
      if (e.error === "interrupted" && restart) {
        console.warn("Leitura interrompida, tentando reiniciar...");
        synth.cancel();
        synth.speak(utterance);
      } else {
        console.log(`Ocorreu um erro: ${e.error}`);
      }
    };

    // Lógica de controle de fala
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

// Função para pausar a fala
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
