const {spawn}= require('child_process');
let Python = {
  runPy : function(colisJson, trajetJson, miniColisJson, miniTrajetJson, choix)
  {
    return new Promise((resolve, reject) => {
      const directory = './algoRun/algo_complet.py';
      const child = spawn('python',
        [
          directory,   //args 0   Permet d'appeler le code python
          `${JSON.stringify(colisJson)}`,    //args 1
          `${JSON.stringify(trajetJson)}`,    //args 2
          `${JSON.stringify(miniColisJson)}`,    //args 3
          `${JSON.stringify(miniTrajetJson)}`,    //args 4
          choix,   //args 5
        ]);
      child.on('exit', (code) => {
        console.log('child process exited with' +
          `code ${code}`);
      });

      child.on('close', () => {
        console.log("Process closed");
      });

      child.stdin.on('data', (data) => {
        console.log(`childstdout: \t ${data}`)
      });
      child.stdout.on('data', (data) => {
        //console.log('Output Python : ');
        console.log(`${data}`);
        resolve(`${data}`);
      });

      child.stderr.on('data', (data) => {
        console.log(`childstdout: \t ${data}`)
        reject(`${data}`);
      });
    });
  }
};

module.exports = Python;
