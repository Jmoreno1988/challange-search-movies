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
        this.localStorage = new LocalStorage();
    }

    render() {
        return html`
            <header>
                <toolbar-app></toolbar-app>
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
                return html`
                    <page-main .logo=${openWcLogo}></page-main>
                `;
            case 'pageOne':
                return html`
                    <page-one></page-one>
                `;
            case 'about':
                return templateAbout;
            default:
                return html`
                    <p>Page not found try going to <a href="#main">Main</a></p>
                `;
        }
    }

    __onNavClicked(ev) {
        ev.preventDefault();
        this.page = ev.target.hash.substring(1);
    }

    __navClass(page) {
        return classMap({ active: this.page === page });
    }
}
