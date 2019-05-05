module.exports ={
        chart: {
          type: "pie"
        },
        title: {
          text: "a random pie with runif(10)"
        },
        series: [
          {
            name: "runif(10)",
            colorByPoint: true,
            data: []
          }
        ]
      }