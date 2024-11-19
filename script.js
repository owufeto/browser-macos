let DARKMODE = 0;

class cWindow {
	constructor(title, width, height, minWidth, minHeight, content) {
  	this.title = title;
    this.width = width;
    this.height = height;
    this.minHeight = minHeight;
    this.minWidth = minWidth;
    this.content = content;
  }
  
  left = "0px";
  top = "0px";

  createWindow() {
  	const win = document.createElement("div");
    let headers = document.getElementsByClassName("header");

    Array.prototype.forEach.call(headers, (el)=> {
      el.parentElement.classList.add("inactive");
    });

    win.classList.add("window");
    win.style.width = `${this.width}px`;
    win.style.height = `${this.height}px`;
    win.style.minWidth = `${this.minWidth}px`;
    win.style.minHeight = `${this.minHeight}px`;
    win.style.left = 0;
    win.style.top = 0;
    
    const header = document.createElement("div");
    header.classList.add("header");
    
    const close = document.createElement("div");
    close.classList.add("close");
    close.classList.add("circle-button");
    close.innerHTML = "<span>✖</span>";

    const minimize = document.createElement("div");
    minimize.classList.add("minimize");
    minimize.classList.add("circle-button");
    minimize.innerHTML = "<span>—</span>";

    const maximize = document.createElement("div");
    maximize.classList.add("maximize");
    maximize.classList.add("circle-button");
    maximize.innerHTML = "<span>🗖</span>";
    
    header.appendChild(close);
    header.appendChild(minimize);
    header.appendChild(maximize);
    
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = this.title;
    header.appendChild(title);
    
    win.appendChild(header);
    
		const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    if(typeof(this.content) === "string" || typeof(this.content) === "number") {
      contentContainer.innerHTML = this.content;
    }else if(this.content == undefined){
    }else{
      contentContainer.appendChild(this.content);
    }
    
    win.appendChild(contentContainer);


    const tLine = document.createElement("div");
    tLine.classList.add("line", "t-line");
    win.appendChild(tLine);

    const rLine = document.createElement("div");
    rLine.classList.add("line", "r-line");
    win.appendChild(rLine);

    const bLine = document.createElement("div");
    bLine.classList.add("line", "b-line");
    win.appendChild(bLine);

    const lLine = document.createElement("div");
    lLine.classList.add("line", "l-line");
    win.appendChild(lLine);


    const nw = document.createElement("div");
    nw.classList.add("corner", "nw", "line");
    win.appendChild(nw);

    const ne = document.createElement("div");
    ne.classList.add("corner", "ne", "line");
    win.appendChild(ne);

    const sw = document.createElement("div");
    sw.classList.add("corner", "sw", "line");
    win.appendChild(sw);

    const se = document.createElement("div");
    se.classList.add("corner", "se", "line");
    win.appendChild(se);
    
    document.body.appendChild(win);
    initMoveEvents();
  }
}

function settings() {
  const setDiv = document.createElement("div");
  setDiv.classList.add("settCont");

  const walpCont = document.createElement("div");
  walpCont.classList.add("walp-cont");

  const walpPrev1 = document.createElement("img");
  walpPrev1.classList.add("walp-prev");
  walpPrev1.src="img/wallpaper1.jpg";
  walpCont.appendChild(walpPrev1);

  const walpPrev2 = document.createElement("img");
  walpPrev2.classList.add("walp-prev");
  walpPrev2.src="img/wallpaper2.jpg";
  walpCont.appendChild(walpPrev2);

  const walpPrev3 = document.createElement("img");
  walpPrev3.classList.add("walp-prev");
  walpPrev3.src="img/wallpaper3.jpeg";
  walpCont.appendChild(walpPrev3);

  setDiv.appendChild(walpCont);

  const drkcont = document.createElement("div");
  drkcont.classList.add("drkcont")

  const darkthp = document.createElement("p");
  darkthp.classList.add("drkp");
  darkthp.textContent = "Dark mode: ";

  const togl = document.createElement("input");
  togl.classList.add("toggle")

  togl.type="range";
  togl.min=0;
  togl.max=1;
  togl.value=DARKMODE;
  togl.dataset.value=DARKMODE;
  togl.step=1;
  togl.oninput= ((event)=>{
    event.target.dataset.value = event.target.value;
  });

  togl.onchange = ( (ev)=> {themeChange(ev)});

  drkcont.appendChild(darkthp);
  drkcont.appendChild(togl);

  setDiv.appendChild(drkcont);
  return setDiv;


}

const terminal = new cWindow("terminal", 500, 500, 250,250, 1);
terminal.createWindow();
let term = new cWindow("terminal", 600, 600, 350,350, 2);
term.createWindow();


function initMoveEvents() {
  let headers = document.getElementsByClassName("header");
  Array.prototype.forEach.call(headers, (el)=> {
    el.onmousedown = ((event)=>{
      if(event.target.parentElement.classList[0] === "header") {
        let mouseStartPos = {"x" : event.pageX, "y" : event.pageY};
        let isDown = true;
        
        // Array.prototype.forEach.call(headers, (el)=> {
        //   el.parentElement.classList.add("inactive");
        // });

        let wind = event.target.parentElement.parentElement;
        //wind.classList.remove("inactive");

        console.log(wind.style.left);

        let winLeft = wind.style.left;
        let winTop = wind.style.top;

        window.onmouseup = (()=>{
          isDown = false;
        })

        window.onmousemove = ((event)=>{
          if(isDown) {
            wind.style.left = `${event.pageX - mouseStartPos["x"] + parseInt(winLeft)}px`;
            wind.style.top = `${event.pageY - mouseStartPos["y"] + parseInt(winTop)}px`;
          }
        });
      }
    });
  });
  let lines = document.getElementsByClassName("line");
  Array.prototype.forEach.call(lines, (el)=>{
    el.onmousedown = ((event)=>{
      let wind = el.parentElement;
      let isDown = true;

      let mouseStartPos = {"x": event.pageX, "y": event.pageY};
      let winTop = wind.style.top;
      let winLeft = wind.style.left;
      let winWidth = wind.style.width;
      let winHeight = wind.style.height;
      let winMinWidth = wind.style.minWidth;
      let winMinHeight = wind.style.minHeight;

      window.onmouseup = () => {
        isDown = false;
      }

      window.onmousemove = ((event)=>{
        if(isDown){
          if(Object.values(el.classList).includes("t-line")) {
            if(mouseStartPos["y"] - event.pageY + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${mouseStartPos["y"] - event.pageY + parseInt(winHeight)}px`;
              wind.style.top = `${event.pageY - mouseStartPos["y"] + parseInt(winTop)}px`;
            }
          }else if(Object.values(el.classList).includes("r-line")) {
            if(event.pageX - mouseStartPos["x"] + parseInt(winWidth) > parseInt(winMinWidth)) {
              wind.style.width = `${event.pageX - mouseStartPos["x"] + parseInt(winWidth)}px`;
            }
          }else if(Object.values(el.classList).includes("b-line")) {
            if(event.pageY - mouseStartPos["y"] + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${event.pageY - mouseStartPos["y"] + parseInt(winHeight)}px`;
            }
          }else if(Object.values(el.classList).includes("l-line")) {
            if(mouseStartPos["x"] - event.pageX + parseInt(winWidth) > parseInt(winMinWidth)) {
              wind.style.width = `${mouseStartPos["x"] - event.pageX + parseInt(winWidth)}px`;
              wind.style.left = `${event.pageX - mouseStartPos["x"] + parseInt(winLeft)}px`;
            }
          }else if(Object.values(el.classList).includes("nw")) {
            if(mouseStartPos["y"] - event.pageY + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${mouseStartPos["y"] - event.pageY + parseInt(winHeight)}px`;
              wind.style.top = `${event.pageY - mouseStartPos["y"] + parseInt(winTop)}px`;
            }
            if(mouseStartPos["x"] - event.pageX + parseInt(winWidth) > parseInt(winMinHeight)) {
              wind.style.width = `${mouseStartPos["x"] - event.pageX + parseInt(winWidth)}px`;
              wind.style.left = `${event.pageX - mouseStartPos["x"] + parseInt(winLeft)}px`;
            }
          }else if(Object.values(el.classList).includes("ne")) {
            if(mouseStartPos["y"] - event.pageY + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${mouseStartPos["y"] - event.pageY + parseInt(winHeight)}px`;
              wind.style.top = `${event.pageY - mouseStartPos["y"] + parseInt(winTop)}px`;
            }

            if(event.pageX - mouseStartPos["x"] + parseInt(winWidth) > parseInt(winMinWidth)) {
              wind.style.width = `${event.pageX - mouseStartPos["x"] + parseInt(winWidth)}px`;
            }
          }else if(Object.values(el.classList).includes("sw")) {
            if(event.pageY - mouseStartPos["y"] + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${event.pageY - mouseStartPos["y"] + parseInt(winHeight)}px`;

            }

            if(mouseStartPos["x"] - event.pageX + parseInt(winWidth) > parseInt(winMinWidth)) {
              wind.style.width = `${mouseStartPos["x"] - event.pageX + parseInt(winWidth)}px`;
              wind.style.left = `${event.pageX - mouseStartPos["x"] + parseInt(winLeft)}px`;
            }
          }else if(Object.values(el.classList).includes("se")) {
            if(event.pageY - mouseStartPos["y"] + parseInt(winHeight) > parseInt(winMinHeight)) {
              wind.style.height = `${event.pageY - mouseStartPos["y"] + parseInt(winHeight)}px`;
              
            }
            if(event.pageX - mouseStartPos["x"] + parseInt(winWidth) > parseInt(winMinWidth)) {
              wind.style.width = `${event.pageX - mouseStartPos["x"] + parseInt(winWidth)}px`;
            }
          }
        }
      })
      

    });
  });



  let windows = document.getElementsByClassName("window");
  Array.prototype.forEach.call(windows, (el)=> {
    el.onmousedown = ((event)=>{
      Array.prototype.forEach.call(windows, (elem)=>{
        elem.classList.add("inactive");
      });

      el.classList.remove("inactive");
    });
  })

  let closeButtons = document.getElementsByClassName("close");
  Array.prototype.forEach.call(closeButtons, (el)=>{
    el.onclick = ((event)=>{
      Array.prototype.forEach.call(windows, (w)=>{
        if(w.contains(event.target)) {
          w.remove();
        }
      });

    });
  });

  let minimizeButtons = document.getElementsByClassName("minimize");
  Array.prototype.forEach.call(minimizeButtons, (el)=>{
    el.onclick = ((event)=>{
      Array.prototype.forEach.call(windows, (w)=>{
        if(w.contains(event.target)) {
          if(Object.values(w.classList).includes("minimized")) {
            w.classList.remove("minimized");
          }else {
            w.classList.add("minimized");
          }
        }
      });

    });
  });

  let maximizeButtons = document.getElementsByClassName("maximize");
  Array.prototype.forEach.call(maximizeButtons, (el)=>{
    el.onclick = ((event)=>{
      Array.prototype.forEach.call(windows, (w)=>{
        if(w.contains(event.target)) {
          if(Object.values(w.classList).includes("maximized")) {
            w.classList.remove("maximized");
          }else {
            w.classList.add("maximized");
          }
        }
      });

    });
  });
}

function wlp() {
  let walpPrevs = document.getElementsByClassName("walp-prev");
    const bg = document.getElementById("bg");
    Array.prototype.forEach.call(walpPrevs, (wp)=>{
      wp.onclick = ((event)=>{
        bg.style.backgroundImage = `url(${event.target.src})`;

      });
    });
}



function themeChange(event) {
  if(DARKMODE == 0) {
    DARKMODE = 1;
    const themecss = document.createElement("link");
    themecss.rel="newer stylesheet";
    themecss.href = "dark-style.css";
    themecss.id="dark-theme-css";
    document.querySelector("head").appendChild(themecss);
    console.log(DARKMODE);
  }else {
    DARKMODE = 0;
    document.getElementById("dark-theme-css").remove();
    console.log(DARKMODE);
  }
}

const icons = document.getElementsByClassName("icon");

Array.prototype.forEach.call(icons, (el) => {
  el.onclick = ((event)=>{
    if(event.target.id == "terminal") {
      new cWindow("Terminal", 600,500, 400,400, "soon!").createWindow();
    }else if(event.target.id == "settings") {
      new cWindow("Settings", 600,500, 400,400, settings()).createWindow();
      wlp();
    }else if(event.target.id == "safari") {
      new cWindow("Safari", 600,500, 400,400, `<iframe src="https://www.youtube.com/embed/hvL1339luv0?autoplay=1" width="100%" height="100%" allow="autoplay"></iframe>`).createWindow();
    }else if(event.target.id == "showAll") {
      const windows = document.getElementsByClassName("window");
      Array.prototype.forEach.call(windows, (wind)=>{
        if(Object.values(wind.classList).includes("minimized")) {
          wind.classList.remove("minimized");
        }
      });
    }
  })
});