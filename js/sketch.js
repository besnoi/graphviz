function setup() {
  createCanvas(min(1980,window.innerWidth*2), min(1080,window.innerHeight*2))
  
  //which node are you dragging from and which are you porting to
  dragging = -1, port = -1
  //are you dragging edge from node or the node itself 
  connecting = false
  //are you deleting nodes
  deleting = false
  defaultLabels = true

  n = 0
  for (i=0;i<n;++i)
    gNodes[i] = new Node(i*100+130,200+30)
  // gNodes[0].links=[4,2]
  // gNodes.push(new Node(window.innerWidth/2,window.innerHeight/2))
  // gNodes[1].links=[3]
}

function offsetCanvas(x,y){
  toggleDropDown(true)
  x = Number(x) || 0, y = Number(y) || 0
  for (node of gNodes)
    node.x = node.x + x, node.y = node.y + y
}

function enterEditMode(){
  toggleDropDown(true)
  deleting = false
  connecting = true
}
function enterMoveMode(){
  toggleDropDown(true)
  deleting = false
  connecting = false
}

function enterDeleteMode(){
  toggleDropDown(true)
  deleting = true
  connecting = false
  dragging = -1
}

function downloadCanvas(){
  toggleDropDown(true)
  saveCanvas(document.querySelector('canvas') , 'besnoi.github.io', 'jpg');
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
  let el=document.querySelector("#toolbar .btn:first-child").nextElementSibling
   //hide dropdown if clicked anywhere on canvas
  // if (mouseY>el.offsetTop+el.offsetHeight || mouseX<el.offsetLeft ||
  //   mouseX>el.offsetLeft+el.offsetWidth)
  //   toggleDropDown(true)
}

function pointOnLine(x1,y1, x2,y2, x,y) 
{
  return (Math.abs((y-y1)/(x-x1)-((y2-y1)/(x2-x1)))<0.1) &&
  (Math.min(x1, x2) <= x && x <= Math.max(x1, x2)) && (Math.min(y1, y2) <= y && y <= Math.max(y1, y2))  
}

function draw() {
  background(255)
  // start from top of the stack
  for (let i=gNodes.length-1;i>=0;--i)
    if (mouseIsPressed)
      if (dist(mouseX, mouseY, gNodes[i].x, gNodes[i].y) < gNodes[i].r-10){
        //mouse is inside the circle

        if (deleting == true){
          gNodes[i].links=[]
            
          gNodes.splice(i,1)
          if (defaultLabels)
            for (let j=i;j<gNodes.length;++j)
              gNodes[j].label-=1

          for (node of gNodes){
            if (node.links.indexOf(i)!=-1)
              node.links.splice(node.links.indexOf(i),1)
            for (l in node.links)
              if (node.links[l]>i)
                node.links[l]-=1
            }
        }

        else if (dragging==-1) 
          dragging= i
          
        if (connecting && i!=dragging)
          port = i
        //solves the problems of nodes beneath nodes
        break;
    }else{
      if (port==i && dragging>-1)
        port=-1
      if (deleting){
        for (let j=0;j<gNodes.length;++j){

          fill(55,55,55,0)
          rect(mouseX-3,mouseY-3,6,6)
          if (i!=j && pointOnLine(gNodes[i].x,gNodes[i].y,gNodes[j].x,gNodes[j].y,mouseX,mouseY)){
           if (gNodes[i].links.indexOf(j)!=-1)
            gNodes[i].links.splice(gNodes[i].links.indexOf(j),1)
           if (gNodes[j].links.indexOf(i)!=-1)
            gNodes[j].links.splice(gNodes[j].links.indexOf(i),1)
          }

        }
      }
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
        fill(45, 256, 45)
    else
      fill(128, 256, 128);
    if (port==i)
        fill(25,25,235) 
    circle(gNodes[i].x,gNodes[i].y,gNodes[i].r)

    fill(25,25,25)
    textAlign(CENTER)
    text(gNodes[i].label,gNodes[i].x-gNodes[i].r+1,gNodes[i].y-5,2*gNodes[i].r,gNodes[i].r)
  }
}