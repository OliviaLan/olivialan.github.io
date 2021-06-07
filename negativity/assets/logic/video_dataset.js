/* JS for tab "video dataset" card */

// video dataset card example
/* * 
 * <div class="col video-deck-single">
 *     <div class="card">
 *         <img src="/assets/image/1.png" class="card-img-top" alt="...">
 *         <div class="card-body">
 *             <a href="#" class="card-title">A brief history of America and C…</a>
 *             <p class="card-text">Vox · 2016</p>
 *         </div>
 *     </div>
 * </div>
 */

class VideoData_Card {

    constructor({ id, video_title, year, video_source, video_link }) {
        this._id = id + "";
        this._title = video_title + "";
        this._year = year + "";
        this._source = video_source + "";
        this._link = video_link + "";
    }

    _createCard() {
        let deck_single_node = document.createElement("div");
        let card = document.createElement("div");
        let cardImg_Html = `<a href="${this._link}" class="card-img-top-video" target="_blank"><img src="./assets/video_dataset_img/${this._id}.png"></a>`;
        let card_body = document.createElement("div");
        let cardTitle_Html = `<a href="${this._link}" class="card-title" target="_blank">${this._title}</a>`;
        // let cardText_Html = `<p class="card-text"><a href="${this._link}" target="_blank">${this._source}</a><span class="hidden-id">No. ${this._id}</span></p>`;
        let cardText_Html = `<p class="card-text"><a href="${this._link}" target="_blank">${this._source}</a></p>`;

        deck_single_node.classList.add("col", "video-deck-single");
        card.classList.add("card");
        card_body.classList.add("card-body");

        card_body.innerHTML = cardTitle_Html + cardText_Html;
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
    }
}

VideoData_Card.prototype.appendTo = function(parentNode, nextNode) {
    if (!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();

    parentNode.insertBefore(this._deck_single_node, nextNode);
    return true;
}

export { VideoData_Card as VideoData_Card };