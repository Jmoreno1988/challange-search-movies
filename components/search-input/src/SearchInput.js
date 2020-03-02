import { html, css, LitElement } from 'lit-element';
import { LocalStorage } from '../../search-movies/src/LocalStorage';

export class SearchInput extends LitElement {
    static get styles() {
        return css`
            :host {
                --color-letter: #9E9E9E;
                --border: 1px solid #BDBDBD;
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

            .wrapper-input {
                border: var(--border);
                border-radius: 20px;
                width: 85%;
            }

            .input {
                width: 80%;
                line-height: 30px;
                font-size: 18px;
                color: var(--color-letter);
                margin-left: 40px;
            }

            .input:focus{
                outline: none;
            }

            .input::placeholder {
                color: var(--color-letter);
            }

            .list-old-searches {
                width: 85%;
                color: var(--color-letter);
                display: flex;
                flex-direction: column;
            }

            .list-old-item {
                line-height: 34px;
                padding-left: 50px;
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
    }

    render() {
        return html`
            <div class="search-input">
                <div class="wrapper-input">
                    <input 
                        id="input-sea"
                        type="text" 
                        @focusin="${this._showOldSearchs}"
                        placeholder="${this.placeholder}"
                        class="input"
                        @change=${(e) => this._newSearch(e.target.value)}"
                    ></input>
                </div>
                
                <div class="list-old-searches">
                    ${this.listOldSearches.map(value => html`
                        <div class="list-old-item" @click="${() => { this._handleOldSearch(value)}}">${value}</div>
                    `)}
                </div>
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

    _showOldSearchs() {
        const items = this.localStorage.get();
        const searches = [];

        for (const i in items)
            searches.push(i)

        this.listOldSearches = searches;
    }

    _hiddenOldSearchs() {
        this.listOldSearches = [];
    }
}
