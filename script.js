/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

console.log("Malachte");

var xp=0, lvl=0, curr_ava=0, name;

function updatelvl() {
  document.getElementById("account-bar-next-level").innerHTML=xp;
  var unlocked = "";
  if (xp>=1800) {
    lvl=4;
    unlocked="Avatar 5 unlocked";
  }
  else if (xp>=800) {
    lvl=3;
    unlocked="Avatar 4 unlocked";
  }
  else if (xp>=300) {
    lvl=2;
    unlocked="Avatar 3 unlocked";
  }
  else if (xp>=100) {
    lvl=1;
    unlocked="Avatar 2 unlocked";
  }
  else lvl=0;
  document.getElementById("account-bar-level").innerHTML = "Level " + lvl;
  document.getElementById("newavatar").innerHTML = unlocked;
  localStorage.setItem('userxp', xp);
  name = document.getElementById("account-bar-name").innerHTML;
  localStorage.setItem('username', name);
}

if (localStorage.getItem('userxp')!='null') {
  xp = Number(localStorage.getItem('userxp'));
  updatelvl();
} else localStorage.setItem('userxp', xp);
document.getElementById("account-bar-next-level").innerHTML=xp;
document.getElementById("account-bar-name").innerHTML=name;


document.getElementById("todobtn").addEventListener("click", () => {
    let value = document.getElementById("todoinput").value
    if (value!=" ") {
        let paragraph=document.createElement("p")
        paragraph.innerHTML=value
        document.getElementById("items").appendChild(paragraph)
        document.getElementById("todoinput").value = " "
        paragraph.addEventListener("click", () => {
            paragraph.style.textDecoration = "line-through"
        })
        paragraph.addEventListener("dblclick", () => {        
          document.getElementById("items").removeChild(paragraph)
          xp+=10;
          updatelvl();
        })
    }
})

var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
      xp+=25;
      updatelvl();
    }
};
window.onload = function(){
  pomodoro.init();
};

function changeavatar() {
  if (curr_ava >= lvl)
    curr_ava=-1;
  curr_ava++;
  curr_ava%=5;
  var ava_link;
  switch(curr_ava) {
    case 0:
     ava_link="https://cdn.glitch.global/1ffa3f9c-5de3-4bb5-9df5-75a9d98c5c74/download.png?v=1647629990379";
      break;
    case 1:
     ava_link="https://cdn.glitch.global/97c0085a-d3f9-4c03-878b-1d397f357acd/d427821f-e7e9-47d3-808c-4149a1261a53.image.png?v=1647670454137"  
      break;
    case 2:
     ava_link="https://cdn.glitch.global/97c0085a-d3f9-4c03-878b-1d397f357acd/3ad85822-cc11-4052-ab6d-827521f45f5f.image.png?v=1647670465617"
      break;
    case 3:
     ava_link="https://cdn.glitch.global/97c0085a-d3f9-4c03-878b-1d397f357acd/f20191d6-8402-4d0d-be3e-96c1d0eb98ee.image.png?v=1647670486781"
      break;
    case 4:
     ava_link="https://cdn.glitch.global/97c0085a-d3f9-4c03-878b-1d397f357acd/1fe1e5ea-8c77-4d23-aec6-0076db865610.image.png?v=1647670482661"
      break;
    default:
      break;
  }
  document.getElementById("avatar").src=ava_link;
}