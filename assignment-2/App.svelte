<script>
  import { scaleLinear } from "d3-scale";
  import { dataDashedL, dataRegularL } from "./data.js";
  import CircleElement from "./CircleElement.svelte";

  let activeIndex = -1;
  let numHCells = 20;
  let numVCells = 10;
  let xPositionFirstIntGrid = 175;
  let offsetGridCell = 13;
  let xPixelsBetweenCells = 24;
  let yPixelsBetweenCells = 73;
  let colorPointD = "transparent";
  let colorPointR = "transparent"; 
  let circleSize = 10;

  const horizontalScale = scaleLinear()
    .domain([110, 0])
    .range([
      137,
      xPositionFirstIntGrid + offsetGridCell + numHCells * xPixelsBetweenCells
    ]);

  const verticalScale = scaleLinear()
    .domain([1890, 1790])
    .range([0, numVCells * yPixelsBetweenCells]);

  function yPos(i, offset = 0) {
    return offset + i * yPixelsBetweenCells;
  }

  function xPos(i, offset = 0) {
    return xPositionFirstIntGrid + i * xPixelsBetweenCells + offset;
  }

  function doSomething(index, type) {
    if (type === "dashed") {
      colorPointD = "black";
    } else if (type === "regular") {
      colorPointD = "black";
    } else {
      console.log("Do something doesn't found a known type");
    }
  }

  function doNothing() {
    colorPointD = "transparent";
    colorPointR = "transparent";
  }

  function assginInd(index) {
    activeIndex = index;
  }
</script>


<div class="page">
  <div class="headerContainer">
    <h1>
      COMPARATIVE INCREASE OF WHITE AND COLORED POPULATION OF GEORGIA.
    </h1>
  
  </div>
  <div class="graph">
    <!-- main chart -->
    <svg id="chart" xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
      <!--Horizontal Grid-->
      {#each Array(numHCells) as _, i}
        <g class="intGrid">
          <path d={"M " + xPos(i+1, offsetGridCell) +" "+ yPos(0) + " V " + yPos(numVCells)}/>
        </g>
          
      {/each}

      <!--Horizontal Grid-->
      {#each dataDashedL.slice(0,dataDashedL.length-2) as item, i}
        <g class="intGrid" height={(numVCells-6)*yPixelsBetweenCells}>
            <path d={"M " + xPos(0, offsetGridCell) + " " + yPos(i+1) +" H " + xPos(numHCells, offsetGridCell)}/>
        </g>
      {/each}
      
      
      <g class="extGrid">
                <path d="M 188 0 H 668 M 188 0 V 730 M 188 730 H 668 M 668 0 V 730" />
      </g>


      <!-- Percent labels on the x-axis-->
      {#each Array(numHCells+1) as _, i}
        <text class="label" x = {horizontalScale(i*5)} y={yPos(numVCells, 12)} text-anchor="middle" >
          {i*5}
        </text>
          
      {/each}

      



    <!--Years of the y-axis and dashed line-->
    {#each dataDashedL as item, i}
      <text x = {xPos(0)} y = {yPos(i,12)} class = 'years'>
        {item.year}
      </text>
      {#if i < dataDashedL.length-1}
        <g class="dashedLine">
          <path d={"M " + " " + horizontalScale(item.percent) + " " 
          + verticalScale(item.year) + " L " 
          + horizontalScale(dataDashedL[i+1].percent) + " " 
          + verticalScale(dataDashedL[i+1].year)}
          />
        
      
          
        </g>
        
        <CircleElement xPos={horizontalScale(item.percent)} yPos={verticalScale(item.year)} {circleSize}
          active = {i == activeIndex} value = {item.percent}
          on:mouseover={() => {assginInd(i)} } on:mouseout={() => assginInd(-1)}/>
      {/if}
    {/each}
    <circle fill={colorPointD} cx={horizontalScale(dataDashedL[dataDashedL.length-1].percent)} cy={verticalScale(dataDashedL[dataDashedL.length-1].year)} r=10> </circle>


    <!--regular Line-->
    {#each dataRegularL.slice(0, dataRegularL.length-1) as item, i}
      <g class="regularLine">
          <path d={"M " + " " + horizontalScale(item.percent) + " " 
          + verticalScale(item.year) + " L " 
          + horizontalScale(dataRegularL[i+1].percent) + " " 
          + verticalScale(dataRegularL[i+1].year)}/>
      </g>

      <CircleElement xPos={horizontalScale(item.percent)} yPos={verticalScale(item.year)} {circleSize}
          active = {i == activeIndex} value = {item.percent}
          on:mouseover={() => {assginInd(i)} } on:mouseout={() => assginInd(-1)}/>
    {/each}
    <!--There is no need to implement it on 1790 since it is the reference-->
      


    
    <!--Legend-->
    <g>
      <text class = "label" x="235" y="805" dominant-baseline="hanging"> = COLORED </text>
      <path class = "regularLine" d="M 175 810 H 230">
    </g>
    <g>
      <text class = "label" x="550" y="805" dominant-baseline="hanging">WHITE =</text>
      <path class = "dashedLine" d="M 605 810 H 675">
    </g>


    <!-- curvy bracket-->
    <g fill="transparent" stroke="black">
      <path d="M 175 740 Q 175 755 200 753 M 200 753 H 377 M 377 753 Q 402 753 405 790 M 405 790
                Q 405 753 430 753 M 430 753 H 665 M 665 753 Q 680 753 680 740">
    </g>


  </div>
</div>

<style>
  .page {
    background-color: rgb(250, 239, 233);
    width: 814px;
    height: 1024px;
  }

  h1,
  .extGrid {
    font-family: "Earth", sans-serif;
    color: rgb(40, 40, 40);
    stroke: rgb(40, 40, 40);
    stroke-width: 0.75px;
  }

  .intGrid {
    stroke: rgb(275, 120, 120);
    stroke-width: 1px;
  }

  .label {
    font-size: 12px;
    font-weight: 10;
  }
  text {
    font-weight: 10;
    font-size: 12px;
    font-family: sans-serif;
  }

  .years {
    font-weight: 10;
    font-size: 18px;
    text-anchor: end;
  }

  h1 {
    font-weight: 200;
    font-size: 25px;
    line-height: 20px;
    text-align: center;
  }

  .dashedLine,
  .regularLine {
    stroke: black;
    stroke-width: 1.5px;
  }

  .dashedLine {
    stroke-dasharray: 10px;
  }

  .headerContainer {
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 15px;
    padding-bottom: 30px;
  }
</style>