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
        return {};
    }

    render() {
        return html`
            <div class="toolbar-flex">
                <div class="toolbar-item">
                    Logo
                </div>
                <div class="toolbar-item">
                    <icon-md icon="menu" color="white"><icon-md>
                </div>
            </div>
        `;
    }
}
