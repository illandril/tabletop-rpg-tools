# SPDX-License-Identifier: MIT
# This is a nearley grammar for dice rolls
# See: https://nearley.js.org/docs/grammar#vocabulary
# Compile this into grammar.js by running `npx nearleyc grammar.ne -o grammar.js`

@{%
const {
  Combiner,
  Constant,
  Dice,
  DiceModifier,
  ValueModifier,
} = require('./grammar-types.js');
%}

main -> _ AS _ {% (d) => d[1] %}

# Parentheses
P -> "(" _ AS _ ")" {% (d) => d[2] %}
   | V {% id %}

# Exponents
E -> P _ "^" _ E {% (d) => Combiner(d[0], '^', d[4]) %}
   | P _ "**" _ E {% (d) => Combiner(d[0], '^', d[4]) %}
   | P {% id %}

# Multiplication and division
MD -> MD _ "*" _ E {% (d) => Combiner(d[0], '*', d[4]) %}
    | MD _ "x" _ E {% (d) => Combiner(d[0], '*', d[4]) %}
    | MD _ "×" _ E {% (d) => Combiner(d[0], '*', d[4]) %}
    | MD _ "/" _ E {% (d) => Combiner(d[0], '/', d[4]) %}
    | MD _ "÷" _ E {% (d) => Combiner(d[0], '/', d[4]) %}
    | MD _ "%" _ E {% (d) => Combiner(d[0], '%', d[4]) %}
    | E {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% (d) => Combiner(d[0], '+', d[4]) %}
    | AS _ "-" _ MD {% (d) => Combiner(d[0], '-', d[4]) %}
    | AS _ "–" _ MD {% (d) => Combiner(d[0], '-', d[4]) %} #en dash
    | AS _ "—" _ MD {% (d) => Combiner(d[0], '-', d[4]) %} #em dash
    | MD {% id %}

# Modified dice rolls
DM -> NDR "kl" N {% (d) => DiceModifier('kl', d[0], d[2]) %}
    | NDR "kh" N {% (d) => DiceModifier('kh', d[0], d[2]) %}
    | NDR "k" N {% (d) => DiceModifier('kh', d[0], d[2]) %}
    | NDR "dl" N {% (d) => DiceModifier('dl', d[0], d[2]) %}
    | NDR "dh" N {% (d) => DiceModifier('dh', d[0], d[2]) %}
    | NDR "!" {% (d) => DiceModifier('!', d[0], '=', null) %}
    | NDR "!" N {% (d) => DiceModifier('!', d[0], '=', d[2]) %}
    | NDR "!>" N {% (d) => DiceModifier('!', d[0], '>', d[2]) %}
    | NDR "!<" N {% (d) => DiceModifier('!', d[0], '<', d[2]) %}
    | NDR "!=" N {% (d) => DiceModifier('!', d[0], '=', d[2]) %}
    | DR {% id %}

# A dice roll
DR -> NDR {% id %}
    | SDR {% id %}

# A symbolic dice roll
SDR -> N "df" {% ([n, df]) => Dice(n, 'f') %}
    | "df" {% () => Dice(1, 'f') %}

# A numeric dice roll
NDR -> N "d" N {% ([n, d, x]) => Dice(n, x) %}
    | "d" N {% ([d, x]) => Dice(1, x) %}
    | N "d%" {% ([n, d]) => Dice(n, 100) %}
    | "d%" {% () => Dice(1, 100) %}
    | N "df" {% ([n, df]) => Dice(n, 'f') %}
    | "df" {% () => Dice(1, 'f') %}

VM -> "floor(" _ AS _ ")" {% (d) => ValueModifier('floor', d[2]) %}
    | "ceil(" _ AS _ ")" {% (d) => ValueModifier('ceil', d[2]) %}
    | "round(" _ AS _ ")" {% (d) => ValueModifier('round', d[2]) %}
    | "-" _ P {% (d) => ValueModifier('negate', d[2]) %}

V -> DM {% id %}
   | VM {% id %}
   | N {% ([n]) => Constant(n) %}

# An integer number
N -> [0-9]:+ {% (d) => parseInt(d[0].join(""),10) %}

# Whitespace
_ -> [\s]:*     {% (d) => null %}
