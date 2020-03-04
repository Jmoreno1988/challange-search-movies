import { html, css, LitElement } from 'lit-element';
import { LocalStorage } from '../../search-movies/src/LocalStorage';
import { ToolbarApp } from '../../toolbar-app/toolbar-app.js';
import { SearchInput } from '../../search-input/index.js';
import { CardElement } from '../../card-element/index.js'

export class PageMain extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
                height: 100%;
            }

            .wrapper-result-search{
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                overflow-x: auto;
                margin-left: 20px;

            }

            .wrapper-list-fav {
                display: flex;
                flex-direction: row;
                overflow-x: auto;
            }

            .wrapper-my-list {
                margin-left: 20px;
            }

            .card-result {
                margin: 0 5px p 5px;
            }

            .title {
                font-size: 130%;
                font-weight: bold;
                line-height: 42px;
            }

            .fav-button {
                width: 64px;
                height: 64px;
                background-color: #F44336;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                position: absolute;
                botton: 0;
                right: 0;
                display:flex;
                justify-content: center;
                align-items: center;
            }
        `;
    }

    static get properties() {
        return {
            listMovies: {
                type: Array,
                value: []
            },

            listFavorites: {
                type: Array,
                value: []
            }
        };
    }

    constructor() {
        super();

        this.localStorageFav = new LocalStorage('favorites');
        this.listMovies = [];
        this.listFavorites = Object.values(this.localStorageFav.get());
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('new-result-search', this._handleNewSearchResult.bind(this));
        document.addEventListener('toggle-fav', this._handleToggleFav.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('new-result-search', () => { });

        super.disconnectedCallback();
    }

    render() {
        return html`
            <search-input placeholder="Busca tu película"></search-input>

            <div class="wrapper-result-search">
                ${this.listMovies.map(i => html`
                    <card-element id="${i.id}" title="${i.title}" popularity="${i.vote_average}" urlImage="${i.poster_path}"></card-element>
                `)}
            </div>

            <div class="wrapper-my-list">
                <div class="title"> Mi lista </div>
                <div class="wrapper-list-fav">
                    ${this.listFavorites.map(i => html`
                        <card-element id="${i.id}" title="${i.title}" popularity="${i.vote_average}" urlImage="${i.poster_path}"></card-element>
                    `)}
                </div>
            </div>

            <div class="fav-button" @click="${this._openModalNewMovie}">
                <icon-md icon="add" color="white"><icon-md>
            </div>
        `;
    }

    _handleNewSearchResult(evt) {
        if (evt.detail.searchResult && evt.detail.searchResult.results)
            this.listMovies = evt.detail.searchResult.results;
        else
            this.listMovies = [];
    }

    _handleToggleFav(evt) {
        if (!evt.detail.eleFavorite) return;

        const title = evt.detail.eleFavorite;
        const listFav = this.localStorageFav.get();

        if (listFav[title]) {
            delete listFav[title];
            this.localStorageFav.setItem('favorites', listFav);
        } else {
            const ele = this.listMovies.find((ele) => {
                if (ele['original_name'] == title || ele['original_title'] == title) {
                    return ele;
                }
            });

            if (ele)
                this.localStorageFav.set(title, ele);
        }

        this.listFavorites = Object.values(this.localStorageFav.get());
    }

    _openModalNewMovie() {
        
    }
}
