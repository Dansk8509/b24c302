sap.ui.define([
    "sap/ui/core/mvc/Controller",
    
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"

],
function (Controller, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("b24c302.controller.MasterEmployee", {

        onInit: function () {
 

        },

        
        
        onValidate: function () {
          let oInput = this.getView().byId("inputEmployee"),
              sValue = oInput.getValue();

            if(sValue.length === 6) {
                oInput.setDescription("OK");
            } else{
                oInput.setDescription("Not Ok");
            }
        },

        onFilter: function () {
            
            let oModelCountries = this.getView().getModel("jsonCountries"),
            // console.log(oModelCountries);
                sEmployee = oModelCountries.getProperty("/EmployeeId"),
                sCode = oModelCountries.getProperty("/CountryCode");
            // console.log(sEmployee);
            // console.log(sCode);    

            let aFilters = [];
            
            if (sEmployee) {
                aFilters.push(new Filter("EmployeeID", FilterOperator.Contains, sEmployee));
            }

            if (sCode) {
                aFilters.push(new Filter("Country", FilterOperator.EQ, sCode));
            }
            // Se aplica el filtro
            let oTable = this.getView().byId("table"),
                oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters);
        },
        
        onClearFilter: function () {
            this._loadCountries();
            // console.log(_loadCountries);
            let oTable = this.getView().byId("table"),
                oBinding = oTable.getBinding("items");
                oBinding.filter([]);
        },

        onOpenOrders: function (oEvent) {
            // console.log(oEvent.getSource());
            let oItem = oEvent.getSource(),
                oBindingContext = oItem.getBindingContext("jsonEmployees"),
                // console.log(oBindingContext.getObject());
                sPath = oBindingContext.getPath(),
                oView = this.getView();

            //Nueva forma de llamar a un Fragmento
            if( !this._pDialog) {

                this._pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "b24c302.fragment.Ordes",
                    controller: this
                }).then(function (oDialog){
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.bindElement({
                    path: sPath,
                    model: 'jsonEmployees'
                });
                oDialog.open();
            });
            //Lineas comentadas ya que esta forma de llamar a un fragmento es obsoleta
            // if( !this._pDialog){
            //     this._pDialog = sap.ui.xmlfragment("b24c302.fragment.Ordes", this);
            //     this.getView().addDependent(this._pDialog);
            // }
            // this._pDialog.bindElement({
            //     path: sPath,
            //     model: 'jsonEmployees'

            // });
            // this._pDialog.open();
        },

        onCloseDialog: function () {
            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        onNavToDetails: function () {

        }

    });
});
