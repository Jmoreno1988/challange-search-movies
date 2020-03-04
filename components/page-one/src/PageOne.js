import { html, css, LitElement } from 'lit-element';
import { ViewDetail } from '../../view-detail/index.js';

export class PageOne extends LitElement {
    static get styles() {
        return css`
            :host {
            }
        `;
    }

    static get properties() {
        return {
            idMovie: { type: String }
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <view-detail idMovie=${this.idMovie}></view-detail>
        `;
    }
}
