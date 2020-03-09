import { html, css, LitElement } from 'lit-element';
import { LocalStorage } from '../../search-movies/src/LocalStorage';

export class NewMovieModal extends LitElement {
    static get styles() {
        return css`
            :host {
                background: white;
                width: 80%;
                height: 300px;
            }

            .title {
                line-height: 64px;
                padding-left: 34px;
                border-bottom: 1px solid #eee;
                font-size: 18px;
                margin-bottom: 15px;
            }

            .body-modal {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                align-content:space-between;
                
            }

            .input {
                margin: 5px 0 50x 0;
            }

            .panel-buttons {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }

            .button{
                width: 80px;
                line-height: 64px;
            }

            .red-font {
                color: #F44336
            }

            .green-font {
                color: #4CAF50
            }
        `;
    }

    static get properties() {
        return { };
    }

    constructor() {
        super();

        this.localStorageFav = new LocalStorage('favorites');
        this.title = "";
        this.description = "";
        this.average = 0;
        this.urlFailImage = 'https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg';
    }

    firstUpdated() {
        this._addListener('input-title', 'new-value-input', (evt) => {
            this._updateInfo('title', evt.detail.value);
        });
        this._addListener('input-description', 'new-value-input', (evt) => {
            this._updateInfo('description', evt.detail.value);
        });
        this._addListener('input-average', 'new-value-input', (evt) => {
            this._updateInfo('average', evt.detail.value);
        });
    }

    disconnectedCallback() {
        this._removeListener('input-title', 'new-value-input', () => {});
        this._removeListener('input-description', 'new-value-input', () => {});
        this._removeListener('input-average', 'new-value-input', () => {});

        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="title">
                Nueva película
            </div>

            <div class="body-modal">
                <input-element id="input-title" placeholder="Title" lineBottom></input-element> <br>
                <input-element id="input-description" placeholder="Description" lineBottom></input-element> <br>
                <input-element id="input-average" placeholder="Average" lineBottom></input-element> <br>
            </div>

            <div class="panel-buttons">
                <div class="button red-font" @click="${this._closeModal}">Cancelar</div>
                <div class="button green-font" @click="${this._newMovie}">Guardar</div>
            </div>
            
        `;
    }

    _closeModal() {
        document.dispatchEvent(new CustomEvent('close-modal-movie', {}));
    }

    _newMovie() {
        this._save();
        this._updateListFav();
        this._closeModal();
    }

    _save() {
        const date = new Date();

        this.localStorageFav.set(this.title, {
            id: date.getTime(),
            title: this.title,
            posterPath: this.urlFailImage,
            voteAverage: this.average,
            overview: this.description,
            releaseDate: date.toISOString().slice(0,10)
        });        
    }

    _updateListFav() {
        document.dispatchEvent(new CustomEvent('update-list-fav', {}));
    }

    _updateInfo(type, value) {
        switch (type) {
            case 'title':
                this.title = value;
                break;
            case 'description':
                this.description = value;
                break;
            case 'average':
                let ave = parseInt(value) || 0;

                this.average = ave > 10 ? 10 : ave; 
                break;
        }
    }

    _addListener(idNode, nameEvent, callback) {
        this.shadowRoot.getElementById(idNode).addEventListener(nameEvent, (evt) => {
            callback(evt);
        });
    }

    _removeListener(idNode, nameEvent, callback) {
        this.shadowRoot.getElementById(idNode).removeEventListener(nameEvent, (evt) => {
            callback(evt);
        });
    }
}
