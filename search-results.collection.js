define([
    'underscore',
    'backbone',
    'models/search-result'
], function (_, Backbone, SearchResultModel) {
    'use strict';

    var SearchResultsCollection = Backbone.Collection.extend({
        model: SearchResultModel
    });

    return SearchResultsCollection;
});
