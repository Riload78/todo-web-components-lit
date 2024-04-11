import { LitElement, html } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('hola-mundo')
export class HolaMundo extends LitElement {
    @property({type: String})
    version: string = 'V1.0'; // Inicializar propiedades directamente

    @property({ type: Number })
    counter: number = 0;

    constructor() {
        super();
    }

    render() {
        return html`
            <h1>Hola Mundo! Version: ${this.version}</h1>
            <p>Contador: ${this.counter} </p>
            <button @click=${this.incrementar}>Incrementar</button>
            <button @click=${this.decrementar}>Decrementar</button>
        `;
    }

    incrementar = () : void => {
        this.counter++;
    }

    decrementar = () => {
        this.counter--
    }
}

//customElements.define('hola-mundo', HolaMundo)