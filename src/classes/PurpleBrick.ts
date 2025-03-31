import { Brick } from "./Brick";

export class PurpleBrick extends Brick {
    constructor(x: number, y: number) {
        super(x, y);
        this.hitPoints = 1;
        this.classList.add("brick-component");
    }
}

window.customElements.define("brick-component", PurpleBrick);