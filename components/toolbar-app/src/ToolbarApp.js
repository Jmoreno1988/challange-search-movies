import { html, css, LitElement } from 'lit-element';
import { IconMd } from '../../icon-md/index';

export class ToolbarApp extends LitElement {
    static get styles() {
        return css`
            :host {
                --toolbar-app-text-color: #000;
                color: var(--toolbar-app-text-color);
            }

            .toolbar-flex {
                background: black;
                width; 100%;
                height: 100%;
                display: flex;
                direction: row;
                flex-wrap: nowrap;
                color: white;
                aling-item: center;
                justify-content: space-between;
            }

            .toolbar-item {
                height: 24px;
                align-self: center;
                margin: 28px;
            }
        `;
    }

    static get properties() {
        return {
            icon: { type: String }
        };
    }

    render() {
        return html`
            <div class="toolbar-flex">
                <div class="toolbar-item">
                    Logo
                </div>

                ${this._iconToolbar()}
            </div>
        `;
    }

    _iconToolbar() {
        switch(this.icon) {
            case 'menu':
                return html`
                    <div class="toolbar-item" @click="${this._openMenu}">
                        <icon-md icon="menu" color="white"><icon-md>
                    </div>`;
            
            case 'close': 
                return html`
                    <div class="toolbar-item" @click="${this._backToMain}">
                        <icon-md icon="close" color="white"><icon-md>
                    </div>`;
        }
    }

    _openMenu() {}

    _backToMain() {
        document.dispatchEvent(new CustomEvent('click-in-close', {}));
    }
}
