import baseConf from "../config";
import en from "../translation/en.json";
import fa from "../translation/fa.json";

export const translator = id => {
  const langs = { fa, en };
  const lang = baseConf.theme.lang;
  const text = langs[lang][id];
  if (!text) return "TEXT_NOT_FOUND";

  return langs[lang][id];
};
