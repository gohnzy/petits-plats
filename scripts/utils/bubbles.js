export function addBubble(value) {
    const bubbles = document.querySelector(".selectedFiltersBubbles");

    const selectedFilterBubble = document.createElement("p");
    selectedFilterBubble.classList.add("oneFilter");
  
    selectedFilterBubble.innerText = value;
    clearBubble(selectedFilterBubble);
    bubbles.appendChild(selectedFilterBubble)
  }
  
export function clearBubble(target) {
    target.addEventListener("click", (event) => {
      event.target.remove();
    })
  }