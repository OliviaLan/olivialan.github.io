/* JS for tab "homepage" Mobile Navigator Tab when screen width is less than 576px */
import { MN_callback } from './hp_middle.js';

// item container
class Mobile_Nav {

    constructor (item_json_url, item_name_template, event_listener) {
        this._item_json_url = item_json_url + "";
        this._item_name_tag_template = item_name_template + "";
        this._event_listener = event_listener || function() {};
        if(this._item_json_url.substring(this._item_json_url.length-5) !== ".json") {
            console.error("Please check your URL format (.JSON)!");
            return ;
        }
    }

    _createItem (json_item, extraClass_toA_arr, extraAttribute_toA, methodToItemName) {
        json_item = json_item || {};

        if((typeof json_item !== "object")) {
            console.error("Parameter(s) error! Mobile Navigator Item creation failed.");
            return document.createElement("a");
        }

        let item_node = document.createElement("div");
        let item_symbol_html = `<span class="mobile-nav-symbol"></span>`;
        let item_text_html = `<span class="mobile-nav-text">
            ${this._get_reg_template(this._item_name_tag_template, json_item, methodToItemName)}</span>`;

        item_node.classList.add("mobile-nav-item");
        if(extraClass_toA_arr) {
            extraClass_toA_arr.forEach((class_name, i, class_arr) => {
                if(typeof class_name != "string") {
                    return false;
                }

                if(class_name.search(Mobile_Nav.item_name_regex) > -1) {
                    class_name = this._get_reg_template(class_name, json_item, str => str.replace(/\s+/g, "-"));
                }
                item_node.classList.add(class_name);
            });
        }
        if(Object.keys(extraAttribute_toA).length > 0) {
            for (let attr in extraAttribute_toA) {
                let value = extraAttribute_toA[attr];
                if(typeof value !== "string") continue;
                value = value || "";
                if(Object.keys(json_item).indexOf(value) > -1) {
                    value = json_item[value];
                }

                if(value.search(Mobile_Nav.item_name_regex)) {
                    value = this._get_reg_template(value, json_item);
                }
                item_node.setAttribute(attr, value);
            }
        }

        item_node.innerHTML = item_symbol_html + item_text_html;
        return item_node;
    }

    _get_reg_template (pairs, json_item = {}, deco = function (str) {return str;}) {
        let temp_pairs = pairs + "";
        temp_pairs = temp_pairs.replace(Mobile_Nav.item_name_regex, (all_match, match_inner, i) => {
            if(Object.keys(json_item).indexOf(match_inner) > -1) {
                return deco(json_item[match_inner]);
            }
            return "tag_" + i;
        });
        return temp_pairs;
    }

    _bindEventListeners (callback = () => {}) {
        callback ();
    }
}

Mobile_Nav.item_name_regex = /\$\{(.*?)\}/gm;

Mobile_Nav.prototype.fillContainer = function (container_node, extraClass_toA_arr, extraAttribute_toA, methodToItemName) {
    if(!(container_node instanceof HTMLElement)) {
        console.error("Parameter(s) error! Mobile Navigator filling failed.");
        return false;
    }

    $.getJSON(this._item_json_url, json => {

        json.forEach((item, i, jsonArr) => {
            let item_node = this._createItem(item, extraClass_toA_arr, extraAttribute_toA, methodToItemName);
            container_node.appendChild(item_node);
        });

        this._bindEventListeners(this._event_listener);
    });
}


// collapsing button
class Mobile_Collapse_Btn {
    constructor (btn_name, object_id, hidden_id) {
        this._btn_name = btn_name + "";     //".example01"
        this._object_id = object_id + "";       // "#example02"
        this._hidden_id = hidden_id + "";       // "#example03"
        this._object_node = document.querySelector(this._object_id);
        this._hidden_node = document.querySelector(this._hidden_id);

        this._bindEvents();
    }

    _bindEvents () {
        const btn_node = document.querySelector(this._btn_name);
        const hidden_node = document.querySelector(this._hidden_id);
        const hidden_board_node = document.createElement('div');
        btn_node.setAttribute("type", "button");
        btn_node.setAttribute("data-toggle", "collapse");
        btn_node.setAttribute("data-target", this._object_id);
        btn_node.setAttribute("data-hidden", this._hidden_id);
        hidden_board_node.classList.add("mobile-nav-hidden");

        this._object_node.classList.add("collapse");
        document.querySelector(this._hidden_id).parentElement.insertBefore(hidden_board_node, hidden_node);

        $(this._object_id).collapse({ toggle: false });
        $(this._object_id).on('show.bs.collapse', () => {
            if(btn_node.classList.contains("rotated")) {
                return ;
            }
            $(".mobile-nav-hidden").fadeIn(120);
            btn_node.classList.add("rotated");
        });
        $(this._object_id).on('hide.bs.collapse', () => {
            if(!btn_node.classList.contains("rotated")) {
                return ;
            }
            $(".mobile-nav-hidden").fadeOut(120);
            btn_node.classList.remove("rotated");
        });
    }
}


const homepage_vns_url = "./assets/json/vns_collection.json";
const vns_btn_name_template = "${VNS_tag}";
let MNav = new Mobile_Nav(homepage_vns_url, vns_btn_name_template, MN_callback);

export { 
    MNav as MNav,
    Mobile_Collapse_Btn as  Collapse_Btn
};