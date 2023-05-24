let stage, canvas, context, sphere, width, height, scene, camera, renderer, element, controls,
    images = [], imglen, arrows = [],　fixedposi = [], cur, mwidth, mheight, floor, hrate,
    callbackdraw, callbackrender, mypro, prospa, stsvg, minibutton, mapz = 0.6, mapas = 0.65,
    target_meta, view_cnt = 0, spot = -1, mode = 1*(-1), high, modep_cnt = [0,0], rotate_flag = true,
    pre_elem, user_ios;

//座標

const posi = [
    [57.8,21.6,1,2], //0
    [66.9,21.6,1,2],
    [77.5,21.6,1,1],
    [77.5,31.7,1,1],
    [66.9,31.7,1,1],
    [57.8,31.7,1,1], //5
    [42.3,31.7,1,1],
    [24.2,31.7,1,1],
    [7.4 ,31.7,1,1],
    [7.4 ,48.6,1,1],
    [7.4 ,74.1,1,1], //10
    [7.4 ,88.4,1,1],
    [24.4,88.4,1,1],
    [42.3,88.4,1,1],
    [67.0,88.4,1,1],
    [77.5,88.4,1,1], //15
    [77.5,74.0,1,1],
    [77.5,48.6,1,1],
    [42.3,48.6,1,1],
    [42.3,74.1,1,1],
// ↑__ ここまで東校舎2F
    [77.5,21.6,0,1], //20
    [66.9,21.6,0,1],
    [57.8,21.6,0,1],
    [57.8,31.7,0,1],
    [66.9,31.7,0,1],
    [66.9,26.5,0,1], //25
    [77.5,31.7,0,1],
    [42.3,31.7,0,1],
    [24.2,31.7,0,1],
    [7.4 ,31.7,0,1],
    [7.4 ,48.6,0,1], //30
    [7.4 ,74.1,0,1],
    [7.4 ,88.3,0,1],
    [24.2,88.3,0,1],
    [42.3,88.3,0,1],
    [42.3,74.1,0,1], //35
    [42.3,48.9,0,1],
    [61.7,88.3,0,1],
    [77.5,88.3,0,1],
// ↑__ ここまで東校舎1F
    [74.0,123.6,0,1],
    [68.0,123.6,0,1], //40
    [68.0,138.2,0,1],
    [87.4,138.2,0,1],
    [87.4,152.9,0,1],
    [87.4,164.9,0,1],
    [82.6,171.8,0,1], //45
    [82.6,186.5,0,1],
    [61.3,171.8,0,1],
    [42.9,171.8,0,1],
    [47.6,138.2,0,1],
    [32.3,138.2,0,1], //50
    [32.3,118.7,0,1],
    [12.6,138.2,0,1],
    [12.6,145.0,0,1],
    [12.6,160.6,0,1],
    [12.6,143.6,1,1], //55
    [12.6,151.1,1,1],
    [12.6,160.1,1,1],
    [77.1,152.9,0,1],
    [41.2,186.5,0,1],
    [50.2,125.0,1,1], //60
    [82.2 ,96.8,1,1],  //bridge
    [82.5,101.7,0,1], //bridge
    [68.0,118.1,0,1],
    [61.3,186.5,0,1],
    [37.7,125.0,1,1], //65
// ↑__ ここまで西校舎
    [88.1 ,21.6,-1,-1], //0
    [46.7 ,34.7,-1,-1],
    [11.8 ,34.7,-1,-1],
    [10.6 ,91.4,-1,-1],
    [45.5 ,91.4,-1,-1],     //70
    [80.7 ,91.4,-1,-1], //5
    [72.4,118.1,-1,-1],
    [27.1,114.2,-1,-1],
    [6.6 ,147.2,-1,-1],
    [150 ,115.5,-1,-1]
// ↑__ ここまで踊り場
];

const dummy = 10;
const num = posi.length-dummy;
let double = 0;

//二点間の線記入

const connect = [
    [0 ,1    ],
    [1 ,2    ],
    [2 ,num  ],
    [2 ,3    ],
    [3 ,4    ],
    [4 ,5    ],
    [5 ,0    ],
    [5 ,6    ],
    [6 ,num+1],
    [6 ,7    ],
    [7 ,8    ],
    [8 ,num+2],
    [8 ,9    ],
    [9 ,10   ],
    [10,11   ],
    [11,num+3],
    [11,12   ],
    [12,13   ],
    [13,num+4],
    [13,19   ],
    [19,18   ],
    [6 ,18   ],
    [13,14   ],
    [14,61   ],
    [14,15   ],
    [15,num+5],
    [15,16   ],
    [16,17   ],
    [3 ,17   ],
    [20,num  ],
    [20,21   ],
    [21,22   ],
    [22,23   ],
    [23,24   ],
    [24,26   ],
    [26,20   ],
    [20,25   ],
    [21,25   ],
    [22,25   ],
    [23,25   ],
    [24,25   ],
    [26,25   ],
    [23,27   ],
    [27,num+1],
    [27,28   ],
    [28,29   ],
    [29,30   ],
    [29,num+2],
    [30,31   ],
    [31,32   ],
    [32,num+3],
    [32,33   ],
    [33,34   ],
    [34,num+4],
    [34,35   ],
    [35,36   ],
    [36,27   ],
    [34,37   ],
    [37,38   ],
    [38,num+5],
    [39,40   ],
    [39,num+9],
    [40,63   ],
    [63,num+6],
    [60,num+6],
    [60,65   ],
    [40,41   ],
    [41,42   ],
    [41,58   ],
    [42,43   ],
    [43,44   ],
    [44,45   ],
    [45,46   ],
    [45,47   ],
    [47,48   ],
    [47,64   ],
    [46,64   ],
    [48,59   ],
    [41,49   ],
    [49,50   ],
    [50,51   ],
    [51,num+7],
    [65,num+7],
    [50,52   ],
    [52,53   ],
    [53,54   ],
    [53,num+8],
    [56,num+8],
    [56,55   ],
    [56,57   ],
    [61,62   ],
    [62,num+9],
    [64,59   ],
];

//頂点ごとに整理

let map = new Array(posi.length);
for (let i = 0; i < posi.length; ++i) map[i] = new Array();
connect.forEach((val) => {
    map[val[0]].push(val[1]);
    map[val[1]].push(val[0]);
});

//階で整理

let layer = [ 
    [ [],[]    ],
    [ [],[],[] ]
];

for(let i=0; i<posi.length; ++i){
    let j = 0;
    if(posi[i][2] == -1) continue;
    if(posi[i][1] > 100) j++;
    layer[j][posi[i][2]].push([ posi[i][0],posi[i][1],i ]);
    if(posi[i][3] != 1) double++;
}

//streetview開始

const query = location.search;
const val = location.search.split("=");

window.onload = () => {
    const src = decodeURIComponent(val[1]);

    if(!(0 <= src && src < num)){
        document.body.insertAdjacentHTML("afterbegin", "<p>Error: number out of range</p>");
        return;
    }

    document.getElementById("container").insertAdjacentHTML("afterbegin","<div id='stage'></div>");
    stage = document.getElementById("stage");

    const bgi_num = Math.floor(Math.random()*num);
    stage.style.backgroundImage = `url(images/image${bgi_num}-${Math.floor(Math.random()*posi[bgi_num][3])}.JPG)`;

    //画像読み込み
    const srcs = ["images/Koyo-East-text-1.png","images/Koyo-East-text-2.png","images/Koyo-West-text-1.png","images/Koyo-West-text-2.png","images/blue_arrow.png"];
    imglen = srcs.length;

    let cnt = 0;

    if(images.length != num+1+imglen){ //数注意!!

    //画像を読みこむときの処理

        document.getElementById("container").insertAdjacentHTML("afterbegin", `
            <progress id="mypro" value="0" max="100">0%</progress>
            <span id="now_loading">
                Now&nbsp;Loading...<span id="prospa" style="margin-left: 7%;">0%</span>
            </span>
        `);

        mypro = document.getElementById("mypro"); prospa = document.getElementById("prospa");

      (async () => {
        let provec = [];
        function threeload(url,number,mode){
            return new Promise((resolve)=>{
                const loader = new THREE.TextureLoader().load(url,(tex)=>{
                    if(mode != -1){
                        if(mode == 0) images[number] = [];
                        images[number][mode] = tex;
                    } else images[number] = tex;

                    cnt++;
                    mypro.value = Math.floor(cnt/(num+double+1+imglen)*100);
                    prospa.innerText = Math.floor(cnt/(num+double+1+imglen)*100) + "%";
                    resolve();
                });
            });
        }

        function imgload(number){
            return new Promise((resolve)=>{
                let img = new Image();
                img.src = srcs[number];
                img.addEventListener("load", ()=>{
                    images[num+1+number] = img;
                    cnt++;
                    mypro.value = Math.floor(cnt/(num+double+1+imglen)*100);
                    prospa.innerText = Math.floor(cnt/(num+double+1+imglen)*100) + "%";
                    resolve();
                });
            });
        }

        async function wait(){
            await Promise.all(provec);
            provec = [];
        } 

        for(let i = 0; i < num; i++){
            for(let j = 0; j < posi[i][3]; j++){
                provec.push(threeload(`images/image${i}-${j}.JPG`,i,j));
                /* if((i+1) % 5 == 0 || i+1 == num) */ 
                await wait();
            }
        }

        for (let i = 0; i < imglen; i++){
            provec.push(imgload(i));
            /* if((i+1) % 5 == 0 || i+1 == num) */ 
            await wait();
        }

        provec.push(threeload("images/arrow.png",num,-1));
        await wait();

    //読み込み終了時の処理
        mypro.remove(); prospa.parentNode.remove();

        init();
      })();
    } else init();

    //初期化

    function init() {
        width = stage.clientWidth;
        height = stage.clientHeight;
        scene = new THREE.Scene();

        // カメラの作成(視野角,アスペクト比,区間の開始距離,区間の終了距離)
        camera = new THREE.PerspectiveCamera(75, width / height, 0.5,9);
        camera.position.set(0.1, 0, 0);
        scene.add(camera);

        //球の作成
        const geometry = new THREE.SphereGeometry(8, 64, 64);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({map: images[src][(mode+1)*(posi[src][3]-1)/2]});

        sphere = new THREE.Mesh(geometry, material);
        sphere.name = undefined;
        scene.add(sphere);
        cur = src; 
        floor = posi[cur][2];

        //矢印の作成
        generateArrows(src);

        // レンダラーの作成
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor({color: 0x000000});
        element = renderer.domElement;
        element.style.width = "100%";
        element.style.height = "100%";

        setOrbitControls();
        stage.appendChild(element);
        render();

        document.getElementById("container").insertAdjacentHTML("afterbegin",`
            <div id='menubar'>
                <div id='delb' onclick='del()'>
                    <div id='delbC'/></div>
                </div>

                <div id='menub' onclick='spotSerect()'>
                    <div class='menubS'></div>
                    <div class='menubS'></div>
                    <div class='menubS'></div>
                </div>

                <img src="images/hide.png" id='changeb' onclick='better_view()'></img>

                <img src="images/change.png" id="mode" onclick="change_mode()"></img>
            </div>

            <div id='spotviewer'>
                <div class="content" style="background-image: url(images/link01.png); margin-left: 1%;" onclick="move(62), spotSerect()"><div class="cnts">オーバーブリッジ</div></div>
                <div class="content" style="background-image: url(images/link02.png)" onclick="move(25), spotSerect()"><div class="cnts">光庭</div></div>
                <div class="content" style="background-image: url(images/link03.png)" onclick="move(58), spotSerect()"><div class="cnts">食堂</div></div>
                <div class="content" style="background-image: url(images/link04.png)" onclick="move(65), spotSerect()"><div class="cnts">体育館</div></div>
                <div class="content" style="background-image: url(images/link05.png)" onclick="move(64), spotSerect()"><div class="cnts">講堂</div></div>
            </div>

            <canvas id='minimap'></canvas>
            <div class="modep"></div>
        `);

        //minimapのcanvas
        canvas = document.getElementById("minimap");
        context = canvas.getContext('2d');

        mini_button(src);
        handleResize();
        draw();
        change_mode();
        rotate_flag = false;

        user_ios =  /[ \(]iP/.test(navigator.userAgent);

        let check = false;
        element.addEventListener("touchstart", (e) => {
            check = true;
            const x = e.changedTouches[0].pageX - stage.offsetLeft;
            const y = e.changedTouches[0].pageY - stage.offsetTop;
            pre_click(x,y);
        }, false);

        element.addEventListener("touchend", (e) => {
            const x = e.changedTouches[0].pageX - stage.offsetLeft;
            const y = e.changedTouches[0].pageY - stage.offsetTop;
            click(x,y);
        }, false);

        element.addEventListener("mousedown", (e) => {
            if (!check){
                const x = e.clientX - stage.offsetLeft;
                const y = e.clientY - stage.offsetTop;
                pre_click(x,y);
            }
        }, false);

        element.addEventListener("mouseup", (e) => {
            if (!check){
                const x = e.clientX - stage.offsetLeft;
                const y = e.clientY - stage.offsetTop;
                click(x,y);
            } else check = false;
        }, false);

        window.addEventListener("resize", handleResize, false);
    }
};

//クリック

function pre_click(x,y){
    const mouse = new THREE.Vector2();
    mouse.x = (x / width) * 2 - 1;
    mouse.y = -(y / height) * 2 + 1;

    const ray = new THREE.Raycaster;
    ray.setFromCamera(mouse, camera);
    const bump = ray.intersectObjects(scene.children);
    pre_elem = bump[0].object.name;
}

function click(x,y) {
    const mouse = new THREE.Vector2();
    mouse.x = (x / width) * 2 - 1;
    mouse.y = -(y / height) * 2 + 1;

    const ray = new THREE.Raycaster;
    ray.setFromCamera(mouse, camera);
    const bump = ray.intersectObjects(scene.children);
    if (bump[0].object.name != undefined && bump[0].object.name == pre_elem) {
        let clickobj = bump[0].object.name;

        //踊り場処理
        if(posi[Number(clickobj)][2] == -1){
            if(map[clickobj][0] != cur) clickobj = map[clickobj][0];
            else clickobj = map[clickobj][1];

            const theta = bump[0].object.rotation.y / Math.PI;
            if((0.25 <= theta && theta <= 0.75)||(1.25 <= theta && theta <= 1.75)) camera.position.x *= -1;
            else camera.position.z *= -1;
        }

        move(clickobj);
    }
}

//移動

function move(to){
    //画面変更・位置更新
    sphere.material.map = images[to][(mode+1)*(posi[to][3]-1)/2];
    sphere.material.needsUpdate = true;
    cur = to;
    floor = posi[to][2];

    //矢印・minimap更新
    arrows.forEach((val) => {scene.remove(val);});
    generateArrows(to);
    cancelAnimationFrame(callbackdraw);
    draw();
    mini_button(to);
}

//minimap描画
//地図は1500*1000

function draw (){
    callbackdraw = requestAnimationFrame(draw);

    let ratex = posi[cur][1]*0.01, ratey = posi[cur][0]*0.01;
    let mapimg = images[num+1+floor+Math.floor(ratex)*2];

    ratex = Math.floor(ratex)+1 - ratex;

    context.fillStyle = `rgb(245,245,245)`;
    context.fillRect(0,0,mwidth,mheight);

    //1500*1000のうち(1000*mapz)*(1000*mapz)の枠の中で描画
    let wpix = 1000*mapz, hpix = 1000*mapz*mapas;
    let sx = Math.max(1500*ratex-wpix*0.5,0), sy = Math.max(1000*ratey-hpix*0.5,0);
    let sw = Math.min(1500*ratex-wpix*0.5,0)+1000*mapz, sh = (Math.min(1000*ratey-hpix*0.5,0)+1000*mapz)*mapas;
        sw -= Math.max(sx+sw-1500,0); sh -= Math.max(sy+sh-1000,0);
    let dx = Math.max(-(1500*ratex-wpix*0.5)*mwidth/wpix,0), dy = Math.max(-(1000*ratey-hpix*0.5)*mheight/hpix,0);
    let dw = sw*mwidth/wpix, dh = sh*mheight/hpix;

    context.drawImage(mapimg,sx,sy,sw,sh,dx,dy,dw,dh);
    const theta = posi_to_theta(camera.position.z, -camera.position.x);

    context.translate(mwidth*0.5,mheight*0.5); context.rotate(-theta);
    context.drawImage(images[num+imglen],0,0,128,128,-mwidth*0.17*mapas,-mheight*0.17,mwidth*0.34*mapas,mheight*0.34);
    context.rotate(theta); context.translate(-mwidth*0.5,-mheight*0.5);
}

//mininapの四角描画

function mini_button(at){
    if(minibutton != undefined) minibutton.remove();
    let w_e = Math.floor(posi[cur][1]/100);
    let x = 150-1.5*(posi[cur][1]-w_e*100), y = posi[cur][0];

    document.getElementById("container").insertAdjacentHTML("afterbegin",`<svg viewBox="0 0 ${100*mapz} ${100*mapz*mapas}" width="100%" height="100%" id="minibutton"></svg>`);
    minibutton = document.getElementById("minibutton");
    minibutton.style.width = `${height * hrate}px`; minibutton.style.height = `${height * hrate * mapas}px`;

    layer[w_e][floor].forEach((val) => {
        let x = 50*mapz + ((posi[cur][1]-w_e*100)-(val[1]-w_e*100))*1.5, y = 50*mapz*mapas + val[0]-posi[cur][0];
        //minibutton.insertAdjacentHTML("beforeend",`<circle id="mini${val[2]}" cx="${x}" cy="${y}" r="1.6" fill="rgb(${68},${170},${196})" onclick="move(${val[2]})"/>`);
        minibutton.insertAdjacentHTML("beforeend",`<rect id="mini${val[2]}" x="${x-1.6}" y="${y-1.6}" width="3.2" height="3.2"
         fill="rgb(192,226,247)" onclick="move(${val[2]})"/>`);
    });
    document.getElementById(`mini${at}`).remove();
}

//逆三角関数
function posi_to_theta(x,z){
    let rotate;
    x *= -1; z *= -1;
    if (z == 0) {
        if (x >= 0) rotate = Math.PI / 2;
        else rotate = Math.PI * 3 / 2;
    } else {
        rotate = Math.atan(x/z);
        if (rotate * x < 0 || (rotate == 0 && z < 0)) rotate += Math.PI;
        else rotate += Math.PI * 2;
    }
    return rotate;
}

//矢印生成

function generateArrows(src) {
    const geo = new THREE.BoxGeometry(0.5, 0, 0.5);
    const mate = new THREE.MeshBasicMaterial({ map: images[num], transparent: true });

    arrows = []; fixedposi = [];
    for (let i = 0; i < map[src].length; ++i) {
        let arrow = new THREE.Mesh(geo, mate);

        arrow.name = map[src][i];
        arrows.push(arrow);

        let xmove = posi[map[src][i]][0] - posi[src][0],
            zmove = posi[map[src][i]][1] - posi[src][1];

        //半径
        let r = 0.75;
        fixedposi.push([xmove * Math.sqrt(r*r / (xmove * xmove + zmove * zmove)), zmove * Math.sqrt(r*r / (xmove * xmove + zmove * zmove))]);

        arrow.rotation.y = posi_to_theta(xmove,zmove);

        scene.add(arrow);
    }
}

//UI非表示
function better_view(){

    let check = false, b, bv;
    function hide_show(){
        if(width >= height) high = 30;
        else high = 20;
        if(view_cnt == 1){
            minimap.style.display = "none";
            minibutton.style.display = "none";
            arrows.forEach((val) => {scene.remove(val);});
            document.getElementById("menubar").style.top = "calc(-13vmin - 6px)";
            document.getElementById("spotviewer").style.top = `-${high}%`;
            document.getElementById("container").insertAdjacentHTML("afterbegin","<div id='showb' onclick='better_view()'><div id='showbv'></div></div>");
            b = document.getElementById("showb");
            bv = document.getElementById("showbv");
            setTimeout(hide_bar,20);

            element.addEventListener("touchstart", show_bar, {passive: true});
            element.addEventListener("touchend", hide_bar, {passive: true});
            element.addEventListener("mousedown", show_bar, {passive: true});
            element.addEventListener("mouseup", hide_bar, {passive: true});

            view_cnt *= -1;
        } else {
            minimap.style.display = "block";
            minibutton.style.display = "block";
            arrows.forEach((val) => {scene.add(val);});
            document.getElementById("menubar").style.top = "4px";
            document.getElementById("showb").remove();

            if(document.fullscreenElement){
                if      (document.exitFullscreen)       document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
                else if (document.msExitFullscreen)     document.msExitFullscreen();
            }

            element.removeEventListener("touchstart", show_bar, {passive: true});
            element.removeEventListener("touchend", hide_bar, {passive: true});
            element.removeEventListener("mousedown", show_bar, {passive: true});
            element.removeEventListener("mouseup", hide_bar, {passive: true});

            view_cnt++;
        }
    }

    function show_bar(){
        b.style.transition = "all 0.1s cubic-bezier(0.55, 0.06, 0.68, 0.19)";
        bv.style.transition = "all 0.1s cubic-bezier(0.55, 0.06, 0.68, 0.19)";

        b.style.backgroundColor = "rgba(255, 255, 255, .6)";
        if(width >= height){
            bv.style.borderBottom = ".8vmin solid rgb(255, 255, 255, 0.9)";
            bv.style.borderRight = ".8vmin solid rgb(255, 255, 255, 0.9)";
        } else {
            bv.style.borderBottom = "1.3vw solid rgb(255, 255, 255, 0.9)";
            bv.style.borderRight = "1.3vw solid rgb(255, 255, 255, 0.9)";
        }
    }

    function hide_bar(){
        b.style.transition = "all 3s cubic-bezier(0.55, 0.06, 0.68, 0.19)";
        bv.style.transition = "all 3s cubic-bezier(0.55, 0.06, 0.68, 0.19)";

        b.style.backgroundColor = "rgba(255, 255, 255, .0)";
        if(width >= height){
            bv.style.borderBottom = ".8vmin solid rgb(255, 255, 255, .0)";
            bv.style.borderRight = ".8vmin solid rgb(255, 255, 255, .0)";
        } else {
            bv.style.borderBottom = "1.3vw solid rgb(255, 255, 255, .0)";
            bv.style.borderRight = "1.3vw solid rgb(255, 255, 255, .0)";
        }
    }

    if(view_cnt != 0) hide_show();
    else {
        view_cnt++;
        if(!user_ios){
            if     (document.fullscreenEnabled)         document.getElementById("container").requestFullscreen();
            else if(document.webkitFullscreenEnabled)   document.getElementById("container").webkitRequestFullscreen();
            else if(document.mozFullScreenEnabled)      document.getElementById("container").mozRequestFullScreen();
            else if(document.msFullscreenEnabled)       document.getElementById("container").msRequestFullscreen();
            else                                        hide_show();
        } else hide_show();
    }
}

// スポットセレクト
function spotSerect() {
    if(width >= height) high = 30;
    else high = 20;
    if(spot == -1){
        document.getElementById("spotviewer").style.top = "0";
        document.getElementById("menubar").style.top = `calc(${high}% + 4px)`;
        document.getElementById("menub").style.transform ="rotate(-135deg)"
    } else {
        document.getElementById("spotviewer").style.top = `-${high}%`;
        document.getElementById("menubar").style.top = "4px";
        document.getElementById("menub").style.transform ="rotate(0deg)"
    }
    spot *= -1;
}

//モード切り替え

async function change_mode() {
    mode *= -1;

    const rotate_img = document.getElementById("mode");
    const el = document.querySelector('.modep');
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //テキスト
    if(mode === -1) el.innerHTML = "通常モード";
    else el.innerHTML = "音展モード"
    sphere.material.map = images[cur][(mode+1)*(posi[cur][3]-1)/2];
    sphere.material.needsUpdate = true;

    //画像を回す
    (async ()=>{
        if(!rotate_flag){
            rotate_flag = true;
            rotate_img.style.transition = "all .5s";
            rotate_img.style.transform = `rotate(-180deg)`;

            await wait(500);

            rotate_img.style.transition = "all .0s"
            rotate_img.style.transform = `rotate(0deg)`;
            rotate_flag = false;
        } else  return;
    })();

    //黒四角の表示
    if(modep_cnt[0] == 0) el.style.display = "";
    modep_cnt[0]++; modep_cnt[1]++;

        await wait(100); //クリックから表示まで

    el.classList.add('show');

        await wait(1500); //表示中

    if(modep_cnt[1] == 1) el.classList.remove('show');
    modep_cnt[1]--;

        await wait(1000); //消えかけ

    if(modep_cnt[0] == 1) el.style.display = "none";
    modep_cnt[0]--;
}

// minimap

// サイズ調整

function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    //canvas更新

    if(width >= height){
        hrate = 0.31;
        high = 30;
        if(mapz != 0.9){
            mapz = 0.9;
            if(view_cnt != -1) mini_button(cur);
        }
    } else {
        hrate = 0.21;
        high = 20;
        if(mapz != 0.6){
            mapz = 0.6; 
            if(view_cnt != -1) mini_button(cur);
        }
    }

    canvas.width = `${height * hrate}`; canvas.height = `${canvas.width * mapas}`;
    mwidth = canvas.width; mheight = canvas.height;

    minibutton.style.width = `${height * hrate}px`; minibutton.style.height = `${height * hrate * mapas}px`;

    document.getElementById("spotviewer").style.height = `${high}%`;
    if(view_cnt == -1){
        document.getElementById("menubar").style.top = `-${high}%`;
        document.getElementById("spotviewer").style.top = `-${high}%`; 
    } else {
        document.getElementById("menubar").style.top = `calc(${(spot+1)*high*0.5}% + 4px)`;
        document.getElementById("spotviewer").style.top = `${(spot-1)*high*0.5}%`;
    }

    //レンダラーサイズ変更
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    //カメラアスペクト比変更
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// マウスの視点操作

function setOrbitControls() {
    controls = new THREE.OrbitControls(camera, element);
    controls.target.set(0, 0, 0);
    //各種設定
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    //ダンピング係数
    controls.dampingFactor = 0.15;
    // 視点の速さ
    controls.rotateSpeed = -0.06;
}

//描画

function render() {
    callbackrender = requestAnimationFrame(render);

    renderer.render(scene, camera);
    controls.update();
    let x = camera.position.x, z = camera.position.z;
    x *= -1; z *= -1;
    //矢印の移動
    for (let i = 0; i < arrows.length; ++i) arrows[i].position.set(15*x+fixedposi[i][0], -1.3-i*0.001, 15*z+fixedposi[i][1]);
}

//削除

function del() {
    cancelAnimationFrame(callbackdraw);
    cancelAnimationFrame(callbackrender);
    arrows = [];
    stage.remove(); canvas.remove(); minibutton.remove();
    document.getElementById("delb").remove();
    document.getElementById("menub").remove();
    document.getElementById("menubar").remove();
    document.getElementById("spotviewer").remove();
    history.back();
}