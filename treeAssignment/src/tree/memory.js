function Memory(parent) {
	this.parent = parent || [];
	this.self = {};
}

Memory.prototype.parentHasProperty = function(property) {
	return this.parent.some(function(each){
		return each.hasOwnProperty(property);
	});
}

Memory.prototype.updateParent = function(property, value) {
	this.parent.forEach(function(each){
		if(each.hasOwnProperty(property)){
			each[property] = value;
		}
	});
}

Memory.prototype.updateSelf = function(property, value) {
	this.self[property] = value;
}

Memory.prototype.getProperty = function(property) {
	var parent = this.parent.filter(function(each){
		return each.hasOwnProperty(property);
	});
	return parent[0][property];
}

Memory.prototype.add = function(property, value) {
	if(this.parentHasProperty(property)){
		this.updateParent(property, value);
	}else{
		this.updateSelf(property, value);
	}
}

Memory.prototype.get = function(property){
	if(this.parentHasProperty(property)) {
		return this.getProperty(property);
	}else{
		return this.self[property];
	}
}

module.exports = Memory;