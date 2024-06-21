import { ContrastsAnxiousExcited } from "./ContrastsClasses/ContrastsAnxiousExcited";
import { ContrastsIntroduction } from "./ContrastsClasses/ContrastsIntroduction";
import { ContrastsSpeakTalkTellSay } from "./ContrastsClasses/ContrastsSpeakTalkTellSay";
import { ContrastsStayGet } from "./ContrastsClasses/ContrastsStayGet";

export const contrasts = [
  ...ContrastsStayGet,
  ...ContrastsSpeakTalkTellSay,
  ...ContrastsIntroduction,
  ...ContrastsAnxiousExcited,
];
