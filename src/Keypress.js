import Utils from "./Utils";
import Settings from "./Settings";

export default class Keypress
{
    constructor()
    {
        let _this = this;
        window.addEventListener("keypress", function(e){_this.shortcuts(e);})
        this.pr0gramm = p
    }

    shortcuts(e)
    {
        if($(e.path)[0].nodeName != "TEXTAREA" && $(e.path)[0].nodeName != "INPUT")
        {
            if($(".item-vote").length > 0)
            {
                if(e.key == "w" || e.key == "s" || e.key == "f" || e.key == "g" || e.key == "+" || e.key == "-" || e.key == "b")
                {
                    if(Settings.settings.skipUploadAfterRate)
                    {
                        Utils.showNotification("Skipped because of: User rated", this.pr0gramm.getLocation());
                        Utils.nextUpload();    
                    }
                }
            }
            else if(e.key == "e")
            {
                this.pr0gramm.navigateTo("settings/site",0);
            }
            else if(e.key == "n")
            {
                this.pr0gramm.navigateTo("inbox/all",0);
            }
            else if(e.key == "1")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("new",0);
            }
            else if(e.key == "2")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("top",0);
            }
            else if(e.key == "1")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("stalk",0);
            } 
        }
    }
}