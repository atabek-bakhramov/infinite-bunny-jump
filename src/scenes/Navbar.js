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
        chooseLanguage: "Choose Language",
      },
    },
    ru: {
      translation: {
        carrots: "Морковь:",
        gameOver: "Конец игры!",
        chooseLanguage: "Выбрать язык",
      },
    },
  },
});

export default class Navbar extends Phaser.Scene {
  buttonEn;
  buttonRu;
  constructor() {
    super("navbar");
  }

  create() {
    this.buttonEn = this.add
      .text(20, 20, "English")
      .setInteractive()
      .on("pointerdown", () => this.buttonEn.setScale(1.1))
      .on("pointerup", () => {
        this.buttonEn.setScale(1);
        this.setLanguage("en");
      })
      .setScrollFactor(0);
    this.buttonEn.depth = 100;

    this.buttonRu = this.add
      .text(120, 20, "Русский")
      .setInteractive()
      .on("pointerdown", () => this.buttonRu.setScale(1.1))
      .on("pointerup", () => {
        this.buttonRu.setScale(1);
        this.setLanguage("ru");
      })
      .setScrollFactor(0);
    this.buttonRu.depth = 100;
  }

  setLanguage(language) {
    i18next.changeLanguage(language);
    this.scene.start("game");
  }
}
