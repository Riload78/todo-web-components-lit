import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('input-action')
export class InputAction extends LitElement {
    // properties
    @property({ type: String }) placeholder = "Input Action";
    @property({ type: String }) btnLabel = "Añadir";
    @property({ type: String }) name = "action"

    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    constructor() {
        super()
        
        
    }
    

    render() {
        return html`
            <div class="input-wrapper">
                <label for="${this.name}">Añadir una nota</label>
                <input class="input" type="" name="${this.name}" placeholder="${this.placeholder}" />
                <button class="disabled" @click="${this._handlerSubmit}">${this.btnLabel}</button>
            </div>
        `;
    }

    _handlerSubmit = () => {

        const input = this.shadowRoot?.querySelector(`[name=${this.name}]`) as HTMLInputElement;
        if(!input.value) return alert("Ingresar un dato");
        
        console.log(input.value);
        
        this.dispatchEvent(new CustomEvent('eventName', { detail: input.value})); 
        input.value =  "";
        
    }
}
