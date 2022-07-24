sap.ui.define(
  ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) { //JSONModel 파라미터로 사용
    "use strict";

    return Controller.extend("gitpg.myapp.controller.FileDetail", // 첫번째 파라미터 
    
    { // 두번째 파라미터 
      onInit: function () {
     
      }

    });
  }
);