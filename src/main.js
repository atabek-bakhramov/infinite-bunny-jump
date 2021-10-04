const Phaser = window.Phaser;

import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import Navbar from "./scenes/Navbar.js";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Navbar, Game, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
});
