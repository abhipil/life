var Life = (function(my) {
    var Canvas = function(canvasID, cellSize) {
        var me = this;
        var canvas = document.getElementById(canvasID||"life");
        var ctx = canvas.getContext('2d');
        me.width = canvas.width;
        me.height = canvas.height;
        var universe;
        me.set = function(_universe) {
            universe = _universe
        }
        me.draw = function() {
            ctx.fillStyle = 'white';
            shadow = cellSize*0.2;
            ctx.fillRect(0, 0, me.width, me.height);
            var live = universe.filter(function(cell) {
                return cell.isAlive()
            });
            // live.forEach(function(cell) {
            //     ctx.fillStyle = 'grey';
            //     ctx.fillRect(cell.getX()*cellSize-shadow,cell.getY()*cellSize-shadow, cellSize+2*shadow, cellSize+2*shadow);
            // });
            live.forEach(function(cell) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(cell.getX()*cellSize, cell.getY()*cellSize, cellSize, cellSize);
            })
        }
        return me;
    }
    my.Canvas = Canvas;
    return my;
}(Life || {}));
