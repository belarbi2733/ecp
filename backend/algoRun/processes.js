const {spawn}= require('child_process');
let Python = {
  runPy : function(data)
  {
    return new Promise((resolve, reject) => {
      resolve('CC');  // resolve temporaire
      const directory = './algoRun/algo_opti.py';
      const child = spawn('python', [directory, `${JSON.stringify(data)}`]);
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
        console.log(`response is : ${data}`);
      });

      child.stderr.on('data', (data) => {
        console.log(`childstdout: \t ${data}`)
      });
    });
  }
};

module.exports = Python;






/*const jsonObj={
    "chauffeur":[50,"7000 Mons","75007 paris"],
    "colis1":[70, 31, 50.4537,3.9608,48.8583,2.2945],
    "colis2":[20,10,25,130,1,1],
    "colis3":[39,20,45,145,1,1],
    "colis4":[37, 19, 50.4613,3.9325,48.8738,2.29504],
    "colis5":[7,4,50,102,1,2],
    "colis6":[5,3,33,111,1,2],
    "colis7":[10,6,37,138,1,2]
    };

console.log(typeof(jsonObj));
runPy(jsonObj, 'algoRun.py');*/
