# Plot the chart.
# stats

#stats a vector of length 5, containing : , , the median, and the extreme of the upper whisker.
# see https://www.statisticshowto.datasciencecentral.com/upper-hinge-lower-hinge
# https://towardsdatascience.com/understanding-boxplots-5e2df7bcbd51?gi=312ea7c43453
# the extreme of the lower whisker
# the lower ‘hinge’ Q1
# the median       Q2
# the upper ‘hinge’  Q3
# the upper whisker
boxplotcars <- function(){
result <-boxplot(mpg ~ cyl, data = mtcars,
               xlab = "Number of Cylinders",
               ylab = "Miles Per Gallon",
               main = "Mileage Data",
               notch = TRUE,
               varwidth = TRUE,
               col = c("green","yellow","purple"),
               names = c("High","Medium","Low")
)

result$summary = unclass(summary(result$stats))


result
}
