console.log('hello');

let sum = a=>b=>c=>d=>{
    console.log(a,b,c,d);
}
function ak(a){
    return function(b){
        return function(c){
            return function(d){
                console.log(a,b,c,d);
            }
        }
    }
}
ak(1)(2)(3)(4);
