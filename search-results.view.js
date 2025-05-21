define([
    'jquery',
    'underscore',
    'backbone',
    'bacon',
    'templates/common/search',
    'templates/common/search-results',
], function($, _, Backbone, Bacon, tpl1, tpl2) {
    'use strict';

    var SearchResultsView = Backbone.View.extend({
        template1: tpl1,
        template2: tpl2,
        el: '#search',
        keyword: "",
        typeStream: {},
        events: {
            'click a': 'optionSelected',
            'keyup #search': 'keywordChange'
        },
        title: "",
        initialize: function() {
            this.bind('change', this.renderResults, this);
        },
        render: function() {
            this.$el.html(this.template1({
                keyword: this.keyword,
                results: this.template2({
                    results: this.collection.toJSON(),
                    keyword: this.keyword
                })
            }));
            this.typeStream = this.$el.find('input').asEventStream('keyup');
            this.trigger('render');
        },
        renderResults: function() {
            this.$el.addClass('show-results');
            this.$el.find("#search-results").html(
                this.template2({results:this.collection.toJSON(), keyword: this.keyword})
                );
            this.delegateEvents();
        },
        keywordChange: function(e) {
            this.keyword = $.trim(e.target.value);
            this.keyword = this.keyword.replace(/ +(?= )/g,'');
        },
        optionSelected: function(e) {
            console.log(arguments);
            this.setTitle($(e.currentTarget).attr('data-label'));
            this.$el.removeClass('show-results');
        },
        hideResults: function(e){
            if(this.title.length === 0) {
                $(e.target).parent().removeClass('opened');
                $(e.target).val('');
            }
            $(e.target).parent().removeClass('show-results');
        },
        setTitle: function(title) {
            this.title = title;
            if(title && title.length > 0) {
                this.$el.addClass('opened'); 
                this.$el.find('input').attr('placeholder', title);
            } else {
                this.$el.removeClass('opened');
                this.$el.find('input').attr('placeholder', 'Search...');
            }
            this.$el.find('input').val('');
        }
    });
    return SearchResultsView;
});
