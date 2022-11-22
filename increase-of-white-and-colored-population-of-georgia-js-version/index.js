let dataRegularL = [
  {
    year: 1890,
    percent: 18.75
  },
  {
    year: 1880,
    percent: 26.875
  },
  {
    year: 1870,
    percent: 8.75
  },
  {
    year: 1860,
    percent: 20.625
  },
  {
    year: 1850,
    percent: 35
  },
  {
    year: 1840,
    percent: 30
  },
  {
    year: 1830,
    percent: 45.625
  },
  {
    year: 1820,
    percent: 36.875
  },
  {
    year: 1810,
    percent: 77.5
  },
  {
    year: 1800,
    percent: 100
  },
  {
    year: 1790,
    percent: 0
  }
];

let dataDashedL = [
  {
    year: 1890,
    percent: 19.375
  },
  {
    year: 1880,
    percent: 32.5
  },
  {
    year: 1870,
    percent: 16.875
  },
  {
    year: 1860,
    percent: 13.75
  },
  {
    year: 1850,
    percent: 28.75
  },
  {
    year: 1840,
    percent: 36.25
  },
  {
    year: 1830,
    percent: 55
  },
  {
    year: 1820,
    percent: 30
  },
  {
    year: 1810,
    percent: 42.5
  },
  {
    year: 1800,
    percent: 91.25
  },
  {
    year: 1790,
    percent: 0
  }
];

let yPositionPercentage = 735;
let xPositionFirstPercentage = 175;
let xPixelsBetweenCells = 24;
let yPixelsBetweenCells = 73;
let nHorizontalCells = 20;

function createPercentageGroup(
  yPositionPercentage,
  xPositionFirstPercentage,
  xPixelsBetweenCells,
  nHorizontalCells
) {
  let percentageGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  function correctIncreaseOfDigits(x, i) {
    // In order to correct the increase of digits in the number
    // and mantain the pixel distance between numbers
    if (i < 20) {
      x += 4;
      if (i < 2) {
        x += 4;
      }
    }
    return x;
  }

  for (let i = 0; i < nHorizontalCells + 1; ++i) {
    let percentageInd = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    let xPositionPercentage =
      (nHorizontalCells - i) * xPixelsBetweenCells + xPositionFirstPercentage;

    xPositionPercentage = correctIncreaseOfDigits(xPositionPercentage, i);

    percentageInd.setAttribute("x", xPositionPercentage);
    percentageInd.setAttribute("y", yPositionPercentage);
    percentageInd.setAttribute("dominant-baseline", "hanging");
    percentageInd.textContent = i * 5;
    percentageGroup.appendChild(percentageInd);
  }
  return percentageGroup;
}

function createXPosition(data, xFirst, nHorizontalCells, xPixelsBetweenCells) {
  // The x axis is inverted...
  let perOne = 1 - data.percent / 100;
  let totalPixelsGrid = nHorizontalCells * xPixelsBetweenCells;
  return xFirst + totalPixelsGrid * perOne;
}

let xPositionFirstColumnGrid = 188;
function createLineGroup(
  data,
  xPositionFirstColumnGrid,
  nHorizontalCells,
  xPixelsBetweenCells,
  yPixelsBetweenCells
) {
  let lineGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let pathStr = "";
  let yPosition = 0;

  for (let i = 0; i < 10; ++i) {
    let xPosition = createXPosition(
      data[i],
      xPositionFirstColumnGrid,
      nHorizontalCells,
      xPixelsBetweenCells
    );
    pathStr =
      pathStr + "M " + xPosition.toString() + " " + yPosition.toString() + " ";

    xPosition = createXPosition(
      data[i + 1],
      xPositionFirstColumnGrid,
      nHorizontalCells,
      xPixelsBetweenCells
    );

    yPosition += yPixelsBetweenCells;
    pathStr =
      pathStr + "L " + xPosition.toString() + " " + yPosition.toString();
  }

  path.setAttribute("d", pathStr);
  lineGroup.appendChild(path);
  return lineGroup;
}

let mySVG = document.getElementById("chart");

let percentageGroup = createPercentageGroup(
  yPositionPercentage,
  xPositionFirstPercentage,
  xPixelsBetweenCells,
  nHorizontalCells
);
mySVG.appendChild(percentageGroup);

let dashedLineGroup = createLineGroup(
  dataDashedL,
  xPositionFirstColumnGrid,
  nHorizontalCells,
  xPixelsBetweenCells,
  yPixelsBetweenCells
);
dashedLineGroup.setAttribute("class", "dashedLine");
mySVG.appendChild(dashedLineGroup);

let regularLineGroup = createLineGroup(
  dataRegularL,
  xPositionFirstColumnGrid,
  nHorizontalCells,
  xPixelsBetweenCells,
  yPixelsBetweenCells
);

regularLineGroup.setAttribute("class", "regularLine");
mySVG.appendChild(regularLineGroup);
