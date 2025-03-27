export class Brick extends HTMLElement {
    private x: number;
    private y: number;
    private width: number = 64;
    private height: number = 32;
    private isYellow: boolean;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.isYellow = Math.random() < 0.3; // 30% chance of yellow brick

        this.style.position = "absolute";
        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
        this.style.backgroundColor = this.isYellow ? "yellow" : "red";

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }

    public destroy() {
        this.remove();
    }
}
window.customElements.define("brick-component", Brick as any);
