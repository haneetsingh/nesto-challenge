import { AbstractIntlMessages } from "next-intl";

import en from "./en.json";
import fr from "./fr.json";

const translations: Record<string, AbstractIntlMessages> = {
  en,
  fr,
};

export default translations;
