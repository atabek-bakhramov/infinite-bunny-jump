// import Phaser from "../lib/phaser.js";
// const i18next = window.i18next;

// let current = "en";

// const LanguageSetter = i18next.init({
//   lng: current,
//   debug: true,
//   resources: {
//     en: {
//       translation: {
//         carrots: "Carrots:",
//         gameOver: "Game Over!",
//       },
//     },
//     ru: {
//       translation: {
//         carrots: "Морковь:",
//         gameOver: "Конец игры!",
//       },
//     },
//     ar: {
//       translation: {
//         carrots: "جزر:",
//         gameOver: "!انتهت اللعبة",
//       },
//     },
//   },
// });

// export default class Navbar extends Phaser.Scene {
//   constructor() {
//     super("navbar");
//   }

//   create() {
//     const buttonEn = this.add
//       .text(20, 20, "English")
//       .setInteractive()
//       .on("pointerdown", () => buttonEn.setScale(1.1))
//       .on("pointerup", () => {
//         buttonEn.setScale(1);
//         this.setRussian("en");
//       });
//     const buttonRu = this.add
//       .text(120, 20, "Russian")
//       .setInteractive()
//       .on("pointerdown", () => buttonRu.setScale(1.1))
//       .on("pointerup", () => {
//         buttonRu.setScale(1);
//         this.setRussian("ru");
//       });

//     const buttonAr = this.add
//       .text(220, 20, "Arabic")
//       .setInteractive()
//       .on("pointerdown", () => buttonAr.setScale(1.1))
//       .on("pointerup", () => {
//         buttonAr.setScale(1);
//         this.setRussian("ar");
//       });
//   }
//   update() {}

//   setRussian(language) {
//     current = language;
//     console.log(current);
//     this.scene.start("game");
//   }
// }

// export { LanguageSetter, Navbar };
