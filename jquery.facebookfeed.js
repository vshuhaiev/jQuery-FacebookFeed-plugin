/*
 * jQuery FacebookFeed Plugin
 * Requires jQuery 1.4.2
 * Requires jQuery Templates Plugin 1.0.0pre
 * Author Vladimir Shugaev <vladimir.shugaev@junvo.com>
 * Copyright Vladimir Shugaev <vladimir.shugaev@junvo.com>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($){
    $.fn.facebookfeed=function(options){
		var settings={
			id: '145975662131224', //id of the facebook entity
            template: '<h4>${from.name}</h4><p>${message}</p><p>Read more:&nbsp;<a href="${link}">${name}</a></p>', //template for formatting each feed entry
            limit: null, //amount of messages to retrieve
			offset: null, //amount of messages to skip from the begining
			until: null, //unix timestamp of the end of period
			since: null //unix timestamp of the beginning of the period
		};
		if (options)
			$.extend(settings, options);
		var params = {};
		if (settings.limit!==null)
			params.limit=settings.limit;
		if (settings.offset!==null)
			params.offset=settings.offset;
		if (settings.until!==null)
			params.until=settings.until;
		if (settings.since!==null)
			params.since=settings.since;
		var container=this;
		var requestURL='https://graph.facebook.com/'+settings.id+'/feed?'+$.param(params)+'&callback=?'; //calback=? is required to get JSONP behaviour
		var template=$.template(null, settings.template);

		$.getJSON(requestURL, function(json){
			var messages=$.tmpl(template, json.data).appendTo(container);
		});
		return this;
	};
})(jQuery);