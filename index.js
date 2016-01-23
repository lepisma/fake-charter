#! /usr/bin/env node

var rita = require("rita"),
    path = require("path"),
    readline = require("readline"),
    asciify = require("asciify");

asciify("fake-charter", {font: "small"}, function(err, res) {
    console.log(res);
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.question("Enter n factor : ", function(d) {
        var n = parseInt(d);
        if (isNaN(n)) {
            console.log("Data type not understood...using default of 3");
            n = 3;
        }
        var markov = rita.RiMarkov(n);
        console.log("Reading text...");
        rita.RiTa.loadString(path.join(__dirname, "./data/combined.txt"), function (data) {
            markov.loadText(data);
            console.log("Done. Enter sentence length.\n");
            rl.setPrompt("Sentence length : ");
            rl.on("line", function(line) {
                var l = parseInt(line);
                if (isNaN(l)) {
                    console.log("Data type not understood...using default of 5");
                    l = 5;
                }
                console.log("Generating text...Sit back...");
                console.log("---\n" + markov.generateSentences(l).join(" ") + "\n---");
                rl.prompt();
            });
            rl.prompt(); 
        });
    });

    rl.on("close", function() {
        process.exit(0);
    })
});

