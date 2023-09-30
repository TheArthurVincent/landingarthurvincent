export const themePartner = {};

// #002950 #5DB008 #0203AD #FACE0A #00a0a0 #a00030 #19D8FA #5b6b13 #86304a

export const primaryColor = () => "#002950";
export const secondaryColor = () => " #5DB008";

export const textPrimaryColorContrast = () => "#fff";

var isWhiteTheme = false; // true;
isWhiteTheme = true;

export const setHTMLStyle = () => {
  const scrollbarStyle = `
    body {
      background-color: ${isWhiteTheme ? "#eee" : "#111"}
    }
    * {
      scrollbar-color: ${secondaryColor()};
    }
    *::-webkit-scrollbar {
      width: 10px;
    }
    *::-webkit-scrollbar-thumb {
      background-color: ${secondaryColor()};
    }
    *::-webkit-scrollbar-thumb:hover {
      background-color: ${secondaryColor()};
    } 
    }
  `;
  const styleElement = document.createElement("style");
  styleElement.innerHTML = scrollbarStyle;
  document.head.appendChild(styleElement);
};

export const primaryContrast = () => (isWhiteTheme ? "#fff" : "#000");
export const secondaryContrast = () => (isWhiteTheme ? "#000" : "#fff");
export const darkGreyColor = () => (isWhiteTheme ? "#888" : "#333");
export const transparentBg = () =>
  isWhiteTheme ? "rgba(255, 255, 255, 1)" : "rgba(1, 1, 1, 1)";
export const transparentBg2 = () => "rgba(1, 1, 1, 0.2)";

export const alwaysWhite = () => "#fff"; // caso algo tenha sempre que ser branco
export const lightGreyColor = () => "#ccc";
