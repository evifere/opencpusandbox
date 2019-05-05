library(jsonlite)
#' Make a random plot
#'
#' This function creates a random histogram plot.
#'
#' @export
#' @param n numer of random values
#' @param dist one of "normal" or "uniform".
randomplot2 <- function(n, dist=c("normal", "uniform")){
  #input validation
  dist <- match.arg(dist)
  stopifnot(n < 1e6)

  if(dist == "normal"){
    randomSeries <- rnorm(n)
    result <- hist( randomSeries,plot = FALSE)
  }

  if(dist == "uniform"){
    randomSeries <- runif(n)
    result <-  hist( runif(n),plot = FALSE)
  }

 #map hist object to a result jsonable object
 myResult = list(breaks = result$breaks, counts = result$counts, density = result$density, xname= result$xname,equidist = result$equidist,series=randomSeries)

 myResult
}
