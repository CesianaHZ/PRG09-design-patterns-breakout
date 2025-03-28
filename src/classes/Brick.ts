export class Brick extends HTMLElement {
    private x: number;
    private y: number;
    private width: number = 64;
    private height: number = 32;
    private color: string;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;

        const randomValue = Math.random();
        if (randomValue < 0.3) this.color = "yellow";  // Reverse Controls
        else if (randomValue < 0.5) this.color = "blue";  // Speed Boost
        else if (randomValue < 0.7) this.color = "red";  // Freeze
        else this.color = "grey";  // No power-up

        this.style.position = "absolute";
        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);


        requestAnimationFrame(() => {
            this.style.backgroundColor = this.color;
        });
    }

    public getColor(): string {
        return this.color;
    }

    public destroy() {
        this.remove();
    }
}

window.customElements.define("brick-component", Brick as any);
