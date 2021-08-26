/* JS for tab "video dataset" card */

// video dataset card example
/* * 
 * <div class="col story-deck-single">
 *     <div class="card">
 *         <img src="/assets/image/1.png" class="card-img-top" alt="...">
 *         <div class="card-body">
 *             <a href="#" class="card-title">A brief history of America and C…</a>
 *             <p class="card-text">Vox · 2016</p>
 *         </div>
 *     </div>
 * </div>
 */

class Corpus_Card {

    constructor({ id, title, year, source, link, author, description, emotion, recommender, method }) {
        this._id = id + "";
        this._title = title + "";
        this._year = year + "";
        this._source = source + "";
        this._link = link + "";
        this._author = author + "";
        this._description = description + "";
        this._recommender = recommender + "";
        this._emotion = emotion + "";
        this._method = method + "";
    }

    _createCard() {
        let deck_single_node = document.createElement("div");
        let card = document.createElement("div");
        // let cardImgPreview_Html = `<div class="card-img-top" target="_blank"><img class="preview" src="./assets/study_material_preview_img/${this._id}.png"></div>`;
        let cardImg_Html = `<div class="card-img-top" target="_blank">
                            <img class="preview" src="./assets/corpus_img/${this._id}.png">
                            </div>`;
        // <img class="gifImg" src="./assets/study_material_img/${this._id}.gif">
        let card_body = document.createElement("div");
        let cardTitle_Html = `<div class="story-card-title" target="_blank">${this._title}</div>`;
        // let cardNum_Html = `<div class="story-hidden-id">No. ${this._id}</div>`;
        let cardText_Html = `<div class="card-text"><br><strong>Source</strong>: ${this._source}, <strong>Year</strong>: ${this._year}<a href="${this._link}" target="_blank">, <strong><u>Link</u></strong></a><br><br><div><strong>Description</strong>: ${this._description}</div><br><div>${this._method}</div></div>`;
        // let cardText_Html = `<p class="card-text"><span class="hidden-id">No. ${this._id}</span></p>`;


        deck_single_node.classList.add("col", "story-deck-single");
        card.classList.add("card");
        card_body.classList.add("story-card-body");

        card_body.innerHTML = cardTitle_Html + cardText_Html;
        // card_body.innerHTML = cardTitle_Html;
        card.innerHTML = cardImg_Html;
        card.appendChild(card_body);

        deck_single_node.appendChild(card);
        return deck_single_node;
    }

    _bindEvents() {
        if (this._deck_single_node === undefined) {
            console.error("Video dataset card do not exist!");
        }

        // tooltip binding to card title
        $(this._deck_single_node.querySelector(".card-title")).tooltip({ title: this._title });


        // const front_img = this._deck_single_node.querySelector(".story-card-body");

        // front_img.addEventListener("mouseover", () => {
        //     front_img.querySelector("story-deck-single.preview").style.visibility = "none";
        //     $(front_img).find("story-deck-single.gifImg").fadeTo("fast", 0);
        // });
        // front_img.addEventListener("mouseout", () => {
        //     front_img.querySelector("story-deck-single.preview").style.visibility = "block";
        //     $(front_img).find("story-deck-single.gifImg").fadeTo("fast", 1);
        // });
    }
}

Corpus_Card.prototype.appendTo = function(parentNode, nextNode) {
    if (!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();

    parentNode.insertBefore(this._deck_single_node, nextNode);
    return true;
}

//绑定鼠标hover事件

// Corpus_Card.prototype._bindEvents = function ()  {
//     let that = this;
//     const this_card_node = this._deck_single_node;
//     const card = this_card_node.querySelector(".card");
//     const front_img= card.querySelector(".card-img-top");


//     front_img.addEventListener("mouseover", () => {
//         front_img.querySelector("img.gifImg").style.visibility = "none";
//         $(front_img).find("img.preview").fadeTo("fast", 0);
//     });
//     front_img.addEventListener("mouseout", () => {
//         front_img.querySelector("img.gifImg").style.visibility = "block";
//         $(front_img).find("img.preview").fadeTo("fast", 1);
//     });
// }



export { Corpus_Card as Corpus_Card };