import { Brick } from "./Brick";
import { SpeedBoost } from "./Speedboost";
import { Freeze } from "./Freeze";
import { ReverseControls } from "./ReverseControls";
import { PowerUp } from "./PowerUp";

export class BrickManager {
    private bricks: Brick[] = [];
    private rows: number = 7;
    private columns: number = 12;
    private brickWidth: number = 64;
    private brickHeight: number = 32;

    constructor() {
        this.spawnBricks();
    }

    private spawnBricks() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                let offsetX = (window.innerWidth - this.columns * this.brickWidth) / 2;
                let x = column * this.brickWidth + offsetX;
                let y = row * this.brickHeight + 100;

                let brick = new Brick(x, y);
                this.bricks.push(brick);
            }
        }
    }

    public removeBrick(brick: Brick) {
        this.bricks = this.bricks.filter(b => b !== brick);

        if (brick.getColor() !== "grey") {
            this.spawnPowerUp(brick);
        }

        brick.destroy();
    }

    private spawnPowerUp(brick: Brick) {
        let brickColor = brick.getColor();
        let strategy = brickColor === "blue" ? new SpeedBoost()
                      : brickColor === "red" ? new Freeze()
                      : brickColor === "yellow" ? new ReverseControls()
                      : null;

        if (strategy) {
            new PowerUp(brick.offsetLeft, brick.offsetTop, strategy);
        }
    }

    public getBricks(): Brick[] {
        return this.bricks;
    }
}
