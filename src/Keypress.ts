import Utils from "./Utils";
import Settings from "./Settings";

declare let p:any;
export default class Keypress
{
    private pr0gramm = p;
    constructor()
    {
        let _this = this;
        window.addEventListener("keypress", function(e){_this.manageKeypress(e);})
    }

    private manageKeypress(e:any):void
    {
        if(e.key == "e")
        {
            this.pr0gramm.navigateTo("settings/site",0);
        }
        if(e.key == "n")
        {
            this.pr0gramm.navigateTo("inbox/all",0);
        }
        if(e.key == "w" || e.key == "s" || e.key == "f" || e.key == "g" || e.key == "+" || e.key == "-" || e.key == "b")
        {
            if(Settings.settings.skipUploadAfterRate)
            {
                Utils.nextUpload();
                Utils.showNotification("Skipped because of: User ranked");
            }
        }
    }
}