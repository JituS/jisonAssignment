function Memory(parent) {
	this.parent = parent;
	this.self = {};
}

Memory.prototype.add = function(property, value) {
	if(this.parent){
		if(!this.parent.updateParent(property, value)){
			this.self[property] = value;
		}
	}else{
		this.self[property] = value;
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