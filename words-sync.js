var fs = require("fs");

if(process.argv.length != 4) {
    console.log("What on earth are you doing?");
    console.log("Usage: node words-sync.js document.txt wordlist.txt");
    process.exit(1337);
}

var doc_file = process.argv[2];
var word_list = process.argv[3];

var raw_doc_file = fs.readFileSync(doc_file, "UTF-8");
var raw_doc_file_split = raw_doc_file.split("\n");

// Can't get this to work.
// var word_splitter = new RegExp("/\W//");

var words = [];

for(var i = 0; i < raw_doc_file_split.length; i++) {
    words = words.concat(raw_doc_file_split[i].split(" "));
}

words.sort();

// Source: http://stackoverflow.com/a/23238595/2079814
words = words.filter(function(item, index) {
    return words.indexOf(item) == index;
})

words = words.filter(Boolean); // Strip out empty elements.

var output_holder = "";

for(var i = 0; i < words.length; i++) {
    output_holder += words[i] + "\n";
}
output_holder = output_holder.substr(0, output_holder.length - 1); // Strip away the last newline.

fs.writeFileSync(word_list, output_holder, "UTF-8");

process.exit(0);