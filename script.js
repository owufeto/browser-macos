class cWindow {
	constructor(title, width, height, minWidth, minHeight) {
  	this.title = title;
    this.width = width;
    this.height = height;
    this.minHeight = minHeight;
    this.minWidth = minWidth;
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
    
		const content = document.createElement("div");
    content.classList.add("content");
    
    win.appendChild(content);


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

const terminal = new cWindow("terminal", 500, 500, 250,250);
terminal.createWindow();
let term = new cWindow("terminal", 600, 600, 350,350);
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
}