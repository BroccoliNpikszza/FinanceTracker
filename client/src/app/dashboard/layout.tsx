import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


import { ReactNode } from "react"

interface Props{
  children: ReactNode;
  pageTitle: string
};



export default function Layout({children,pageTitle}:Props) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader pageTitle={pageTitle}/>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
