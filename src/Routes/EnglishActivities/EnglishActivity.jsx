import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import {
  BackToHomePage,
  IFrameVideoClass,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";

export default function EnglishActivity({ headers, title, url, questions }) {
  const { UniversalTexts } = useUserContext();

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>{title}</HOne>
        <BackToHomePage />
        {url && <IFrameVideoClass src={getVideoEmbedUrl(url)} />}
        {questions && (
          <>
            <HTwo>Questions to discuss during the class</HTwo>
            <div>
              <ul>
                {questions.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </>
        )}
        <HTwo>Sentence Mining</HTwo>
        <div>
          Find 5 terms you didn't know and mine 3 different sentences for each
          one of them. Use one of those 3 websites. Make sure to adapt the
          sentences if they need more context, so that they make sense: (Worth
          100 points each)
          <br />
          <a href="https://www.linguee.com/">Linguee</a>
          <br />
          <a href="https://youglish.com/">YouGlish</a>
          <br />
          <a href="https://context.reverso.net/traducao/">Reverso</a>
        </div>
        <HTwo>Transcribe the text</HTwo>
        <div>
          Transcribe 10 sentences contained in this video and bring it to the
          class.
        </div>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
