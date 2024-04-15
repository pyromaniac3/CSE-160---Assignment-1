class Berry{
    constructor() {
        this.type = 'berry';
        this.position = [[0,0], [0,0], [0,0]];
        this.color = [1.0, 1.0, 1.0, 1.0];
    }
    render() {
        // Pass the color of a point to u_FragColor variable

        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        // Draw
        var p1 = this.position[0];
        var p2 = this.position[1];
        var p3 = this.position[2];
        //console.log("I am in the render");
        //console.log(p1 + "  "+ p2+ "  "+ p3)
        drawTriangle([p1[0],p1[1],p2[0],p2[1],p3[0],p3[1]]);
    }
}
function drawBerry(){

    let textArray = [
        [[15.5,4], [15.5,6], [16,4]],
        [[16,4], [16,6], [15.5,6]],
        [[16,4.75], [17,4.75], [17,5.25]],
        [[16,4.75], [16,5.25], [17,5.25]],
        [[17,4], [17,6], [17.5,4]],
        [[17.5,4], [17.5,6], [17,6]],
        [[18,4], [18,6], [18.5,4]],
        [[18.5,4], [18.5,6], [18,6]]
    ]

    let bubbleArray = [
        [[15,3],[19,3],[19,7]],
        [[15,3],[15,7],[19,7]],
        [[15,7],[15,8],[16,7]]
    ]

    let bodyArray = [
        [[2,12], [4,10],[10,15]],
        [[4,10],[14,11],[10,15]],
        [[14,11],[15,12],[10,15]],
        [[2,12],[2,16],[10,15]],
        [[15,12],[15,16],[10,15]],
        [[10,15],[2,16],[15,16]]
    ]

    let scarfArray = [
        [[6,7],[12,7],[7,9]],
        [[6,7], [5,7],[7,9]],
        [[5,7],[12,7],[7,8]],
        [[7,9],[12,7],[14,9]],
        [[7,9],[14,9],[12,11]],
        [[7,9],[6,11],[12,11]],
        [[5.5,7.7],[7,9],[6,11]],
        [[5.5,7.7],[4,9],[6,11]],
        [[5.5,7.7],[4,8],[4,9]],
        [[4,9],[3,10],[6,11]],
        [[6,11],[12,11],[12,13]],
        [[12,11],[14,9.5],[12,13]],
        [[14,9.5],[15,11],[12,13]]
    ]

    let headArray = [
        [[5,3],[7,3],[5,5]],
        [[7,3],[6,4],[8,4]],
        [[6,3],[5,5],[6,6]],
        [[6,4],[6,7],[7,7]],
        [[6,4],[7,4],[7,7]],
        [[6,7],[7,7],[7,8]],
        [[7,4],[7,8],[12,8]],
        [[7,4],[12,4],[12,8]],
        [[12,7],[12,8],[13,7]],
        [[13,3],[13,7],[12,7]],
        [[12,3],[13,3],[12,7]],
        [[13,3],[14,4],[13,5]],
        [[11,3],[12,2],[13,3]],
        [[7.5,3.5],[8,3],[8,4]],
        [[8,3],[12,3],[12,4]],
        [[12,4],[8,4],[8,3]]
    ]

    let faceArray = [
        [[8,5],[7.5,5.5],[8,6]],
        [[8,5],[8.5,5.5],[8,6]],
        [[11,5],[10.5,5.5],[11,6]],
        [[11,5],[11.5,5.5],[11,6]],
        [[9,6],[10,6],[9.5,6.5]]
    ]

    let shadowArray = [
        [[6,7],[7,8],[7,8.5]],
        [[7,8],[12,8],[7,8.5]],
        [[4,8],[4,9],[6,11]],
        [[6,11],[12,11],[11,12]],
        [[14,9],[14,9.5],[12,11]]
    ]

    buildingList(bubbleArray, [1.0, 1.0, 1.0, 1.0]);
    buildingList(textArray, [0, 0, 0, 1]);
    buildingList(bodyArray,[109/255, 163/255, 143/255,1]);
    buildingList(scarfArray,[150/255, 129/255, 11/255,1]);
    buildingList(headArray,[110/255, 77/255, 68/255,1]);
    buildingList(faceArray,[0,0,0,1]);
    buildingList(shadowArray,[54/255, 60/255, 133/255,0.8])

    renderBerry();
}

function buildingList(array, color){
    console.log(color);
    var len = array.length;
    for(var i=0; i<len;+i++){
        let it = new Berry();
        for(var j = 0; j<3;j++){
            // text
            var x =  ((20*array[i][j][0]) - canvas.width/2)/(canvas.width/2);
            var y =  (canvas.height/2 - (20*array[i][j][1]))/(canvas.height/2);
            it.position[j] = ([x,y]);
            it.color = color;
        }
        berryList.push(it); 
    }

}
