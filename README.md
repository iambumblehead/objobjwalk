objobjwalk
==========
**(c)[Bumblehead][0], 2012,2013** [MIT-license](#license)  

### OVERVIEW:

Walk the object definitions of an object, modify them with a function. It may be used in a browser environment or a node.js environment.

[0]: http://www.bumblehead.com                            "bumblehead"

---------------------------------------------------------
#### <a id="install"></a>INSTALL:

Scroungejs may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install objobjwalk
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/objobjwalk.git
 $ cd objobjwalk && npm install
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```
 
---------------------------------------------------------
#### <a id="get-started">GET STARTED: 

 
 ```javascript
 var newObj = objobjwalk({
     a : {
         b : [{
             c : {
                 d : [{
                     type : 'deep object',
                     value : '1'
                 }],
                 e : [{
                     type : 'deep object',
                     value : '1'
                 }]
             }
         }]
     }
 }, function (obj) {
     if (obj.type === 'deep object') {
         obj.value = '0';
     }
     return obj;
 });     
 console.log(newObj);
 //{
 //    a : {
 //        b : [{
 //            c : {
 //                d : [{
 //                    type : 'deep object',
 //                    value : '0'
 //                }],
 //                e : [{
 //                    type : 'deep object',
 //                    value : '0'
 //                }]
 //            }
 //        }]
 //    }
 //} 
 ```




