/**
 * Created by chengang on 17-2-20.
 */
function CircularLayout() {
    this.nodes = null;
    // this.links = null;
     this.posSet = null;
     this.depthPosSet = null;
     this.drawnBiComps =null;
     this.bc = null;
     this.nodeHeights = {};
     this.node2BiComp = {};

     this.width = 60;

}

var p = CircularLayout.prototype;

//必须有的方法
p.layout = function (nodes,edges) {
    this.init(nodes,edges);

    this.posSet = new Array(this.nodes.length);
    this.depthPosSet = new Array(this.nodes.length);

    this.bc = this.createBicconnects();
    // var test = this.bc.filter(function (e) {
    //     return e.length > 3;
    // });
    this.__layout(this.bc);
    return this.nodes.map(function (e) {
        return {x: e.x || 0,y:e.y || 0};
    })
};
p.init = function (nodes,edges) {
    var oldNodes = nodes,oldLinks = edges;
    var tempNodes = [],map = {},temp;
    oldNodes.forEach(function (e,i) {
        temp = {
            id:e.id,
            _index:i,
            links:[]
        };
        tempNodes.push(temp);
        map[temp.id] = temp;
    })

    var s,t;
    oldLinks.forEach(function (e,i) {
        s = map[e.source];
        t = map[e.target];

        s.links = s.links || [];
        s.links.push(t._index);

        t.links = t.links || [];
        t.links.push(s._index);
    });

    this.nodes = tempNodes;
};
p.createBicconnects = function() {
    var nodes = this.nodes;
    var states = new Array(this.nodes.length),
        dfsn = new Array(this.nodes.length),
        low = new Array(this.nodes.length),
        edgesStack = [],
        pre = new Array(this.nodes.length);

    var biComponents = [];

    pre[0] = -1;
    var num = 0;
    for (var i = 0; i < this.nodes.length; i++) {
        states[i] = 0;
    }

    dfs(0);
    return biComponents;

    function dfs(current) {
        states[current] = 1;
        low[current] = dfsn[current] = ++num;

        var neigh;
        var neighNodes = nodes[current].links;

        for (var i = 0; i < neighNodes.length; i++) {
            neigh = neighNodes[i];

            if (states[neigh] == 0) {
                pre[neigh] = current;
                edgesStack.push({source: current, target: neigh});
                dfs(neigh);
                low[current] = Math.min(low[current], low[neigh]);

                if ((pre[current] == -1 && nodes[current].links.length >= 2) || low[neigh] >= dfsn[current]) {
//                        var children = nodes[current].links;
//                        if(children.length >=2){
                    var singleComponent = [];
                    var map = {};
                    singleComponent.push(edgesStack[edgesStack.length - 1].target);
                    map[edgesStack[edgesStack.length - 1].target] = true;
                    while (edgesStack[edgesStack.length - 1].source != current) {
                        var edge = edgesStack.pop();
                        if (!map[edge.source]) {
                            singleComponent.push(edge.source);
                            map[edge.source] = true;
                        }
                        if (!map[edge.target]) {
                            singleComponent.push(edge.target);
                            map[edge.target] = true;
                        }
                    }
                    edgesStack.pop();
                    if (!map[current]) {
                        singleComponent.push(current);
                        map[current] = true;
                    }
                    /*singleComponent.length > 2 && */biComponents.push(singleComponent);
//                        }
                }
//                    states[neigh]
            } else if (neigh != pre[current]) {
                low[current] = Math.min(low[current], low[neigh]);
            }
        }


    }
};
p.__layout = function(biconncts) {


    var max = -1;
    var maxIndex = null;
    var nodes = this.nodes;

    biconncts.forEach(function (e, i) {
        if (e.length > max) {
            max = e.length;
            maxIndex = i;
        }
    });

    biconncts[maxIndex].forEach(function (e) {
        nodes[e].delete = true;
    });

    for (var i = 0; i < biconncts.length; i++)
        if (biconncts[i].length > 3) {
            for (var j = 0; j < biconncts[i].length; j++) {
                this.node2BiComp[biconncts[i][j]] = i;
            }
        }

    var bc = biconncts[maxIndex];

    this.drawnBiComps = new Array(bc.length);
    this.drawnBiComps[maxIndex] = true;



    var maxSize = bc.length;
    var radius = (this.width * maxSize) / (Math.PI * 2);
    var deltaAngle = (2 * Math.PI) / maxSize;
    var angle = 0;

    var startX = radius | 0;
    var startY = radius | 0;


    bc = this.sortInnerCircle(bc);

    for (var i = 0; i < bc.length; i++) {
        nodes[bc[i]].test = i;
        nodes[bc[i]].x = startX + Math.cos(angle) * radius;
        nodes[bc[i]].y = startY - Math.sin(angle) * radius;
        this.posSet[bc[i]] = true;
        angle += deltaAngle;
    }

    this.SetOuterCircle(maxIndex, radius, startX, startY, -1);
};
p.sortInnerCircle = function(icNodes) {
    var greedyNodes = [];
    var modestNodes = [];

    var forFunct = {};

    for (var i = 0; i < icNodes.length; i++)
        forFunct[icNodes[i]] = true;

    for (var i = 0; i < icNodes.length; i++) {
        var tmp = this.NoOfChildren(icNodes[i], forFunct);

        if (tmp > 4)
            greedyNodes.push(icNodes[i]);
        else
            modestNodes.push(icNodes[i]);
    }

    var toReturn = new Array(icNodes.length);
    var gNo = greedyNodes.length;
    var mNo = modestNodes.length;
    var deltaM;
    var deltaG;

    if (gNo == 0) {
        deltaM = mNo;
        deltaG = 0;
    } else if (mNo == 0) {
        deltaG = gNo;
        deltaM = 0;
    } else if (gNo > mNo) {
        deltaM = 1;
        deltaG = (gNo / mNo) | 0 ;
    } else {
        deltaG = 1;
        deltaM = (mNo / gNo ) | 0;
    }

    var x = 0;
    var i, g, m;
    for (g = 0, m = 0; g < greedyNodes.length && m < modestNodes.length;) {
        for (i = 0; i < deltaG && g < greedyNodes.length; i++)
            toReturn[x++] = greedyNodes[g++];

        for (i = 0; i < deltaM && m < modestNodes.length; i++)
            toReturn[x++] = modestNodes[m++];
    }

    while (g < greedyNodes.length)
        toReturn[x++] = greedyNodes[g++];

    while (m < modestNodes.length)
        toReturn[x++] = modestNodes[m++];
    return toReturn;

};
p.NoOfChildren = function(nodeId, outerCircle) {
    var toReturn = 0;
    var nodes = this.nodes;
    var links = nodes[nodeId].links;

    for (var i = 0; i < links.length; i++) {
        var currNeigh = links[i];

        if (!this.posSet[currNeigh] && !outerCircle[currNeigh])
            toReturn++;
    }

    if (toReturn > 7)
        toReturn = 7;

    return toReturn;
};
p.SetOuterCircle = function(compIndex, innerCircleRadius, startX, startY, firstTouched) {
    var nodes = this.nodes;
    var outerNodesCount = 0;
    var rnc = 0;
    var iter;
    var outerCircle = {};

    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        for (var j = 0 ;j< iter.length;j++) {
            var currNeighbour = iter[j];

            if (!this.posSet[currNeighbour]) {
                outerNodesCount += (this.NoOfChildren(currNeighbour, outerCircle) + 1);
                outerCircle[currNeighbour] = true;
                rnc++;
            }
        }
    }

    var outerRadius = 1.5 * innerCircleRadius;

    // + 5 * nodeHorizontalSpacing;
    var tryCount = ((2 * Math.PI * outerRadius) / 32) | 0;
    var outerDeltaAngle = (2 * Math.PI) / tryCount;

    if (tryCount < (1.2 * outerNodesCount)) {
        outerRadius = (1.2 * 32 * outerNodesCount) / (2 * Math.PI);
        outerDeltaAngle = (2 * Math.PI) / (1.2 * outerNodesCount);
        outerNodesCount *= 1.2;
    } else
        outerNodesCount = tryCount;

    if ((outerNodesCount > 10) && (firstTouched != -1))
        outerNodesCount += 5;

    // 5 places on outer circle for connection with other biconn. comp.
    //System.out.println("tryCount = " + tryCount);

    // setting nodes on outer circle
    outerNodesCount = outerNodesCount | 0;
    var outerPositionsTaken = new Array(outerNodesCount);
    var outerPositionsOwners = new Array(outerNodesCount);

    for (var i = 0; i < outerPositionsTaken.length; i++) {
        outerPositionsTaken[i] = -1;
        outerPositionsOwners[i] = -1;
    }

    var pointX;
    var pointY;
    var theAngle;
    var theAngleHlp;
    var innerDeltaAngle;
    innerDeltaAngle = (2 * Math.PI) / this.bc[compIndex].length;

    if (firstTouched != -1) {
        pointX = nodes[firstTouched].x;
        pointY = nodes[firstTouched].y;
        theAngle = Math.asin((startY - pointY) / Math.sqrt(((pointX - startX) * (pointX
                - startX))
                + ((pointY - startY) * (pointY
                - startY))));
        theAngleHlp = Math.acos((pointX - startX) / Math.sqrt(((pointX - startX) * (pointX
                - startX))
                + ((pointY - startY) * (pointY
                - startY))));

        if (theAngleHlp > (Math.PI / 2))
            theAngle = Math.PI - theAngle;

        if (theAngle < 0)
            theAngle += (2 * Math.PI);

        var idPos = ((theAngle / outerDeltaAngle) | 0) % outerPositionsTaken.length;
        outerPositionsTaken[idPos] = (theAngle / innerDeltaAngle) | 0;
        outerPositionsOwners[idPos] = -2; // must not be even moved because that node is coming from another bicomp.

        if (outerPositionsTaken.length > 10) {
            outerPositionsTaken[(idPos + 1) % outerPositionsTaken.length] = (theAngle / innerDeltaAngle) | 0;
            outerPositionsTaken[(idPos + 2) % outerPositionsTaken.length] = 0| (theAngle / innerDeltaAngle);
            outerPositionsTaken[(idPos - 1 + outerPositionsTaken.length) % outerPositionsTaken.length] = 0| (theAngle / innerDeltaAngle);
            outerPositionsTaken[(idPos - 2 + outerPositionsTaken.length) % outerPositionsTaken.length] = 0| (theAngle / innerDeltaAngle);

            outerPositionsOwners[(idPos + 1) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos + 2) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos - 1 + outerPositionsOwners.length) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos - 2 + outerPositionsOwners.length) % outerPositionsOwners.length] = -2;
        }
    }

    var addedNeighbours = {};

    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        var currentNeighbour;
        var noOfNeighbours = 0;

        for (var j = 0; j < iter.length;j++) {
            currentNeighbour = iter[j];

            if (!this.posSet[currentNeighbour]) {
                noOfNeighbours += (this.NoOfChildren(currentNeighbour, addedNeighbours) + 1);
                addedNeighbours[currentNeighbour]= true;
            }
        }

        if (noOfNeighbours == 0)
            continue;

        pointX = nodes[this.bc[compIndex][i]].x;
        pointY = nodes[this.bc[compIndex][i]].y;

        theAngle = Math.asin((startY - pointY) / Math.sqrt(((pointX - startX) * (pointX
                - startX))
                + ((pointY - startY) * (pointY
                - startY))));
        theAngleHlp = Math.acos((pointX - startX) / Math.sqrt(((pointX - startX) * (pointX
                - startX))
                + ((pointY - startY) * (pointY
                - startY))));

        if (theAngleHlp > (Math.PI / 2))
            theAngle = Math.PI - theAngle;

        if (theAngle < 0)
            theAngle += (2 * Math.PI);

//			iter = edgesFrom[this.bc[compIndex][i]].iterator();

        var startPos = this.BestFreePositionsForAll(0| ((theAngle / outerDeltaAngle)
            - (noOfNeighbours / 2.0)), outerPositionsTaken,
            outerPositionsOwners, noOfNeighbours,
            0| (theAngle / innerDeltaAngle), startX,
            startY, outerDeltaAngle, outerRadius,
            this.bc[compIndex].length);
        var startAngle = startPos * outerDeltaAngle;

        if (startAngle < 0)
            continue;

//			iter = nodes[this.bc[compIndex][i]].iterator();

        for (var m = 0;m< iter.length;m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour]) {
                this.posSet[currentNeighbour] = true;

                var holeDepth = this.NoOfChildren(currentNeighbour, addedNeighbours);

                for (var j = 0; j < (holeDepth / 2); j++) {
                    outerPositionsOwners[(startPos) % outerPositionsOwners.length] = -3;
                    // free but it must not be used (add. space for tree-like struct.)
                    outerPositionsTaken[(startPos) % outerPositionsOwners.length] = 0| (theAngle / innerDeltaAngle);
                    startPos++;
                    startAngle += outerDeltaAngle;

                    if (startAngle > (2 * Math.PI))
                        startAngle -= (2 * Math.PI);
                }


                nodes[currentNeighbour].x = startX + (Math.cos(startAngle) * outerRadius);
                nodes[currentNeighbour].y = startY - (Math.sin(startAngle) * outerRadius);

                outerPositionsOwners[(startPos) % outerPositionsOwners.length] = currentNeighbour;
                outerPositionsTaken[(startPos) % outerPositionsOwners.length] = 0| (theAngle / innerDeltaAngle);
                startPos++;
                startAngle += outerDeltaAngle;

                if (startAngle > (2 * Math.PI))
                    startAngle -= (2 * Math.PI);

                for (var j = 0; j < (holeDepth / 2); j++) {
                    outerPositionsOwners[(startPos) % outerPositionsOwners.length] = -3;
                    outerPositionsTaken[(startPos) % outerPositionsOwners.length] = 0| (theAngle / innerDeltaAngle);
                    startPos++;
                    startAngle += outerDeltaAngle;

                    if (startAngle > (2 * Math.PI))
                        startAngle -= (2 * Math.PI);
                }
            }
        }
    }

    // laying out the rest of nodes
    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        var currentNeighbour;

        for (var m = 0;m < iter.length;m++) {
            currentNeighbour = iter[m];

            if (!addedNeighbours[currentNeighbour]) {
                continue;
            }

            pointX = nodes[currentNeighbour].x;
            pointY = nodes[currentNeighbour].y;

            theAngle = Math.asin((startY - pointY) / Math.sqrt(((pointX - startX) * (pointX
                    - startX))
                    + ((pointY - startY) * (pointY
                    - startY))));
            theAngleHlp = Math.acos((pointX - startX) / Math.sqrt(((pointX - startX) * (pointX
                    - startX))
                    + ((pointY - startY) * (pointY
                    - startY))));

            if (theAngleHlp > (Math.PI / 2))
                theAngle = Math.PI - theAngle;

            if (theAngle < 0)
                theAngle += (2 * Math.PI);

            for (var j = 0; j < this.posSet.length; j++)
                this.depthPosSet[j] = this.posSet[j];

            this.EachNodeHeight(currentNeighbour);

            this.DFSSetPos(currentNeighbour, theAngle, outerRadius - innerCircleRadius);
        }
    }
};
p.BestFreePositionsForAll = function(idealPosition, outerPositionsTaken, outerPositionsOwners, noOfPos,
                                 innerCirclePos, startX, startY,
                                 outerDeltaAngle, outerRadius, innerCSize) {
    var startPos = idealPosition;
    var nodes = this.nodes;

    if (idealPosition < 0)
        startPos += outerPositionsTaken.length;

    var i = 0;
    var alreadyFound = 0;
    var startOfAlFound = -1;
    var found = false;
    var goDown = false;
    var goUp = false;

    //An infinite loop occurs when there is no place in the outerPositionsTaken array where all the number
    //of positions that we need (noOfPos) can fit contiguously. In such a case, an infinite loop occurs.
    //Experiment: Create a count. If the count exceeds outPositionsTaken.length, then we have looked at every
    //possible startPos. Set startPos to the best startPos (meaning, the most contingious spaces) and set found
    //to true.

    //Experiment: int goUpCount = 0;
    var goUpCount = 0;
    //Experiment: int biggestGap = 0;
    var biggestGap = 0;
    //Experiment: int bestStartPos;
    var bestStartPos = 0;

    while (!found && !(goUp && goDown)) {
        //System.out.print(startPos + " ");
        for (i = startPos;
             (i < (startPos + noOfPos))
             && (outerPositionsTaken[i % outerPositionsTaken.length] == -1); i++) {
        }

        if (i < (startPos + noOfPos)) {
            if (((outerPositionsTaken[i % outerPositionsTaken.length] > innerCirclePos)
                && ((outerPositionsTaken[i % outerPositionsTaken.length] - innerCirclePos) < (0.7 * innerCSize)))
                || ((innerCirclePos - outerPositionsTaken[i % outerPositionsTaken.length]) > (0.7 * innerCSize))) {
                alreadyFound = (i - startPos + outerPositionsTaken.length) % outerPositionsTaken.length;
                startOfAlFound = startPos;
                startPos -= (noOfPos - alreadyFound);

                if (startPos < 0)
                    startPos += outerPositionsTaken.length;

                goDown = true;
            } else {
                //Experiment: goUpCount++;
                goUpCount++;
                //Experiment: int thisGap = i - startPos;
                var thisGap = i - startPos;
                //Experiment: if( thisGap > biggestGap )
                if (thisGap > biggestGap) {
                    biggestGap = thisGap;
                    bestStartPos = startPos;
                }
                //Experiment: if( count > outerPositionsTaken.length )
                if (goUpCount > outerPositionsTaken.length * 3) {
                    startPos = bestStartPos;
                    found = true;
                }
                //Experiment: else
                else {
                    startPos = (i + 1) % outerPositionsTaken.length;
                    goUp = true;
                }
            }
        } else
            found = true;
    }

    if (goUp && goDown) {
        i = startOfAlFound - 1;

        var j = i - 1;
        var count = 0;
        //System.out.print(j + " ");

        var index = (i % outerPositionsTaken.length + outerPositionsTaken.length) % outerPositionsTaken.length;
        if (((outerPositionsTaken[index] > innerCirclePos)
            && ((outerPositionsTaken[index] - innerCirclePos) < (0.7 * innerCSize)))
            || ((innerCirclePos - outerPositionsTaken[index]) > (0.7 * innerCSize))) {
            j--;
            i--;
        }

        while (count < (noOfPos - alreadyFound)) {
            //System.out.print(j + " ");

            if (outerPositionsTaken[(j + outerPositionsTaken.length) % outerPositionsTaken.length] == -1) {
                // move all for one place left
                //	System.out.print(" moving ");
                if (outerPositionsOwners[(j + outerPositionsTaken.length) % outerPositionsTaken.length] == -2) {
                    //System.out.println("BUUUUUUUUUUUUUUUUUUU");

                    return -1;
                }

                for (var k = j; k < (i - count); k++) {
                    if (outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length] > 0)
                    {
                        nodes[outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length]].x = startX + (Math.cos(outerDeltaAngle * k) * outerRadius);
                        nodes[outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length]].y = startY - (Math.sin(outerDeltaAngle * k) * outerRadius);
                    }


                    outerPositionsOwners[(k + outerPositionsTaken.length) % outerPositionsTaken.length] = outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length];
                    outerPositionsTaken[(k + outerPositionsTaken.length) % outerPositionsTaken.length] = outerPositionsTaken[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length];
                }

                count++;
            }

            j--;
        }

        startPos = (i - count + 1 + outerPositionsOwners.length) % outerPositionsOwners.length;
    }

    /*    for (i = startPos; i < startPos + noOfPos; i++)
     {
     outerPositionsTaken[i % outerPositionsTaken.length] = innerCirclePos;
     }*/
    return startPos;

};
p.EachNodeHeight = function(nodeID) {
    var nodes = this.nodes;
    var links = nodes[nodeID].links;
    var currentNeighbour;
    var noOfChildren = 0;
    var tmp = {};

    for (var m = 0;m < links.length;m++) {
        currentNeighbour = links[m];

        if (!this.depthPosSet[currentNeighbour] && !tmp[currentNeighbour]) {
            this.depthPosSet[currentNeighbour] = true;
            tmp[currentNeighbour] = true;
        }
    }


    for (var m = 0;m < links.length;m++) {
        currentNeighbour = links[m];

        if (tmp[currentNeighbour]) {
            noOfChildren += this.EachNodeHeight(currentNeighbour);
        }
    }

//		if (this.nodeHeights[nodeID])
//			this.nodeHeights.remove(Integer.valueOf(nodeID));

    this.nodeHeights[nodeID] = noOfChildren;

    return (noOfChildren + 1);
};
p.DFSSetPos = function( nodeID, theAngle,  theRadius) {
    var component = this.node2BiComp[nodeID];
    var nodes = this.nodes;
    if (component != undefined && !this.drawnBiComps[component]) {
        var comp = component;
        var centerX =nodes[nodeID].x;
        var centerY = nodes[nodeID].y;
        var radius = (this.width * this.bc[comp].length) / (2 * Math.PI);
        var deltaAngle = (2 * Math.PI) / this.bc[comp].length;
        var currAngle = theAngle - Math.PI - deltaAngle;

        if (currAngle < 0)
            currAngle += (2 * Math.PI);

        centerX += (Math.cos(theAngle) * radius * 4.0);
        centerY -= (Math.sin(theAngle) * radius * 4.0);

        this.drawnBiComps[comp] = true;

        // sorting nodes on inner circle
        this.bc[comp] = this.sortInnerCircle(this.bc[comp]);

        /*if (this.bc[comp].length > 20)
         this.bc[comp] = ReduceInnerCircleCrossings(this.bc[comp]);*/
        var oneAtLeast = false;

        for (var i = 0; i < this.bc[comp].length; i++) {
            if (this.posSet[this.bc[comp][i]])
                continue;


            nodes[this.bc[comp][i]].x = centerX + (Math.cos(currAngle) * radius);
            nodes[this.bc[comp][i]].y = centerY - (Math.sin(currAngle) * radius);

            this.posSet[this.bc[comp][i]] = true;

            oneAtLeast = true;
            currAngle -= deltaAngle;

            if (currAngle < 0)
                currAngle += (2 * Math.PI);
        }

        if (oneAtLeast) {

            nodes[nodeID].x += Math.cos(theAngle) * 3 * radius;
            nodes[nodeID].y -= Math.sin(theAngle) * 3 * radius;


            this.SetOuterCircle(comp, radius, centerX, centerY, nodeID);
        }
    } else {
        var iter = nodes[nodeID].links;
        var currentNeighbour;
        var startAngle = theAngle + (Math.PI / 2);

        if (startAngle > (2 * Math.PI))
            startAngle -= (2 * Math.PI);

        var neighboursCount = 0;
        var min1 = 1000;
        var min2 = 1000;
        var max = -1;
        var min1Id = -1;
        var min2Id = -2;
        var maxId = -3;
        var tmp = {};

        for (var m = 0;m < iter.length;m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour] && !tmp[currentNeighbour]) {
                neighboursCount++;
                tmp[currentNeighbour]=true;

                if (this.nodeHeights[currentNeighbour] < min1) {
                    min2 = min1;
                    min2Id = min1Id;
                    min1 = this.nodeHeights[currentNeighbour];
                    min1Id = currentNeighbour;
                } else if (this.nodeHeights[currentNeighbour] < min2) {
                    min2 = this.nodeHeights[currentNeighbour];
                    min2Id = currentNeighbour;
                }

                if (this.nodeHeights[currentNeighbour] >= max)//&& currentNeighbour != min2Id && currentNeighbour != min1Id)
                {
                    max = this.nodeHeights[currentNeighbour];
                    maxId = currentNeighbour;
                }
            }
        }

        if (neighboursCount == 0)
            return;

        var deltaAngle = Math.PI / (neighboursCount + 1);

        startAngle -= deltaAngle;

        if (startAngle < 0)
            startAngle += (2 * Math.PI);

        var remStartAngle = startAngle;

        if (neighboursCount > 2) {
            deltaAngle = (2 * Math.PI) / neighboursCount;
            startAngle = (theAngle + Math.PI) - ((3 * deltaAngle) / 2);

            if (startAngle > (2 * Math.PI))
                startAngle -= (2 * Math.PI);

            remStartAngle = (theAngle + Math.PI) - (deltaAngle / 2);

            if (remStartAngle > (2 * Math.PI))
                remStartAngle -= (2 * Math.PI);
        }

        iter = nodes[nodeID].links;

        var r = 72;
        var rTry;

        if (((this.width * neighboursCount) / (2 * Math.PI)) > r)
            r = (this.width * neighboursCount) / (2 * Math.PI);

        rTry = r;

        var hlp = 100.0;
        var startX = nodes[nodeID].x;
        var startY = nodes[nodeID].y;

        if (neighboursCount > 2) {
            nodes[nodeID].x = startX + (Math.cos(theAngle) * r * ((min2 + 1) % 100));
            nodes[nodeID].y = startY - (Math.sin(theAngle) * r * ((min2 + 1) % 100));

            startX = nodes[nodeID].x;
            startY = nodes[nodeID].y;

            //System.out.println("theAngle = " + theAngle + ", startAngle = " + startAngle + ", remStartAngle = " + remStartAngle + ", deltaAngle = " + deltaAngle);
            //System.out.println("min1Id = " + min1Id + ", min2Id" + min2Id + ", maxId" + maxId);
            setOffset(nodes[min1Id], startX + (Math.cos(remStartAngle) * r),
                startY - (Math.sin(remStartAngle) * r));
            nodes[min1Id].test = 'min1'
            setOffset(nodes[min2Id], startX + (Math.cos(remStartAngle + deltaAngle) * r),
                startY - (Math.sin(remStartAngle + deltaAngle) * r));
            nodes[min2Id].test = 'min2'

            if (this.nodeHeights[maxId] > 8)
                r = 256;

            setOffset(nodes[maxId],
                startX + (Math.cos(remStartAngle - ((neighboursCount / 2) * deltaAngle)) * r),
                startY - (Math.sin(remStartAngle - ((neighboursCount / 2) * deltaAngle)) * r));
            nodes[maxId].test = 'maxId'

            //System.out.println("Ugao za maxID "
            //                  + (remStartAngle - ((neighboursCount / 2) * deltaAngle)));
        }

        tmp = {};

        for (var m = 0;m < iter.length;m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour] && !tmp[currentNeighbour]) {
                if (this.nodeHeights[currentNeighbour] > 8)
                    r = 256;
                else
                    r = rTry;

                this.posSet[currentNeighbour] = true;
                tmp[currentNeighbour] = true;

                if (((currentNeighbour != min1Id) && (currentNeighbour != min2Id)
                    && (currentNeighbour != maxId)) || (neighboursCount <= 2)) {
                    setOffset(nodes[currentNeighbour], startX + (Math.cos(startAngle) * r),
                        startY - (Math.sin(startAngle) * r));

                    startAngle -= deltaAngle;

                    if (startAngle < 0)
                        startAngle += (2 * Math.PI);

                    if (((Math.abs(startAngle
                            - (remStartAngle - ((neighboursCount / 2) * deltaAngle))) < 0.0001)
                        || (Math.abs(startAngle
                            - (remStartAngle - ((neighboursCount / 2) * deltaAngle)
                            + (2 * Math.PI))) < 0.0001)) && (neighboursCount > 2)) {
                        startAngle -= deltaAngle;

                        if (startAngle < 0)
                            startAngle += (2 * Math.PI);
                    }
                }
            }
        }

        iter = nodes[nodeID].links;

        if (neighboursCount > 2) {
            this.DFSSetPos(min1Id, remStartAngle, theRadius * Math.sin(deltaAngle / 2));
            this.DFSSetPos(min2Id, remStartAngle + deltaAngle, theRadius * Math.sin(deltaAngle / 2));
            this.DFSSetPos(maxId, remStartAngle - ((neighboursCount / 2) * deltaAngle),
                theRadius * Math.sin(deltaAngle / 2));
            hlp = remStartAngle;
            remStartAngle -= deltaAngle;
        }

        for (var m = 0;m < iter.length;m++) {
            currentNeighbour = iter[m];

            if (tmp[currentNeighbour]) {
                if (((currentNeighbour != min1Id) && (currentNeighbour != min2Id)
                    && (currentNeighbour != maxId)) || (neighboursCount <= 2)) {
                    this.DFSSetPos(currentNeighbour, remStartAngle,
                        theRadius * Math.sin(deltaAngle / 2));

                    remStartAngle -= deltaAngle;

                    if (((remStartAngle == (hlp - ((neighboursCount / 2) * deltaAngle)))
                        || (remStartAngle == (hlp - ((neighboursCount / 2) * deltaAngle)
                        + (2 * Math.PI)))) && (neighboursCount > 2))
                        startAngle -= deltaAngle;

                    if (remStartAngle < 0)
                        remStartAngle += (2 * Math.PI);
                }
            }
        }
    }
};

function setOffset(node,x,y) {
    node.x = x;
    node.y = y;
}

export default CircularLayout;
