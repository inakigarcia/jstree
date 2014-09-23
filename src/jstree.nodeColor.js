/**
 * Changes font color for nodes with "color" property
 */

(function ($, undefined) {
	"use strict";
	var img = document.createElement("i");
	var classNameStatus = "jstree-nodeColor"
	img.className = classNameStatus;
	$.jstree.defaults.nodeColor = $.noop;
	$.jstree.plugins.nodeColor = function (options, parent) {
		this.redraw_node = function(obj, deep, callback) {
			obj = parent.redraw_node.call(this, obj, deep, callback);
			if(obj) {
				var node = this.get_node(obj).original;
				if(node.color) {
					var firstA = obj.getElementsByTagName("a")[0];
					firstA.style = "color: " + node.color + ";";
				}
			}
			return obj;
		};
	};
})(jQuery);
