let tags = [];
for (let alg of Object.keys(algomap)) {
    for (let t of algomap[alg].tags) {
        tags.push(t)
    }
}
tags = [...new Set(tags)];

for (let t of tags) {
    let el = document.createElement("option");
    el.textContent = t;
    document.querySelector("#filter").appendChild(el)
}

function filterChange() {
    document.querySelector("#cards").innerHTML = "";
    let tag = document.querySelector("#filter").value;
    if (!tags.includes(tag)) {
        show((l) => {return true});
    } else {
        show((l) => {return l.includes(tag)});
    }
}