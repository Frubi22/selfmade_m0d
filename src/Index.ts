import Settings from "./Settings";
import EventHandler from "./EventHandler";
import Utils from "./Utils";
import Modules from "./Modules";
import Keypress from "./Keypress";

require("./template/style.less");

class Main 
{
    private eventHandler:EventHandler;
    private settings:Settings;
    private utils:Utils;
    private modules:Modules;
    private keypress:Keypress;

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
