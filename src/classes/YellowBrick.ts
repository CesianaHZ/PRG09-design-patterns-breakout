import { Brick } from "./Brick";

export class YellowBrick extends Brick {
    constructor(x: number, y: number) {
        super(x, y);
        this.hitPoints = 2;
        this.classList.add("yellow-brick");
    }

    public hit(): boolean {
        this.hitPoints--;
        if (this.hitPoints === 1) {
            this.classList.remove("yellow-brick");
            this.classList.add("brick-component");
            return false;
        }
        return this.hitPoints <= 0;
    }
}

// Register YellowBrick as a custom element
window.customElements.define("yellow-brick", YellowBrick);