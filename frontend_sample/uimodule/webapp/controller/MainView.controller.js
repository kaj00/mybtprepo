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

    return Controller.extend("gitpg.myapp.controller.MainView", // 첫번째 파라미터 
    
    { // 두번째 파라미터 
      onInit: function () {
        let oJson = new JSONModel();
        this.getView().setModel(oJson, 'myNode');
        oJson.loadData(
            'http://localhost:8921/files'
            // 'https://port-8921-nodejs-acoustic-architect-dotoree3205566.codeanyapp.com/files'
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
      onPrees:function(oEvent) {
        let sIdRaiseEvent = oEvent.getSource().getId();

        let sIdLink1 = this.getView().byId('link1').getId;
        let sIdLink2 = this.getView().byId('link2').getId;
        
        debugger;

        let pFragment;
        if (sIdRaiseEvent === sIdLink1) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link1",
              type : "XML",
              id : "link1Fragment",
              controller : this
            }
          )

        }else if (sIdRaiseEvent === sIdLink2){
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link2",
              type : "XML",
              id : "link2Fragment",
              controller : this
            }
          )

        }


        pFragment.then(function (oView){
          let oMyExtend = this.getView().byId("myExtend")

          oMyExtend.destroyItems(); //myExtend 내부 Item 밑에 다 지워버려
          oMyExtend.addItem(oView); //Item 추가해
        }.bind(this));

      }
    });
  }
);