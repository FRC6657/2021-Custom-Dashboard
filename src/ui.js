// Define UI elements
let ui = {
    robotState: document.getElementById('robot-state'),

    tXDisplay:{
        container: document.getElementById("targeting-panel"),
        val: 0,
        visualVal: 0,
        number: document.getElementById("tY-value"),
    },
    
    tYDisplay:{
        container: document.getElementById("targeting-panel"),
        val: 0,
        visualVal: 0,
        number: document.getElementById("tX-value"),
    },

};

/**
 * Author Scott Wegley
 */
function setPipeline(pipeline){

    for (let i = 0; i < 10; i++){
            var myString = "pipe" + i.toString();
            document.getElementById(myString).style.color.white;
            document.getElementById(myString).style.backgroundColor = '#101213';
    }
    
    document.getElementById("pipe" + pipeline.toString()).style.color.black;
    document.getElementById("pipe" + pipeline.toString()).style.backgroundColor = '#50940A';
    
    NetworkTables.putValue('/limelight/pipeline', pipeline);
    
}

function lightState(){
    if(document.querySelector('.light-switch').checked){
        NetworkTables.putValue('/limelight/ledMode', 3)
    }
    else{
        NetworkTables.putValue('/limelight/ledMode', 1)
    }
}

function visionState(){
    if(document.querySelector('.vision-switch').checked){
        NetworkTables.putValue('/limelight/camMode', 0)
    }
    else{
        NetworkTables.putValue('/limelight/camMode', 1)
    }
}

//Limelight Readouts
let update_tX = (key,value) => {
    ui.tXDisplay.val = value;
    ui.tXDisplay.visualVal = ((Math.floor((ui.tXDisplay.val - ui.tXDisplay.offset) * 100))/100);
    ui.tXDisplay.number.innerHTML = ui.tXDisplay.visualVal + "°";
};
NetworkTables.addKeyListener('/limelight/tx', update_tX);

let update_tY = (key,value) => {
    ui.tYDisplay.val = value;
    ui.tYDisplay.visualVal = ((Math.floor((ui.tYDisplay.val - ui.tYDisplay.offset) * 100))/100);
    ui.tYDisplay.number.innerHTML = ui.tYDisplay.visualVal + "°";
};
NetworkTables.addKeyListener('/limelight/ty', update_tY);

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
