library(jsonlite)
#' Make a random plot
#'
#' This function creates a random histogram plot.
#'
#' @export
#' @param n numer of random values
randomfruits <- function(n){

  stopifnot(n < 1e6)

  type = 'bar'
  chart = list(type=type)

  text = 'Fruit consumption'
  title = list(text=text)

  categories =  list('Apples', 'Bananas', 'Oranges')
  xAxis = list(categories=categories)

  yText = 'Fruit eaten'
  yTitle = list(text=yText)
  yAxis = list(title=yTitle)


  series = list(list(name="Jane",data= runif(n,1,100)),list(name="John",data= runif(n,1,100)))

  myResult = list(yAxis=yAxis,xAxis=xAxis,title=title,chart=chart,series=series)

  myResult
#  jsonoutput <- toJSON(myResult, simplifyVector = TRUE, pretty=FALSE, auto_unbox = TRUE)
#  jsonoutput
}
