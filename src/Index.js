
import EventHandler from "./EventHandler";
import Utils from "./Utils";
import Settings from "./Settings";
import Modules from "./Modules";
import Keypress from "./Keypress";

require("./template/style.less");

class Main 
{
    constructor()
    {
        console.log("Selfmade M0d running");
       
        this.eventHandler = new EventHandler(); 
        this.utils = new Utils();
        this.settings = new Settings();
        this.modules = new Modules();
        this.keypress = new Keypress();
    }
}

$(document).ready(()=> new Main());
