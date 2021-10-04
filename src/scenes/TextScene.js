import Phaser from "../lib/phaser.js";

const i18next = window.i18next;

i18next.init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: {
        carrots: "Carrots:",
        gameOver: "Game Over!",
      },
    },
    ru: {
      translation: {
        carrots: "Морковь:",
        gameOver: "Конец игры!",
      },
    },
    ar: {
      translation: {
        carrots: ":جزر",
        gameOver: "!انتهت اللعبة",
      },
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
        color: "#000",
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
        color: "#000",
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
        color: "#000",
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
        color: "#000",
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
