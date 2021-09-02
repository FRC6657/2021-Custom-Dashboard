// Define UI elements
let ui = {
    robotState: document.getElementById('robot-state'),

    tYDisplay:{
        container: document.getElementById("tX-box"),
        val: 0,
        visualVal: 0,
        offset: 0,
        number: document.getElementById("tX-value"),
    },
    tXDisplay:{
        container: document.getElementById("tY-box"),
        val: 0,
        visualVal: 0,
        offset: 0,
        number: document.getElementById("tY-value"),
    },
    tSDisplay:{
        container: document.getElementById("tS-box"),
        val: 0,
        visualVal: 0,
        number: document.getElementById("tS-value"),
    },
    tVDisplay:{
        container: document.getElementById("tV-box"),
        val: 0,
        number: document.getElementById("tV-value"),
    },
    rightMotorBar:{
        container: document.getElementById("right-motor-bar"),
        val:0,
        visualVal: 0,
        number: document.getElementById("right-motor-number"),
        barValue: 0,
    },
    leftMotorBar:{
        container: document.getElementById("left-motor-bar"),
        val:0,
        visualVal: 0,
        number: document.getElementById("left-motor-number"),
        barValue: 0,
    },
    shooterState:{
        container: document.getElementById("shooter-panel"),
        val: "Off",
        number: document.getElementById("shooter-value")
    },
    autoSelect: document.getElementById('auto-select'),
};

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

let update_tS = (key,value) => {
    ui.tSDisplay.val = value;
    ui.tSDisplay.visualVal = (Math.floor(ui.tSDisplay.val * 100)/100);
    ui.tSDisplay.number.innerHTML = ui.tSDisplay.visualVal + "°";
};
NetworkTables.addKeyListener('/limelight/tS', update_tS);

let update_shooter = (key,value) => {
    ui.shooterState.val = value;
    ui.shooterState.number.innerHTML = ui.shooterState.val;
};
NetworkTables.addKeyListener('/SmartDashboard/shooter-value', update_shooter);

let update_tV = (key,value) => {
    if(ui.tVDisplay.value == "1"){
        ui.tVDisplay.number.innerHTML = "Target Aquired";
    }
    else{
        ui.tVDisplay.number.innerHTML = "No Target";
    }
};
NetworkTables.addKeyListener('/limelight/tV', update_tV);

//Motor Values
let updateRightMotorBar = (key,value) => {
    ui.rightMotorBar.val = value;
    ui.rightMotorBar.visualVal = (Math.round(ui.rightMotorBar.val * 100));
    ui.rightMotorBar.number.innerHTML = ui.rightMotorBar.visualVal + "%";
    ui.rightMotorBar.barValue = ((((-ui.rightMotorBar.visualVal/100) + 1) * 286)/-2);
    ui.rightMotorBar.container.style.boxShadow = (ui.rightMotorBar.barValue + "px 0px 0px #1e282f inset");
};
NetworkTables.addKeyListener('/SmartDashboard/right-motor', updateRightMotorBar);
    
let updateLeftMotorBar = (key,value) => {
    ui.leftMotorBar.val = value;
    ui.leftMotorBar.visualVal = (Math.round(ui.leftMotorBar.val * 100));
    ui.leftMotorBar.number.innerHTML = ui.leftMotorBar.visualVal + "%";

    ui.leftMotorBar.barValue = ((((-ui.leftMotorBar.visualVal/100) + 1) * 286)/-2);
    ui.leftMotorBar.container.style.boxShadow = (ui.leftMotorBar.barValue + "px 0px 0px #1e282f inset");
    
};
NetworkTables.addKeyListener('/SmartDashboard/left-motor', updateLeftMotorBar);

NetworkTables.addKeyListener('/SmartDashboard/auto-chooser/options', (key, value) => {
    // Clear previous list
    while (ui.autoSelect.firstChild) {
        ui.autoSelect.removeChild(ui.autoSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = value[i];
        option.style = "color:black;"
        ui.autoSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelect.value = NetworkTables.getValue('/SmartDashboard/auto-chooser/selected');
});



NetworkTables.addKeyListener('/SmartDashboard/auto-chooser/selected', (key, value) => {
    ui.autoSelect.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoSelect.onchange = function() {
	NetworkTables.putValue('/SmartDashboard/auto-chooser/selected', this.value);
};


addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
