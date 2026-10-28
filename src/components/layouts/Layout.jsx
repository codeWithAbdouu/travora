import {SiteNav} from "#src/components/site-chrome.jsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/sonner.jsx";

function Layout() {
    return (
        <div className="min-h-screen">
            <SiteNav/>

            <Toaster position="top-right" richColors />
            <Outlet/>
        </div>
    )
}

export default Layout
