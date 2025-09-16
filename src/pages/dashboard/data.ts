export const chartOptions = {
  grid: { 
    top: 8, 
    right: 8, 
    bottom: 24, 
    left: 46 
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [38820, 43932, 39901, 42934, 44290, 51330, 48320],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#4CAF50", // Green
        width: 2
      },
    },
     {
      data: [42820, 43932, 40501, 44934, 42290, 38820, 35320],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#FFC107", // Yellow
        width: 2
      },
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};