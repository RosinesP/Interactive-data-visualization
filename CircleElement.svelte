<script>
  export let active;
  export let xPos;
  export let yPos;
  export let circleSize;
  export let value;

  let fillCol = "transparent";

  $: if (active) {
    fillCol = "black";
    circleSize = 5;
  } else {
    fillCol = "transparent";
    circleSize = 10;
  }
</script>

<g>
  <circle cx={xPos} cy={yPos} r ={circleSize} 
  fill={fillCol} on:mouseover on:mouseout />

  <text x={xPos+10} y={yPos+10} fill = {fillCol}>{Math.round(value)}</text>


</g>
