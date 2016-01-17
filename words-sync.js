var fs = require("fs");

if(process.argv.length != 4) {
    console.log("What on earth are you doing?");
    console.log("Usage: node words-sync.js document.txt wordlist.txt");
    process.exit(1337);
}

var doc_file = process.argv[2];
var word_list = process.argv[3];

var raw_doc_file = fs.readFileSync(doc_file, "UTF-8");

var words = raw_doc_file.split(/\W/).sort();

// Source: http://stackoverflow.com/a/23238595/2079814
// Removes duplicates and strip out empty elements.
words = words.filter(function(item, index) {
    return (item && item.length > 0) && words.indexOf(item) === index;
})

fs.writeFileSync(word_list, words.join('\n'), "UTF-8");

console.log("Finished!");
process.exit(0);