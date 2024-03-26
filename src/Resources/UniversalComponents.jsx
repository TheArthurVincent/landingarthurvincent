import { styled, keyframes } from "styled-components";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../Styles/Styles";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

export const All = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: space-between;

  & *::-webkit-scrollbar {
    width: 10px;
  }

  & *::-webkit-scrollbar-track {
    background: ${darkGreyColor()};
  }

  & *::-webkit-scrollbar-thumb {
    background-color: ${secondaryColor()};
  }
`;

export const SpanHover = styled.span`
  padding-left: 10px;
  font-family: Athiti;
  font-weight: 500;
  border-left: solid ${alwaysWhite()} 2px;
  &:hover {
    color: ${secondaryColor()};
    border-left: solid ${secondaryColor()} 2px;
    transition: 0.2s;
  }
`;
export const SpanHover2 = styled.span`
  padding-left: 10px;
  border-left: solid ${secondaryColor()} 2px;
  &:hover {
    color: ${secondaryColor()};
    border-left: solid ${alwaysWhite()} 2px;
    // transition: 0.2s;
  }
`;
export const FormFlex = styled.form`
  display: flex;
  padding: 0.5rem;
  justify-content: space-around;
  gap: 2rem;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
export const FormGrid = styled.form`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 675px) {
    grid-template-columns: 1fr;
  }
`;
export const DivGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 675px) {
    grid-template-columns: 1fr;
  }
`;
export const DivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const DivHover = styled.span`
  margin: 0;
  padding: 0 1rem;
  display: grid;
  border-bottom: solid 1px black;
  &:hover {
    background-color: ${primaryColor()};
    color: ${textPrimaryColorContrast()};
    border-radius: 0.5rem;
    transition: 0.2s;
  }
`;

export const Button = styled.button`
  border: 1px solid ${primaryColor()};
  background-color: ${primaryColor()};
  cursor: pointer;
  color: ${textPrimaryColorContrast()};
  padding: 0.4rem;
  width: 5.5rem;
  max-height: 2rem;
  &:hover {
    border: 1px solid ${darkGreyColor()};
  }
  &:active {
    font-size: 0.8rem;
  }
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  width: 80px;
  height: 80px;
  display: grid;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  animation-name: ${spinAnimation};
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: rotate(0.03turn);
`;

export const SpinLoading = () => {
  return (
    <Spin>
      <img
        style={{ maxWidth: "3rem" }}
        src="https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/Spin.png?updatedAt=1703334149713"
        alt="loading"
      />
    </Spin>
  );
};

export function InputField({ value, onChange, id, placeholder, type }) {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: "3px",
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {placeholder}
      </p>
      <input
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0.4rem",
          marginBottom: "0.3rem",
          fontSize: "1.1rem",
          fontWeight: 500,
          backgroundColor: "white",
          minWidth: "15rem",
          border: "#555 1px solid",
        }}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

export function InputFieldSignUp({ value, onChange, id, placeholder, type }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Athiti",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "white",
          textShadow: `2px 0 ${alwaysBlack()}, -2px 0 ${alwaysBlack()}, 0 2px ${alwaysBlack()}, 0 -2px ${alwaysBlack()}, 1px 1px ${alwaysBlack()}, -1px -1px ${alwaysBlack()}, 1px -1px ${alwaysBlack()}, -1px 1px ${alwaysBlack()}`,
          marginBottom: "3px",
          fontWeight: 800,
          fontSize: "2rem",
          fontFamily: "Athiti",
          textAlign: "center",
        }}
      >
        {placeholder}
      </p>
      <input
        style={{
          padding: "0.5rem",
          marginBottom: "0.3rem",
          fontFamily: "Athiti",
          fontSize: "1.5rem",
          fontWeight: 500,
          backgroundColor: secondaryColor(),
          color: textSecondaryColorContrast(),
          border: "#555 3px solid",
          borderRadius: "10px 0",
          width: "50%",
        }}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

export function InputFieldNotRequired({
  value,
  onChange,
  id,
  placeholder,
  type,
}) {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: "3px",
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {placeholder}
      </p>
      <input
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0.4rem",
          marginBottom: "0.3rem",
          fontSize: "1.1rem",
          fontWeight: 500,
          backgroundColor: "white",
          minWidth: "15rem",
          border: "#555 1px solid",
        }}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export const Disapear = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;

export const ImgResponsive0 = styled.img`
  max-width: 12rem;
  @media (max-width: 755px) {
    display: none;
  }
`;
export const ImgResponsive3 = styled.img`
  max-width: 8rem;
  @media (max-width: 755px) {
    display: none;
  }
`;
export const ImgResponsive = styled.img`
  max-width: 20rem;
  @media (max-width: 600px) {
    max-width: 7rem;
  }
`;
export const ImgResponsive2 = styled.img`
  max-width: 25rem;
  @media (max-width: 600px) {
    max-width: 15rem;
  }
`;
export const ButtonDisapear = styled.button`
  border: 1px solid ${primaryColor()};
  background-color: ${primaryColor()};

  cursor: pointer;
  color: ${textPrimaryColorContrast()};
  padding: 0.5rem;
  width: 5rem;
  margin-right: 3rem;

  &:hover {
    border: 1px solid ${darkGreyColor()};
  }
  &:active {
    font-size: 0.8rem;
  }
  @media (max-width: 1300px) {
    margin-right: 4rem;
  }

  @media (max-width: 1350px) {
    display: none;
  }
`;

export const Xp = styled.p`
  cursor: pointer;
  font-weight: 900;
  position: absolute;
  top: -5px;
  right: 5px;
  font-size: 1.2rem;
  padding: 0.5rem;
  color: ${primaryColor()};
  &:hover {
    color: ${secondaryColor()};
  }
  &:active {
    font-weight: 500;
  }
`;

export const linkReset = {
  display: "inline",
  color: alwaysWhite(),
};

export const linkReset2 = {
  display: "inline",
  backgroundColor: alwaysBlack(),
  padding: "1px",
};

export const IFrameVideo = styled.iframe`
  margin-top: 0;
  min-width: 636px;
  min-height: 356px;
  border: 1px #222 solid;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  @media (max-width: 900px) {
    margin-top: 0;
    min-width: 430px;
    min-height: 230px;
  }
  @media (max-width: 450px) {
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    min-width: 265px;
    min-height: 150px;
  }
  @media (max-width: 280px) {
    margin-top: 0;
    min-width: 140px;
    min-height: 64px;
  }
  @media (max-width: 210px) {
    margin-top: 0;
    min-width: 80px;
    min-height: 38px;
  }
`;
export const IFrameVideoClass = styled.iframe`
  margin-top: 0;
  min-width: 636px;
  min-height: 356px;
  border: 1px #222 solid;
  margin-left: auto;
  margin-right: auto;
  display: block;
  @media (max-width: 900px) {
    margin-top: 0;
    min-width: 430px;
    min-height: 230px;
  }
  @media (max-width: 450px) {
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    min-width: 265px;
    min-height: 150px;
  }
  @media (max-width: 280px) {
    margin-top: 0;
    min-width: 140px;
    min-height: 64px;
  }
  @media (max-width: 210px) {
    margin-top: 0;
    min-width: 80px;
    min-height: 38px;
  }
`;

export const IFrameVideoInstructions = styled.iframe`
  margin-top: 0;
  border: 1px #222 solid;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  min-width: 600px;
  min-height: 350px;
  @media (max-width: 740px) {
    min-width: 500px;
    min-height: 250px;
  }
  @media (max-width: 500px) {
    min-width: 300px;
    min-height: 170px;
  }
`;
export const SpanCourseResponsive = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;

export const IFrameVideoCourses = styled.iframe`
  border: none;
  margin-top: 0;
  min-width: 1200px;
  min-height: 750px;
  @media (max-width: 950px) {
    margin-top: 0;
    min-width: 430px;
    min-height: 230px;
  }
  @media (max-width: 380px) {
    margin-top: 0;
    min-width: 265px;
    min-height: 150px;
  }
  @media (max-width: 280px) {
    margin-top: 0;
    min-width: 140px;
    min-height: 64px;
  }
  @media (max-width: 210px) {
    margin-top: 0;
    min-width: 80px;
    min-height: 38px;
  }
`;

export const pathGenerator = (text) => {
  const spacelessText = text.replace(/\s+/g, "-");
  const lowerCase = spacelessText.toLowerCase();

  return lowerCase;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transfor: translateX(0);
  }
`;

export const ImgBlog = styled.img`
  margin-top: 0;
  object-position: center;
  max-height: auto;

  @media (max-width: 1350px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
export const DivModal = styled.div`
  position: fixed;
  z-index: 100;
  background-color: #fff;
  padding: 1rem;
  width: 25rem;
  height: 32rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 700px) {
    width: 100%;
    width: 20rem;
    height: 32rem;
  }
`;

export const DisapearOnMobile = styled.div`
  display: block;
  @media (max-width: 920px) {
    display: none;
  }
`;

export const BackToHomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        justifyContent: "right",
      }}
    >
      <Link
        style={{
          ...linkReset,
          backgroundColor: primaryColor(),
          color: textPrimaryColorContrast(),
          padding: "0.4rem",
          borderRadius: "10px",
          fontSize: "12px",
          textDecoration: "none",
        }}
        to="/"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
};

export function formatNumber(number) {
  return number.toLocaleString("pt-BR");
}

export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

export function getVideoEmbedUrl(videoUrl) {
  let embedUrl = "";
  if (!videoUrl) {
    return "";
  }
  if (videoUrl.includes("youtube.com")) {
    const youtubeIdMatch = videoUrl.match(
      /(?:\?v=|\/embed\/|\/watch\?v=|\/\d\/|\.be\/)([\w\d_-]+)/i
    );

    if (youtubeIdMatch && youtubeIdMatch[1]) {
      embedUrl = `https://www.youtube.com/embed/${youtubeIdMatch[1]}`;
    }
  } else if (videoUrl.includes("vimeo.com")) {
    const vimeoIdMatch = videoUrl.match(/vimeo\.com\/(\d+)/);

    if (vimeoIdMatch && vimeoIdMatch[1]) {
      embedUrl = `https://player.vimeo.com/video/${vimeoIdMatch[1]}`;
    }
  }

  return embedUrl;
}

export function LogoSVG(primaryColor, secondaryColor, size) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      zoomAndPan="magnify"
      viewBox="0 0 750 299.999988"
      width={size * 100}
      height={size * 40}
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <g />
        <clipPath id="3635ddc1e7">
          <path
            d="M 75 54 L 739 54 L 739 166 L 75 166 Z M 75 54 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="8113996479">
          <path
            d="M 76.398438 20.910156 L 748.511719 60.445312 L 740.316406 199.800781 L 68.203125 160.269531 Z M 76.398438 20.910156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="a08d6a1eb7">
          <path
            d="M 76.398438 20.910156 L 748.511719 60.445312 L 740.316406 199.800781 L 68.203125 160.269531 Z M 76.398438 20.910156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="c12060b726">
          <path
            d="M 73 98 L 737 98 L 737 210 L 73 210 Z M 73 98 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="ab6a07580a">
          <path
            d="M 74.453125 64.90625 L 746.566406 104.4375 L 738.371094 243.792969 L 66.257812 204.261719 Z M 74.453125 64.90625 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="84de67c941">
          <path
            d="M 74.453125 64.90625 L 746.566406 104.4375 L 738.371094 243.792969 L 66.257812 204.261719 Z M 74.453125 64.90625 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="44dc66b43b">
          <path
            d="M 70 125 L 734 125 L 734 238 L 70 238 Z M 70 125 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="1077b805a2">
          <path
            d="M 732.796875 270.035156 L 60.527344 233.210938 L 68.164062 93.824219 L 740.429688 130.644531 Z M 732.796875 270.035156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="092f100edc">
          <path
            d="M 732.796875 270.035156 L 60.527344 233.210938 L 68.164062 93.824219 L 740.429688 130.644531 Z M 732.796875 270.035156 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="399f602ffd">
          <path
            d="M 75 155 L 739 155 L 739 267 L 75 267 Z M 75 155 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="df7c09117a">
          <path
            d="M 76.128906 122.183594 L 748.652344 160.425781 L 740.707031 300.132812 L 68.1875 261.890625 Z M 76.128906 122.183594 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f48fbf1983">
          <path
            d="M 76.128906 122.183594 L 748.652344 160.425781 L 740.707031 300.132812 L 68.1875 261.890625 Z M 76.128906 122.183594 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="40fb2f04f6">
          <path
            d="M 87.132812 181.863281 L 151.253906 181.863281 L 151.253906 245.984375 L 87.132812 245.984375 Z M 87.132812 181.863281 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="2efb3e5ea9">
          <path
            d="M 119.191406 181.863281 C 101.484375 181.863281 87.132812 196.214844 87.132812 213.921875 C 87.132812 231.628906 101.484375 245.984375 119.191406 245.984375 C 136.898438 245.984375 151.253906 231.628906 151.253906 213.921875 C 151.253906 196.214844 136.898438 181.863281 119.191406 181.863281 Z M 119.191406 181.863281 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="c73259827c">
          <path
            d="M 0 41.097656 L 227 41.097656 L 227 237.136719 L 0 237.136719 Z M 0 41.097656 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="62b958be55">
          <path
            d="M 17.472656 188.113281 L 221 188.113281 L 221 261.921875 L 17.472656 261.921875 Z M 17.472656 188.113281 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#c73259827c)">
        <path
          fill={primaryColor}
          d="M 170.179688 142.515625 C 168.03125 142.480469 165.898438 142.351562 163.75 142.128906 C 159.671875 141.707031 156.089844 138.839844 152.417969 138.730469 C 145.804688 138.53125 139.539062 141.359375 131.933594 141.652344 C 126.902344 141.890625 122.253906 140.53125 118.085938 137.003906 C 96.335938 133.496094 78.40625 133.53125 64.207031 137.003906 C 62.113281 125.855469 56.96875 117.660156 51.699219 115.273438 C 54.875 123.300781 57.226562 130.503906 56.015625 136.785156 C 49.675781 135.1875 44.148438 137.335938 39.996094 145.894531 C 33.050781 148.78125 31.527344 168.820312 31.601562 193.839844 C 33.363281 197.21875 34.394531 201.078125 34.816406 205.339844 C 35.3125 210.242188 35 215.679688 34.0625 221.523438 C 31.160156 223.597656 30.847656 231.992188 29.25 237.246094 L 23.683594 237.246094 L 19.238281 196.816406 L 11.800781 181.972656 C 2.613281 164.226562 0.59375 149.183594 7.355469 137.5 C 3.128906 134.121094 0.816406 130.28125 0.613281 125.945312 C 0.207031 116.671875 8.714844 108.273438 15.820312 103.40625 C 20.082031 100.488281 29.25 99.441406 28.605469 94.996094 C 24.96875 95.363281 21.976562 94.773438 19.972656 92.714844 C 10.347656 82.851562 29.230469 78.644531 36.101562 77.929688 C 48.28125 76.660156 61.46875 79.710938 79.066406 79.710938 C 71.792969 74.347656 61.15625 71.445312 51.9375 71.703125 C 59.0625 64.628906 70.085938 59.414062 81.511719 56.492188 C 79.179688 55.207031 72.199219 54.65625 63.269531 55.8125 C 77.523438 47.160156 87.425781 50.210938 107.648438 56.96875 L 95.34375 41.097656 C 102.140625 44.148438 108.496094 46.683594 114.464844 48.757812 C 137.132812 56.65625 163.457031 53.515625 184.507812 58.953125 C 219.464844 67.972656 238.183594 116.117188 200.03125 135.738281 C 190.585938 140.605469 180.742188 142.679688 170.179688 142.515625 Z M 199.550781 146.628906 C 198.46875 145.34375 198.101562 144.003906 198.429688 143.304688 C 210.738281 138.289062 219.425781 141.652344 224.09375 154.34375 C 229.328125 166.984375 224.074219 168.433594 221.246094 177.03125 C 218.011719 186.824219 221.449219 198.523438 218.730469 211.089844 C 216.523438 221.210938 216.929688 226.847656 216.929688 237.226562 C 214.613281 233.828125 213.253906 223.855469 212.152344 212.246094 C 212.0625 199.441406 212.648438 189.742188 209.34375 177.195312 C 208.058594 172.328125 206.402344 169.078125 205.375 165.441406 C 202.710938 156.164062 205.136719 153.207031 199.550781 146.628906 Z M 199.550781 146.628906 "
          fillOpacity="1"
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#62b958be55)">
        <path
          fill={secondaryColor}
          d="M 67.324219 257.671875 C 87.0625 257.671875 101.574219 237.433594 101.574219 220.535156 C 101.574219 203.640625 86.332031 192.828125 67.324219 192.828125 C 50.007812 192.828125 33.714844 202.871094 33.714844 221.742188 C 33.714844 238.636719 47.8125 257.671875 67.324219 257.671875 M 171.199219 257.671875 C 190.714844 257.671875 204.808594 238.636719 204.808594 221.742188 C 204.808594 202.871094 188.519531 192.828125 171.199219 192.828125 C 152.1875 192.828125 136.949219 203.640625 136.949219 220.535156 C 136.949219 237.433594 151.464844 257.671875 171.199219 257.671875 M 220.890625 202.628906 L 220.890625 209.648438 C 220.890625 209.648438 213.632812 210.855469 211.945312 216.183594 C 210.253906 221.503906 208.800781 261.910156 172.027344 261.910156 C 135.25 261.910156 128.960938 216.660156 128.960938 216.660156 C 128.960938 216.660156 131.867188 214.484375 131.867188 211.34375 C 131.867188 208.238281 127.34375 205.851562 119.261719 205.777344 C 111.175781 205.851562 106.652344 208.238281 106.652344 211.34375 C 106.652344 214.484375 109.558594 216.660156 109.558594 216.660156 C 109.558594 216.660156 103.273438 261.910156 66.496094 261.910156 C 29.722656 261.910156 28.269531 221.503906 26.578125 216.183594 C 24.886719 210.855469 17.628906 209.648438 17.628906 209.648438 L 17.628906 202.628906 C 17.628906 202.628906 25.488281 202.628906 27.851562 201.359375 C 30.207031 200.089844 46.175781 188.117188 66.132812 188.117188 C 86.09375 188.117188 100.609375 200.453125 104.417969 200.453125 C 108.230469 200.453125 108.046875 197.367188 108.046875 197.367188 L 130.476562 197.367188 C 130.476562 197.367188 130.292969 200.453125 134.105469 200.453125 C 137.914062 200.453125 152.429688 188.117188 172.390625 188.117188 C 192.347656 188.117188 208.316406 200.089844 210.667969 201.359375 C 213.03125 202.628906 220.890625 202.628906 220.890625 202.628906 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(238.342599, 145.000751)">
          <g>
            <path d="M 3.828125 -1.375 C 8.003906 -17.269531 12.710938 -33.550781 17.953125 -50.21875 C 23.203125 -66.882812 28.378906 -81.738281 33.484375 -94.78125 L 66.046875 -94.78125 C 71.140625 -81.738281 76.3125 -66.882812 81.5625 -50.21875 C 86.8125 -33.550781 91.523438 -17.269531 95.703125 -1.375 L 71.84375 0 C 70.21875 -5.707031 68.082031 -14.269531 65.4375 -25.6875 L 34.09375 -25.6875 C 30.9375 -13.65625 28.796875 -5.09375 27.671875 0 Z M 59.78125 -46.015625 C 57.125 -55.191406 54.164062 -64.566406 50.90625 -74.140625 L 48.609375 -74.140625 C 45.554688 -65.679688 42.550781 -56.304688 39.59375 -46.015625 Z M 59.78125 -46.015625 " />
          </g>
        </g>
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(331.444921, 145.000751)">
          <g>
            <path d="M 9.78125 -72.15625 L 30.421875 -72.15625 L 31.34375 -57.484375 L 32.875 -57.484375 C 35.625 -62.472656 38.753906 -66.265625 42.265625 -68.859375 C 45.785156 -71.460938 50.144531 -72.765625 55.34375 -72.765625 C 56.15625 -72.765625 57.25 -72.359375 58.625 -71.546875 C 60 -70.734375 61.046875 -69.914062 61.765625 -69.09375 L 59.46875 -49.375 L 53.046875 -49.375 C 44.285156 -49.375 37.40625 -47.082031 32.40625 -42.5 L 32.40625 0 L 9.78125 0 Z M 9.78125 -72.15625 " />
          </g>
        </g>
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(389.84409, 145.000751)">
          <g>
            <path d="M 44.1875 1.53125 C 38.070312 1.53125 32.617188 0.867188 27.828125 -0.453125 C 24.253906 -3.003906 21.320312 -5.753906 19.03125 -8.703125 C 16.738281 -11.660156 15.59375 -14.617188 15.59375 -17.578125 L 15.59375 -53.203125 L 1.53125 -53.203125 L 4.28125 -72.15625 L 15.59375 -72.15625 L 15.59375 -91.109375 L 38.375 -91.109375 L 38.375 -72.15625 L 62.0625 -72.15625 L 59.3125 -53.203125 L 38.375 -53.203125 L 38.375 -27.671875 C 38.375 -24.921875 38.628906 -22.628906 39.140625 -20.796875 C 41.171875 -20.179688 43.410156 -19.875 45.859375 -19.875 C 51.460938 -19.875 56.304688 -21.046875 60.390625 -23.390625 L 63.75 -3.359375 C 61.195312 -1.734375 58.390625 -0.515625 55.328125 0.296875 C 52.273438 1.117188 48.5625 1.53125 44.1875 1.53125 Z M 44.1875 1.53125 " />
          </g>
        </g>
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(450.230658, 145.000751)">
          <g>
            <path d="M 9.78125 -102.578125 L 32.40625 -102.578125 L 32.40625 -74.609375 L 31.640625 -61.453125 L 32.5625 -61.453125 C 35.820312 -65.429688 39.488281 -68.460938 43.5625 -70.546875 C 47.644531 -72.640625 52.335938 -73.6875 57.640625 -73.6875 C 64.765625 -73.6875 70.265625 -71.898438 74.140625 -68.328125 C 78.015625 -64.765625 79.953125 -59.519531 79.953125 -52.59375 L 79.953125 0 L 57.328125 0 L 57.328125 -50.609375 C 55.085938 -51.523438 52.132812 -51.984375 48.46875 -51.984375 C 41.9375 -51.984375 36.582031 -50.347656 32.40625 -47.078125 L 32.40625 0 L 9.78125 0 Z M 9.78125 -102.578125 " />
          </g>
        </g>
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(532.937341, 145.000751)">
          <g>
            <path d="M 30.734375 1.21875 C 23.691406 1.21875 18.285156 -0.691406 14.515625 -4.515625 C 10.742188 -8.335938 8.859375 -14.019531 8.859375 -21.5625 L 8.859375 -72.15625 L 31.796875 -72.15625 L 31.796875 -20.796875 C 34.140625 -19.972656 36.738281 -19.5625 39.59375 -19.5625 C 45.8125 -19.5625 50.601562 -21.296875 53.96875 -24.765625 L 53.96875 -72.15625 L 76.890625 -72.15625 L 76.890625 0 L 56.71875 0 L 55.796875 -11 L 54.578125 -11 C 51.316406 -6.925781 47.875 -3.867188 44.25 -1.828125 C 40.632812 0.203125 36.128906 1.21875 30.734375 1.21875 Z M 30.734375 1.21875 " />
          </g>
        </g>
      </g>
      <g fill={secondaryColor} fillOpacity="1">
        <g transform="translate(613.197943, 145.000751)">
          <g>
            <path d="M 9.78125 -72.15625 L 30.421875 -72.15625 L 31.34375 -57.484375 L 32.875 -57.484375 C 35.625 -62.472656 38.753906 -66.265625 42.265625 -68.859375 C 45.785156 -71.460938 50.144531 -72.765625 55.34375 -72.765625 C 56.15625 -72.765625 57.25 -72.359375 58.625 -71.546875 C 60 -70.734375 61.046875 -69.914062 61.765625 -69.09375 L 59.46875 -49.375 L 53.046875 -49.375 C 44.285156 -49.375 37.40625 -47.082031 32.40625 -42.5 L 32.40625 0 L 9.78125 0 Z M 9.78125 -72.15625 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(238.524252, 240.845884)">
          <g>
            <path d="M 35.3125 0 C 29.601562 -12.738281 23.867188 -27.820312 18.109375 -45.25 C 12.359375 -62.675781 7.546875 -79.238281 3.671875 -94.9375 L 26.59375 -96 C 29.351562 -84.082031 32.742188 -71.316406 36.765625 -57.703125 C 40.796875 -44.097656 44.644531 -32.203125 48.3125 -22.015625 L 49.84375 -22.015625 C 53.507812 -32.003906 57.378906 -43.828125 61.453125 -57.484375 C 65.535156 -71.140625 68.953125 -83.976562 71.703125 -96 L 94.78125 -94.9375 C 90.90625 -79.238281 86.085938 -62.675781 80.328125 -45.25 C 74.578125 -27.820312 68.847656 -12.738281 63.140625 0 Z M 35.3125 0 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(331.473692, 240.845884)">
          <g>
            <path d="M 9.625 -102.578125 L 32.5625 -102.578125 L 32.5625 -82.09375 L 9.625 -82.09375 Z M 9.78125 -72.15625 L 32.40625 -72.15625 L 32.40625 0 L 9.78125 0 Z M 9.78125 -72.15625 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(368.164242, 240.845884)">
          <g>
            <path d="M 11.46875 -72.15625 L 32.25 -72.15625 L 33.171875 -60.84375 L 34.390625 -60.84375 C 40.609375 -69.40625 48.816406 -73.6875 59.015625 -73.6875 C 65.941406 -73.6875 71.210938 -71.847656 74.828125 -68.171875 C 78.453125 -64.503906 80.265625 -59.3125 80.265625 -52.59375 L 80.265625 0 L 57.78125 0 L 57.78125 -50.90625 C 55.75 -51.820312 53.050781 -52.28125 49.6875 -52.28125 C 42.957031 -52.28125 37.707031 -50.648438 33.9375 -47.390625 L 33.9375 0 L 11.46875 0 Z M 11.46875 -72.15625 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(452.093931, 240.845884)">
          <g>
            <path d="M 43.421875 1.53125 C 30.171875 1.53125 20.5625 -1.625 14.59375 -7.9375 C 8.632812 -14.257812 5.65625 -23.285156 5.65625 -35.015625 C 5.65625 -46.628906 8.941406 -55.875 15.515625 -62.75 C 22.085938 -69.632812 31.03125 -73.078125 42.34375 -73.078125 C 53.65625 -73.078125 62.878906 -70.988281 70.015625 -66.8125 L 70.015625 -61.296875 C 70.015625 -55.691406 69.351562 -50.140625 68.03125 -44.640625 L 49.21875 -44.640625 L 48 -51.515625 C 45.957031 -51.921875 43.515625 -52.125 40.671875 -52.125 C 36.585938 -52.125 33.171875 -51.71875 30.421875 -50.90625 C 28.992188 -46.21875 28.28125 -41.222656 28.28125 -35.921875 C 28.28125 -30.316406 29.425781 -26.210938 31.71875 -23.609375 C 34.007812 -21.015625 38.113281 -19.71875 44.03125 -19.71875 C 51.257812 -19.71875 57.628906 -21.910156 63.140625 -26.296875 L 73.234375 -9.9375 C 69.253906 -6.375 64.894531 -3.570312 60.15625 -1.53125 C 55.414062 0.507812 49.835938 1.53125 43.421875 1.53125 Z M 43.421875 1.53125 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(522.264629, 240.845884)">
          <g>
            <path d="M 43.71875 0.921875 C 31.59375 0.921875 22.289062 -2.132812 15.8125 -8.25 C 9.34375 -14.363281 6.109375 -23.382812 6.109375 -35.3125 C 6.109375 -47.851562 9.21875 -57.382812 15.4375 -63.90625 C 21.65625 -70.425781 30.625 -73.6875 42.34375 -73.6875 C 52.738281 -73.6875 60.765625 -70.957031 66.421875 -65.5 C 72.078125 -60.050781 74.90625 -52.585938 74.90625 -43.109375 C 74.90625 -41.578125 74.851562 -40.40625 74.75 -39.59375 L 63.59375 -28.59375 L 28.125 -28.890625 C 28.125 -25.328125 29.375 -22.648438 31.875 -20.859375 C 34.375 -19.078125 38.578125 -18.1875 44.484375 -18.1875 C 49.785156 -18.1875 54.367188 -18.722656 58.234375 -19.796875 C 62.109375 -20.867188 65.832031 -22.421875 69.40625 -24.453125 L 74.90625 -7.03125 C 71.03125 -4.476562 66.617188 -2.515625 61.671875 -1.140625 C 56.734375 0.234375 50.75 0.921875 43.71875 0.921875 Z M 53.359375 -43.71875 C 53.660156 -44.84375 53.8125 -45.757812 53.8125 -46.46875 C 53.8125 -49.019531 52.6875 -51.035156 50.4375 -52.515625 C 48.195312 -53.992188 45.347656 -54.734375 41.890625 -54.734375 C 37.097656 -54.734375 33.628906 -53.738281 31.484375 -51.75 C 29.347656 -49.757812 28.175781 -46.878906 27.96875 -43.109375 Z M 53.359375 -43.71875 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(597.480301, 240.845884)">
          <g>
            <path d="M 11.46875 -72.15625 L 32.25 -72.15625 L 33.171875 -60.84375 L 34.390625 -60.84375 C 40.609375 -69.40625 48.816406 -73.6875 59.015625 -73.6875 C 65.941406 -73.6875 71.210938 -71.847656 74.828125 -68.171875 C 78.453125 -64.503906 80.265625 -59.3125 80.265625 -52.59375 L 80.265625 0 L 57.78125 0 L 57.78125 -50.90625 C 55.75 -51.820312 53.050781 -52.28125 49.6875 -52.28125 C 42.957031 -52.28125 37.707031 -50.648438 33.9375 -47.390625 L 33.9375 0 L 11.46875 0 Z M 11.46875 -72.15625 " />
          </g>
        </g>
      </g>
      <g fill={primaryColor} fillOpacity="1">
        <g transform="translate(681.40999, 240.845884)">
          <g>
            <path d="M 44.1875 1.53125 C 38.070312 1.53125 32.617188 0.867188 27.828125 -0.453125 C 24.253906 -3.003906 21.320312 -5.753906 19.03125 -8.703125 C 16.738281 -11.660156 15.59375 -14.617188 15.59375 -17.578125 L 15.59375 -53.203125 L 1.53125 -53.203125 L 4.28125 -72.15625 L 15.59375 -72.15625 L 15.59375 -91.109375 L 38.375 -91.109375 L 38.375 -72.15625 L 62.0625 -72.15625 L 59.3125 -53.203125 L 38.375 -53.203125 L 38.375 -27.671875 C 38.375 -24.921875 38.628906 -22.628906 39.140625 -20.796875 C 41.171875 -20.179688 43.410156 -19.875 45.859375 -19.875 C 51.460938 -19.875 56.304688 -21.046875 60.390625 -23.390625 L 63.75 -3.359375 C 61.195312 -1.734375 58.390625 -0.515625 55.328125 0.296875 C 52.273438 1.117188 48.5625 1.53125 44.1875 1.53125 Z M 44.1875 1.53125 " />
          </g>
        </g>
      </g>
    </svg>
  );
}
export const ButtonButton = (text) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        justifyContent: "right",
      }}
    >
      <Link
        style={{
          ...linkReset,
          backgroundColor: primaryColor(),
          color: textPrimaryColorContrast(),
          padding: "0.5rem",
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export const sendEmailTemplateLinkPosted = async (to, message) => {
  try {
    // await emailjs.send(
    //   "service_oja9wsi",
    //   "template_sqtzkz8",
    //   {
    //     to_name: to,
    //     from_name: "arvinenglishschool@gmail.com",
    //     message: message,
    //   },
    //   "6wagjIYRZpgGApc4x"
    // );
    // console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};

export const sendEmailTemplateVideoPosted = async (to, message) => {
  try {
    // await emailjs.send(
    //   "service_oja9wsi",
    //   "template_6gu2nig",
    //   {
    //     to_name: to,
    //     from_name: "arvinenglishschool@gmail.com",
    //     message: message,
    //   },
    //   "6wagjIYRZpgGApc4x"
    // );
    // console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};

export function authorizationToken() {
  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };
  return headers.headers.authorization.split(" ")[1];
}

export function isDev() {
  if (window.location.hostname === "localhost") {
    return "http://localhost:3502";
  } else {
    return "https://apiprod.arthurvincent.com.br";
  }
}

// export function logout24h() {
//   setTimeout(() => {
//     alert("Token expirado: Faça login novamente");
//     localStorage.removeItem("authorization");
//     localStorage.removeItem("loggedIn");
//     window.location.assign("/");
//   }, 43200000); // login expirar o login em 12h de inatividade
// }

export const backDomain = isDev();
