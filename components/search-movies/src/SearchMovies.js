import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { openWcLogo } from './open-wc-logo.js';

import '../../page-main/page-main.js';
import '../../page-one/page-one.js';
import { templateAbout } from './templateAbout.js';
import { LocalStorage } from './LocalStorage.js';
import { FooterBar } from '../../footer-bar/index.js';
import { NewMovieModal } from '../../new-movie-modal/index.js';

export class SearchMovies extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            page: { type: String },
            titleMovie: { type: String },
            iconToolbar: { type: String },
            showModalNewMovie: { type: Boolean }
        };
    }

    static get styles() {
        return css`
            :host {
                width:100%; 
                height:100%; 
                display: flex; 
                flex-direction: column;
            }

            header {
                height: 64px;
                z-index: 2;
            }

            main {
                flex: 1; 
                display:flex; 
                overflow-y: auto;
            }

            .wrapper-render-page {
                overflow-y: auto;
                z-index: 1;
                width:100%;
                margin-bottom:30px;
            }

            footer {
                height: 64px;
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
                z-index: 2;
            }

            .modal {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index:10;
            }
        `;
    }

    constructor() {
        super();

        this.page = 'main';
        this.idMovie = "";
        this.iconToolbar = 'menu';
        this.showModalNewMovie = false;
    }

    firstUpdated() {
        document.addEventListener('click-in-card', this._handleClickInImg.bind(this));
        document.addEventListener('click-in-close', this._handleClickClose.bind(this));
        document.addEventListener('close-modal-movie', this._handleCloseModalNewMovie.bind(this));
        this.shadowRoot.getElementById('footer-bar')
            .addEventListener('open-modal-movie', this._handleOpenModalNewMovie.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('click-in-card', () => { });
        document.removeEventListener('click-in-close', () => { });
        document.removeEventListener('close-modal-movie', this._handleCloseModalNewMovie.bind(this));
        this.shadowRoot.getElementById('footer-bar')
            .removeEventListener('open-modal-movie', this._handleOpenModalNewMovie.bind(this));

        super.disconnectedCallback();
    }

    render() {
        return html`
            <header>
                <toolbar-app id="toolbar" icon="${this.iconToolbar}"></toolbar-app>
            </header>

            <main>
                <div class="wrapper-render-page">
                    ${this._renderPage()}
                </div>
            </main>
            
            <footer>
                <footer-bar id="footer-bar"></footer-bar>
            </footer>

            ${ this.showModalNewMovie ? html`
                <div class="modal" >
                    <new-movie-modal></new-movie-modal>
                </div>
            ` : html`` }
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

    _handleOpenModalNewMovie() {
        this.showModalNewMovie = true;
    }

    _handleCloseModalNewMovie() {
        this.showModalNewMovie = false;
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
