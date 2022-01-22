var NUM_UNITS = 3;

var STATE_PICKED_NODE = null;
var STATE_NUM_UNITS = null;
var STATE_NUM_GARAGES = null;

// events

function onUnitHouseClick(event) {
    if (STATE_PICKED_NODE) {
        onHouseUnpicked(STATE_PICKED_NODE);
    }
    parent = document.getElementById(event.target.parentNode.id);
    onHousePicked(parent);
}

function onUnitRemoveClick(event) {
    parent = document.getElementById(event.target.parentNode.id);
    destroyUnit(parent);
}

function onGarageRemoveClick(event) {
    parent = document.getElementById(event.target.parentNode.id);
    destroyGarage(parent);
}

function onAddUnitClick(event) {
    lastUnit = document.getElementById(`unit${STATE_NUM_UNITS}`);
    addAfterUnit(lastUnit, createUnit());
}

function onAddGarageClick(event) {
    if (STATE_NUM_GARAGES == 0) {
        lastGarage = document.getElementById(`garage-model`);
    } else {
        lastGarage = document.getElementById(`garage-${STATE_NUM_GARAGES}`);
    }
    addAfterUnit(lastGarage, createGarage());
}

// house picking

function onHousePicked(node) {
    img = node.querySelector("img[name=\"pick-house\"]");
    img.src = "house.png";
    img.classList.remove('bg-gray-300');
    img.classList.add('bg-black');

    STATE_PICKED_NODE = node;
}

function onHouseUnpicked(node) {
    img = node.querySelector("img[name=\"pick-house\"]");
    img.src = "house-off.png";
    img.classList.add('bg-gray-300');
    img.classList.remove('bg-black');

    STATE_PICKED_NODE = null;
}

// units

function addAfterUnit(beforeUnit, afterUnit) {
    beforeUnit.after(afterUnit);
}

function createUnit() {
    var orig = document.getElementById('unit1');
    var unit = orig.cloneNode(true);
    let index = STATE_NUM_UNITS + 1;
    unit.id = `unit${index}`;
    unit.querySelector("label[name=\"unit-name\"]").textContent = `Unit#${index}`;

    unit.querySelector("img[name=\"pick-house\"]").onclick = onUnitHouseClick;
    unit.querySelector("button[name=\"remove-unit\"]").onclick = onUnitRemoveClick;

    STATE_NUM_UNITS += 1;

    return unit;
}

function destroyUnit(node) {
    if (STATE_NUM_UNITS <= 2) {
        alert("Cannot have less than 2 units");
        return;
    }

    node.remove();
    STATE_NUM_UNITS -= 1;
}

function createGarage() {
    var orig = document.getElementById('garage-model');
    var unit = orig.cloneNode(true);
    let index = STATE_NUM_GARAGES + 1;
    unit.id = `garage-${index}`;
    unit.classList.remove('md:hidden');
    unit.classList.add('md:flex');
    unit.querySelector("label[name=\"garage-name\"]").textContent = `Garage#${index}`;
    unit.querySelector("button[name=\"remove-garage\"]").onclick = onGarageRemoveClick;

    STATE_NUM_GARAGES += 1;

    return unit;
}

function destroyGarage(node) {
    node.remove();
    STATE_NUM_GARAGES -= 1;
}

window.onload = function() {
    var prev = document.getElementById('unit1');
    STATE_NUM_UNITS = 1;
    for (let i = 2; i <= NUM_UNITS; i++) {
        unit = createUnit();
        addAfterUnit(prev, unit);
        prev = unit;
    }

    STATE_NUM_GARAGES = 0;

    onHousePicked(document.getElementById(`unit${STATE_NUM_UNITS}`)); // pick last house

    postUnits = document.getElementById('post-units');
    postUnits.querySelector("button[name=\"add-unit\"]").onclick = onAddUnitClick;
    postUnits.querySelector("button[name=\"add-garage\"]").onclick = onAddGarageClick;
};
