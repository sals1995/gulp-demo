const replace = require("gulp-replace");
const path = require("path")


// pattern {prefix: "href" ,path: "", output:"assets/css/",rename: false, filename: "",}
function resolver(pattern, {...args}) {
    return replace(pattern, (match) => {
        let filename = path.basename(match).replace('"',"").replace("'", "");
        if (args.rename) return `${args.prefix}="${args.output}/${filename}"`
        return `${args.prefix}="${args.output}/${filename}"`
    })
}

exports.resolver = resolver;