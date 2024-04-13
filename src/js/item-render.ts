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

    @query('.btn-delete') btnDelete: HTMLElement;
    @query('.btn-edit') btnEdit: HTMLElement;
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
          
            <input id="${this.dataId}" type="checkbox" name="status" ${this.isChecked ? 'checked' : ''} @change=${this._onStatusChange}/>
            <p class="title ${this.statusClass}">${this.innerText}</p>
            <button id="${this.dataId}" class="btn-edit" @click=${this._editItem}>${this.buttonLabelEdit}</button>
            <button id="${this.dataId}" class="btn-delete" @click="${this._deleteItem}">${this.buttonLabelDelete}</button>

            `;
    }

    _deleteItem = (event: Event) => {
        event.preventDefault()
        console.log('itemrender event', event.target);
        const id = (event.target as HTMLElement).id;
        this.dispatchEvent(new CustomEvent('delete-item', {
            detail: { id },
            bubbles: true,
            composed: true
        }));
        this.remove()
        
    }

    _onStatusChange = (event: Event) => {
        console.log(event);
        console.log(this.isChecked);
        const id = (event.target as HTMLElement).id;
        this.isChecked = event.target['checked'];
        this.isChecked ? this.statusClass = 'completed' : this.statusClass = '';
        console.log(this.isChecked);
        this.dispatchEvent(new CustomEvent('isCompleted', { 
            detail: {
                isComplete : this.isChecked,
                id: id
            },
            bubbles: true,
            composed: true
        
        }));
        
    }

    _editItem = (event: Event) => {
        
        
    }

}
