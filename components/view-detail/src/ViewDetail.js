import { html, css, LitElement } from 'lit-element';
import { VoteAverage } from '../../vote-average/index.js';
import { CardPhoto } from '../../card-photo/index.js'

export class ViewDetail extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
            }

            .box-info {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: -60px;
                color: white;
            }
            
            .img-back {
                width: 100%;
            }
            
            .text-bold {
                font-weight: bold;
                font-size: 140%;
            }

            .space-left {
                padding-left: 30px;
            }

            .space-right {
                padding-right: 30px;
                text-align: right;
            }

            .box-text {
                padding: 30px;
                text-align: justify: 
            }

            .title {
                font-size: 130%;
                font-weight: bold;
                line-height: 42px;
            }

            .list-class{
                display: flex;
                direction: row;
                overflow-x: auto;
            }

            .card-photo {
                margin: 0 5px 0 5px;
            }
        `;
    }

    static get properties() {
        return {
            idMovie: { type: String },
            urlBackgroundImg: { type: String },
            title: { type: String },
            date: { type: String },
            totalStar: { type: String },
            cast: { type: Array }
        };
    }

    constructor() {
        super();

        this.title = "";
        this.urlApi = 'https://api.themoviedb.org/3';
        this.basePathImage = "https://image.tmdb.org/t/p/w500/";
        this.urlFailImage = 'https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg';
        this.key = '4744815b85d6cf6ddf142b0a72dc6013';
        this.type = 'movie';
        this.movie = null;
        this.average = 0;
        this.totalStar = 0;
        this.cast = [];
    }
    render() {
        return html`
            <img src="${this.urlBackgroundImg}" class="img-back"></img>

            <div class="box-info">
                <div class="space-left">
                    <div class="text-bold">${this.title}</div>
                    <div>${this.date}</div>
                </div>
                <div class="space-right">
                    <div class="text-bold">${this.totalVote}</div>
                    <vote-average id="vote-average" points="${this.totalStar}">
                </div>
            </div>

            <div class="box-text">
                <span class="title"> Review </span>
                <p class="text-justify"> ${this.overview} </p>
            </div>

            <div class="box-text">
                <span class="title"> Cast </span>
                <div class="list-class">
                    ${this.cast.map(i => html`
                        <card-photo class="card-photo" title="${i.name}" subtitle="${i.character}" url="${i['profile_path']}"><card-photo>
                    `)}
                </div>
            </div>
        `;
    }

    firstUpdated() {
        const urlMovie = `${this.urlApi}/${this.type}/${this.idMovie}?api_key=${this.key}`;
        const urlCast = `${this.urlApi}/${this.type}/${this.idMovie}/credits?api_key=${this.key}`;

        this._getInfo(urlMovie, this._updateMovie.bind(this));
        this._getInfo(urlCast, this._updateCast.bind(this));
    }

    _getInfo(url, callback) {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.text().then((txt) => {
                        callback(JSON.parse(txt));
                    });
                } else {
                    console.log(`Fallo en la llamada: ${response.status}`);
                }
            })
            .catch((err) => {
                console.log(`Fallo en la llamada: ${err}`);
            });
    }

    _updateMovie(result) {
        this.movie = result;
        this.urlBackgroundImg = this.basePathImage + result.backdrop_path;
        this.title = result.title;
        this.date = result.release_date.split('-')[0];
        this.totalVote = result.vote_average;
        this.totalStar = Math.floor(this.totalVote / 2);
        this.shadowRoot.getElementById("vote-average").points = this.totalStar;
        this.overview = result.overview;
    }

    _updateCast(result) {
        if (!result.cast) return;

        result.cast.forEach(ele => {
            if (ele['profile_path']) {
                ele['profile_path'] = this.basePathImage + ele['profile_path'];
            } else {
                ele['profile_path'] = this.urlFailImage;
            }
        });

        this.cast = result.cast.slice(0, 20);
    }
}
