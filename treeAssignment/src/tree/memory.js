function Memory(parent) {
	this.parent = parent;
	this.self = {};
}

Memory.prototype.add = function(property, value) {
	if(this.parent){
		if(!this.parent.updateParent(property, value)){
			this.self[property] = value;
			return this;
		}
	}else{
		this.self[property] = value;
		return this;
	}
}

Memory.prototype.updateParent = function(property, value) {
	if(this.self.hasOwnProperty(property)) {
		this.self[property] = value;
		return true;
	}else{
		if(this.parent){
			return this.parent.updateParent(property, value);
		}
	}
	return false;
}
Memory.prototype.get = function(property, value) {
	if(this.self.hasOwnProperty(property)) {
		return this.self[property]
	}else{
		if(this.parent){
			return this.parent.get(property, value);
		}
	}
}

module.exports = Memory;