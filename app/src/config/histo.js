module.exports={
  chart: {
    type: "column"
  },
  title: {
    text: "Histogram of rnorm(n)"
  },
  subtitle: {
    text: ""
  },
  yAxis: {
    title: {
      text: "Frequency"
    }
  },
  tooltip: {
    headerFormat:
      '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
      shadow: false
    }
  },
  series: [
    {
      name: "Rnorm(n)",
      data: []
    }
  ]
}