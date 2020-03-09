import { html, css, LitElement } from 'lit-element';
import { IconMd } from '../../icon-md/index';

export class FooterBar extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                justify-content: center;
                height: 100%;
            }

            .item {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .wrapper-add {
                background: black;
                border-radius: 50%;
                width: 64px;
                height: 64px;
                margin-top: -32px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;
    }

    static get properties() {
        return { };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <icon-md class="item" icon="house"></icon-md>
            <icon-md class="item" icon="play"></icon-md>

            <div clasS="wrapper-add" @click="${this._openModalNewMovie}">
                <icon-md class="item add" icon="add"></icon-md>
            </div>
            
            <icon-md class="item" icon="magnify"></icon-md>
            <icon-md class="item" icon="download"></icon-md>
    `;
    }

    _openModalNewMovie() {
        this.dispatchEvent(new CustomEvent('open-modal-movie', {}));
    }
}
