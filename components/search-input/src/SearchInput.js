import { html, css, LitElement } from 'lit-element';
import { LocalStorage } from '../../search-movies/src/LocalStorage';
import { InputElement } from '../../input-element/index';

export class SearchInput extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
            }

            .search-input {
                margin: 20px 0 20px 0;
                width: 100%;
                display:flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }
        `;
    }

    static get properties() {
        return {
            placeholder: { type: String },
            listOldSearches: { type: Array }
        };
    }

    constructor() {
        super();

        this.urlApi = 'https://api.themoviedb.org/3/search/multi';
        this.basePathImage = "https://image.tmdb.org/t/p/w500/"; 
        this.key = '4744815b85d6cf6ddf142b0a72dc6013';
        this.includeAdult = false;
        this.localStorage = new LocalStorage('searches');
        this.listOldSearches = [];
        this.urlFailImage = 'https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg';
        this.msgPlaceholder = "Busca tu película";
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('new-value-input', this._handleNewValueInput.bind(this));
        document.addEventListener('focus-input', this._handleFocusInput.bind(this)) ;
    }

    disconnectedCallback() {
        document.removeEventListener('new-value-input', () => { });
        document.addEventListener('focus-input', () => {}) ;

        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="search-input">
                <input-element 
                    placeholder="${this.msgPlaceholder}" 
                    .listValues="${this.listOldSearches}"
                ></input-element>
            </div>
            `;
    }

    _isCached(value) {
        const item = this.localStorage.get(value);

        if (item[value])
            return true;
        return false;
    }



    _newSearch(value) {
        if (this._isCached(value)) {
            const item = this.localStorage.get(value);
            this._sendResult(item[value]);
        } else {
            this._getInfoApi(value);
        }
    }

    _getInfoApi(value) {
        const url = `${this.urlApi}?api_key=${this.key}&query=${value}&include_adult=${this.includeAdult}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.text().then((txt) => {
                        const result = JSON.parse(txt);
                        this._saveLocal(value, result);
                        this._sendResult(result);
                    });
                } else {
                    this._cleanResult([]);
                    console.log(`Fallo en la llamada fetch: ${response.status}`);
                }
            })
            .catch((err) => {
                this._cleanResult([]);
                console.log(`Fallo en la llamada fetch: ${err}`);
            });
    }

    _sendResult(result) {
        document.dispatchEvent(new CustomEvent('new-result-search', {
            detail: {
                searchResult: result
            }
        }));
    }

    _saveLocal(value, result) {

        if (result.results)
            result.results.forEach(ele => {
                if (ele['poster_path']) {
                    ele['poster_path'] = this.basePathImage + ele['poster_path'];
                } else {
                    ele['poster_path'] = this.urlFailImage;
                }
            });
              
        this.localStorage.set(value, result);
    }

    _cleanResult() {
        this._sendResult(null);
    }

    _handleOldSearch(value) {
        this._newSearch(value);
        this._hiddenOldSearchs();
    }

    _handleFocusInput() {
        this._showOldSearchs();
    }

    _showOldSearchs() {
        const items = this.localStorage.get();
        const searches = Object.keys(items);

        this.listOldSearches = searches;
    }

    _hiddenOldSearchs() {
        this.listOldSearches = [];
    }

    _handleNewValueInput(evt) {
        if (evt.detail.value)
            this._newSearch(evt.detail.value);
    }
}
