
const {spawn}= require('child_process');

let Python = {

  runPy: function(data) {

    const directory = 'test.py';  //Path of python file
    // console.log(typeof(data));

    const child = spawn('python', [directory, `${JSON.stringify(data)}`]);
    child.on('exit', (code)=>{
      console.log('child process exited with' +
        `code ${code}`);
    });

    child.on('close', ()=>{
      console.log("Process closed");
    });

    child.stdin.on('data', (data)=>{
      console.log(`childstdout: \t ${data}`)
    });
    child.stdout.on('data', (data)=>{
      console.log('response is :' + JSON.stringify(data));
    });

    child.stderr.on('data', (data)=>{
      console.log(`childstdout: \t ${data}`);
    });
  }
};


module.exports = Python;
