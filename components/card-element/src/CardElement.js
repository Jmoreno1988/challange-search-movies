import { html, css, LitElement } from 'lit-element';
import { VoteAverage } from '../../vote-average/index.js';

export class CardElement extends LitElement {
    static get styles() {
        return css`
            :host {
                height: 260px;
                margin: 0 5px 0 5px;
            }

            .wrapper-card {
                display: flex;
                flex-direction: column;
                width: 150px;
            }

            .wrapper-img {
                display: flex;
                flex-direction: column;
                min-height: 225px;
            }

            .wrapper-popu {
                margin: 0 5px 0 5px;
            }

            .img {
                width: 100%;
                border-radius: 8px;
                height: 225px;
            }

            .title {
                display: none;
                height = 24px;
            }

            .popularity{
                height = 24px;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .marker {
                background: #B71C1C;
                border-radius: 8px 0px 8px 0px;
                margin: -46px 0 0 104px;
                width: 26px;
                height: 26px;
                padding: 10px;
            }

            @media (min-width: 600px) {
                .title {
                    display: block;
                }
            }
        `;
    }

    render() {
        return html`
            <div class="wrapper-card">
                <div class="wrapper-img">
                    <img class="img" src="${this.urlImage}" @click="${this._handLeClickImg}">
                    <icon-md class="marker" icon="heart-void" color:"#FFD600" @click="${this._toggleMovieFav}"></icon-md>       
                </div>

                <div class="title">
                    ${this.title}
                </div>

                <div class="popularity">
                    <span class="wrapper-popu">${this.popularity}</span>  
                    <vote-average id="vote-average" points="${this.totalStar}"></vote-average>
                </div>
            </div>`;
    }

    static get properties() {
        return {
            id: { type: Number },
            title: { type: String },
            popularity: { type: Number },
            urlImage: { type: String },
        };
    }

    constructor() {
        super();

        this.totalStar = 0;
    }

    firstUpdated() {
        this.totalStar = Math.floor(this.popularity / 2);
        this.shadowRoot.getElementById("vote-average").points = this.totalStar;
    }

    _toggleMovieFav() {
        document.dispatchEvent(new CustomEvent('toggle-fav', {
            detail: {
                eleFavorite: this.title
            }
        }));
    }

    _handLeClickImg() {
        document.dispatchEvent(new CustomEvent('click-in-card', {
            detail: {
                id: this.id
            }
        })); 
    }
}
