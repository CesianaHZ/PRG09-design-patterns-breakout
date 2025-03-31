import { Brick } from "./Brick";
import { PurpleBrick } from "./PurpleBrick";
import { BrickManager } from "./BrickManager";

export class YellowBrick extends Brick {
    private brickManager: BrickManager;

    constructor(x: number, y: number, brickManager: BrickManager) {
        super(x, y);
        this.hitPoints = 2;
        this.classList.add("yellow-brick");
        this.brickManager = brickManager;
    }

    public hit(): boolean {
        this.hitPoints--;
        if (this.hitPoints === 1) {
            const purpleBrick = new PurpleBrick(this.x, this.y);

            this.brickManager.replaceBrick(this, purpleBrick);

            return false;
        }
        return this.hitPoints <= 0;
    }
}

window.customElements.define("yellow-brick", YellowBrick);