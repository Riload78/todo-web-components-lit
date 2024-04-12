import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
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

    @query('.list-wrapper') listWrapper: HTMLElement;

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
        const item = this._itemRender(newTodo)
        console.log(item);
        
       
    }

    _itemRender = (newTodo) => {
        const item = `<item-render buttonLabelDelete="Eliminar" buttonLabelEdit="Editar" innerText="${newTodo}"></item-render>`;
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.innerHTML = item;
        itemWrapper.addEventListener('delete-item', this._removeItem);
        this.listWrapper.appendChild(itemWrapper)
        return itemWrapper
    }

    _removeItem = (event: CustomEvent) => {
        console.log('remove');
        console.log(event);
        
    }
}
