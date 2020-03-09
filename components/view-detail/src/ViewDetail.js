import { html, css, LitElement } from 'lit-element';
import { VoteAverage } from '../../vote-average/index.js';
import { CardPhoto } from '../../card-photo/index.js';
import { LocalStorage } from '../../search-movies/src/LocalStorage';

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
                min-height: 150px;
                background: black
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
        this.movie = null;
        this.average = 0;
        this.totalStar = 0;
        this.cast = [];
        this.localStorageFav = new LocalStorage('favorites');
        this.localStorageSea = new LocalStorage('searches');
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
                <span class="title"> Sinopsis </span>
                <p class="text-justify"> ${this.overview} </p>
            </div>

            <div class="box-text">
                <span class="title"> Reparto </span>
                <div class="list-class">
                    ${this.cast.map(i => html`
                        <card-photo class="card-photo" title="${i.name}" subtitle="${i.character}" url="${i['profile_path']}"><card-photo>
                    `)}
                </div>
            </div>
        `;
    }

    firstUpdated() {
        if (this._isCreateInLocal()) {
            this._updateMovieLocal();
            return;
        }

        const movies = Object.values(this.localStorageFav.get());
        const movie = movies.find((element) => {
            if (element.id == this.idMovie)
                return true;
        });
        const urlMovie = `${this.urlApi}/${movie.mediaType}/${this.idMovie}?api_key=${this.key}`;
        const urlCast = `${this.urlApi}/${this.type}/${this.idMovie}/credits?api_key=${this.key}`;
        
        // TODO: refactor
        new Promise((resolve, reject) => {
            resolve(this._getInfo(urlMovie));
        }).then((res) => {
            return (res.text());
        }).then((res) => {
            this._updateMovie(JSON.parse(res));
        }).catch(() => {
        });

        new Promise((resolve, reject) => {
            resolve(this._getInfo(urlCast));
        }).then((res) => {
            return (res.text());
        }).then((res) => {
            this._updateCast(JSON.parse(res));
        }).catch((err) => {
            console.log(`Fallo al pedir el casting: ${err}`);
        });
    }

    _getInfo(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        resolve(response)
                    } else {
                        reject(null);
                        console.log(`Fallo en la llamada: ${response.status}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    _updateMovie(result, isLocal) {
        this.movie = result;
        this.urlBackgroundImg = !isLocal ? this.basePathImage + result.backdrop_path : this.urlFailImage;
        this.title = result.title ? result.title : result.name;
        this.date = result.release_date ? result.release_date.split('-')[0] : result.first_air_date.split('-')[0];
        this.totalVote = result.vote_average;
        this.totalStar = Math.floor(this.totalVote / 2);
        this.shadowRoot.getElementById("vote-average").points = this.totalStar;
        this.overview = result.overview;
    }

    _updateMovieLocal() {
        const movies = Object.values(this.localStorageFav.get());

        const ele = movies.find((element) => {
            if (element.id == this.idMovie && element.isLocal)
                return true;
        });
        
        this._updateMovie(ele, true);
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

    _isCreateInLocal() {
        const movies = Object.values(this.localStorageFav.get());
        
        const ele = movies.find((element) => {
            if (element.id == this.idMovie && element.isLocal)
                return true;
        });

        if (ele) 
            return true;
        return false;
    }
}
