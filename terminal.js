const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis ante non sem aliquam faucibus. Vivamus consequat orci eros, at placerat est ultricies sit amet. Curabitur iaculis, mauris quis dapibus lobortis, urna nulla ultrices dui, sed facilisis lorem massa ac nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec risus fermentum, gravida dui quis, consequat ex. Praesent convallis, sapien quis imperdiet posuere, tortor felis facilisis sapien, ut venenatis felis nulla id tellus. Nunc tristique sagittis iaculis. Aliquam risus felis, tempor nec hendrerit vel, sagittis eu felis.";

let scurString = "";

document.onkeypress = function (e) {
  e = e || window.event;
  const terminal = document.querySelector('.window:not(.inactive)').querySelector('.content').querySelector('.wTerminal');
  let curString = terminal.dataset.text;
  console.log(curString);
  if(e.key == "Enter") {
  	terminal.getElementsByClassName("current")[0].classList.remove("current");
    
    
  	if(curString == "lorem") {
    	let loremP = document.createElement("p");
   	 	let textNode = document.createTextNode(lorem);
      loremP.appendChild(textNode);
      terminal.appendChild(loremP);
    }else if(curString == "alert") {
      alert("!!!!!ALERT ALERT ALERT!!!!!")
    }else if(curString == "hello") {
    	let helloP = document.createElement("p");
   	 	let textNode = document.createTextNode("Hello, World!");
      helloP.appendChild(textNode);
      terminal.appendChild(helloP);
      
    }else if(curString == "clear") {
      terminal.innerHTML = "";
      
    }else {
    	let undP = document.createElement("p");
   	 	let textNode = document.createTextNode(`Command ${curString} not found.`);
      undP.appendChild(textNode);
      terminal.appendChild(undP);
      
    }
    

		let newP = document.createElement("p");
    let newSpan = document.createElement("span");
    newSpan.classList.add("user-input");
    
    newP.classList.add("current");
    newP.classList.add("username");
    newP.textContent = "user@browser ~ % ";
    terminal.appendChild(newP);
    terminal.getElementsByClassName("current")[0].appendChild(newSpan);
    curString = terminal.dataset.text = "";
    terminal.scrollTo(0, terminal.scrollHeight);
  }else {
  	curString = terminal.dataset.text += e.key;
    let inp = terminal.getElementsByClassName("user-input");
    inp[inp.length-1].textContent += e.key;
    terminal.scrollTo(0, terminal.scrollHeight);
  }
};

document.addEventListener('keydown', ({key}) => {
    if (key === "Backspace" || key === "Delete") {
      const terminal = document.querySelector('.window:not(.inactive)').querySelector('.content').querySelector('.wTerminal')
    	let tempArr = terminal.getElementsByClassName("user-input");
      let curString = terminal.dataset.text;
      let temp = tempArr[tempArr.length-1];
      if(temp.textContent.length > -1) {
      	temp.textContent = temp.textContent.slice(0,temp.textContent.length-1);
        curString = terminal.dataset.text = curString.slice(0, curString.length-1);
      }
    }
});