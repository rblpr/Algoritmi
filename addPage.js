const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Nome del progetto: ", (name) => {

    rl.question("Titolo: ", (title) => {
        let dir = './public/js/' + name;
        let imgDir = "./public/assets"

        // create the dir
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.copyFileSync("./base.js", dir + "/canvas.js")
        fs.copyFileSync(imgDir + "/placeholder.png", imgDir + "/" + name + ".png")
        fs.copyFileSync("./public/js/pageinfo.js", "./public/js/backup.js")


        fs.readFile('./public/js/pageinfo.js', 'utf8', (err, data) => {
            if (err) throw err;
            data = data.slice(0, -1);

            data += `
                ${name}: {
                    title: "${title}",
                    desc: "",
                    shortdesc: "",
                    additional: "",
                    tags: [],
                },
                }`;

            fs.writeFileSync('./public/js/pageinfo.js', data)

            console.log("Fatto!");

            process.exit(0);
        });
    })
})
