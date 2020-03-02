import { html, css, LitElement } from 'lit-element';

export class IconMd extends LitElement {
    static get styles() {
        return css`
            :host { }
        `;
    }

    constructor() {
        super();

        this.icon = "";
        this.color = "white";
    }

    static get properties() {
        return {
            icon: {
                type: String,
            },

            color: {
                type: String,
            }
        };
    }

    render() {
        return html`<div id="wrapper-icon"></div>`;
    }

    firstUpdated() {
        const frag = document.createRange().createContextualFragment(this._searchIcon(this.icon));
        const node = this.shadowRoot.getElementById('wrapper-icon');

        if (node)
            node.appendChild(frag);
    }

    _searchIcon(name) {
        let svg = "";

        switch (name) {
            case 'star':
                svg = `<svg style="width:24px;height:24px;" viewBox="0 0 24 24"> <path fill="#FFD600" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /> </svg>`;
                break;

            case 'menu':
                svg = `<svg style="width:24px;height:24px;" viewBox="0 0 24 24"> <path fill="white" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /> </svg>`
                break;
            
            case 'mark':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="currentColor" d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" /> </svg>';
                break;

            case 'heart':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="tomato" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /> </svg>';
                break;

                case 'heart-void':
                    svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="white" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /> </svg>';
                    break;
        }

        return svg;
    }
}
