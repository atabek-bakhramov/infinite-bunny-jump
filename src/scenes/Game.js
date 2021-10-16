import Phaser from "../lib/phaser.js";

import Carrot from "../game/Carrot.js";

export default class Game extends Phaser.Scene {
  canvas;

  volume;
  isSound;

  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;

  leftButton;
  rightButton;

  leftInterval;
  rightInterval;

  /** @type {Phaser.Physics.Arcade.Group} */
  carrots;

  carrotsCollected = 0;

  /** @type {Phaser.GameObjects.Text} */
  carrotsCollectedText;

  constructor() {
    super("game");
  }

  init() {
    this.carrotsCollected = 0;
  }

  preload() {
    this.load.image("background", "assets/bg_layer1.png");
    this.load.image("platform", "assets/ground_grass.png");
    this.load.image("bunny-stand", "assets/bunny1_stand.png");
    this.load.image("bunny-jump", "assets/bunny1_jump.png");
    this.load.image("carrot", "assets/carrot.png");
    this.load.image("left-arrow", "assets/left-arrow.png");
    this.load.image("right-arrow", "assets/right-arrow.png");

    this.load.audio("jump", "assets/sfx/phaseJump1.wav");
    this.load.image("volume", "assets/volume.png");

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.scene.launch("text-scene");

    this.canvas = this.sys.game.canvas;

    this.add.image(240, 320, "background").setScrollFactor(1, 0);

    this.isSound = true;

    this.leftButton = this.add
      .image(55, this.canvas.height - 55, "left-arrow")
      .setScrollFactor(1, 0)
      .setScale(0.8)
      .setInteractive();
    this.leftButton.depth = 2;

    this.rightButton = this.add
      .image(this.canvas.width - 55, this.canvas.height - 55, "right-arrow")
      .setScrollFactor(1, 0)
      .setScale(0.8)
      .setInteractive();
    this.rightButton.depth = 2;

    this.volume = this.add
      .image(this.canvas.width * 0.95, this.canvas.height * 0.05, "volume")
      .setScrollFactor(1, 0)
      .setInteractive();
    this.volume.depth = 2;

    this.platforms = this.physics.add.staticGroup();

    // then create 5 platforms from the group
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, this.canvas.width - 80);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);

    this.player.depth = 1;

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.carrots = this.physics.add.group({
      classType: Carrot,
    });

    this.physics.add.collider(this.platforms, this.carrots);
    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    );

    this.carrotsCollectedText = this.add
      .text(380, 50, `0`, {
        color: "rgb(50,100,150)",
        fontSize: 24,
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.leftButton.on("pointerdown", () => {
      this.leftButton.setScale(1);
      this.leftInterval = setInterval(() => {
        this.player.setVelocityX(-200);
      }, 20);
    });

    this.rightButton.on("pointerdown", () => {
      this.rightButton.setScale(1);
      this.rightInterval = setInterval(() => {
        this.player.setVelocityX(200);
      }, 20);
    });

    this.volume.on("pointerup", () => {
      console.log("clicked");
      this.isSound = !this.isSound;
    });
  }

  update(t, dt) {
    if (!this.player) {
      return;
    }

    this.leftButton.on("pointerup", () => {
      clearInterval(this.leftInterval);
      this.leftButton.setScale(0.8);
    });

    this.rightButton.on("pointerup", () => {
      clearInterval(this.rightInterval);
      this.rightButton.setScale(0.8);
    });

    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
        this.addCarrotAbove(platform);
      }
    });

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture("bunny-jump");

      if (this.isSound) {
        this.sound.play("jump");
      }
    }

    const vy = this.player.body.velocity.y;
    if (vy > 0 && this.player.texture.key !== "bunny-stand") {
      this.player.setTexture("bunny-stand");
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);

    const bottomPlatform = this.findBottomMostPlatform();
    if (this.player.y > bottomPlatform.y + 200) {
      this.scene.sleep("text-scene");
      this.scene.start("game-over");
    }
  }

  /**
   *
   * @param {Phaser.GameObjects.Sprite} sprite
   */
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }

  /**
   *
   * @param {Phaser.GameObjects.Sprite} sprite
   */
  addCarrotAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;

    /** @type {Phaser.Physics.Arcade.Sprite} */
    const carrot = this.carrots.get(sprite.x, y, "carrot");

    carrot.setActive(true);
    carrot.setVisible(true);

    this.add.existing(carrot);

    carrot.body.setSize(carrot.width, carrot.height);

    this.physics.world.enable(carrot);

    return carrot;
  }

  /**
   *
   * @param {Phaser.Physics.Arcade.Sprite} player
   * @param {Carrot} carrot
   */
  handleCollectCarrot(player, carrot) {
    this.carrots.killAndHide(carrot);

    this.physics.world.disableBody(carrot.body);

    this.carrotsCollected++;

    this.carrotsCollectedText.text = `${this.carrotsCollected}`;
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i];

      // discard any platforms that are above current
      if (platform.y < bottomPlatform.y) {
        continue;
      }

      bottomPlatform = platform;
    }

    return bottomPlatform;
  }

  getConsoleLog() {
    console.log("game scene got");
  }
}
