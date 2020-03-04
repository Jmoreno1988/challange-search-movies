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
        }

        .body-modal {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .panel-buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        .button{
            width: 80px;
            text-align: right;
            padding-right: 30px;
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
        return {

        };
    }

    constructor() {
        super();

        this.localStorageFav = new LocalStorage('favorites');
    }

    render() {
        return html`
            <div class="">
                <div class="title">
                    Nueva película
                </div>

                <div class="body-modal">
                </div>

                <div class="panel-buttons">
                    <div class="button red-font" @click="${this._closeModal}">Cancelar</div>
                    <div class="button green-font" @click="${this._save}">Guardar</div>
                </div>
            </div>
        `;
    }

    _closeModal() {
        document.dispatchEvent(new CustomEvent('close-modal', {}));
    }

    _save() {
        this.localStorageFav.set('holi', {
            title: 'holi',
            poster_path: "https://image.tmdb.org/t/p/w500//c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
            vote_average: 7.4,
            overview: "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
            release_date: "2017-07-05"
        });

        this._updateListFav();
    }

    _updateListFav(){
        document.dispatchEvent(new CustomEvent('update-list-fav', {}));
    } 
}
