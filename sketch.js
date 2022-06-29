function setup() {
  createCanvas(window.innerWidth*2, window.innerHeight*2)
  
  //which node are you dragging from and which are you porting to
  dragging = -1, port = -1
  //are you dragging edge from node or the node itself 
  connecting = true
  n = 0
  for (i=0;i<n;++i)
    gNodes[i] = new Node(i*100+130,200+30)
  // gNodes[0].links=[4,2]
  // gNodes.push(new Node(window.innerWidth/2,window.innerHeight/2))
  // gNodes[1].links=[3]
}

function switchEditMode(){
  connecting = !connecting
}

function toggleDropDown(hide){
  let el=document.querySelector('.dropdown-menu')
  el.style.display=(el.style.display=="none" && !hide) && "block" || "none"
}
  
function mouseReleased(){
  if (port>-1 && dragging>-1)
    connectNodes(dragging,port)
  dragging = -1
  port = -1
  //get the dropdown button
  let el=document.querySelector("#toolbar .btn:first-child")
   //hide dropdown if clicked anywhere on canvas
  if (mouseY>el.offsetTop+el.offsetHeight || mouseX<el.offsetLeft ||
    mouseX>el.offsetLeft+el.offsetWidth)
    toggleDropDown(true)
}

function draw() {
  background(255)
  // start from top of the stack
  for (let i=gNodes.length-1;i>=0;--i)
  if (dist(mouseX, mouseY, gNodes[i].x, gNodes[i].y) < gNodes[i].r-10){
    //mouse is inside the circle
    if (mouseIsPressed && dragging==-1) 
      dragging= i
      
    if (mouseIsPressed && connecting && i!=dragging){
      port = i
      console.log('ported',dragging,port)

    }
    //solves the problems of nodes beneath nodes
    break;
  }else{
    if (port==i && dragging>-1)
      port=-1
  }
  
  if (dragging>=0 && !connecting){
      gNodes[dragging].x = mouseX;
      gNodes[dragging].y = mouseY;
    } 

  for(i in gNodes)
    for (let j=0;j<gNodes.length;++j)
      if (i!=j && gNodes[i].links.indexOf(j)!=-1)
      line(gNodes[i].x, gNodes[i].y, gNodes[j].x, gNodes[j].y)

  if (connecting && dragging>=0){
    fill(64, 256, 64)

    line(gNodes[dragging].x, gNodes[dragging].y, mouseX, mouseY)
  }

  for (i in gNodes){
    if (dragging==i)
      if (connecting)
        
       
          fill(235,25,25)
      else
        fill(64, 256, 64)
    else
      fill(128, 256, 128);
      if (port==i)
      fill(25,25,235) 
  circle(gNodes[i].x,gNodes[i].y,gNodes[i].r)
  }
}