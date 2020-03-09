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
        this.callback = () => {}
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

            case 'close': 
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="white" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /> </svg>';
                break;
            
            case 'add':
                svg = '<svg style="width:36px;height:36px" viewBox="0 0 24 24"> <path fill="white" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /> </svg>';
                break;
            
            case 'clock':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#9E9E9E" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /> </svg>';
                break;
            
            case 'house':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="black" d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z" /> </svg>';
                break;
            
            case 'play':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#9E9E9E" d="M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12" /> </svg>';
                break;
            
            case 'magnify':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#9E9E9E" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /> </svg>';
                break;
            
            case 'download':
                svg = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#9E9E9E" d="M13,5V11H14.17L12,13.17L9.83,11H11V5H13M15,3H9V9H5L12,16L19,9H15V3M19,18H5V20H19V18Z" /> </svg>';
                break;
            }

        return svg;
    }
}
