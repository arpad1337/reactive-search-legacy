define([
	'jquery',
	'bacon'
], function(
	$,
	Bacon
){
	var SearchService = (function(){
		var _url = CONFIG.apiURL + '/search';
		var _isInitialized = false;
		return {
			init: function() {
				if(!_isInitialized) {
					_isInitialized = true;
				}
				return this;
			},
			search: function(keywords) {
				return Bacon.$.ajaxPost(_url, {
					keywords: keywords
				});
			},
			filterPosts: function(scope, tags) {
				//$.post(CONFIG.apiURL + scope)
			},
			filteredPostCollection: {},
			filteredUserCollection: {},
			filteredGroupCollection: {}
		};
	})();
	return SearchService.init();
});
