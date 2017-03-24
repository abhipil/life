var Universe = require('./universe.js')
var Canvas = require('./canvas.js')
var Parser = require('./parser.js')
var templates = require('./templates.js')

var Life = function(canvasID, initConfig, cellSize) {
    var me = this
    var canvasID = canvasID ? canvasID : ""
    var initConfig = initConfig || templates.random()
    initConfig = (new Parser('lif')).parse(initConfig)

    var interval = 60
    var hasStarted = null
    var _canvas = new Canvas(canvasID,cellSize)
    var universeWidth = Math.floor(_canvas.width/_canvas.cellSize)
    var universeHeight = Math.floor(_canvas.height/_canvas.cellSize)

    var _universe = new Universe(universeWidth, universeHeight)
    _canvas.set(_universe)
    //this.universe = _universe
    initConfig.forEach(function() {
        var randWidth = 45
        var randHeight = 30
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
