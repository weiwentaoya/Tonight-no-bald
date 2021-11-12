var simplifyPath = function(path) {
    const paths = path.split('/')
    const arr = []
    for (let i = 0; i < paths.length; i++) {
        if(paths[i] === '..'){
            arr.pop()
        } else if (paths[i] !== ''&&paths[i] !== '.') {
            arr.push(paths[i])
        }
    }
    const str = '/'+arr.join('/')
    
    return str
};
simplifyPath("/a/../../b/../c//.//")
simplifyPath("/../")
simplifyPath("/home/")
simplifyPath('/home//foo/')
simplifyPath("/a/./b/../../c/")
// console.log(simplifyPath('/home//foo/'));
// console.log(simplifyPath("/a/./b/../../c/"));
