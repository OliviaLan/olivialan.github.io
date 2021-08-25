/* JS for tab "homepage" Visual Narrative Strategies panel & Editorial Layers */
import { VNS_click_callback, VNS_scroll_callback, EL_callback } from './hp_middle.js';

class Homepage_Panel {

    constructor(btn_json_url, panel_title, btn_name_tag_template, panel_name, click_event_callback = () => {},
        global_event_listener = () => {}) {

        this._btn_json_url = btn_json_url + "";
        this._panel_title = panel_title + "";
        this._btn_name_tag_template = btn_name_tag_template + "";
        this._panel_name = panel_name + "";
        this._btn_queue = []; // save btn items
        this._click_event_callback = click_event_callback;
        this._global_event_callback = global_event_listener || function() {};
        if (this._btn_json_url.substring(this._btn_json_url.length - 5) !== ".json") {
            console.error("Please check your URL format (.JSON)!");
            return;
        }
    }

    _createPanel(extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName) {
        let panel_node = document.createElement("div");
        // let panel_chart_title_html = `<h3 class="sidebar-panel-title">Chart Types</h3>`;

        let panel_title_html = `<h3 class="sidebar-panel-title">${this._panel_title}</h3>`;

        let panel_group_node = document.createElement("div");

        panel_node.classList.add("sidebar-panel");
        panel_node.setAttribute("id", this._panel_name.concat("-panel"));
        panel_group_node.classList.add("sidebar-panel-group");

        // $.ajaxSettings.async = false;
        $.getJSON(this._btn_json_url, json => {

            json.forEach((item, i, jsonArr) => {
                let btn_node = this._createButton(item, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName);
                this._appendTo_queue(btn_node); // append btn to panel queue
                panel_group_node.appendChild(btn_node);

            });

            this._bindClickEvents(this._click_event_callback);
            this._bindOtherListenerEvents(this._global_event_callback);
        });



        panel_node.innerHTML = panel_title_html;
        panel_node.appendChild(panel_group_node);
        return panel_node;
    }

    _createButton(json_item, extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName) {
        json_item = json_item || {};

        if ((typeof json_item !== "object") ||
            (typeof extraNode_html !== "string") ||
            !(extraClass_toA_arr instanceof Array) ||
            (typeof extraAttribute_toA !== "object")
        ) {
            console.error("Parameter(s) error! Button creation failed.");
            return document.createElement("a");
        }

        let btn_node = document.createElement("div");
        let btn_symbol_html = `<span class="${this._panel_name}-btn-symbol"></span>`;
        let btn_text_html = `<span class="${this._panel_name}-btn-text">
            ${this._get_reg_template(this._btn_name_tag_template, json_item, methodToBtnName)}</span>`;

        btn_node.classList.add("sidebar-btn", this._panel_name.concat("-btn"));
        if (extraClass_toA_arr) {
            extraClass_toA_arr.forEach((class_name, i, class_arr) => {
                if (typeof class_name != "string") {
                    return false;
                }

                if (class_name.search(Homepage_Panel.btn_name_regex) > -1) {
                    class_name = this._get_reg_template(class_name, json_item, str => str.replace(/\s+/g, "-"));
                }
                btn_node.classList.add(class_name);
            });
        }
        if (Object.keys(extraAttribute_toA).length > 0) {
            for (let attr in extraAttribute_toA) {
                let value = extraAttribute_toA[attr];
                if (typeof value !== "string") continue;
                value = value || "";
                if (Object.keys(json_item).indexOf(value) > -1) {
                    value = json_item[value];
                }

                if (value.search(Homepage_Panel.btn_name_regex)) {
                    value = this._get_reg_template(value, json_item);
                }
                btn_node.setAttribute(attr, value);
            }
        }

        btn_node.innerHTML = btn_symbol_html + btn_text_html + extraNode_html;
        return btn_node;
    }

    // deal with single button name template
    // this._btn_name_tag = "${regex01:Comparison} (${regex02:8})"
    // _get_btn_template (json_item = {}) {
    //     let btn_name_pairs = this._btn_name_tag_template;
    //     btn_name_pairs.replace(Homepage_Panel.btn_name_regex, (all_match, match_inner, i) => {
    //         if(Object.keys(json_item).indexOf(match_inner) > -1) {
    //             return json_item[match_inner];
    //         }
    //         return "tag_" + i;
    //     });

    //     return btn_name_pairs;
    // }
    // 
    // deco: decorate json_item values
    _get_reg_template(pairs, json_item = {}, deco = function(str) { return str; }) {
        let temp_pairs = pairs + "";
        temp_pairs = temp_pairs.replace(Homepage_Panel.btn_name_regex, (all_match, match_inner, i) => {
            if (Object.keys(json_item).indexOf(match_inner) > -1) {
                return deco(json_item[match_inner]);
            }
            return "tag_" + i;
        });
        return temp_pairs;
    }

    _appendTo_queue(btn_node) {
        if (!(btn_node instanceof HTMLElement)) {
            console.error("This button item is not a HTML Element!");
            return false;
        }
        this._btn_queue.push(btn_node);
    }

    _bindClickEvents(callback = () => {}) {
        // _bindEvents () {
        // console.log("EL binding...");
        this._btn_queue.forEach((btn, i, btn_queue) => {
            btn.addEventListener("click", () => {
                // if(btn.classList.contains("active")) {
                //     btn.classList.remove("active");
                // } else {
                //     btn.classList.add("active");
                // }
                callback(btn);
            });
        });
    }

    _bindOtherListenerEvents(callback = () => {}) {
        // const panel_node = this._panel_node.querySelector(".sidebar-panel-group");
        callback();
    }
}

Homepage_Panel.btn_name_regex = /\$\{(.*?)\}/gm;

// Homepage_Panel.prototype.appendTo = function(parentNode, extraNode_html, extraClass_toA_arr, extraAttribute_toA,
//     methodToBtnName) {

//     extraNode_html = extraNode_html || "";
//     extraClass_toA_arr = extraClass_toA_arr || [];
//     extraAttribute_toA = extraAttribute_toA || {};
//     if (!(parentNode instanceof HTMLElement) ||
//         (typeof extraNode_html !== "string") ||
//         !(extraClass_toA_arr instanceof Array) ||
//         (typeof extraAttribute_toA !== "object")
//     ) {
//         console.error("Parameter(s) error! Panel creation failed.");
//         return false;
//     }

//     this._panel_node = this._createPanel(extraNode_html, extraClass_toA_arr, extraAttribute_toA, methodToBtnName);

//     parentNode.appendChild(this._panel_node);
//     return true;
// }

// VNS callback


/**
 *  create "Visual Narrative Strategies" panel 
 * 
 *  Example:
 * <a href="#" class="sidebar-btn scrollSpy-btn default">
       <span class="scrollSpy-btn-symbol"></span>
       <span class="scrollSpy-btn-text">Comparison (8)</span>
       <span class="scrollSpy-btn-stop"></span>
   </a>
 * */
const homepage_vns_url = "./assets/json/vns_collection.json";
const vns_panel_title = "Design Methods";
const vns_btn_name_template = "${VNS_tag} (${VNS_num})";
const vns_panel_name = "scrollSpy";
let VNS_panel = new Homepage_Panel(homepage_vns_url, vns_panel_title, vns_btn_name_template,
    vns_panel_name, VNS_click_callback, VNS_scroll_callback);

/**
*  create "Editorial Layers" panel 
* 
*  Example:
* <a class="sidebar-btn filter-btn active">
      <span class="filter-btn-symbol"></span>
      <span class="filter-btn-text">The elements of Visualization</span>
  </a>
* */
// const homepage_chart_url = "./assets/json/charts_collection.json";
// const chart_panel_title = "Chart Types";
// const el_chart_panel_title = "Chart Types";
// const el_btn_name_template = "${EL_tag}";
// const el_panel_name = "filter";
// const Chart_panel = new Homepage_Panel(homepage_chart_url, chart_panel_title, 
//     chart_btn_name_template, chart_panel_name, Chart_callback);

const homepage_el_url = "./assets/json/el_collection.json";
const el_panel_title = "Editorial layers";
const el_btn_name_template = "${EL_tag}";
const el_panel_name = "filter";
const EL_panel = new Homepage_Panel(homepage_el_url, el_panel_title,
    el_btn_name_template, el_panel_name, EL_callback);




export {
    VNS_panel as VNS_panel,
    // Chart_panel as Chart_panel,
    EL_panel as EL_panel
};