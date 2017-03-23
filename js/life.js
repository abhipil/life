var Life = (function(my) {
    var old = my;
    my = function(canvasID, initConfig, cellSize) {
        var me = this;
        if (initConfig) {
            initConfig = (new Life.Parser("lif")).parse(initConfig)
        } else {
            initConfig = [[0,2],[1,2],[2,2],[2,1],[1,0]]; // glider
        }
        //console.log(initConfig);
        var cellSize = cellSize || 3;

        var interval = 60;
        var hasStarted = null;
        var _canvas = new Life.Canvas(canvasID,cellSize);
        var universeWidth = Math.floor(_canvas.width/cellSize);
        var universeHeight = Math.floor(_canvas.height/cellSize);

        var _universe = new Life.Universe(universeWidth, universeHeight);
        _canvas.set(_universe);
        //this.universe = _universe;
        initConfig.forEach(function() {
            var randWidth = 30;// Math.floor(Math.random() * universeWidth);
            var randHeight = 25;// Math.floor(Math.random() * universeHeight);
            return function(initCell) {
                var cell =_universe.get(randWidth+initCell[0],randHeight+initCell[1]);
                if (!cell)
                    console.log((randWidth+initCell[0])+" "+(randHeight+initCell[1]));
                cell.reproduce()
            }
        }());

        

        this.start = function() {
            hasStarted = hasStarted || setInterval(function() {
                _canvas.draw()
                _universe.update()
            }, interval);
        }

        this.clear = function() {
            hasStarted = !hasStarted || clearInterval(hasStarted);
        }
        return this;
    };

    if (old) {
        for(var prop in old) {
            if(old.hasOwnProperty(prop))
                my.prop = old.prop;
        }
    }
    return my;
}(Life));
