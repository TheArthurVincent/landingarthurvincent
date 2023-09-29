export const themePartner = {};

// #002950 #5DB008 #0203AD #FACE0A #00a0a0 #a00030 #19D8FA #5b6b13 #86304a

export const primaryColor = () => "#002950";
export const secondaryColor = () => " #5DB008";

export const textPrimaryColorContrast = () => "#fff";

export const titleFont = () => "Lato";
export const textFont = () => "Lato";

var isWhiteTheme = false; // true;
isWhiteTheme = true;

export const setHTMLStyle = () => {
  const scrollbarStyle = `
    body {
      background-color: ${isWhiteTheme ? "#eee" : "#111"}
    }
    @import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Athiti:wght@200;300;400;500;600;700&family=Electrolize&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Gotu&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,900&family=PT+Sans+Narrow:wght@400;700&display=swap");
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
