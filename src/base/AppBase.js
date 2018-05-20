/**
 * http://usejsdoc.org/
 */
requires('./Connection.js').Connection;
class AppBase{
	contruct(){
		this.connections ={};
	}
	static getConnections(){
		return this.connections;
	}
	static registerConnection(connection){
		connection instanceof Connections;
		this.connections +=connection;
	}
}