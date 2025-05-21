define([
	'views/layout/search-results',
	'services/search',
	'collections/search-results',
	'models/search-result',
], function(
	SearchResultsView,
	SearchService,
	SearchResultsCollection,
	SearchResultModel
){
	var SearchController = (function(){
		var _isInitialized = false;
		var _resultsEventStream = {};
		var _onResults = function(results) {
			self.collection.reset();
			for(var el in results.data) {
				self.collection.add(
					new SearchResultModel(results.data[el])
				);
			}
			self.searchResultsView.trigger('change');
		};
		var _setControlFlow = function() {
			var text = self.searchResultsView.typeStream
				.debounce(500)
				.map(function(e){
					var text = $.trim(e.target.value);
					return text.replace(/ +(?= )/g,'');
				})
				.skipDuplicates();
			_resultsEventStream = text.flatMapLatest(SearchService.search);
			_resultsEventStream.onValue(_onResults);
		};
		var self = {
			init: function(){
				if(!_isInitialized) {
					_isInitialized = true;
					this.collection = new SearchResultsCollection();
					this.searchResultsView = new SearchResultsView({
						collection: this.collection
					});
				}
				this.searchResultsView.bind('render', _setControlFlow);
				this.searchResultsView.render();
				return this;
			},
			collection: {},
			searchResultsView: {}
		};
    return self;
	})();

	return SearchController;
});
