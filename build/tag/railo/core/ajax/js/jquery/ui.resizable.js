/*
 * jQuery UI Resizable 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.resizable",d.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");d.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&d.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(d('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!d(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var e=0;e<c.length;e++){var g=d.trim(c[e]),f=d('<div class="ui-resizable-handle '+("ui-resizable-"+g)+'"></div>');/sw|se|ne|nw/.test(g)&&f.css({zIndex:++a.zIndex});"se"==g&&f.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[g]=".ui-resizable-"+g;this.element.append(f)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=d(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=d(this.handles[i],this.element),l=0;l=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,l);this._proportionallyResize()}d(this.handles[i])}};this._renderAxis(this.element);this._handles=d(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();d(this.element).addClass("ui-resizable-autohide").hover(function(){d(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){d(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){d(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(d(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
e=this.element;this.resizing=true;this.documentScroll={top:d(document).scrollTop(),left:d(document).scrollLeft()};if(e.is(".ui-draggable")||/absolute/.test(e.css("position")))e.css({position:"absolute",top:c.top,left:c.left});d.browser.opera&&/relative/.test(e.css("position"))&&e.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var g=m(this.helper.css("top"));if(a.containment){c+=d(a.containment).scrollLeft()||0;g+=d(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:g};this.size=this._helper?{width:e.outerWidth(),height:e.outerHeight()}:{width:e.width(),height:e.height()};this.originalSize=this._helper?{width:e.outerWidth(),height:e.outerHeight()}:{width:e.width(),height:e.height()};this.originalPosition={left:c,top:g};this.sizeDiff={width:e.outerWidth()-e.width(),height:e.outerHeight()-e.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=d(".ui-resizable-"+this.axis).css("cursor");d("body").css("cursor",a=="auto"?this.axis+"-resize":a);e.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,e=this._change[this.axis];if(!e)return false;c=e.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var e=this._proportionallyResizeElements,g=e.length&&/textarea/i.test(e[0].nodeName);e=g&&d.ui.hasScroll(e[0],"left")?0:c.sizeDiff.height;
g={width:c.size.width-(g?0:c.sizeDiff.width),height:c.size.height-e};e=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var f=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(d.extend(g,{top:f,left:e}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}d("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",
b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(k(b.left))this.position.left=b.left;if(k(b.top))this.position.top=b.top;if(k(b.height))this.size.height=b.height;if(k(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,e=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(e=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(e=="nw"){b.top=
a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,e=k(b.width)&&a.maxWidth&&a.maxWidth<b.width,g=k(b.height)&&a.maxHeight&&a.maxHeight<b.height,f=k(b.width)&&a.minWidth&&a.minWidth>b.width,h=k(b.height)&&a.minHeight&&a.minHeight>b.height;if(f)b.width=a.minWidth;if(h)b.height=a.minHeight;if(e)b.width=a.maxWidth;if(g)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,
l=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(f&&l)b.left=i-a.minWidth;if(e&&l)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(g&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var e=[c.css("borderTopWidth"),
c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],g=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=d.map(e,function(f,h){f=parseInt(f,10)||0;h=parseInt(g[h],10)||0;return f+h})}d.browser.msie&&(d(b).is(":hidden")||d(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=
this.element.offset();if(this._helper){this.helper=this.helper||d('<div style="overflow:hidden;"></div>');var a=d.browser.msie&&d.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+
a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return d.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return d.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return d.extend(this._change.n.apply(this,
arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return d.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){d.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});d.extend(d.ui.resizable,
{version:"1.8.2"});d.ui.plugin.add("resizable","alsoResize",{start:function(){var b=d(this).data("resizable").options,a=function(c){d(c).each(function(){d(this).data("resizable-alsoresize",{width:parseInt(d(this).width(),10),height:parseInt(d(this).height(),10),left:parseInt(d(this).css("left"),10),top:parseInt(d(this).css("top"),10)})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else d.each(b.alsoResize,function(c){a(c)});
else a(b.alsoResize)},resize:function(){var b=d(this).data("resizable"),a=b.options,c=b.originalSize,e=b.originalPosition,g={height:b.size.height-c.height||0,width:b.size.width-c.width||0,top:b.position.top-e.top||0,left:b.position.left-e.left||0},f=function(h,i){d(h).each(function(){var j=d(this),l=d(this).data("resizable-alsoresize"),p={};d.each((i&&i.length?i:["width","height","top","left"])||["width","height","top","left"],function(n,o){if((n=(l[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(/relative/.test(j.css("position"))&&
d.browser.opera){b._revertToRelativePosition=true;j.css({position:"absolute",top:"auto",left:"auto"})}j.css(p)})};typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?d.each(a.alsoResize,function(h,i){f(h,i)}):f(a.alsoResize)},stop:function(){var b=d(this).data("resizable");if(b._revertToRelativePosition&&d.browser.opera){b._revertToRelativePosition=false;el.css({position:"relative"})}d(this).removeData("resizable-alsoresize-start")}});d.ui.plugin.add("resizable","animate",{stop:function(b){var a=
d(this).data("resizable"),c=a.options,e=a._proportionallyResizeElements,g=e.length&&/textarea/i.test(e[0].nodeName),f=g&&d.ui.hasScroll(e[0],"left")?0:a.sizeDiff.height;g={width:a.size.width-(g?0:a.sizeDiff.width),height:a.size.height-f};f=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(d.extend(g,h&&f?{top:h,left:f}:{}),{duration:c.animateDuration,easing:c.animateEasing,
step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};e&&e.length&&d(e[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});d.ui.plugin.add("resizable","containment",{start:function(){var b=d(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof d?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=
d(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:d(document),left:0,top:0,width:d(document).width(),height:d(document).height()||document.body.parentNode.scrollHeight}}else{var e=d(a),g=[];d(["Top","Right","Left","Bottom"]).each(function(i,j){g[i]=m(e.css("padding"+j))});b.containerOffset=e.offset();b.containerPosition=e.position();b.containerSize={height:e.innerHeight()-g[3],width:e.innerWidth()-g[1]};c=b.containerOffset;
var f=b.containerSize.height,h=b.containerSize.width;h=d.ui.hasScroll(a,"left")?a.scrollWidth:h;f=d.ui.hasScroll(a)?a.scrollHeight:f;b.parentData={element:a,left:c.left,top:c.top,width:h,height:f}}}},resize:function(b){var a=d(this).data("resizable"),c=a.options,e=a.containerOffset,g=a.position;b=a._aspectRatio||b.shiftKey;var f={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))f=e;if(g.left<(a._helper?e.left:0)){a.size.width+=a._helper?a.position.left-e.left:
a.position.left-f.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?e.left:0}if(g.top<(a._helper?e.top:0)){a.size.height+=a._helper?a.position.top-e.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?e.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-f.left:a.offset.left-f.left)+a.sizeDiff.width);e=Math.abs((a._helper?a.offset.top-f.top:a.offset.top-
e.top)+a.sizeDiff.height);g=a.containerElement.get(0)==a.element.parent().get(0);f=/relative|absolute/.test(a.containerElement.css("position"));if(g&&f)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(e+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-e;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=d(this).data("resizable"),a=b.options,c=b.containerOffset,e=b.containerPosition,
g=b.containerElement,f=d(b.helper),h=f.offset(),i=f.outerWidth()-b.sizeDiff.width;f=f.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(g.css("position"))&&d(this).css({left:h.left-e.left-c.left,width:i,height:f});b._helper&&!a.animate&&/static/.test(g.css("position"))&&d(this).css({left:h.left-e.left-c.left,width:i,height:f})}});d.ui.plugin.add("resizable","ghost",{start:function(){var b=d(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,
display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=d(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=d(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});d.ui.plugin.add("resizable","grid",{resize:function(){var b=
d(this).data("resizable"),a=b.options,c=b.size,e=b.originalSize,g=b.originalPosition,f=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-e.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-e.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(f)){b.size.width=e.width+h;b.size.height=e.height+a}else if(/^(ne)$/.test(f)){b.size.width=e.width+h;b.size.height=e.height+a;b.position.top=g.top-a}else{if(/^(sw)$/.test(f)){b.size.width=e.width+h;b.size.height=
e.height+a}else{b.size.width=e.width+h;b.size.height=e.height+a;b.position.top=g.top-a}b.position.left=g.left-h}}});var m=function(b){return parseInt(b,10)||0},k=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;

