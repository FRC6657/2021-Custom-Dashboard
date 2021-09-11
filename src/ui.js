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

//This is probably horribly inefficient but ask me if I care
function setPipeline(pipeline){

    document.getElementById("pipe0").style.color.white;
    document.getElementById("pipe1").style.color.white;
    document.getElementById("pipe2").style.color.white;
    document.getElementById("pipe3").style.color.white;
    document.getElementById("pipe4").style.color.white;
    document.getElementById("pipe5").style.color.white;
    document.getElementById("pipe6").style.color.white;
    document.getElementById("pipe7").style.color.white;
    document.getElementById("pipe8").style.color.white;

    document.getElementById("pipe0").style.backgroundColor = '#101213'
    document.getElementById("pipe1").style.backgroundColor = '#101213'
    document.getElementById("pipe2").style.backgroundColor = '#101213'
    document.getElementById("pipe3").style.backgroundColor = '#101213'
    document.getElementById("pipe4").style.backgroundColor = '#101213'
    document.getElementById("pipe5").style.backgroundColor = '#101213'
    document.getElementById("pipe6").style.backgroundColor = '#101213'
    document.getElementById("pipe7").style.backgroundColor = '#101213'
    document.getElementById("pipe8").style.backgroundColor = '#101213'
    document.getElementById("pipe9").style.backgroundColor = '#101213'
    
    switch(pipeline){
        case '0':
            document.getElementById("pipe0").style.color.black;
            document.getElementById("pipe0").style.backgroundColor = '#50940A'
            break;
        case '1':
            document.getElementById("pipe1").style.color.black;
            document.getElementById("pipe1").style.backgroundColor = '#50940A'
            break;
        case '2':
            document.getElementById("pipe2").style.color.black;
            document.getElementById("pipe2").style.backgroundColor = '#50940A'
            break;
        case '3':
            document.getElementById("pipe3").style.color.black;
            document.getElementById("pipe3").style.backgroundColor = '#50940A'
            break;
        case '4':
            document.getElementById("pipe4").style.color.black;
            document.getElementById("pipe4").style.backgroundColor = '#50940A'
            break;
        case '5':
            document.getElementById("pipe5").style.color.black;
            document.getElementById("pipe5").style.backgroundColor = '#50940A'
            break;
        case '6':
            document.getElementById("pipe6").style.color.black;
            document.getElementById("pipe6").style.backgroundColor = '#50940A'
            break;
        case '7':
            document.getElementById("pipe7").style.color.black;
            document.getElementById("pipe7").style.backgroundColor = '#50940A'
            break;
        case '8':
            document.getElementById("pipe8").style.color.black;
            document.getElementById("pipe8").style.backgroundColor = '#50940A'
            break;
        case '9':
            document.getElementById("pipe9").style.color.black;
            document.getElementById("pipe9").style.backgroundColor = '#50940A'
            break;
    }
    NetworkTables.putValue('/limelight/pipeline', pipeline)
}

function lightState(){

    if(document.querySelector('.light-switch').checked){
        NetworkTables.putValue('/limelight/ledMode', 3)
    }
    else{
        NetworkTables.putValue('/limelight/ledMode', 1)
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
