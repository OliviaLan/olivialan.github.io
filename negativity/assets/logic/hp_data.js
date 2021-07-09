/* This is the JSON data processing end for homepage */

import { Homepage_Card, Homepage_Reminder } from './hp_card.js';

const homepage_vns_url = "./assets/json/vns_collection.json";
const homepage_cards_url = "./assets/json/anicard_dataset.json";
const _HEAD_SIGN = "HEAD";

class DisplayQueue {
    constructor(name, init_first_member) {
        this._name = name + "";
        this._first_member = init_first_member || "";
        this._queue = { head: [new DisplayQueueMember({ VNS_tag: _HEAD_SIGN }), 0] };
    }

    keys() {
        return Object.keys(this._queue);
    }

    reset_first_member(VNS_tag) {
        if (this.keys().length === 1 || this.keys().indexOf(VNS_tag) < 0) {
            console.error("You can not set a nonexistent member to the \'first member\'");
            return false;
        }

        this._queue["head"][0].set_next_tag(VNS_tag);
        this._first_member = VNS_tag;
        return true;
    }

    reset_link(prev_VNS_tag, next_VNS_tag) {
        if (this.keys().length === 1 ||
            this.keys().indexOf(prev_VNS_tag) < 0 ||
            !(this.keys().indexOf(next_VNS_tag) < 0 || next_VNS_tag === "")
        ) {
            console.error("You can not set nonexistent member\(s\) to the a new link.");
            return false;
        }

        this._queue[prev_VNS_tag][0].set_next_tag(next_VNS_tag);
        return true;
    }

    get_next_tag(VNS_tag) {
        if (this.keys().length === 1 || this.keys().indexOf(VNS_tag) < 0) {
            console.error("You can not read an empty queue nor a nonexistent display!");
            return false;
        }
        return this._queue[VNS_tag][0].get_next_tag();
    }

    is_first_member(VNS_tag) {
        VNS_tag = VNS_tag + "";
        if (this.keys().indexOf(VNS_tag) > -1 && this._queue["head"].get_next_tag() === VNS_tag) {
            return true;
        }
        return false;
    }


    _get_card_id_list(VNS_tag) {
        if (this.keys().length === 1 || this.keys().indexOf(VNS_tag) < 0) {
            console.error("You can not read an empty queue nor a nonexistent display!");
            return [];
        }
        return this._queue[VNS_tag][0]._print();
    }

    get_card_subject_list(VNS_tag) {
        if (this.keys().length === 1 || this.keys().indexOf(VNS_tag) < 0) {
            console.error("You can not read an empty queue nor a nonexistent display!");
            return [];
        }
        return this._queue[VNS_tag][0]._get_card_subject_list();
    }

    print(VNS_tag = "") {
        if (VNS_tag === "head") {
            return {};
        }

        if (VNS_tag && this.keys().indexOf(VNS_tag) > -1) {
            return { VNS_tag: this._get_card_id_list(VNS_tag) };
        }

        if (VNS_tag === "") {
            let result = {};
            this.keys().forEach((VNS_tag_key, i, keyArray) => {
                if (VNS_tag_key === "head") {
                    return;
                }
                result[VNS_tag_key] = this._get_card_id_list(VNS_tag_key);
            });
            return result;
        }

        return {};
    }

    append(display_member, first = false) {
        first = first || false;
        let VNS_tag = display_member.get_VNS_tag();
        if (this.keys().indexOf(VNS_tag) > -1) {
            // console.log(`VNS_tag: ${VNS_tag} has already existed in the queue.`);
            return -1;
        }
        let count = display_member._count_cards();
        this._queue[VNS_tag] = [display_member, count]; // single queue template
        if (first) {
            this.reset_first_member(VNS_tag);
        }
        return this.keys().length - 1;
    }

    // only step out of the link
    // *** shouldn't be used to remove a display member from the queue! ***
    // if count === 0, front end will remove the certain display out of the container but not back-end's job.
    remove(VNS_tag) {
        VNS_tag = VNS_tag + "";
        if (this.keys().indexOf(VNS_tag) < 0) {
            console.log(`VNS_tag: ${VNS_tag} doesn't exist in the queue.`);
            return false;
        }

        let prev_display_tag = "head";
        let next_display_tag = this.get_next_tag(VNS_tag);
        while (this.get_next_tag(prev_display_tag) !== VNS_tag) {
            prev_display_tag = this.get_next_tag(prev_display_tag);
        }
        this.reset_link(prev_display_tag, next_display_tag);
        this.reset_link(VNS_tag, "");

        if (this.is_first_member(VNS_tag)) {
            this.reset_first_member(next_display_tag);
        }
        return VNS_tag;
    }

    pushCard(card_subject) {
        let VNS_tag = card_subject._get_param("VNS_tag");
        if (this.keys().indexOf(VNS_tag) < 0) {
            console.
            error(`We don't have VNS_tag: ${VNS_tag} here in the queue.`);
            return false;
        }
        this._queue[VNS_tag][0]._pushCard(card_subject);
        this._queue[VNS_tag][1]++;
    }

    delCard(VNS_tag, card_id) {
        if (this.keys().indexOf(VNS_tag) < 0) {
            console.error(`We don't have VNS_tag: ${VNS_tag} here in the queue.`);
            return false;
        }
        this._queue[VNS_tag][0]._delCard(card_id);
        this._queue[VNS_tag][1]--;
    }
}


class DisplayQueueMember extends Homepage_Reminder {
    constructor({ VNS_tag, VNS_desc, VNS_num }, cards_list = [], next_tag = "") {
        super({ VNS_tag, VNS_desc, VNS_num });
        this._cards_list = cards_list;
        this._next_tag = next_tag;
    }

    get_VNS_tag() {
        return this._VNS_tag || "";
    }

    set_next_tag(VNS_tag = "") {
        this._next_tag = VNS_tag;
        return true;
    }

    get_next_tag() {
        return this._next_tag;
    }

    _set_head() {
        if (this._VNS_tag !== "") {
            console.error("This is not an empty link node.");
            return false;
        }
        this._VNS_tag = _HEAD_SIGN;
        return true;
    }

    is_head() {
        if (this._VNS_tag === _HEAD_SIGN) {
            return true;
        }
        return false;
    }

    is_tail() {
        if (this._VNS_tag === "") {
            return true;
        }
        return false;
    }

    _get_card_subject_list() {
        return this._cards_list;
    }

    _get_card_id_list() {
        return Array.from(this._cards_list, x => Number(x._get_param("card_id")));
    }

    _count_cards() {
        return this._cards_list.length;
    }

    _print() {
        return Array.from(this._cards_list, x => Number(x._get_param("card_id")));
    }

    _pushCard(card_subject) {
        let card_id = card_subject._get_param("card_id");
        if (card_subject._get_param("VNS_tag") !== this._VNS_tag || (this._get_card_id_list()).indexOf(card_id) > -1) {
            return false;
        }

        this._cards_list.push(card_subject);
        this._cards_list.sort((a, b) => Number(a._get_param("card_id") - Number(b._get_param("card_id"))));
        return true;
    }

    _delCard(card_id) {
        card_id = Number(card_id) || 0;
        let id_list = this._get_card_id_list();
        let card_No_inArray = id_list.indexOf(card_id);
        if ((card_No_inArray < 0) || Number(card_id) <= 0) {
            console.error("This card id doesn\'t exist.");
            return -1;
        }

        this._cards_list.splice(card_No_inArray, 1);
        return card_No_inArray;
    }
}


class CardsFilter {
    constructor(name, spec_tag = "", sep = true) {
        this._name = name + "";
        this._spec_tag = spec_tag + "";
        this._keywords = [];
        this._sep = sep;
    }

    _regex_keywords(keywords = []) {
        let keywords_arr = [];
        let result;
        if (keywords.length === 0) {
            result = new RegExp("\.\*");
            return result;
        }

        if (this._sep) {
            let keywords_str = keywords.join(",");
            keywords_str = keywords_str.replace(/\s+/, ",");
            keywords_arr = keywords_str
                .split(/\\|\/|\,|\.|\[|\]|\{|\}|\(|\)|\$|\#|\*|\`|\~|\"|\!|\@|\^|\<|\>|\+|\-|\_|\||\?/)
                .filter(str => ["", "a", "an", "the"].indexOf(str) < 0);
            keywords_arr = keywords_arr.map(keyword => `\(\?\=\.\*${keyword}\)`);
            keywords_arr.push("\^\.\*\&\?");
            result = new RegExp(keywords_arr.join(""), "mi");
        } else {
            keywords_arr = keywords_arr.concat(keywords);
            result = new RegExp(keywords_arr.join("\|"), "mi");
        }
        return result;
    }

    filtering_method(obj = {}) {
        let trans_kw = this._regex_keywords(this._keywords);
        if (this._spec_tag.length > 0) {
            return obj[this._spec_tag].search(trans_kw) + 1; // number
        }

        if (Object.keys(obj).length > 0) {
            return Object.keys(obj).some((key, i, keyArray) => {
                if ((typeof obj[key] === "string") || (typeof obj[key] === "number")) {
                    return (obj[key] + "").search(trans_kw) >= 0;
                }
                return false;
            }) ? 1 : 0;
        }

        return 0;
    }

    _appendKeywords(new_keywords = []) {
        let that = this;
        let timer = 1;
        while (timer > 0) {
            timer--;
            if (timer === 0 && that._keywords.length > 0) {
                timer = 100;
            }
        }

        if (new_keywords) {
            new_keywords = new_keywords.filter(x => that._keywords.indexOf(x) < 0);
            that._keywords = that._keywords.concat(new_keywords);
        }

        return that._keywords;
    }

    _clean_keywords() {
        this._keywords.length = 0;
        return true;
    }

}


// trans = true: return compensatory set
DisplayQueue.prototype.card_filter = function(Filter = new CardsFilter("new filter"), keywords = [], trans = false) {
    // homepage_status["visible_display_queue"] = this;
    let obj_set = this;
    if (keywords.length === 0) {
        return this;
    }

    // const Filter_Obj = new CardsFilter("temp filter", spec_tag);
    Filter._appendKeywords(keywords);

    obj_set.keys().forEach((VNS_tag, i_a, keyList) => {
        if (VNS_tag == "head") {
            return;
        }
        let obj_list = obj_set.get_card_subject_list(VNS_tag);
        obj_list = obj_list.filter(obj => Filter.filtering_method(obj.parameters) === (trans ? 1 : 0));
        obj_set._queue[VNS_tag][0]._cards_list = obj_list;
        obj_set._queue[VNS_tag][1] = obj_list.length;
    });

    Filter._clean_keywords();
    return obj_set;
}


// create api data
// 这里是获取到的标签
const VISIBLE_DISPLAY_QUEUE = new DisplayQueue("visible display queue");
// const HIDDEN_DISPLAY_QUEUE = new DisplayQueue("hidden display queue");
const FILTER_TAG_QUEUE = new CardsFilter("filtering tag queue", "EL_tag", false);
const FILTER_KEYWORD_QUEUE = new CardsFilter("filtering keyword queue");


function _create_display_subjects(display_url) {

    $.ajaxSettings.async = false;
    $.getJSON(display_url, json => {

        let next_tag = "";
        let is_first = false;
        json.forEach((json_item, i, jsonArr) => {

            let display_reminder_subject = new DisplayQueueMember({
                VNS_tag: json_item["VNS_tag"],
                VNS_desc: json_item["VNS_desc"],
                VNS_num: json_item["VNS_num"]
            });
            next_tag = (i + 1 < jsonArr.length) ? jsonArr[i + 1]["VNS_tag"] : "";
            display_reminder_subject.set_next_tag(next_tag);
            is_first = (i === 0) ? true : false;
            VISIBLE_DISPLAY_QUEUE.append(display_reminder_subject, is_first);
        });
    });
}

function _create_card_subjects(cards_url, displayQueue) {

    $.ajaxSettings.async = false;
    $.getJSON(cards_url, json => {
        json.forEach((json_item, i, jsonArr) => {
            let card_subject = new Homepage_Card(json_item);
            displayQueue.pushCard(card_subject);
        });
    });
}


// main
//好像是这里做的筛选
const init_display_container = function(keywords = [], search = false, EL_filter = false) {
    _create_display_subjects(homepage_vns_url);
    _create_card_subjects(homepage_cards_url, VISIBLE_DISPLAY_QUEUE);
    if (!search && !EL_filter) {
        return VISIBLE_DISPLAY_QUEUE;
    }

    if (search == true) {
        return VISIBLE_DISPLAY_QUEUE.card_filter(FILTER_KEYWORD_QUEUE, keywords, true);
    }

    if (EL_filter == true) {
        return VISIBLE_DISPLAY_QUEUE.card_filter(FILTER_TAG_QUEUE, keywords);
    }

    return {};
}

// const result = init_display_container([], false, true);

export {
    DisplayQueue as DisplayQueue,
    DisplayQueueMember as DisplayQueueMember,
    init_display_container as homeAPI
};