var Tree = require(process.cwd() + '/Tree.js');

function Node(node) {
	this.node = node;
}

Node.prototype = {
	evaluate : function(memory){
		memory['_'] = this.node;
		return memory;
	}
};

module.exports = Node;
