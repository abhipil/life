var Universe = require('./universe.js')
var Canvas = require('./canvas.js')
var Parser = require('./parser.js')
var templates = require('./templates.js')

var Life = function(canvasID, initConfig, cellSize) {
    var me = this
    var canvasID = canvasID ? canvasID : ""
    var initConfig = initConfig || templates.random()
    initConfig = (new Parser('lif')).parse(initConfig)

    //console.log(initConfig)
    var cellSize = cellSize || 3

    var interval = 60
    var hasStarted = null
    var _canvas = new Canvas(canvasID,cellSize)
    var universeWidth = Math.floor(_canvas.width/cellSize)
    var universeHeight = Math.floor(_canvas.height/cellSize)

    var _universe = new Universe(universeWidth, universeHeight)
    _canvas.set(_universe)
    //this.universe = _universe
    initConfig.forEach(function() {
        var randWidth = 40// Math.floor(Math.random() * universeWidth)
        var randHeight = 25// Math.floor(Math.random() * universeHeight)
        return function(initCell) {
            var cell =_universe.get(randWidth+initCell[0],randHeight+initCell[1])
            if (!cell)
                console.log((randWidth+initCell[0])+' '+(randHeight+initCell[1]))
            cell.reproduce()
        }
    }())

    this.start = function() {
        hasStarted = hasStarted || setInterval(function() {
            _canvas.draw()
            _universe.update()
        }, interval)
    }

    this.clear = function() {
        hasStarted = !hasStarted || clearInterval(hasStarted)
    }
    return this
}

module.exports = Life
