'use strict';

exports.viewModel = function() {

    var self = this; 

    self.dataModels = ko.observableArray();
    
    self.addModel = function() {
        this.dataModels.push(new Model('', []));
    };

    self.removeModel = function(modelToRemove) {
        self.dataModels.remove(modelToRemove);
    };
    
    self.removeAllModel = function() {
        self.dataModels.removeAll();
    };

    self.availableDataTypes = ko.observableArray([
        "string", "int", "bool", "DateTime", "double", "byte[]"
    ]);
};

var Model = function(title, fields){
    var self = this;

    self.title = ko.observable(title);
    self.fields = ko.observableArray(fields);

    self.addField = function() {
        self.fields.push({
            name: '',
            type: ''
        });
    };

    self.removeField = function(passedField) {
        self.fields.remove(passedField);
    };
};