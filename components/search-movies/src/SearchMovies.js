import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { openWcLogo } from './open-wc-logo.js';

import '../../page-main/page-main.js';
import '../../page-one/page-one.js';
import { templateAbout } from './templateAbout.js';
import { LocalStorage } from './LocalStorage.js';

export class SearchMovies extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            page: { type: String },
            titleMovie: { type: String },
            iconToolbar: { type: String }
        };
    }

    static get styles() {
        return css`
            :host {
                background: red;
            }

            header {
                width: 100%;
                height: 56px;
            }
        `;
    }

    constructor() {
        super();

        this.page = 'main';
        this.idMovie = "";
        this.iconToolbar = 'menu';
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('click-in-card', this._handleClickInImg.bind(this));
        document.addEventListener('click-in-close', this._handleClickClose.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('click-in-card', () => { });
        document.addEventListener('click-in-close', () => { });

        super.disconnectedCallback();
    }

    render() {
        return html`
            <header>
                <toolbar-app id="toolbar" icon="${this.iconToolbar}"></toolbar-app>
            </header>

            <main>
                ${this._renderPage()}
            </main>

            <footer>

            </footer>
        `;
    }

    _renderPage() {
        switch (this.page) {
            case 'main':
                if (this._getNode('toolbar')) 
                    this._getNode('toolbar').icon = 'menu';
                
                return html`
                    <page-main .logo=${openWcLogo}></page-main>
                `;
            case 'pageOne':
                this._getNode('toolbar').icon = 'close';

                return html`
                    <page-one idMovie="${this.idMovie}"></page-one>
                `;
            case 'about':
                return templateAbout;
            default:
                return html`
                    <p>Page not found try going to <a href="#main">Main</a></p>
                `;
        }
    }

    _handleClickInImg(evt) {
        if (!evt.detail.id) return;
        
        this.page = "pageOne";
        this.idMovie = evt.detail.id;
    }

    _handleClickClose(evt) {
        this.page = "main";
    }

    _getNode(id) {
        return this.shadowRoot.getElementById(id);
    }

    __onNavClicked(ev) {
        ev.preventDefault();
        this.page = ev.target.hash.substring(1);
    }

    __navClass(page) {
        return classMap({ active: this.page === page });
    }
}
