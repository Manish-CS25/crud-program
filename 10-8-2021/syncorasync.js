const fs = new require("fs");
let text = fs.readFile("mk.txt", "utf-8", (err, Data) => {
  console.log(Data);
});

console.log("who are you?");
