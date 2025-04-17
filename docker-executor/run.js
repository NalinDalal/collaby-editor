const fs = require("fs");
const { exec } = require("child_process");

const lang = process.env.LANG || "javascript";
const code = process.env.CODE;

fs.writeFileSync(
  `main.${lang === "python" ? "py" : lang === "cpp" ? "cpp" : "js"}`,
  code,
);

let cmd = "";

if (lang === "python") cmd = "python3 main.py";
else if (lang === "cpp") cmd = "g++ main.cpp -o main && ./main";
else if (lang === "javascript") cmd = "node main.js";
else cmd = "echo 'Unsupported Language'";

exec(cmd, (err, stdout, stderr) => {
  if (err) return console.error(stderr);
  console.log(stdout);
});
