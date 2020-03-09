import { html, css, LitElement } from 'lit-element';
import { IconMd } from '../../icon-md/index';

export class InputElement extends LitElement {
    static get styles() {
        return css`
            :host {
                --color-back: white;
                --color-letter: #9E9E9E;
                --border: 1px solid #BDBDBD;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                color: var(--color-letter);
            }

            .wrapper-input {
                border: var(--border);
                background: var(--color-back);
                border-radius: 5px;
                width: 85%;
                line-height: 30px;
                z-index: 2;
            }

            .wrapper-listValues {
                overflow-y: auto; 
                max-height: 200px
            }

            .input {
                width: 80%;
                line-height: 30px;
                font-size: 18px;
                color: var(--color-letter);
                margin-left: 40px;
            }

            .inputLineBottom {
                border: none;
                border-bottom: var(--border);
                border-radius: 0px;
            }

            .input:focus{
                outline: none;
            }

            .input::placeholder {
                color: var(--color-letter);
            }

            .list-old-searches {
                position: absolute;
                top: 80px;
                width: 85%;
                background: var(--color-back);
                border: var(--border);
                color: var(--color-letter);
                padding-top: 30px;
                border-bottom-right-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            .list-old-item {
                display: flex;
                flex-direction: row;
                align-content: center;
            }

            .icon-clock {
                margin: 5px 10px 5px 10px
            }
        `;
    }

    static get properties() {
        return {
            placeholder: { type: String },
            listValues: { type: Array },
            valueInput: { type: String },
            lineBottom: { type: Boolean }
        };
    }

    constructor() {
        super();

        this.placeholder = "";
        this.listValues = [];
        this.valueInput = "";
        this.lineBottom = false;
    }

    render() {
        return html`
            <div class="wrapper-input ${ this.lineBottom ? `inputLineBottom` : `` }">
                <input 
                    type="text"
                    class="input"
                    placeholder="${this.placeholder}"
                    @change=${(e) => this._newValueInput(e.target.value)}"
                    @focusin="${this._focusInElement}"
                    value="${this.valueInput}"
                ></input>

                <div class="wrapper-listValues">
                    ${this.listValues.map(value => html`
                        <div class="list-old-item" @click="${() => { this._newValueInput(value) }}">
                            <icon-md class="icon-clock" icon="clock"></icon-md>    
                            ${value}
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    clearInput() {
        this.listValues = [];
    }

    _newValueInput(newValue) {
        this.clearInput();
        
        this.dispatchEvent(new CustomEvent('new-value-input', {
            detail: {
                value: newValue
            }
        }));
    }

    _focusInElement() {
        this.dispatchEvent(new CustomEvent('focus-input', {
            detail: {
                element: this
            }
        }));
    }
}
