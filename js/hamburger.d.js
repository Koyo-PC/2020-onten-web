let opened = -1, timeout;
this.onload = ()=>{
    document.getElementById("btn").addEventListener("click", function() {
        opened *= -1;
        change();
    });

    window.addEventListener("resize", change, false);
};

function change(){
    if (opened == 1) {
        // 開く
        clearTimeout(timeout);
        document.getElementById("menu").style.display ="block";
        setTimeout(()=> {
            menu.style.clipPath = "circle(" + parseInt(Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) + 1) + "px at top calc(1vw + 6vmin + 5px) left calc(2vw + 6vmin + 5px))";
            btn.children[0].style.width = 8 * Math.sqrt(2) + "vmin";
            btn.children[0].style.height = "1.25vmin";
            btn.children[1].style.width = "0";
            btn.children[2].style.width = 8 * Math.sqrt(2) + "vmin";
            btn.children[2].style.height = "1.25vmin";
            btn.children[0].style.transform = "translate(-" + (4 * Math.sqrt(2) - 4) + "vmin, 3vmin) rotate(45deg)";
            btn.children[1].style.transform = "translate(calc(" + 4 * Math.sqrt(2) + "vmin - 20px), 0)";
            btn.children[2].style.transform = "translate(-" + (4 * Math.sqrt(2) - 4) + "vmin, -3vmin) rotate(-45deg)";
        }, 1)
    } else {
        // 閉じる
        menu.style.clipPath = "circle(0 at top calc(1vw + 6vmin + 5px) left calc(2vw + 6vmin + 5px))";
        btn.children[0].style.width = "8vmin";
        btn.children[1].style.width = "8vmin";
        btn.children[2].style.width = "8vmin";
        btn.children[0].style.height = "1vmin";
        btn.children[2].style.height = "1vmin";
        btn.children[0].style.transform = "";
        btn.children[1].style.transform = "";
        btn.children[2].style.transform = "";
        timeout = setTimeout(()=>{document.getElementById("menu").style.display = "none";},750);
    }
}