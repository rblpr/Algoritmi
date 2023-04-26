
function createCard(title, desc, image, link, tags) {

    let tagstext = "";
    for (let i = 0; i < tags.length; i++) {
        tagstext += `<span class="badge rounded-pill bg-secondary mx-1">${tags[i]}</span>`
    }

    return `
    <div class="card mt-4 text-bg-light" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="..." height="250px" width="auto">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${desc}</p>
            <a href="${link}" class="btn btn-primary">Vai alla demo</a>
        </div>
        <div class="card-footer">
        ${tagstext}
        </div>
        
    </div>
    `
}

function addCard(title, desc, image, link, tags) {
    document.querySelector("#cards").innerHTML += (createCard(title, desc, image, link, tags))
}


function show(filter) {
    for (let name of Object.keys(algomap)) {
        let page = algomap[name];
        if (filter(page.tags)) {
            addCard(page.title, page.shortdesc, "assets/" + name + ".png", "algoritmo.html?" + name, page.tags)
        }
    }
}

show((l) => {return true});
