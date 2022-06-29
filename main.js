var gNodes = []
var RAD = 30 //def radius of nodes

class Node{
    constructor(x,y,r){
        if (!r) r=RAD
        this.label = gNodes.length
        this.x = x, this.y=y
        this.r = r, this. links=[]
    }
}

function clscv(){
    gNodes=[]
}

function newNode(){
    //push at random
    gNodes.push(new Node(
        floor(random(RAD,window.innerWidth-2*RAD)),
        floor(random(RAD,window.innerHeight-2*RAD)),
        RAD))
}

function connectNodes(n1,n2){
    if (gNodes[n1].links.indexOf(n2)==-1)
      gNodes[n1].links.push(n2)
}

function createPath(n){
    let c = Math.max(window.innerWidth/2-n*RAD,RAD)
    for (let i=0;i<n;++i){
        gNodes.push(new Node(i*2*RAD+c,window.innerHeight/2))
        if (i>0)
            gNodes.at(gNodes.length-2).links=[gNodes.length-1]
    }
}

function createCycle(n){
    if (n<3) 
        return console.error("Need atleast 3 vertices for Cycle Graph");
    for (let i=0;i<2*Math.PI;i+=2*Math.PI/n){
        gNodes.push(new Node(
            window.innerWidth/2+6*RAD*sin(i),
            window.innerHeight/2+6*RAD*cos(i)))
        if (i>0)
            gNodes.at(gNodes.length-2).links=[gNodes.length-1]
    }
    gNodes[gNodes.length-1].links=[gNodes.length-n]
}

function createCompleteGraph(n){
    completeGraphHelper(n)
}

function createEmptyGraph(n){
    completeGraphHelper(n,true)
}

function completeGraphHelper(n,isEmpty){
    for (let i=0,j=0;i<n;++i,j+=2*Math.PI/n){
        gNodes.push(new Node(
            window.innerWidth/2+7*RAD*sin(j),
            window.innerHeight/2+7*RAD*cos(j)))
        if (!isEmpty)
            gNodes[gNodes.length-1].links=range(n,gNodes.length-1-i)
    }
}

function createBiclique(m,n){
    let c1 = Math.max(window.innerHeight/2-m*RAD,RAD)
    let c2 = Math.max(window.innerHeight/2-n*RAD,RAD)
    for (let i=0;i<m;++i){
        gNodes.push(new Node(window.innerWidth/2-2*RAD,i*2*RAD+c1))
        gNodes[gNodes.length-1].links=range(n,m+gNodes.length-1-i)
    }
    for (let i=0;i<n;++i)
        gNodes.push(new Node(window.innerWidth/2+2*RAD,i*2*RAD+c2))
}

range = (n,offset) => {
    a=[]
    for (i=0;i<n;++i)
        a.push(i+offset)
    return a
}