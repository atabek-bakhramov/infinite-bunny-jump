const Phaser = window.Phaser;

import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import TextScene from "./scenes/TextScene.js";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Game, TextScene, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
    },
  },
});
