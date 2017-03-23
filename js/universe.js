var Life = (function(my) {
    my.Universe = function(width, height) {
        var me = this;

        var grid = new Array(width*height)

        var toroidize = function(x, y) {
            return ((x%width)+width)%width + ((y%height)+height)%height*width
        }

        var createCell = function(x, y) {
            var cell = {};
            var alive = false;
            var neighbours = (function() {
                var n = [];
                var index = [-1,0,1];
                index.forEach(function(w){
                    //if(w+x<0 || w+x>=width) return;
                    index.forEach(function(h){
                        if(w===0&&h===0) return;
                        n.push(toroidize(w+x,y+h));
                    });
                });
                return n;
            }());

            cell.getX = function() { return x };
            cell.getY = function() { return y };
            cell.isAlive = function() { return alive };
            cell.kill = function() {
                alive = false
            }
            cell.reproduce = function() {
                alive = true
            }
            cell.numNeighbours = function() {
                return neighbours.filter(function(c) {
                    return grid[c].isAlive()
                }).length;
            }
            return cell;
        };

        (function(grid, w, h) {
            for(var i = 0; i < w; i++){
                for(var j = 0; j < h; j++){
                    (function(){
                        grid[i+j*w] = createCell(i,j);
                    }());           
                }
            }
        }(grid, width, height));

        me.update = function() {
            var killThese = grid.filter(function(cell) {
                var num = cell.numNeighbours();
                return num<2 || num>3;
            });
            grid.filter(function(cell) {
                return cell.numNeighbours()==3;
            }).forEach(function(cell) {
                cell.reproduce()
            });
            killThese.forEach(function(cell) {
                cell.kill()
            })
        }
        me.get = function(x, y) {
            return grid[toroidize(x,y)];
        };

        me.filter = function(fn) {
            return grid.filter(fn)
        };

        return me;
    };
    return my;
}(Life || {}))
