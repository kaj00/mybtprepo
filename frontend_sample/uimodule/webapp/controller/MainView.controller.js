sap.ui.define(
  ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("gitpg.myapp.controller.MainView", {
      onInit: function () {
        let oJson = new JSONModel();
        this.getView().setModel(oJson, 'myNode');
        oJson.loadData(
            'http://localhost:8921/files'
            // 'https://port-8921-nodejs-wailing-fall-qowwll54536.codeanyapp.com/files'
        ).then(
            function () {
                debugger;
            }.bind(this)
        )
        
        // $.ajax(
        //   'http://localhost:8921/files',
        //   //     'https://port-8921-nodejs-quaint-lizard-lgx0920328747.codeanyapp.com/files'
        //   {
        //     method: "GET",
        //     success : function (...params) {
        //         debugger;
        //     }
        //   }
        // )
      },

      onPress:function(oEvent){
        let sIdRaiseEvent = oEvent.getSource().getId();

        let sIdLink0 = this.getView().byId('link0').getId();
        let sIdLink1 = this.getView().byId('link1').getId();
        let sIdLink2 = this.getView().byId('link2').getId();
        let sIdLink3 = this.getView().byId('link3').getId();
        let sIdLink4 = this.getView().byId('link4').getId();
        let sIdLink5 = this.getView().byId('link5').getId();

        debugger;

        let pFragment ;


        if (sIdRaiseEvent === sIdLink0) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link0",
              type : "XML",
              id : "link0Fragment",
              controller : this
            }
          )
        } else if (sIdRaiseEvent === sIdLink1) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link1",
              type : "XML",
              id : "link1Fragment",
              controller : this
            }
          )
        } else if (sIdRaiseEvent === sIdLink2) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link2",
              type : "XML",
              id : "link2Fragment",
              controller : this
            }
          )
        } else if (sIdRaiseEvent === sIdLink3) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link3",
              type : "XML",
              id : "link3Fragment",
              controller : this
            }
          )
        } else if (sIdRaiseEvent === sIdLink4) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link4",
              type : "XML",
              id : "link4Fragment",
              controller : this
            }
          )
        } else if (sIdRaiseEvent === sIdLink5) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link5",
              type : "XML",
              id : "link5Fragment",
              controller : this
            }
          )
        }

        pFragment.then(function (oView){
          let oMyExtend = this.getView().byId('myExtend');
          
          oMyExtend.destroyItems(); //myExtend 내부 Item 밑에 다 지워버려
          oMyExtend.addItem(oView); //Item 추가해

        }.bind(this));

      }

    });
  }
);