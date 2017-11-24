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
        let node;
        if(e.path != undefined)
            node = e.path[0].nodeName;
        else    
            node = e.target.nodeName;

        if(node != "TEXTAREA" && node != "INPUT")
        {
            if($(".item-vote").length > 0)
            {
                if(e.key == "w" ||   e.key == "g" || e.key == "+" || e.key == "s" || e.key == "-" || e.key == "b" || e.key == "f")
                {
                    if(Settings.settings.skipUploadAfterRate)
                    {
                        Utils.showNotification("Skipped because of: User rated", this.pr0gramm.getLocation());
                        Utils.nextUpload();
                    }
                }
            }
            else if(e.key == "d")
            {
                $("#stream a:first")[0].click();
            }

            if(e.key == "e")
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
            else if(e.key == "3")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("stalk",0);
            } 
        }
    }
}