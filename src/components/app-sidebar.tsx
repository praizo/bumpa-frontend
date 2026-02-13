"use client"

import { Trophy, Home } from "lucide-react"
import bumpaLogo from "@/assets/bumpa.svg"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuth } from "@/context/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

function BumpaLogoIcon(props: React.ComponentProps<"img">) {
  return <img src={bumpaLogo} alt="Bumpa" {...props} />
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()


  const userData = {
    name: user?.name || "User",
    email: user?.email || "user@bumpa.com",
    avatar: "/avatars/shadcn.jpg",
  }

  const teams = [
    {
      name: "Bumpa",
      logo: BumpaLogoIcon,
      plan: "Loyalty",
    }
  ]

  const navItems = [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Loyalty Rewards",
      url: "/loyalty",
      icon: Trophy,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
