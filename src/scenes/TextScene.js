import Phaser from "../lib/phaser.js";
const i18next = window.i18next;

import translationEn from "../public/locales/en/translation.json" assert { type: "json" };
import translationRu from "../public/locales/ru/translation.json" assert { type: "json" };
import translationAr from "../public/locales/ar/translation.json" assert { type: "json" };
console.log(translationEn);

i18next.init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: translationRu,
    },
    ar: {
      translation: translationAr,
    },
  },
});

export default class TextScene extends Phaser.Scene {
  buttonEn;
  buttonRu;
  buttonAr;
  carrotText;

  constructor() {
    super("text-scene");
  }

  preload() {}
  create() {
    this.buttonEn = this.add
      .text(20, 20, "English", {
        color: "rgb(50,100,150)",
      })
      .setInteractive()
      .on("pointerdown", () => this.buttonEn.setScale(1.1))
      .on("pointerup", () => {
        this.buttonEn.setScale(1);
        this.setLanguage("en");
      });
    this.buttonEn.depth = 100;
    this.buttonEn.setScrollFactor(0);

    this.buttonRu = this.add
      .text(120, 20, "Русский", {
        color: "rgb(50,100,150)",
      })
      .setInteractive()
      .on("pointerdown", () => this.buttonRu.setScale(1.1))
      .on("pointerup", () => {
        this.buttonRu.setScale(1);
        this.setLanguage("ru");
      });
    this.buttonRu.depth = 100;
    this.buttonRu.setScrollFactor(0);

    this.buttonAr = this.add
      .text(220, 20, "العربية", {
        color: "rgb(50,100,150)",
        fontSize: 20,
      })
      .setInteractive()
      .on("pointerdown", () => this.buttonAr.setScale(1.1))
      .on("pointerup", () => {
        this.buttonAr.setScale(1);
        this.setLanguage("ar");
      });
    this.buttonAr.depth = 100;
    this.buttonAr.setScrollFactor(0);

    this.carrotText = this.add
      .text(380, 10, `${i18next.t("carrots")}`, {
        color: "rgb(50,100,150)",
        fontSize: 24,
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  setLanguage(language) {
    i18next.changeLanguage(language);
    this.scene.restart();
  }
}
