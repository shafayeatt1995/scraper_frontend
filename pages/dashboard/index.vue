<template>
  <Dashboard>Ami anik</Dashboard>
</template>

<script>
import {
  AudioWaveformIcon,
  BadgeCheckIcon,
  BellIcon,
  BookOpenIcon,
  BotIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CreditCardIcon,
  FolderIcon,
  ForwardIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  LogOutIcon,
  MapIcon,
  MoreHorizontalIcon,
  PieChartIcon,
  PlusIcon,
  Settings2Icon,
  SparklesIcon,
  SquareTerminalIcon,
  Trash2Icon,
} from "lucide-vue-next";

export default {
  name: "Dashboard",
  components: {
    AudioWaveformIcon,
    BookOpenIcon,
    BotIcon,
    ChevronRightIcon,
    ChevronsUpDownIcon,
    CommandIcon,
    FrameIcon,
    GalleryVerticalEndIcon,
    LogOutIcon,
    MapIcon,
    PieChartIcon,
    PlusIcon,
    Settings2Icon,
    SquareTerminalIcon,
    MoreHorizontalIcon,
    FolderIcon,
    ForwardIcon,
    Trash2Icon,
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    SparklesIcon,
  },
  data() {
    return {
      data: {
        user: {
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        },
        teams: [
          {
            name: "Acme Inc",
            logo: GalleryVerticalEndIcon,
            plan: "Enterprise",
          },
          {
            name: "Acme Corp.",
            logo: AudioWaveformIcon,
            plan: "Startup",
          },
          {
            name: "Evil Corp.",
            logo: CommandIcon,
            plan: "Free",
          },
        ],
        navMain: [
          {
            title: "Playground",
            url: "#",
            icon: SquareTerminalIcon,
            isActive: true,
            items: [
              {
                title: "History",
                url: "#",
              },
              {
                title: "Starred",
                url: "#",
              },
              {
                title: "Settings",
                url: "#",
              },
            ],
          },
          {
            title: "Models",
            url: "#",
            icon: BotIcon,
            items: [
              {
                title: "Genesis",
                url: "#",
              },
              {
                title: "Explorer",
                url: "#",
              },
              {
                title: "Quantum",
                url: "#",
              },
            ],
          },
          {
            title: "Documentation",
            url: "#",
            icon: BookOpenIcon,
            items: [
              {
                title: "Introduction",
                url: "#",
              },
              {
                title: "Get Started",
                url: "#",
              },
              {
                title: "Tutorials",
                url: "#",
              },
              {
                title: "Changelog",
                url: "#",
              },
            ],
          },
          {
            title: "Settings",
            url: "#",
            icon: Settings2Icon,
            items: [
              {
                title: "General",
                url: "#",
              },
              {
                title: "Team",
                url: "#",
              },
              {
                title: "Billing",
                url: "#",
              },
              {
                title: "Limits",
                url: "#",
              },
            ],
          },
        ],
        projects: [
          {
            name: "Design Engineering",
            url: "#",
            icon: FrameIcon,
          },
          {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChartIcon,
          },
          {
            name: "Travel",
            url: "#",
            icon: MapIcon,
          },
        ],
      },
      activeItem: 0,
    };
  },
  computed: {
    activeTeam() {
      return this.data.teams[this.activeItem];
    },
  },
  methods: {
    setActiveTeam(team) {
      // this.activeTeam = team;
    },
  },
};
</script>
