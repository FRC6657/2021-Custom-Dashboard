// Define UI elements
let ui = {
    robotState: document.getElementById('robot-state'),
    gyro: {
        container: document.getElementById('gyro-panel'),
        val: 0,
        offset: 0,
        visualVal: 0,
        arm: document.getElementById('gyro-arm'),
        number: document.getElementById('gyro-number')
    },
    leftEncoderDisplay:{
        container: document.getElementById("left-encoder-box"),
        val: 0,
        visualVal: 0,
        offset: 0,
        number: document.getElementById("left-encoder-value"),
    },
    rightEncoderDisplay:{
        container: document.getElementById("right-encoder-box"),
        val: 0,
        visualVal: 0,
        offset: 0,
        number: document.getElementById("right-encoder-value"),
    },
    xAccelDisplay:{
        container: document.getElementById("x-accel-box"),
        val: 0,
        visualVal: 0,
        number: document.getElementById("x-accel-value"),
    },
    yAccelDisplay:{
        container: document.getElementById("y-accel-box"),
        val: 0,
        visualVal: 0,
        number: document.getElementById("y-accel-value"),
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
    speedMultiBar:{
        container: document.getElementById("speed-slider-bar"),
        val:0,
        visualVal: 0,
        number: document.getElementById("speed-slider-number"),

    },
    autoSelect: document.getElementById('auto-select'),
};

// Key Listeners

// Gyro rotation
let updateGyro = (key, value) => {
    ui.gyro.val = value;
    ui.gyro.visualVal = Math.floor(ui.gyro.val - ui.gyro.offset);
    ui.gyro.visualVal %= 360;
    if (ui.gyro.visualVal < 0) {
        ui.gyro.visualVal += 360;
    }
    ui.gyro.arm.style.transform = `rotate(${ui.gyro.visualVal}deg)`;
    ui.gyro.number.textContent = ui.gyro.visualVal + '°';
};
NetworkTables.addKeyListener('/SmartDashboard/gyro-angle', updateGyro);

//Encoder Values
let updateLeftEncoder = (key,value) => {
    ui.leftEncoderDisplay.val = value;
    ui.leftEncoderDisplay.visualVal = ((Math.floor((ui.leftEncoderDisplay.val - ui.leftEncoderDisplay.offset) * 100))/100);
    ui.leftEncoderDisplay.number.innerHTML = ui.leftEncoderDisplay.visualVal + "in.";
};
NetworkTables.addKeyListener('/SmartDashboard/left-encoder', updateLeftEncoder);
let updateRightEncoder = (key,value) => {
    ui.rightEncoderDisplay.val = value;
    ui.rightEncoderDisplay.visualVal = ((Math.floor((ui.rightEncoderDisplay.val - ui.rightEncoderDisplay.offset) * 100))/100);
    ui.rightEncoderDisplay.number.innerHTML = ui.rightEncoderDisplay.visualVal + "in.";
};
NetworkTables.addKeyListener('/SmartDashboard/right-encoder', updateRightEncoder);

//Accelerometer Values
let updateXAccel = (key,value) => {
    ui.xAccelDisplay.val = value;
    ui.xAccelDisplay.visualVal = (Math.floor(ui.xAccelDisplay.val * 100)/100);
    ui.xAccelDisplay.number.innerHTML = ui.xAccelDisplay.visualVal + "g";
};
NetworkTables.addKeyListener('/SmartDashboard/x-accel', updateXAccel);

let updateYAccel = (key,value) => {
    ui.yAccelDisplay.val = value;
    ui.yAccelDisplay.visualVal = (Math.floor(ui.yAccelDisplay.val * 100)/100);
    ui.yAccelDisplay.number.innerHTML = ui.yAccelDisplay.visualVal + "g";
};
NetworkTables.addKeyListener('/SmartDashboard/y-accel', updateYAccel);

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

ui.speedMultiBar.container.oninput = function() {
    var originalValue = document.getElementById("speed-slider-bar").value;
    var percentValue = Math.round(originalValue);
    originalValue = percentValue;
    var nV = -(((originalValue * -282) / 100) + 282);
    document.getElementById("speed-slider-bar").style.boxShadow = (nV + "px 0px 0px #1e282f inset");
    document.getElementById("speed-slider-number").innerHTML = originalValue + "%";

    NetworkTables.putValue('/SmartDashboard/speed-multiplier', originalValue)
}


// Reset gyro value to 0 on click
ui.gyro.container.onclick = function() {
    ui.gyro.offset = ui.gyro.val;
    updateGyro('/SmartDashboard/gyro-angle', ui.gyro.val);
};
// Reset Left Encoder to 0 on click
ui.leftEncoderDisplay.container.onclick = function(){
    ui.leftEncoderDisplay.offset = ui.leftEncoderDisplay.val;
    updateLeftEncoder('/SmartDashboard/left-encoder', ui.leftEncoderDisplay.val);
};
// Reset Left Encoder to 0 on click
ui.rightEncoderDisplay.container.onclick = function(){
    ui.rightEncoderDisplay.offset = ui.rightEncoderDisplay.val;
    updateRightEncoder('/SmartDashboard/right-encoder', ui.rightEncoderDisplay.val);
};


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
