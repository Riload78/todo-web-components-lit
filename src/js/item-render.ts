import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'

@customElement('item-render')
export class ItemRender extends LitElement {
    @property({ type: String }) buttonLabelDelete= 'Eliminar';
    @property({ type: String }) buttonLabelEdit = 'Editar';
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
            <div class=item-list-wrapper>
                <input id="status" type="checkbox" name="status" ${this.isChecked ? 'checked' : ''} @change=${this._onStatusChange}/>
                <p class="title ${this.statusClass}">Título del todo</p>
                <button id="btn-edit" @click=${this._editItem}>${this.buttonLabelEdit}</button>
                <button id="btn-delete" @click=${this._deleteItem}>${this.buttonLabelDelete}</button>
            </div>
            `;
    }

    _deleteItem = () => {
        console.log(this.btnDelete);
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
