import { Brick } from "./brick";

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
        brick.destroy();
    }

    public getBricks(): Brick[] {
        return this.bricks;
    }
}
