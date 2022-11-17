import pdf from 'pdf-creator-node';
import fs from 'fs';
import { fileURLToPath } from 'url';
// const path = 'path';
// const { dirname } = 'path';
import path from 'path';



export default function createPDF(object) {

  // model { owner: '', picks: [{ gift_buyer, gift_receiver }]}
  const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.resolve(__filename);
  const __dirname = path.resolve();

  const { owner } = object;
  const picks = JSON.stringify(object.picks);
//   const html = `<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8" />
//     <title>Hello world!</title>
//   </head>
//   <body>
//     <h1>User List</h1>
//     <ul>
//       {{#each users}}
//       <li>Name: {{this.name}}</li>
//       <li>Age: {{this.age}}</li>
//       <br />
//       {{/each}}
//     </ul>
//   </body>
// </html>`

// const location = "./template.html"
const html = fs.readFileSync(path.resolve(__dirname, "./src/template.html"),"utf8");
//
// const html = fs.readFileSync(path, "utf8");

var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Zeecret Santa!</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };
    console.log('stringify', picks);
  console.log('parsed', JSON.parse(picks));
var document = {
  html: html,
  data: {
    owner,
    picks: JSON.parse(picks)
  },
  path: `../results/${owner}.pdf`,
  type: "",
};

console.log('')
console.log('as passed to document (/data /picks): ', document.data.picks)
console.log('')

pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
    return res;
  })
  .catch((error) => {
    console.error(error);
  });

}
