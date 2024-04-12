import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import { Nota } from './interfaces';

@customElement('item-render')
export class ItemRender extends LitElement {
    @property({ type: String }) buttonLabelDelete= 'Delete';
    @property({ type: String }) buttonLabelEdit = 'Edit';
    @property({ type: String }) innerText = 'Item Text';
    @property({ type: String }) dataId = '0';
    @property({ type: Boolean }) isChecked = false;
    @property({ type: String }) statusClass = ""

    @query('#btn-delete') btnDelete: HTMLElement;
    @query('#status') inputStatus: HTMLElement;
    @query('.title') itemText: HTMLElement; 
    static styles = [
        css`
        :host {
            display: block;
            
        }
        `
    ];
    
    connectedCallback(): void {
        super.connectedCallback();
        console.log("Item Rendered")
        this.isChecked 
        this.inputStatus
        this.itemText
        this.statusClass
    }

    render() {
       
        return html`
          
            <input id="status" type="checkbox" name="status" ${this.isChecked ? 'checked' : ''} @change=${this._onStatusChange}/>
            <p class="title ${this.statusClass}">${this.innerText}</p>
            <button id="btn-edit" id="${this.dataId}" @click=${this._editItem}>${this.buttonLabelEdit}</button>
            <button id="btn-delete" id="${this.dataId}" @click=${this._deleteItem}>${this.buttonLabelDelete}</button>

            `;
    }

    _deleteItem = () => {
        
        const data:string='prueba'
        this.dispatchEvent(new CustomEvent('delete-item', { detail: data}));
        this.remove()
        
    }

    _onStatusChange = (event: Event) => {
        console.log(event);
        console.log(this.isChecked);
        this.isChecked = event.target['checked'];
        this.isChecked ? this.statusClass = 'completed' : this.statusClass = '';
        console.log(this.isChecked);
    
        
    }

    _editItem = (event: Event) => {
        
        
    }

}
