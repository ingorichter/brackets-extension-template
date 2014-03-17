/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */
/*jslint nomen:true, vars:true*/
/*global window, console, define, brackets, $, Mustache*/

define(function (require, exports, module) {
    "use strict";
    
    // Load commonly used modules from Brackets
    var _               = brackets.getModule("thirdparty/lodash"),
        AppInit         = brackets.getModule("utils/AppInit"),
        CommandManager  = brackets.getModule("command/CommandManager"),
        ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        FileUtils       = brackets.getModule("file/FileUtils"),
        Menus           = brackets.getModule("command/Menus"),
        NodeDomain      = brackets.getModule("utils/NodeDomain");
    
    // Boilerplate to load NodeDomain
    var _modulePath     = FileUtils.getNativeModuleDirectoryPath(module),
        _nodePath       = "node/TemplateDomain",
        _domainPath     = [_modulePath, _nodePath].join("/"),
        _nodeDomain     = new NodeDomain("template", _domainPath);
    
    // Function to run when the menu item is clicked
    function handleHelloWorldCommand() {
        // Call helloWorld command in our NodeDomain (node/TemplateDomain.js)
        _nodeDomain.exec("helloWorld", "Brackets Extension Template").done(function (retVal) {
            window.alert(retVal);
        }).fail(function () {
            console.error("FAIL");
        });
    }
    
    function _htmlReady() {
        // Inject stylesheet
        ExtensionUtils.loadStyleSheet(module, "styles/styles.css");
    }
    
    function _appReady() {
        // First, register a command - a UI-less object associating an id to a handler
        var MY_COMMAND_ID = "helloworld.sayhello";   // package-style naming to avoid collisions
        CommandManager.register("Hello World", MY_COMMAND_ID, handleHelloWorldCommand);
        
        // Then create a menu item bound to the command
        // The label of the menu item is the name we gave the command (see above)
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(MY_COMMAND_ID);
    }
    
    // Load CSS stylesheet after `htmlReady` event is fired
    AppInit.htmlReady(_htmlReady);
    
    // Delay initialization until `appReady` event is fired
    AppInit.appReady(_appReady);
});