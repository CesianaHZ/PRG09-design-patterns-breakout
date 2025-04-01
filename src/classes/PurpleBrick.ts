import { Brick } from "./Brick";

export class PurpleBrick extends Brick {
    private wasYellow: boolean;

    constructor(x: number, y: number, wasYellow: boolean = false) {
        super(x, y);
        this.hitPoints = 1;
        this.classList.add("brick-component");
        this.wasYellow = wasYellow;
    }

    public wasOriginallyYellow(): boolean {
        return this.wasYellow;
    }
}

window.customElements.define("brick-component", PurpleBrick);