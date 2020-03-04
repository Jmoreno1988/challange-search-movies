import { html, css, LitElement } from 'lit-element';

export class CardPhoto extends LitElement {
    static get styles() {
        return css`
            :host {
            }

            .card{
                display:flex;
                flex-direction: column;
                width: 150px;
                justify-content: center;
            }

            .photo{
                width: 100%;
                border-radius: 20px;
                min-height: 230px;
            }

            .title {
                text-align: center;
                font-size: 110%;
            }

            .subtitle {
                text-align: center;
                color: #9E9E9E;
                font-size: 90%;
            }
        `;
    }

    static get properties() {
        return {
            title: { type: String },
            subtitle: { type: String },
            url: { type: String }
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="card">
                <img class="photo" src="${this.url}">
                <div class="title">${this.title}</div>
                <div class="subtitle">${this.subtitle}</div>
            </div>
        `;
    }
}
