import Phaser from "../lib/phaser.js";

export default class GameOver extends Phaser.Scene {
  reload;

  canvas;

  constructor() {
    super("game-over");
  }

  preload() {
    this.load.image("reload", "assets/back.png");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add
      .text(width * 0.5, height * 0.5, `${i18next.t("gameOver")}`, {
        fontSize: 48,
      })
      .setOrigin(0.5);

    this.canvas = this.sys.game.canvas;

    this.reload = this.add
      .image(this.canvas.width / 2, this.canvas.height * 0.6, "reload")
      .setInteractive()
      .on("pointerup", () => {
        this.scene.start("game");
        this.scene.start("text-scene");
      });
  }
}
