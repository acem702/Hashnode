import clipboardy from "clipboardy";
import fs from "fs";
const testFolder = "./public/icons";

const result = [];

fs.readdirSync(testFolder).forEach((file) => {
  result.push(file);
});

result.forEach((file) => {
  const buffer = fs.readFileSync(testFolder + "/" + file);

  const fileContent = buffer.toString();

  const res = fileContent.replace(`rest style`, `{...rest} style`);
  // const response = res.replace(
  //   'xmlns="http://www.w3.org/2000/svg"',
  //   `xmlns="http://www.w3.org/2000/svg"
  //   className={{...rest}}`
  // );

  // clipboardy.writeSync(fileContent);
  // const boilerplate = `
  //   const ${
  //     file.split(".")[0].slice(0, 1).toUpperCase() +
  //     file.split(".")[0].slice(1, file.split(".")[0].length)
  //   } = () => {
  //     return (
  //       ${clipboardy.readSync()}
  //     )
  //   }

  //   export default ${
  //     file.split(".")[0].slice(0, 1).toUpperCase() +
  //     file.split(".")[0].slice(1, file.split(".")[0].length)
  //   }
  // `;
  fs.writeFileSync(testFolder + "/" + file, res);
});
