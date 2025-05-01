export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  voiceBoolean?: boolean
) => {
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não suporta a síntese de fala!");
    return;
  }

  const numberReviewsToday = JSON.parse(
    localStorage.getItem("loggedIn") || "{}"
  ).flashCardsReviewsToday;
  const ehPar = (nm: number) => nm % 2 === 0;
  const isEven = ehPar(numberReviewsToday);
  const synth = window.speechSynthesis;
  if (!synth) {
    console.error("speechSynthesis não está disponível.");
    return;
  }

  if (restart) {
    synth.cancel();
  }

  const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = synth.getVoices();
      if (voices.length !== 0) {
        resolve(voices);
      } else {
        synth.addEventListener("voiceschanged", () => {
          voices = synth.getVoices();
          resolve(voices);
        });
      }
    });
  };

  const speak = async () => {
    const voices = await loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(lang);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const detectBrowser = () => {
      var ua = navigator.userAgent;

      if (/Edg/.test(ua)) return "Edge";
      if (/OPR/.test(ua)) return "Opera";
      if (/Chrome/.test(ua) && !/Edg/.test(ua)) return "Chrome";
      if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "Safari";
      if (/Firefox/.test(ua)) return "Firefox";
      if (/MSIE|Trident/.test(ua)) return "Internet Explorer";

      return "Desconhecido";
    };
    const userAgent = detectBrowser();

    console.log(navigator.userAgent, "userAgent: ", userAgent);

    const voicesHere = voices.filter((v) => v.lang.includes(lang || ""));

    console.log("voicesHere: ", voicesHere, lang);
    if (userAgent == "Edge" && !isEven) {
      utterance.voice = voicesHere[1];
    } else if (userAgent == "Chrome" && !isEven) {
      utterance.voice = voicesHere[2];
    } else if (userAgent == "Opera" || userAgent == "Safari") {
      alert(
        "Seu navegador não suporta este recurso de voz. Tente o Edge ou o Chrome"
      );
      return;
    } else {
      utterance.voice = voicesHere[0];
    }

    utterance.onerror = (e) => {
      synth.speak(e.utterance);
    };

    synth.speak(utterance);
  };

  speak();
};

const getLanguageCode = (lang?: string): string => {
  switch (lang) {
    case "en":
      return "en-US";
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
