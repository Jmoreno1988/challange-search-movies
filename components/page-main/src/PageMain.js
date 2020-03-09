import { html, css, LitElement } from 'lit-element';
import { LocalStorage } from '../../search-movies/src/LocalStorage';
import { ToolbarApp } from '../../toolbar-app/toolbar-app.js';
import { SearchInput } from '../../search-input/index.js';
import { CardElement } from '../../card-element/index.js';
import { NewMovieModal } from '../../new-movie-modal/index.js';

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
                flex-wrap: wrap;
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
        `;
    }

    static get properties() {
        return {
            listMovies: { type: Array },
            listFavorites: { type: Array }
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
        document.addEventListener('update-list-fav', this._handleUpdateListFav.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('new-result-search', () => { });
        document.removeEventListener('toggle-fav', () => { });
        document.removeEventListener('update-list-fav', () => { });

        super.disconnectedCallback();
    }

    render() {
        return html`
            <search-input></search-input>

            <div class="wrapper-result-search">
                ${this.listMovies.map(i => html`
                    <card-element id="${i.id}" title="${i.title}" popularity="${i.voteAverage}" urlImage="${i.posterPath}"></card-element>
                `)}
            </div>

            <div class="wrapper-my-list">
                <div class="title"> Mi lista </div>
                <div class="wrapper-list-fav">
                    ${this.listFavorites.map(i => html`
                        <card-element id="${i.id}" title="${i.title}" popularity="${i.voteAverage}" urlImage="${i.posterPath}"></card-element>
                    `)}
                </div>
            </div>
        `;
    }

    _handleNewSearchResult(evt) {
        
        if (evt.detail.searchResult)
            this.listMovies = evt.detail.searchResult;
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
                if (ele.title == title) {
                    return ele;
                }
            });

            if (ele) this.localStorageFav.set(title, ele);
        }

        this.listFavorites = Object.values(this.localStorageFav.get());
    }

    _handleUpdateListFav() {
        this.listFavorites = Object.values(this.localStorageFav.get());
    }
}
