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

    return Controller.extend("gitpg.myapp.controller.MainView", // 첫번째 파라미터 
    
    { // 두번째 파라미터 
      onInit: function () {
        // let oJson = new JSONModel();
        // this.getView().setModel(oJson, 'myNode');
        // oJson.loadData(
        //     'http://localhost:8921/files'
        //     // 'https://port-8921-nodejs-wailing-fall-qowwll54536.codeanyapp.com/files'
        // ).then(
        //     function () {
        //         debugger;
        //     }.bind(this)
        // )


        //  인자 반드시 선언해야 함
        //  배열 안에 각각 객체를 가지고 있는 형태
        // { // 객체
        // myArr1 : [ // 배열
        // { filename : 'file1', fileType : 'xlsx' }, // 프로퍼티(property): '키(key):값(value)'
        // { filename : 'file22', fileType : 'word' },
        // { filename : 'file333', fileType : 'ppt' },
        // { filename : 'file4444', fileType : 'txt' },
        // { filename : 'file55555', fileType : 'xlsx' },
        // { filename : 'file666666', fileType : 'ppt' },
        // { filename : 'file7777777', fileType : 'ppt' },
        // { filename : 'file88888888', fileType : 'xlsx' },
        // { filename : 'file999999999', fileType : 'word' }
        //     ], 
        // myArr2 : [
        // { filename : 'test1'},
        // { filename : 'test22'},
        // { filename : 'test333'},
        // { filename : 'test4444'},
        // { filename : 'test55555'},
        // { filename : 'test666666'},
        // { filename : 'test7777777'},
        // { filename : 'test88888888'},
        // { filename : 'test999999999'}
        //     ]
        //   } 
        // );


    
        
        $.ajax(
          'http://localhost:8921/files',
        //     'https://port-8921-nodejs-quaint-lizard-lgx0920328747.codeanyapp.com/files'
          { // 객체
            method: "GET", 
            success : function (...params) {
              let Success = JSON.parse(params[0]); // parse:문자열을 원래 속성으로 되돌려 둠 

            //myData
            let oJson = new JSONModel(Success); // JSONModel = UI5만의 객체, 저장, JSON 관리용도
            this.getView().setModel(oJson, 'myData')
            // -> oJson
            //    oData: Array(3)
            //    0: "test"
            //    1: "ttt"
            //    2: "ㅇㅅㅅ2"
            debugger;
          }.bind(this), 

          error : function (...params){ 
          
            }
          }
        )
      },

      onPress:function(oEvent){
        let sIdRaiseEvent = oEvent.getSource().getId();

        let sIdLink0 = this.getView().byId('link0').getId();
        let sIdLink1 = this.getView().byId('link1').getId();
        let sIdLink2 = this.getView().byId('link2').getId();
        let sIdLink3 = this.getView().byId('link3').getId();
        let sIdLink4 = this.getView().byId('link4').getId();
        let sIdLink5 = this.getView().byId('link5').getId();

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