var CreateDiv = (function(){
    var instance;
    var CreateDiv = function( html ){
        if ( instance ){
            return instance; 
        }
        this.html = html;
        this.init();
        return instance = this;
    };
    CreateDiv.prototype.init = function() {
        // var div = document.createElement( 'div' );
        // div.innerHTML = this.html;
        // document.body.appendChild( div );
    };
    return CreateDiv;
})();
var a = new CreateDiv( 'sven1' );
var b = new CreateDiv( 'sven2' );

console.log(a === b)