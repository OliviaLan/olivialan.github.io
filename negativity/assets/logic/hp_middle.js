// all display nodes for transmitting between panels and homepage

import { homeAPI, DisplayQueue, DisplayQueueMember } from './hp_data.js';
import { vns_method_to_btn_name } from './anicard.js';

const _CARD_DISPLAY_NODES = [];
const EL_KW_LIST = [];
const CH_KW_LIST = [];

const EL_Origin_LIST = ["Color", "Imagery", "Audio", "Motion", "Interaction", "Narratives"];

const EL_New_LIST = [];


function EMPTY_ARRAY(arr = []) {
    arr.splice(0, arr.length);
}

export const init_card_display = function(card_display_node = new HTMLElement(), search_text = "") {
    if (EL_KW_LIST.length > 0) {
        EMPTY_ARRAY(_CARD_DISPLAY_NODES);
        EMPTY_ARRAY(EL_KW_LIST);
    }
    if (CH_KW_LIST.length > 0) {
        EMPTY_ARRAY(_CARD_DISPLAY_NODES);
        EMPTY_ARRAY(CH_KW_LIST);
    }
    create_display(homeAPI([search_text], true), [], card_display_node);

    // $(card_display_node).animate({scrollTop: 3},1);
    card_display_node.parentElement.scrollTo(0, 3);
}

export const VNS_click_callback = function(btn, target = "href") {
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");
    const AIM_DISPLAY_ID = btn.getAttribute(target);
    let page_position = 0;

    // if(!btn.classList.contains("focus")) {
    //     document.querySelectorAll(".scrollSpy-btn.focus").forEach(btn => btn.classList.remove("focus"));
    //     btn.classList.add("focus");
    // }

    if (document.querySelector(AIM_DISPLAY_ID)) {
        page_position = document.querySelector(AIM_DISPLAY_ID).offsetTop;
        // $(CARD_DISPLAY_NODE).animate({scrollTop: page_position}, "normal");
        $(CARD_DISPLAY_NODE.parentElement).animate({ scrollTop: page_position }, "normal");
    }
}

export const VNS_scroll_callback = function(panel_node) {
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");

    // CARD_DISPLAY_NODE.onscroll = () => {
    CARD_DISPLAY_NODE.parentElement.onscroll = () => {

        const panel_node = document.querySelector(".sidebar-panel-group");
        // let scrollBar_top = CARD_DISPLAY_NODE.scrollTop + 5 + CARD_DISPLAY_NODE.offsetHeight * 0.5;
        let scrollBar_top = CARD_DISPLAY_NODE.parentElement.scrollTop + 5 + CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5;

        panel_node.querySelectorAll(".sidebar-btn:not(.disabled)").forEach((btn_node, i, btnList) => {
            // console.log(btn_node)
            let display_id = btn_node.getAttribute("href");
            // console.log(display_id)
            let display_node = document.querySelector(display_id);
            let display_top = display_node.offsetTop;
            let display_bottom = display_node.offsetTop + display_node.offsetHeight;

            if ((scrollBar_top >= display_top) && (scrollBar_top < display_bottom)) {
                if (!btn_node.classList.contains("active")) {
                    btn_node.classList.add("active");
                }
                // console.log(`ADD ACTIVE: scroll bar top: ${scrollBar_top}, display top: ${display_top}, display bottom: ${display_bottom}`);
                return false;
            }

            if (btn_node.classList.contains("active")) {
                btn_node.classList.remove("active");
                // console.log(`REMOVE ACTIVE: scroll bar top: ${scrollBar_top}, display top: ${display_top}, display bottom: ${display_bottom}`);
            }
        });
    }

    // CARD_DISPLAY_NODE.scrollTo(0, 3);
    CARD_DISPLAY_NODE.parentElement.scrollTo(0, 1);
}

// export const Chart_callback = function (btn, btn_queue) {
//     const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");

//     // console.log("this is EL_KW_LIST []: ", EL_KW_LIST);

//     let btn_kw_str = btn.querySelector(".chart-btn-text").innerText;
//     console.log("this is btn_kw_str'': ", btn_kw_str);

//     if(btn.classList.contains("active")) {
//         if(CH_KW_LIST.indexOf(btn_kw_str) >= 0) {
//             console.log(`**** ${btn_kw_str} cannot been added to array. ****`);
//             return ;
//         }

//         btn.classList.remove("active");
//         console.log(`EL button\: \"${btn_kw_str}\" was filtered out.`);
//         CH_KW_LIST.push(btn_kw_str);
//     } else {
//         btn.classList.add("active");
//         console.log(`CH button\: \"${btn_kw_str}\" was reactivated.`);
//         CH_KW_LIST.splice(CH_KW_LIST.indexOf(btn_kw_str), 1);
//     }

//     create_display(homeAPI(CH_KW_LIST, false, true), _CARD_DISPLAY_NODES, CARD_DISPLAY_NODE);
//     // $(CARD_DISPLAY_NODE).animate({scrollTop: 1}, 1);
//     $(CARD_DISPLAY_NODE.parentElement).animate({scrollTop: 1}, 480);
// }


export const EL_callback = function(btn, btn_queue) {
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");

    // console.log("this is EL_KW_LIST []: ", EL_KW_LIST);

    let btn_kw_str = btn.querySelector(".filter-btn-text").innerText;
    console.log("this is btn_kw_str'': ", btn_kw_str);

    if (btn.classList.contains("active")) {
        if (EL_KW_LIST.indexOf(btn_kw_str) >= 0) {
            console.log(`**** ${btn_kw_str} cannot been added to array. ****`);
            return;
        }

        btn.classList.remove("active");
        console.log(`EL button\: \"${btn_kw_str}\" was filtered out.`);

        EL_KW_LIST.push(btn_kw_str);
        // console.log(EL_KW_LIST);
        // console.log(EL_Origin_LIST);

        for (let i = 0; i < EL_Origin_LIST.length; i++) {
            for (let n = 0; n < EL_KW_LIST.length; n++) {
                if (EL_Origin_LIST[i] == EL_KW_LIST[n]) {
                    EL_Origin_LIST.splice(i, 1);
                }
            }
        }

        console.log(EL_Origin_LIST);


    } else {
        btn.classList.add("active");
        console.log(`EL button\: \"${btn_kw_str}\" was reactivated.`);
        EL_KW_LIST.splice(EL_KW_LIST.indexOf(btn_kw_str), 1);
    }
    create_display(homeAPI(EL_KW_LIST, false, true), _CARD_DISPLAY_NODES, CARD_DISPLAY_NODE);
    // $(CARD_DISPLAY_NODE).animate({scrollTop: 1}, 1);
    $(CARD_DISPLAY_NODE.parentElement).animate({ scrollTop: 1 }, 480);
}



// create display
const create_display = function(display_queue = new DisplayQueue("new display set"), display_node_list = [], card_display_node = new HTMLElement()) {
    display_node_list.length = 0;
    card_display_node.innerHTML = "";
    let VNS_tag = display_queue.get_next_tag("head") || "tag";
    let display_member;
    let card_display_single_node;
    while (VNS_tag !== "") {
        display_member = display_queue._queue[VNS_tag][0];
        if (display_queue._queue[VNS_tag][1] > 0 && VNS_tag !== "head") {
            card_display_single_node = create_single_display(display_member);
            display_node_list.push(card_display_single_node);
            if (document.querySelector(".scrollSpy-btn." + VNS_tag)) {
                document.querySelector(".scrollSpy-btn." + VNS_tag).classList.remove("disabled");
            }

            // append single display node to DOM
            card_display_node.appendChild(card_display_single_node);
        } else if (document.querySelector(".scrollSpy-btn." + VNS_tag)) {
            document.querySelector(".scrollSpy-btn." + VNS_tag).classList.add("disabled");
            document.querySelector(".scrollSpy-btn." + VNS_tag).classList.remove("active");
        }

        VNS_tag = display_member.get_next_tag();
    }

    // if search failed or all cards filtered out
    if (display_node_list.length === 0) {
        let page_message_node = document.querySelector(".search-fail").cloneNode(true);
        page_message_node.style.visibility = "block";
        card_display_node.appendChild(page_message_node);
        $(page_message_node).fadeTo(1, 300);
    }

}

const create_single_display = function(display_member = new DisplayQueueMember()) {

    let VNS_tag = display_member.get_VNS_tag();
    let card_display_single_node = document.createElement("div");
    let card_deck_node = document.createElement("div");
    card_display_single_node.classList.add(VNS_tag);
    card_display_single_node.setAttribute("id", VNS_tag);
    card_deck_node.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-lg-3", "card-deck");
    card_display_single_node.appendChild(card_deck_node);

    // append card nodes to the deck node
    create_cards(display_member, card_deck_node);

    display_member.appendTo(card_display_single_node, card_deck_node, vns_method_to_btn_name);
    return card_display_single_node;
}

const create_cards = function(display_member = new DisplayQueueMember(), card_deck_node = new HTMLElement()) {
    let card_subject_list = display_member._get_card_subject_list();
    card_subject_list.forEach((card_subject, i, subList) => {
        card_subject.appendTo(card_deck_node);
    });
}

export const MN_callback = function() {
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");

    // CARD_DISPLAY_NODE.onscroll = () => {
    const container_node = document.querySelector(".mobile-nav-scrollSpy");
    CARD_DISPLAY_NODE.parentElement.addEventListener("scroll", () => {

        // let scrollBar_top = CARD_DISPLAY_NODE.scrollTop + 5 + CARD_DISPLAY_NODE.offsetHeight * 0.5;
        let scrollBar_top = CARD_DISPLAY_NODE.parentElement.scrollTop + 5 + CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5;

        container_node.querySelectorAll(".mobile-nav-item").forEach((item_node, i, itemList) => {
            // console.log(btn_node)
            let display_id = item_node.getAttribute("data-target");
            let display_node = document.querySelector(display_id);
            let display_top = display_node.offsetTop;
            let display_bottom = display_node.offsetTop + display_node.offsetHeight;

            if ((scrollBar_top > display_top) && (scrollBar_top < display_bottom)) {
                if (!item_node.classList.contains("active")) {
                    item_node.classList.add("active");
                    centralize_item(item_node, container_node);
                }
                // console.log(`ADD ACTIVE: scroll bar top: ${scrollBar_top}, display top: ${display_top}, display bottom: ${display_bottom}`);
                return false;
            }

            if (item_node.classList.contains("active")) {
                item_node.classList.remove("active");
                // console.log(`REMOVE ACTIVE: scroll bar top: ${scrollBar_top}, display top: ${display_top}, display bottom: ${display_bottom}`);
            }
        });
    });

    container_node.querySelectorAll(".mobile-nav-item").forEach((item_node, i, itemList) => {
        item_node.addEventListener('click', () => {
            VNS_click_callback(item_node, "data-target");
        });
    });

    container_node.parentElement.scrollTo(0, 0);
}

const centralize_item = function(item_node, container_node) {
    let container_length = container_node.offsetWidth;
    let item_x = item_node.offsetLeft - container_node.offsetLeft;
    let bias = item_node.offsetWidth * 0.5 - container_length * 0.5;

    // container_node.scrollTo(item_x + bias, 0);
    $(container_node).animate({ 'scrollLeft': parseInt(item_x + bias) }, 150);
}