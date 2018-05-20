/**
 * http://usejsdoc.org/
 */
class Connection{	
	construct(){
		this.connection ={};
	}
	addConnection(newConnection){
		this.connection+=newConnection;
	}
}

module.exports ={Connection : Connection}; 