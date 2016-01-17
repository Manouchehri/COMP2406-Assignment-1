var fs = require("fs");

if(process.argv.length != 4) {
    console.log("What on earth are you doing?");
    console.log("Usage: node words-async.js document.txt wordlist.txt");
    process.exit(1337);
}

var doc_file = process.argv[2];
var word_list = process.argv[3];

fs.readFile(doc_file, "UTF-8", function(err, data) {
    if(err) {
        throw err;
    };
    
    var words = data.split(/\W/).sort();

    // Source: http://stackoverflow.com/a/23238595/2079814
    // Removes duplicates and strip out empty elements.
    words = words.filter(function(item, index) {
        return (item && item.length > 0) && words.indexOf(item) === index;
    })
    
    fs.writeFile(word_list, words.join('\n'), "UTF-8", function(err, data) {
        if(err) {
            console.log(data);
        }
        console.log("Finished!");
        process.exit(0);
    })
});