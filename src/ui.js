// Define UI elements
let ui = {
    robotState: document.getElementById('robot-state'),
};

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
