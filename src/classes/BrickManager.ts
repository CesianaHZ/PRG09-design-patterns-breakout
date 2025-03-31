import { Brick } from "./Brick";
import { Freeze } from "./Freeze";
import { PowerUp } from "./PowerUp";
import { PurpleBrick } from "./PurpleBrick";
import { ReverseControls } from "./ReverseControls";
import { SpeedBoost } from "./Speedboost";
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
                    brick = new YellowBrick(x, y);
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

    private spawnPowerUp(brick: Brick) {
        let strategy = Math.random() < 0.33 ? new SpeedBoost()
                      : Math.random() < 0.66 ? new Freeze()
                      : new ReverseControls();

        new PowerUp(brick.getX(), brick.getY(), strategy);
    }

    public getBricks(): Brick[] {
        return this.bricks;
    }
}