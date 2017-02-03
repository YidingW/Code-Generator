const {
    ipcRenderer
} = require('electron');
const fs = require('fs');
const handlebars = require('handlebars');

const dragbar = require('./dragbar');
const dragresize = require('./drag-resize')
const {
    viewModel
} = require('./viewmodel');

dragbar.init();
dragresize.init();

var vm = new viewModel();
ko.applyBindings(vm);

ipcRenderer.on('new-model-event', () => {
    vm.addModel();
});

ipcRenderer.on('clear-model-event', () => {
    vm.removeAllModel();
});

ipcRenderer.on('export-model-event', () => {
    fs.readFile('./Templates/model-template.handlebars', 'utf-8', function (error, source) {

        let inputData = JSON.parse(ko.toJSON(vm.dataModels));

        if (inputData.length == 0) return false;

        inputData.forEach(function (model) {
            if (model.title != '') {
                let template = handlebars.compile(source);
                let output = template(model);

                let fileName = model.title + ".cs";
                fs.writeFile('./Output/Models/' + fileName, output, {
                    flag: 'wx'
                }, function (err) {
                    if (err) {
                        console.log(err);
                        ipcRenderer.send('file-save-error', err.message);
                        return false;
                    }
                });
            }
        }, this);

        return false;
    });

    fs.readFile('./Templates/sql-template.handlebars', 'utf-8', function (error, source) {
        let models = JSON.parse(ko.toJSON(vm.dataModels));

        models.forEach(function (model) {
            let template = handlebars.compile(source);
            let output = template(model);
            let fileName = model.title + "-create.sql";
            fs.writeFile('./Output/SQL/' + fileName, output, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

    });
});