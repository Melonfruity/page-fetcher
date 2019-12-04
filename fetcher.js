const fs = require('fs');
const request = require('request');
const readline = require('readline');
const [link, destination] = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
  if(exists){
    rl.question(`Overwrite? Y/N\n`, (ans) => {
      if (ans === 'Y') {
        writeToFile(link, destination);
      } 
      rl.close();
    })
  }
});

const writeToFile = () => {
  request(`${link}`, (error, response, body) => {
    if(body){
      writeToHtmlFile(destination, body);
    }
  });

  const writeToHtmlFile = (destination, body) => {
    fs.writeFile(destination, body, (err) => {
      if (err) throw err;
      const stats = fs.statSync(destination);
      const fileSizeInBytes = stats["size"];
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${destination}`);
    });
  }
}
