import { html, css, LitElement } from 'lit-element';

export class InputElement extends LitElement {
    static get styles() {
        return css`
            :host {
                --color-letter: #9E9E9E;
                --border: 1px solid #BDBDBD;
                width: 100%;
            }

            .wrapper-input {
                border: var(--border);
                border-radius: 20px;
                width: 85%;
                line-height: 30px;
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
            placeholder: {
                type: String
            },

            listValues: {
                type: Array
            }
        };
    }

    constructor() {
        super();

        this.placeholder = "";
        this.listValues = [];
    }

    render() {
        return html`
            <div class="wrapper-input">
                <input 
                    type="text"
                    class="input"
                    placeholder="${this.placeholder}"
                    @change=${(e) => this._newValueInput(e.target.value)}"
                    @focusin="${this._focusInElement}"
                ></input>
            </div>
            
            <div class="list-old-searches">
                ${this.listValues.map(value => html`
                    <div class="list-old-item" @click="${() => { this._newValueInput(value) }}">${value}</div>
                `)}
            </div>
        `;
    }

    _newValueInput(newValue) {
        document.dispatchEvent(new CustomEvent('new-value-input', {
            detail: {
                value: newValue
            }
        }));
    }

    _focusInElement() {
        document.dispatchEvent(new CustomEvent('focus-input', {
            detail: {
                element: this
            }
        }));
    }
}
