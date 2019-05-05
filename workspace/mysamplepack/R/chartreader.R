library(jsonlite)

chartreader <- function(filename='data.json'){
  result <-  read_json( 'data.json', simplifyVector = TRUE)
  result
}
