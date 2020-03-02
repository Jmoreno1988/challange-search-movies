import { html, css, LitElement } from 'lit-element';
import { IconMd } from '../../icon-md/index'

export class VoteAverage extends LitElement {

    static get styles() {
        return css`
            :host {
            }

            .stars-flex {
                display: flex;
                direction: row;
            }
        `;
    }

    render() {
        return html`
            <div class="stars-flex">
                ${this.arr.map(i => html`<icon-md icon="star" color:"#FFD600"></icon-md>`)}
            </div>
        `;  
    }

    constructor() {
        super();

        this.arr = [];
        this.points = 0;
    }

    static get properties() {
        return {
            points: { type: Number },
            arr: { type: Array }
        };
    }

    firstUpdated() {
        if (this.points > 0) {
            this.arr = Object.keys(Array.apply(0,Array(this.points)));
        }
    }
}
