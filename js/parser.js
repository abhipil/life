var Life = (function(my) {
    var Parser = function(fileType) {
        var me = this;
        var format, coordDelimiter, cellDelimiter;
        if (fileType === "lif") {
            format = "Life 1.06";
            commandDelimiter = "#";
            coordDelimiter = " ";
            cellDelimiter = "\n";
        }

        me.parse = function(data) {
            return data.split(cellDelimiter)
                .filter(function(line) {
                    return line.length>1 && !line.startsWith(commandDelimiter)
                })
                .map(function(line) {
                    return line.split(coordDelimiter)
                                .map(function(coord) {
                                    return parseInt(coord.trim(),10)
                                });
                });
        }
    }
    my.Parser = Parser;
    return my;
}(Life || {}))
