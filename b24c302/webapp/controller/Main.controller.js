sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    
], function(Controller, JSONModel) {
	
    "use strict";

	return Controller.extend("b24c302.controller.Main", {
        
        onInit: function() {           
            this._loadCountries();
            this._loadEmployees();            
            this._loadLayout();
        },
        //Los modelos se pueden cargar desde 
        //Archivo manifest.json = disponible para todas las vistas
        //Un controlador especifico = solo para que se pueda visualizar en una vista especifica

        // Llama a Modelo (Countries) contenedor de info 
        _loadCountries:function () {
            let oModelCountries = new JSONModel();
                oModelCountries.loadData("../model/Countries.json");
            // console.log(oModelCountries);
            this.getView().setModel(oModelCountries, "jsonCountries");
        },

        // Llama a Modelo (Employees) contenedor de info 
        _loadEmployees:function () {
            let oModelCountries = new JSONModel();
            oModelCountries.loadData("../model/Employees.json");
            // console.log(oModelEmployees);
            this.getView().setModel(oModelCountries,"jsonEmployees");
        },

        // Llama a Modelo (Layout) contenedor de info 
        _loadLayout:function () {
            let oModelCountries = new JSONModel();
            oModelCountries.loadData("../model/Layouts.json");
            // console.log(oModelLayout);
            this.getView().setModel(oModelCountries,"jsonLayout");
        }

    });

});