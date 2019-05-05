library(jsonlite)
#' Make a random plot
#'
#' This function creates a random histogram plot.
#'
#' @export
#' @param n numer of random values
randompie <- function(n){

  stopifnot(n < 1e6)

 randomSeries <- runif(n,1,100)
 result <- pie( randomSeries,plot = FALSE)
 myResult = list(series=randomSeries)

 myResult
}
