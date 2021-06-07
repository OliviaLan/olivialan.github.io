const citation_copy = function () {
    const citation_node = document.querySelector(".citation-format");
    let text = citation_node.innerText;
    let input = document.createElement("input");
    input.classList.add("citation-input");
    document.querySelector("body").appendChild(input);
    
    input.value = text;
    // input.innerHTML = text;
    input.select();
    try {
        document.execCommand("Copy");
        destroy(input);
    } catch (e) { }
    
    confirm("Citation was successfully copied to your clipBoard.");
}

export const downloads_loading = function () {
    document.querySelector(".citation-btn").addEventListener("click", citation_copy);
    // $(".downloads-card-text > a").tooltip({ title: "click to start downloading task" });
    $(".downloads-card-text > a").tooltip();
}