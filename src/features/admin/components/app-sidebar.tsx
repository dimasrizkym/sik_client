import * as React from "react";
import {
  BrickWall,
  // AudioWaveform,
  // BookOpen,
  // Bot,
  // Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  NotebookTabs,
  PieChart,
  SquareLibrary,
  UsersRound,
  // Settings2,
  // SquareTerminal,
} from "lucide-react";

// import { NavMain } from "@/features/admin/components/nav-main";
import { NavProjects } from "@/features/admin/components/nav-projects";
import { NavUser } from "@/features/admin/components/nav-user";
import { TeamSwitcher } from "@/features/admin/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Makam Super App",
      logo: GalleryVerticalEnd,
      plan: "V 1.0.0",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  // navMain: [
  //   {
  //     title: "Playground",
  //     url: "#",
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "History",
  //         url: "#",
  //       },
  //       {
  //         title: "Starred",
  //         url: "#",
  //       },
  //       {
  //         title: "Settings",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Bot,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  projects: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Manajemen Reservasi",
      url: "/admin/reservations",
      icon: SquareLibrary,
    },
    {
      name: "Data Jenazah",
      url: "/admin/deceaseds",
      icon: NotebookTabs,
    },
    {
      name: "Blok Makam",
      url: "/admin/grave-blocks",
      icon: BrickWall,
    },
    {
      name: "Peta Makam",
      url: "/admin/cemetery-maps",
      icon: Map,
    },
    {
      name: "Data Pengelola",
      url: "/admin/user-management",
      icon: UsersRound,
    },
    {
      name: "Laporan & Audit",
      url: "/admin/reports",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
