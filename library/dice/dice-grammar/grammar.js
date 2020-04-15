// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const {
  Combiner,
  Constant,
  Dice,
  DiceModifier,
  ValueModifier,
} = require('./grammar-types.js');
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "AS", "_"], "postprocess": (d) => d[1]},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": (d) => d[2]},
    {"name": "P", "symbols": ["V"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '^', d[4])},
    {"name": "E$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E", "symbols": ["P", "_", "E$string$1", "_", "E"], "postprocess": (d) => Combiner(d[0], '^', d[4])},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '*', d[4])},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"x"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '*', d[4])},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"×"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '*', d[4])},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '/', d[4])},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"÷"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '/', d[4])},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"%"}, "_", "E"], "postprocess": (d) => Combiner(d[0], '%', d[4])},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": (d) => Combiner(d[0], '+', d[4])},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": (d) => Combiner(d[0], '-', d[4])},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"–"}, "_", "MD"], "postprocess": (d) => Combiner(d[0], '-', d[4])},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"—"}, "_", "MD"], "postprocess": (d) => Combiner(d[0], '-', d[4])},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "DM$string$1", "symbols": [{"literal":"k"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$1", "N"], "postprocess": (d) => DiceModifier('kl', d[0], d[2])},
    {"name": "DM$string$2", "symbols": [{"literal":"k"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$2", "N"], "postprocess": (d) => DiceModifier('kh', d[0], d[2])},
    {"name": "DM", "symbols": ["DR", {"literal":"k"}, "N"], "postprocess": (d) => DiceModifier('kh', d[0], d[2])},
    {"name": "DM$string$3", "symbols": [{"literal":"d"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$3", "N"], "postprocess": (d) => DiceModifier('dl', d[0], d[2])},
    {"name": "DM$string$4", "symbols": [{"literal":"d"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$4", "N"], "postprocess": (d) => DiceModifier('dh', d[0], d[2])},
    {"name": "DM", "symbols": ["DR", {"literal":"!"}], "postprocess": (d) => DiceModifier('!', d[0], '=', null)},
    {"name": "DM", "symbols": ["DR", {"literal":"!"}, "N"], "postprocess": (d) => DiceModifier('!', d[0], '=', d[2])},
    {"name": "DM$string$5", "symbols": [{"literal":"!"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$5", "N"], "postprocess": (d) => DiceModifier('!', d[0], '>', d[2])},
    {"name": "DM$string$6", "symbols": [{"literal":"!"}, {"literal":"<"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$6", "N"], "postprocess": (d) => DiceModifier('!', d[0], '<', d[2])},
    {"name": "DM$string$7", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DM", "symbols": ["DR", "DM$string$7", "N"], "postprocess": (d) => DiceModifier('!', d[0], '=', d[2])},
    {"name": "DM", "symbols": ["DR"], "postprocess": id},
    {"name": "DR", "symbols": ["N", {"literal":"d"}, "N"], "postprocess": ([n, d, x]) => Dice(n, x)},
    {"name": "DR", "symbols": [{"literal":"d"}, "N"], "postprocess": ([d, x]) => Dice(1, x)},
    {"name": "DR$string$1", "symbols": [{"literal":"d"}, {"literal":"%"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DR", "symbols": ["N", "DR$string$1"], "postprocess": ([n, d]) => Dice(n, 100)},
    {"name": "DR$string$2", "symbols": [{"literal":"d"}, {"literal":"%"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DR", "symbols": ["DR$string$2"], "postprocess": () => Dice(1, 100)},
    {"name": "DR$string$3", "symbols": [{"literal":"d"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DR", "symbols": ["N", "DR$string$3"], "postprocess": ([n, df]) => Dice(n, 'f')},
    {"name": "DR$string$4", "symbols": [{"literal":"d"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DR", "symbols": ["DR$string$4"], "postprocess": () => Dice(1, 'f')},
    {"name": "VM$string$1", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"r"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VM", "symbols": ["VM$string$1", "_", "AS", "_", {"literal":")"}], "postprocess": (d) => ValueModifier('floor', d[2])},
    {"name": "VM$string$2", "symbols": [{"literal":"c"}, {"literal":"e"}, {"literal":"i"}, {"literal":"l"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VM", "symbols": ["VM$string$2", "_", "AS", "_", {"literal":")"}], "postprocess": (d) => ValueModifier('ceil', d[2])},
    {"name": "VM$string$3", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"n"}, {"literal":"d"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VM", "symbols": ["VM$string$3", "_", "AS", "_", {"literal":")"}], "postprocess": (d) => ValueModifier('round', d[2])},
    {"name": "VM", "symbols": [{"literal":"-"}, "_", "P"], "postprocess": (d) => ValueModifier('negate', d[2])},
    {"name": "V", "symbols": ["DM"], "postprocess": id},
    {"name": "V", "symbols": ["VM"], "postprocess": id},
    {"name": "V", "symbols": ["N"], "postprocess": ([n]) => Constant(n)},
    {"name": "N$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "N$ebnf$1", "symbols": ["N$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "N", "symbols": ["N$ebnf$1"], "postprocess": (d) => parseInt(d[0].join(""),10)},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": (d) => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
