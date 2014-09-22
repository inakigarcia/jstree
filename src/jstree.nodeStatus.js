(function ($, undefined) {
	"use strict";
	var img = document.createElement("i");
	var classNameStatus = "jstree-nodeStatus"
	img.className = classNameStatus;
	$.jstree.defaults.nodeStatus = $.noop;
	$.jstree.plugins.nodeStatus = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this.element.on("click.jstree", ".jstree-nodeStatus", $.proxy(function (e) {
				e.stopImmediatePropagation();
				this.settings.nodeStatus.call(this, this.get_node(e.target));
			}, this));
		};
		this.teardown = function () {
			if(this.settings.nodeStatus) {
				this.element.find(".jstree-nodeStatus").remove();
			}
			parent.teardown.call(this);
		};
		this.redraw_node = function(obj, deep, callback) {
			obj = parent.redraw_node.call(this, obj, deep, callback);
			if(obj) {
				var node = this.get_node(obj).original;
				for(var i = 0; i < options.status.length; i++) {
					if(node.status === options.status[i].name) {
						var tmp = img.cloneNode(true);
						tmp.className = tmp.className + " " + options.status[i].icon;
	                    obj.insertBefore(tmp, obj.childNodes[2]);
					}
				}
			}
			return obj;
		};
	};
})(jQuery);
