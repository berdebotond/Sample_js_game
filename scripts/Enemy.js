class Enemy {
    constructor(options) {
      this.name = options.name;
      this.speed = options.speed;
      this.x = options.x;
      this.y = options.y;
      this.direction = options.direction;
      this.lastAttack = options.lastAttack;
      this.health = options.health;
      this.damage = options.damage;
      this.frameIndex = options.frameIndex;
      this.numFrames = options.numFrames;
      this.image = options.image;
      this.range = options.range;
      this.isAttacking = options.isAttacking;
      this.image_path = options.image_path;
    }
}
    