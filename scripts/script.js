let player = localStorage.getItem('saveData')

function changeMenu(buttonID) {
  // there is too much code being repeated here, create another function inside this function that takes a string like "hyper0" as input and deals with hiding/unhiding elements 
  if (buttonID == "hyper0") {
    let gameBodies = document.getElementsByClassName("game-body-div")
    let sideBars = document.getElementsByClassName("side-bar-div")
    //update game body
    for (let i = 0; i < gameBodies.length; i++) {
      gameBodies[i].style.display = "none"
    }
    document.getElementById("hyper0-body").style.display = "contents";
    //update side-bar
    for (let i = 0; i < sideBars.length; i++) {
      sideBars[i].style.display = "none"
    }
    document.getElementById("hyper0-side").style.display = "contents"
    //update configs
    player.configs.lastMenu = "hyper0"
  } else if (buttonID == "information") {
    let gameBodies = document.getElementsByClassName("game-body-div")
    let sideBars = document.getElementsByClassName("side-bar-div")
    //update game body
    for (let i = 0; i < gameBodies.length; i++) {
      gameBodies[i].style.display = "none"
    }
    document.getElementById("information-body").style.display = "contents";
    //update side-bar
    for (let i = 0; i < sideBars.length; i++) {
      sideBars[i].style.display = "none"
    }
    document.getElementById("information-side").style.display = "contents"
    //update configs
    player.configs.lastMenu = "information";
  } else if (buttonID == "settings") {
    let gameBodies = document.getElementsByClassName("game-body-div")
    let sideBars = document.getElementsByClassName("side-bar-div")
    //update game body
    for (let i = 0; i < gameBodies.length; i++) {
      gameBodies[i].style.display = "none"
    }
    document.getElementById("settings-body").style.display = "contents";
    //update side-bar
    for (let i = 0; i < sideBars.length; i++) {
      sideBars[i].style.display = "none"
    }
    document.getElementById("settings-side").style.display = "contents"
    //update configs
    player.configs.lastMenu = "settings";
    //update page to match settings
    document.getElementById("autoSaveInterval").value = player.configs.autoSaveInterval;

    if (player.configs.dev) {
      console.log("dev settings enabled")
      document.getElementById("dev-settings").style.display = "contents";
    }
    
  } else if (buttonID == "achievements") {
    let gameBodies = document.getElementsByClassName("game-body-div")
    let sideBars = document.getElementsByClassName("side-bar-div")
    //update game body
    for (let i = 0; i < gameBodies.length; i++) {
      gameBodies[i].style.display = "none"
    }
    document.getElementById("achievements-body").style.display = "contents";
    //update side-bar
    for (let i = 0; i < sideBars.length; i++) {
      sideBars[i].style.display = "none"
    }
    document.getElementById("achievements-side").style.display = "contents"
    //update configs
    player.configs.lastMenu = "achievements";
  }
}

const omegaReplacer = (key, value) => {
  if (value instanceof OmegaNum) {
    return value.toJSON();
  }
  return value;
};

if (player === null || player === undefined) {
  console.log("invalid save data, generating a new one")

  player = {
    "username": "Unknown",
    //"achievements": [{"id": 1, "unlocked": false}, {"id": 2, "unlocked": false}, {"id": 3, "unlocked": false}, {"id": 4, "unlocked": false}, {"id": 5, "unlocked": false}],
    //"prog" represents how far into the game the player is, it is used by achievements when deciding which achievements to check as well as what achievements to hide
    "stats": {"timePlayed": {"real": 0, "imaginary": OmegaNum(0)}, "prog": 0},
    "operators": {"0": OmegaNum(0), "1": OmegaNum(0), "2": OmegaNum(0), "3": OmegaNum(0), "4": OmegaNum(0), "5": OmegaNum(0)},
    "money": {
      "m1": OmegaNum(0),
      "m2": OmegaNum(0),
      "m3": OmegaNum(0),
      "m4": OmegaNum(0)
    },
    "elements": {"fire": OmegaNum(0), "water": OmegaNum(0), "air": OmegaNum(0), "earth": OmegaNum(0)},
    // achievements are binary numbers stored in sets of 32 achievements, each achievement representing a bit, they can be manipulated using bitwise operators. currently it's just an integer because there aren't more than 32 achievements, but this needs rewriting when 32+ achievements is reached
    "achievements": 0,
    "configs": {
      "autoSaveInterval": 5,
      "lastMenu": "hyper0",
      "lastPage": {
        "hyper0": "operators",
        'information': "stats",
        "settings": "settings"
      },
      "dev": false
    },
    "tick": 0
  }

  localStorage.setItem('saveData', btoa(JSON.stringify(player, omegaReplacer)));
  changeMenu(player.lastMenu);
} else {
  console.log("save is valid")
  console.log(atob(player))
  player = JSON.parse(atob(player));
  changeMenu(player.lastMenu);

  player.operators["0"] = OmegaNum(player.operators["0"]);
  player.operators["1"] = OmegaNum(player.operators["1"]);
  player.operators["2"] = OmegaNum(player.operators["2"]);
  player.operators["3"] = OmegaNum(player.operators["3"]);
  player.operators["4"] = OmegaNum(player.operators["4"]);
  player.operators["5"] = OmegaNum(player.operators["5"]);
  player.money.m1 = OmegaNum(player.money.m1)
  player.money.m2 = OmegaNum(player.money.m2)
  player.money.m3 = OmegaNum(player.money.m3)
  player.money.m4 = OmegaNum(player.money.m4)
  player.elements.fire = OmegaNum(player.elements.fire)
  player.elements.water = OmegaNum(player.elements.water)
  player.elements.air = OmegaNum(player.elements.air)
  player.elements.earth = OmegaNum(player.elements.earth)
}

document.addEventListener("DOMContentLoaded", () => {
  changeMenu(player.configs.lastMenu);
});

const calcCost = (numx, rank) => {
  switch (rank) {
    case 0: return OmegaNum(1).plus(numx).floor()
    case 1: return OmegaNum(500).plus(numx.times(500)).floor()
    case 2: return OmegaNum(12345).times(OmegaNum(10).pow(numx.pow(2))).floor()
    case 3: return OmegaNum("1e250").times(numx.pow(numx.pow(numx)).plus(1)).floor()
    case 4: return OmegaNum("1eee2.5").times(numx.plus(1).tetr(numx.plus(1).times(numx.plus(1).times(numx.plus(1).divide(2))))).floor()
    case 5: return numx.eq(0) ? OmegaNum("E394#6968") : OmegaNum(Infinity)
  }
}
const tickspeed = 50;
let lastSaved = Date.now();
const doGameTick = (deltaP, time) => {
  player.stats.timePlayed.real += deltaP / 20;
  //this should be changed to !(player.tick % (player.configs.autoSaveInterval * 1000 / 50))
  // the comment above me is wrong
    if (time - lastSaved > player.configs.autoSaveInterval * 1000) {
      localStorage.setItem('saveData', btoa(JSON.stringify(player, omegaReplacer)));
      lastSaved = time;
  }

  player.money.m1 = player.money.m1.plus(player.operators["0"].times(deltaP/20))
  player.operators["5"].gte(1)  ? player.operators["4"] = player.operators["4"].pent(player.operators["5"].times(deltaP/20).plus(1)) : null
  player.operators["4"].gte(1) ? player.operators["3"] = player.operators["3"].tetr(player.operators["4"].times(deltaP/20).plus(1)) : null
  player.operators["3"].gte(1) ? player.operators["2"] = player.operators["2"].pow(player.operators["3"].times(deltaP/20).plus(1)) : null
  player.operators["2"].gte(1) ? player.operators["1"] = player.operators["1"].times(player.operators["2"].times(deltaP/20).plus(1)) : null
  player.operators["1"].gte(1) ? player.operators["0"] = player.operators["0"].plus(player.operators["1"].times(deltaP/20)) : null
  !(player.tick % 20) ? checkAch(player.achievements) : null
} 

const doUpdateScreen = () => {
  let m1 = document.getElementsByClassName("m1")
  for (let i = 0; i < m1.length; i++) {
    m1[i].innerHTML = player.money.m1.floor().toPrecision(3)
  }
  // replace with loop, this is all just duplicating 2 lines and changing the op rank
  /*
  for (i = 0; i <= 5; i++) {
    document.getElementById(`op-${i}-display`).innerHTML = player.operators[i].floor().toPrecision(3)
    document.getElementById(`op-${i}-cost`).innerHTML = calcCost(player.operators[i], i).floor().toPrecision(3)
  }
  */
  document.getElementById("op-0-display").innerHTML = player.operators["0"].floor().toStringWithDecimalPlaces(3)
  document.getElementById("op-0-cost").innerHTML = calcCost(player.operators["0"], 0).floor().toPrecision(3)
  document.getElementById("op-1-display").innerHTML = player.operators["1"].floor().toPrecision(3)
  document.getElementById("op-1-cost").innerHTML = calcCost(player.operators["1"], 1).floor().toPrecision(3)
  document.getElementById("op-2-display").innerHTML = player.operators["2"].floor().toPrecision(3)
  document.getElementById("op-2-cost").innerHTML = calcCost(player.operators["2"], 2).floor().toPrecision(3)
  document.getElementById("op-3-display").innerHTML = player.operators["3"].floor().toPrecision(3)
  document.getElementById("op-3-cost").innerHTML = calcCost(player.operators["3"], 3).floor().toPrecision(3)
  document.getElementById("op-4-display").innerHTML = player.operators["4"].floor().toPrecision(3)
  document.getElementById("op-4-cost").innerHTML = calcCost(player.operators["4"], 4).floor().toPrecision(3)
  document.getElementById("op-5-display").innerHTML = player.operators["5"].floor().toPrecision(3)
  document.getElementById("op-5-cost").innerHTML = calcCost(player.operators["5"], 5).floor().toPrecision(3)
}
let lastTime = Date.now();
const loop = () => {
  player.tick++;
  const currentTime = Date.now();
  const deltaTime = (currentTime - lastTime);
  lastTime = currentTime;
  doGameTick(deltaTime / tickspeed, currentTime);
  doUpdateScreen();
};
  
  setInterval(loop, tickspeed);



window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  document.getElementById("DELETE_SAVE").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  })
  document.getElementById("autoSaveInterval").addEventListener('change', event => {
    if (event.target.value > 0 && event.target.value <= 60) {
      player.configs.autoSaveInterval = event.target.value;
      console.log("set autosave interval to: " + event.target.value);
    }
  });
  document.getElementById("settings-button").addEventListener("click", () => {
    document.getElementById("settings-body").style.display = "contents";
    player.configs.lastPage.settings = "settings"
  })

  document.getElementById("increment-m1").addEventListener("click", () => {
    player.money.m1 = player.money.m1.add(1)
  })
  // this should be changed to a loop/function as well
  document.getElementById("buy-op-0").addEventListener("click", () => {
    let cost = calcCost(player.operators["0"], 0)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["0"] = player.operators["0"].plus(1)
    }
  })

  document.getElementById("buy-op-1").addEventListener("click", () => {
    let cost = calcCost(player.operators["1"], 1)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["1"] = player.operators["1"].plus(1)
    }
  })

  document.getElementById("buy-op-2").addEventListener("click", () => {
    let cost = calcCost(player.operators["2"], 2)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["2"] = player.operators["2"].plus(1)
    }
  })

  document.getElementById("buy-op-3").addEventListener("click", () => {
    let cost = calcCost(player.operators["3"], 3)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["3"] = player.operators["3"].plus(1)
    }
  })

  document.getElementById("buy-op-4").addEventListener("click", () => {
    let cost = calcCost(player.operators["4"], 4)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["4"] = player.operators["4"].plus(1)
    }
  })

  document.getElementById("buy-op-5").addEventListener("click", () => {
    let cost = calcCost(player.operators["5"], 5)
    if (player.money.m1.cmp(cost) >= 0) {
      player.money.m1 = player.money.m1.minus(cost)
      player.operators["5"] = player.operators["5"].plus(1)
    }
  })

});

// might want to use custom events at some point
/*
const achEvent = new CustomEvent("achEvent")
document.addEventListener('myEvent', (event) => {
  console.log(`event triggered with data: ${event}`);
});

function dispatchAch(data) {
  achEvent.detail = data;
  document.dispatchEvent(achEvent);
}
*/

function checkAch(playerAch) {
  
  let achList = [
    "illegal Atomus",
    "keeping things short",
    "1,2,4",
    "1,2,e4",
    "cooler exponentiator",
    "cooler tetrator",
    "where's the next one?",
    "time is a continuum"
  ]
  let achProg = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
  ]
  let achCond = [
    () => (player.operators["0"].gt(0)),
    () => (player.operators["1"].gt(0)),
    () => (player.operators["2"].gt(0)),
    () => (player.operators["3"].gt(0)),
    () => (player.operators["4"].gt(0)),
    () => (player.operators["5"].gt(0)),
    () => (Object.values(player.operators).every(op => op.gt(0))),
    () => {return false},
  ]

  for (let i = 0; i < achList.length; i++) { 
    binaryRep = Math.pow(2, i)

    if (binaryRep & playerAch) {continue};
    if (achProg[i] > player.stats.prog) {continue}
    if (achCond[i]()) {
      player.achievements |= binaryRep
    }
  }

  for (let i = 0; i < achList.length; i++) {
    let binaryRep = Math.pow(2, i)

    if (binaryRep & playerAch) {
      let achElement = document.getElementById(`ach-${i + 1}`)
      achElement.className = "ach-unlocked"
    } else {
      continue
    }
  }
}
