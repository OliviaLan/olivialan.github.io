/* JS for tab "homepage" reminder & card */

import { vns_method_to_btn_name } from './anicard.js';

// homepage card class
class Homepage_Card {
    constructor(parameters = {
        card_id,
        card_title,
        VNS_tag,
        VNS_ambiguity,
        EL_tag,
        EL_tag2,
        AVT_tag,
        how,
        why,
        eg_title,
        eg_source,
        eg_url,
        eg_year,
        snapshot,
        eg_category,
        eg_subcategory,
        rating,
        effective_1,
        effective_2,
        effective_3,
        ineffective_1,
        ineffective_2,
        ineffective_3
    }) {
        this.parameters = {};
        this.parameters = parameters;
    }

    _createCard() {
        let deck_single_node = document.createElement("div");
        let card_inner_node = document.createElement("div");
        let card_front_node = document.createElement("div");
        let card_back_node = document.createElement("div");
        let card_front_header = this._createCard_header();
        let card_back_header = card_front_header.cloneNode(true);
        deck_single_node.classList.add("col-xl-4", "col-lg-6", "col-sm-12", "card-deck-single");
        card_inner_node.classList.add("card-inner", `el-${this.parameters["EL_tag1"].replace(/\s+/g, "-")}`, `el-${this.parameters["EL_tag2"].replace(/\s+/g, "-")}`);
        card_front_node.classList.add("card", "front");
        card_back_node.classList.add("card", "back");

        deck_single_node.setAttribute("name", "card_" + this.parameters["card_id"]);

        // front
        let front_nodeList = [
            card_front_header,
            this._createCard_frontBody(),
            this._createCard_frontImg(),
            this._createCard_footer(1)
        ];
        front_nodeList.forEach((node, i, nodeList) => card_front_node.appendChild(node));

        // back
        let back_nodeList = [
            card_back_header,
            //创建卡片背面的图片、身体、脚
            // this._createCard_backImgBox(),
            this._createCard_backBody(),
            this._createCard_footer(0)
        ];
        back_nodeList.forEach((node, i, nodeList) => card_back_node.appendChild(node));

        // insert to card-inner
        [card_front_node, card_back_node].forEach(
            (node, i, nodeList) => card_inner_node.appendChild(node)
        );
        deck_single_node.appendChild(card_inner_node);
        return deck_single_node;
    }

    _get_aim_deck() {
        if (this.parameters["VNS_tag"]) {
            return this.parameters["VNS_tag"];
        }
        return "";
    }

    _get_param(param_key) {
        param_key = param_key + "" || "card_id";
        if (Object.keys(this.parameters).indexOf(param_key) < 0) {
            return -1;
        }
        return this.parameters[param_key];
    }

    /**
     * <div class="card-header">
     *     <div class="header-text">
     *         <div class="header-text-title">Pulse</div>
     *         <div class="header-text-class">The elements of visualization</div>
     *     </div>
     *     <span class="header-symbol"></span>
     * </div> 
     * */
    _createCard_header() {
        let card_header_node = document.createElement("div");
        let header_text_node = document.createElement("div");
        let header_classification_node = document.createElement("div");

        // let header_symbol_node = document.createElement("span");  // 缺了icon图片定义


        let title_html = `<div class="header-text-title">${vns_method_to_btn_name(this.parameters["card_title"])}</div>`;

        //用el_tag1作为盒子名称
        let classnewIcon_html = `<div class="header-icon-class ${this.parameters["EL_tag1"].replace(/\s+/g, "-")}"></div>`;
        let classnew_html = `<div class="header-text-class">${vns_method_to_btn_name(this.parameters["EL_tag1"])}</div>`;

        //直接用el_tag2作为盒子名称
        let classIcon_html = `<div class="header-icon-class ${this.parameters["EL_tag2"].replace(/\s+/g, "-")}"></div>`;
        let class_html = `<div class="header-text-class">${vns_method_to_btn_name(this.parameters["EL_tag2"])}</div>`;

        // else if (this.parameters["VNS_ambiguity"] == 0) {
        //     let classnewIcon_html = `<div class="test"></div>`;
        //     let classnew_html = `<div class="test"></div>`;
        // }


        card_header_node.classList.add("card-header", `el-${this.parameters["EL_tag1"].replace(/\s+/g, "-")}`);
        header_text_node.classList.add("header-text");
        //header下面打icon标签
        // header_classification_node.classList.add("header_classification");
        // header_symbol_node.classList.add("header-symbol");

        header_text_node.innerHTML = title_html;
        card_header_node.appendChild(header_text_node)


        // if (this.parameters["VNS_ambiguity"] == 1) {
        //     header_classification_node.innerHTML = classnewIcon_html + classnew_html + classIcon_html + class_html;
        // } else {
        //     header_classification_node.innerHTML = classnewIcon_html + classnew_html;
        // }


        // console.log (this.parameters["VNS_ambiguity"]);

        // [header_text_node, header_classification_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        // [header_text_node, header_symbol_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        return card_header_node;
    }

    _createCard_frontBody() {
            let card_body_node = document.createElement("div");
            // let card_frontBody_titleHtml = "";
            let card_frontBody_textHtml = "";
            // let card_body_front_textArray = [
            //     this.parameters["how"], this.parameters["why"], this.parameters["AVT_tag"]
            // ];

            let card_body_front_text = [
                this.parameters["how"]
            ];

            card_body_node.classList.add("card-body");

            Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
                if (card_body_front_textArray[i] === "") {
                    return;
                }
                // card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
                card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
                card_body_node.innerHTML += card_frontBody_textHtml;
            });

            // 原版
            // Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
            //     if(card_body_front_textArray[i] === "") {
            //         return ;
            //     }
            //     card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
            //     card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
            //     card_body_node.innerHTML  += (card_frontBody_titleHtml + card_frontBody_textHtml); 
            // });

            return card_body_node;
        }
        /**
         * front
         * <div class="card-frontImg">
         *     <img class="card-img front-gif" src="./assets/image/fail_loading.svg">
         *     <img class="card-img front-preview" src="./assets/image/loading.svg">
         * </div> 
         * */
    _createCard_frontImg() {
        let card_frontImg_node = document.createElement("div");
        var num = this.parameters["card_id"];
        console.log(this.parameters["card_id"]);
        var newnum = num % 3;
        // let front_gif_html = `<img class="card-img front-gif" src="./assets/card_gif/${this.parameters["card_id"]}.png" alt="./assets/image/fail_loading.svg">`; // 正面gif
        let front_preview_html = `<img class="card-img front-preview" src="./assets/card_img/${this.parameters["snapshot"]}">` // 正面预览png

        card_frontImg_node.classList.add("card-frontImg");
        card_frontImg_node.innerHTML = front_preview_html;
        // card_frontImg_node.innerHTML = front_gif_html + front_preview_html;


        return card_frontImg_node;
    }

    /**
     * back
     * <div class="card-imgBox">
     *     <img class="card-img back-gif" src="./assets/image/fail_loading.svg">
     *     <div class="img-cover">
     *         <div class="img-cover-mask"></div>
     *         <span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>
     *     </div>
     * </div>
     * */
    _createCard_backImgBox() {
        let card_imgBox_node = document.createElement("div");
        this._back_gif_name = '';
        // let back_gif_html = `<img class="card-img back-gif" src=${file_exist("./assets/back_gif_s/", [`back_${this.parameters["card_id"]}.gif`, `back_${this.parameters["card_id"]}_${this.parameters["VNS_tag"]}.gif`])} alt="./assets/image/fail_loading.svg">`;  // 缺少反面gif
        let back_gif_html = `<img class="card-img back-gif">`; // 缺少反面gif
        let img_cover_node = document.createElement("div");
        let img_cover_mask_html = `<div class="img-cover-mask"></div>`;
        // let img_cover_overlay_node = document.createElement("span");
        let img_cover_overlay_html = `<span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>`;
        // const overlay_attr = {
        //     "type": "button",
        //     "data-toggle": "modal",
        //     "data-target": "#zooming-modal"
        // }

        card_imgBox_node.classList.add("card-imgBox");
        img_cover_node.classList.add("img-cover");
        // img_cover_overlay_node.classList.add("img-cover-overlay");
        // Object.keys(overlay_attr).forEach(
        //     (key, i, keyArray) => img_cover_overlay_node.setAttribute(key, overlay_attr[key])
        // );

        img_cover_node.innerHTML = img_cover_mask_html + img_cover_overlay_html;
        card_imgBox_node.innerHTML = back_gif_html;
        card_imgBox_node.appendChild(img_cover_node);
        return card_imgBox_node;
    }

    /**
     * front
    <div class="card-body">
        <div class="card-body-subtitle">HOW</div>
        <p class="card-body-text">Expand and contract rhythmically.</p>
        <div class="card-body-subtitle">WHY</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
        <div class="card-body-subtitle">Applicable Visualization Techniques</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
    </div>
    */
    _createCard_frontBody() {
        let card_body_node = document.createElement("div");
        let card_frontBody_titleHtml = "";
        let card_frontBody_textHtml = "";
        let card_body_front_textArray = [
            this.parameters["how"]
        ];

        card_body_node.classList.add("card-body");

        Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
            if (card_body_front_textArray[i] === "") {
                return;
            }

            // card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
            card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
            card_body_node.innerHTML += (card_frontBody_titleHtml + card_frontBody_textHtml);
        });

        return card_body_node;
    }

    /**
     * back
     * <div class="card-body">
     *      <h6 class="card-body-subtitle">Inequality: how wealth is distributed in the UK - animated video</h6>
     *      <div class="card-body-caption">
     *          <div><span>Source: </span>The Guardian</div>
     *          <div><span>Year: </span>2013</div>
     *          <div><span>Category: </span>Social Sciences</div>
     *          <div><span>Subcategory: </span>Economics</div>
     *      </div>
     *  </div>
     */
    _createCard_backBody() {
        let card_body_node = document.createElement("div");
        let card_body_subtitle_effective = `<h6 class="card-body-subtitle">Why effective:</h6>`;
        let card_body_subtitle_ineffective = `<h6 class="card-body-subtitle">Why ineffective:</h6>`;
        let card_body_effective_node = document.createElement("div");
        let card_body_ineffective_node = document.createElement("div");

        let effective_item_html = "";
        let ineffective_item_html = "";

        let effective_valueArr = [
            this.parameters["effective_1"],
            this.parameters["effective_2"],
            this.parameters["effective_3"]
        ];


        let ineffective_valueArr = [
            this.parameters["ineffective_1"],
            this.parameters["ineffective_2"],
            this.parameters["ineffective_3"]
        ];

        card_body_node.classList.add("card-body");
        card_body_effective_node.classList.add("card-body-caption");
        card_body_ineffective_node.classList.add("card-body-caption");


        Homepage_Card.caption_keyArr.forEach((key, i, keyList) => {
            if (effective_valueArr[i] === "") {
                return;
            }
            effective_item_html = `<div><span>${key}: </span>${effective_valueArr[i]}</div>`;
            card_body_effective_node.innerHTML += effective_item_html;
        });

        Homepage_Card.caption_keyArr.forEach((key, i, keyList) => {
            if (ineffective_valueArr[i] === "") {
                return;
            }
            ineffective_item_html = `<div><span>${key}: </span>${ineffective_valueArr[i]}</div>`;
            card_body_ineffective_node.innerHTML += ineffective_item_html;
        });


        card_body_node.innerHTML = card_body_subtitle_effective;
        card_body_node.appendChild(card_body_effective_node);

        card_body_node.innerHTML += "<br>" + card_body_subtitle_ineffective;
        card_body_node.appendChild(card_body_ineffective_node);

        return card_body_node;
    }


    _createCard_footer(direction = 1) {

        let source_text = "";
        let rating_text = "";
        let rating_star = "";
        let button_text = "";
        let index_text = "";
        let card_footer_bottom_html = "";
        let card_footer_bottom_icon_html = "";
        let card_footer_node = document.createElement("div");
        let card_footer_bottom_node = document.createElement("span");

        if (direction > 0) {
            // positive
            //id编号
            index_text = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
            //底部文字：来源
            source_text = `<span class="card-footer-source">Source of the example: <a href="${this.parameters["eg_url"]}">Link</a></span>`;
            //底部文字：得分和星星
            rating_text = `<span class="card-footer-rating">Effectiveness ratio:  ${this.parameters["rating"]}</span>`;
            rating_star = `<div class="star-ratings-sprite"><span style="width:${this.parameters["rating"]}" class="star-ratings-sprite-rating"></span></div>`;
            //翻转按钮的文字
            button_text = "View comments";
        } else {
            // negative
            button_text = "Back to front";
        }

        card_footer_bottom_html = `<button class="card-footer-bottom">${button_text}</button>`;
        card_footer_node.classList.add("card-footer");

        card_footer_node.innerHTML = source_text + rating_text + rating_star + index_text + card_footer_bottom_html;

        //在卡片底部加icon tag
        // card_footer_bottom_node.innerHTML = card_footer_bottom_icon_html + card_footer_bottom_html;
        // card_footer_node.appendChild(card_footer_bottom_node);

        return card_footer_node;
    }
}

//卡片正面需要的字段
Homepage_Card.card_body_front_titleArray = ["HOW"];
//卡片背面需要的字段
Homepage_Card.caption_keyArr = ["Quote1", "Quote2", "Quote3"];

Homepage_Card.prototype._bindEvents = function() {

    let that = this;
    const this_card_node = this._deck_single_node;
    const card_inner_node = this_card_node.querySelector(".card-inner");
    const front_trans_button = card_inner_node.querySelector(".front .card-footer-bottom");
    const back_trans_button = card_inner_node.querySelector(".back .card-footer-bottom");
    const front_img = card_inner_node.querySelector(".front .card-frontImg");
    // const front_preview_img = this_card_node.querySelector("img.front-preview");
    //背面的图片，以及放大图片的效果
    // const back_img_box = this_card_node.querySelector(".card-imgBox");
    // const back_img_cover = back_img_box.querySelector(".img-cover");
    // const back_gif_zooming = back_img_cover.querySelector(".img-cover-overlay");
    const modal_title_node = document.querySelector(".modal-title");

    // card footer button
    front_trans_button.addEventListener("click", () => {
        if (!card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.add("turned-over");
        }
    });
    back_trans_button.addEventListener("click", () => {
        if (card_inner_node.classList.contains("turned-over")) {
            card_inner_node.classList.remove("turned-over");
        }
    });

    // card footer URL
    $(card_inner_node.querySelector(".card-footer a")).tooltip({ title: "link to the original work" });

    // front gif static preview 鼠标hover播放gif的效果
    // front_img.addEventListener("mouseover", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "none";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 0);
    // });
    // front_img.addEventListener("mouseout", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "block";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 1);
    // });

    //背面gif的预览和放大功能
    // back gif zooming in modal window
    // $(back_img_box).hover(
    //     function() {
    //         $(back_img_cover).fadeTo("fast", 1);
    //     },
    //     function() {
    //         $(back_img_cover).fadeTo("fast", 0);
    //     }
    // );
    // modal window
    // $(back_gif_zooming).tooltip({ title: "zoom in" });
    // back_gif_zooming.addEventListener("click", () => {
    //     $('#zooming-modal').modal({
    //         backdrop: true,
    //         keyboard: false,
    //         focus: true,
    //         show: true
    //     });

    //     document.querySelector(".modal-body > img").setAttribute("src", `./assets/back_gif_s/${this._back_gif_name}`);
    //     document.querySelector(".modal-content").classList.add(this.parameters["VNS_tag"]);
    //     modal_title_node.innerText = this.parameters["eg_title"];
    //     modal_title_node.setAttribute("href", this.parameters["eg_url"]);
    // });


    // $('#zooming-modal').on('show.bs.modal', function() {
    //     let img = new Image();
    //     img.src = `./assets/back_gif_s/${that._back_gif_name}`;
    //     document.querySelector(".modal-title").innerHTML = that.parameters["card_title"];
    //     $(img).on("load", function(){$(".modal-body > img").replaceWith(img);});
    // });

}

Homepage_Card.prototype.appendTo = function(parentNode) {
    if (!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();

    parentNode.appendChild(this._deck_single_node);
    return true;
}



// homepage reminder class
class Homepage_Reminder {
    constructor({ VNS_tag, VNS_desc, VNS_num }) {
        this._VNS_tag = VNS_tag + "";
        this._VNS_num = VNS_num + "";
        this._VNS_desc = VNS_desc + "";
    }

    _createReminder(methodToReminderTitle = str => str) {
        let reminder_node = document.createElement("div");
        let reminder_bg_node = document.createElement("div");
        let reminder_content_node = document.createElement("div");
        let reminder_head_node = document.createElement("div");
        let reminder_desc_node = document.createElement("div");
        let reminder_symbol_html = `<span class="reminder-symbol"></span>`;
        let reminder_title_html = `<span class="reminder-title">${methodToReminderTitle(this._VNS_tag).split('_').join(' ')}&nbsp;</span>
            <span class='reminder-sum'>(${this._VNS_num})</span>
            <span class='reminder-sum-s'>SUM: ${this._VNS_num}</span>`;
        reminder_node.classList.add("display-reminder");
        // reminder_bg_node.classList.add("reminder-bg");
        reminder_content_node.classList.add("reminder-content");
        reminder_node.classList.add("display-reminder", "active-sticky");
        reminder_head_node.classList.add("reminder-head");
        reminder_desc_node.classList.add("reminder-desc");

        reminder_head_node.innerHTML = reminder_symbol_html + reminder_title_html;
        reminder_desc_node.innerHTML = this._VNS_desc;
        reminder_content_node.appendChild(reminder_head_node);
        reminder_content_node.appendChild(reminder_desc_node);
        reminder_node.appendChild(reminder_bg_node);
        reminder_node.appendChild(reminder_content_node);
        return reminder_node;
    }
}

Homepage_Reminder.prototype._bindEvents = function() {
    let that = this;
    // scroll
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");
    // const reminder_bg_node = reminder_node.querySelector(".reminder-bg");


    const event_callback = function() {
        if (that._reminder_node) {
            const reminder_node = that._reminder_node;
            // console.log(reminder_node);

            if (reminder_node.nextElementSibling) {
                const card_deck_node = reminder_node.nextElementSibling;

                let distance_to_top = card_deck_node.getBoundingClientRect().top - reminder_node.getBoundingClientRect().bottom;
                // console.log(distance_to_top);
                if (distance_to_top < -3 && !reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.add("active-sticky");
                } else if (distance_to_top >= -3 && reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.remove("active-sticky");
                }

                // if(reminder_node.nextElementSibling && reminder_node.querySelector(".reminder-title").innerHTML == "Emphasis (15)" ) {
                let distance_to_bottom = card_deck_node.getBoundingClientRect().bottom - reminder_node.getBoundingClientRect().top;
                // if ((distance_to_bottom < CARD_DISPLAY_NODE.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                if ((distance_to_bottom < CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.add("hidden-sticky");
                    // console.log(distance_to_bottom)
                    // } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.remove("hidden-sticky");
                }
            }
        }

    }

    // event_callback();
    // CARD_DISPLAY_NODE.addEventListener("scroll", event_callback);
    CARD_DISPLAY_NODE.parentElement.addEventListener("scroll", event_callback);
}

Homepage_Reminder.prototype.appendTo = function(parentNode, nextNode, methodToReminderTitle) {
    if (!(parentNode instanceof HTMLElement) || !(nextNode instanceof HTMLElement)) {
        console.error(`Either ${parentNode} or ${nextNode} is not a DOM element!`);
        return false;
    }

    this._reminder_node = this._createReminder(methodToReminderTitle);
    this._bindEvents();

    parentNode.insertBefore(this._reminder_node, nextNode);
    return true;
}


export {
    Homepage_Card as Homepage_Card,
    Homepage_Reminder as Homepage_Reminder
};