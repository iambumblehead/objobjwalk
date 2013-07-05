objobjwalk
==========
**(c)[Bumblehead][0], 2012,2013** [MIT-license](#license)  

### OVERVIEW:

Walk the object definitions of an object, modify them with a function. It may be used in a browser environment or a node.js environment.

[0]: http://www.bumblehead.com                            "bumblehead"

---------------------------------------------------------
#### <a id="install"></a>INSTALL:

objobjwalk may be downloaded directly or installed through `npm`.

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

 Call objobjwalk with an object as the first parameter and a filtering function as the second parameter. The object *will be mutated* by the filter and it will be returned by the function.
 
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

 Call objobjwalk.async with an object as the first parameter and a filtering function as the second parameter and a third parameter, a callback function. The object *will be mutated* by the filter and it will be returned as a parameter to the callback function.

 The filter function will return its value asynchronously to the callback it receives as its parameter. 
 
 Useful if you need to modify an object with definitions from a disk file or from resources found on the Internet.

 ```javascript
 objobjwalk.async({
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
 }, function (obj, exitFn) {
     if (obj.type === 'deep object') {
         obj.value = '0';
     }
     exitFn(null, obj);
 }, function (err, newObj) {
     console.log(newObj.a.b[0].c.d[0].value); // '0'
     console.log(newObj.a.b[0].c.e[0].value); // '0'
 });
 ```

