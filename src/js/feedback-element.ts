import { LitElement, html } from "lit";
import {  customElement, property } from "lit/decorators"

@customElement('feedback-element')
export class FeedBack extends LitElement{
    @property({type: String}) message = "Becerro";
    @property( { type : Boolean} ) isOpened = false;

    constructor() {
        super()
        this.message
        this.isOpened

    }
    render() {
        return html`
            <div id="container" class="${this.isOpened ? 'opened' : ''}">
                <input @input="${this.handlerName}" type="text" id="user_message" placeholder="Escribe tu mensaje..." />
                <div>Feedback: ${this.message}</div>
            </di>
        `
    }

    handlerName = (event:Event) => {
        console.log(this.message);
        const input = event.target as HTMLInputElement;
        this.isOpened = true;
        this.message = input.value;
    }
}