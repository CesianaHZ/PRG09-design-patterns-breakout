import { Brick } from "./Brick";
import { PurpleBrick } from "./PurpleBrick";
import { YellowBrick } from "./YellowBrick";

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

                let brick: Brick;
                if (Math.random() < 0.3) {
                    brick = new YellowBrick(x, y, this);
                } else {
                    brick = new PurpleBrick(x, y);
                }

                let game = document.getElementsByTagName("game")[0];
                if (game) {
                    game.appendChild(brick);
                } else {
                    console.error("Game element not found!");
                }

                this.bricks.push(brick);
            }
        }
    }

    public removeBrick(brick: Brick) {
        if (!brick.hit()) return;

        this.bricks = this.bricks.filter(b => b !== brick);

        if (brick.classList.contains("brick-component")) {
            this.spawnPowerUp(brick);
        }

        brick.destroy();
    }

    public replaceBrick(oldBrick: Brick, newBrick: Brick) {
        const index = this.bricks.indexOf(oldBrick);
        if (index !== -1) {
            this.bricks[index] = newBrick;

            const parent = oldBrick.parentElement;
            if (parent) {
                parent.replaceChild(newBrick, oldBrick);
            }
        }
    }

    private spawnPowerUp(brick: Brick) {
        // Power-up logic here
    }

    public getBricks(): Brick[] {
        return this.bricks;
    }
}