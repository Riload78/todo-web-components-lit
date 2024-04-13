import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import { Nota } from './interfaces.js';
import './input-action.js'  
import './item-render.js'

/*
NOMBRE --> list-manager

- Responsabilidad
  - Renderizar componente input-action y añadir listener al evento send-action.
  - Cada vez que el evento send-action es recibido, gestionar y añadir un nuevo todo.
  - Persistir todo's
  - Cuando carguemos la web, mostrar todos ya existentes
  - Gestionar borrado y cambio de estado de los todo's
  
  - Extras
    - mostrar contador todos totales y completados.

- Atributos

- Eventos

- Custom Properties

*/


@customElement('list-manager')
export class ListManager extends LitElement {
    
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    //add eventlistenet form input-action

    @query('.list-wrapper') listWrapper!: HTMLElement;
    @query('.btn-delete') btnDelete: HTMLElement


    connectedCallback() {
        super.connectedCallback();
        this._loadLocalStorage();
    }


    render() {
        return html`
            <div class="list-manager-wrapper">
                <input-action @send-action=${this._addToDO} placeholder="Añadir una nota" btnLabel="Crear"></input-action>
                <div class="list-wrapper"></div>
            </div>
        
        `;
    }

    _addToDO =  (event: CustomEvent) => {
        console.log(event);
        const newTodo = event.detail;
        const objItem: Nota = {
            id: String(Date.now()),
            nota: newTodo,
            isCompleted: false
        }
        this._itemRender(objItem.id, objItem.nota)
        this._safeItem(objItem)
    }

    _itemRender = (id: string, text: string) => {
        const item = `<item-render dataId="${id}" buttonLabelDelete="Eliminar" buttonLabelEdit="Editar" innerText="${text}"></item-render>`;
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.innerHTML = item;
        itemWrapper.addEventListener('delete-item', this._removeItem);
        itemWrapper.addEventListener('isCompleted', this._completeItem);
        this.listWrapper.appendChild(itemWrapper)
        console.log('list-wrapper',this.listWrapper);
    }

    _removeItem = (event: CustomEvent) => {
        console.log('remove');
        console.log(event);
        const idDelete = event.detail.id;
        const storage:Nota[] = this._loadLocalStorage()
        const itemToDDelete = storage.filter(item => item.id !== idDelete);
        localStorage.setItem("listItems", JSON.stringify(itemToDDelete));
    }

    _safeItem = (item: Nota) => {
        console.log(item);
        const storage: Nota[] = this._loadLocalStorage()
        storage.push(item);
        localStorage.setItem('listItems', JSON.stringify(storage))
    }

    _completeItem = (event: CustomEvent) => {
        console.log('completed:', event.detail);
        
    }

    _loadLocalStorage = () : [] => {
        const data = localStorage.getItem('listItems') ?? '[]';
        const listItemsLs: [] = JSON.parse(data)
        return listItemsLs
    }
}
