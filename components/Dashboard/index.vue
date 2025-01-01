<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DashboardTeam />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              v-for="item in data.navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRightIcon
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <a :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="authUser.avatar" :alt="authUser.name" />
                    <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      authUser.name
                    }}</span>
                    <span class="truncate text-xs">{{ authUser.email }}</span>
                  </div>
                  <ChevronsUpDownIcon class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div
                    class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                  >
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage
                        :src="authUser.avatar"
                        :alt="authUser.name"
                      />
                      <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{
                        authUser.name
                      }}</span>
                      <span class="truncate text-xs">{{ authUser.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer">
                    <SparklesIcon />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="cursor-pointer">
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer">
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer">
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="cursor-pointer" @click="logout">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="w-full p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
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
  GalleryVerticalEndIcon,
  LogOutIcon,
  MoreHorizontalIcon,
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
    GalleryVerticalEndIcon,
    LogOutIcon,
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
      },
      activeItem: 0,
      interval: null,
    };
  },
  computed: {
    activeTeam() {
      return this.data.teams[this.activeItem];
    },
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
    authUser() {
      const { authUser } = useAuth();
      return authUser.value;
    },
    isFreeUser() {
      const { authUser } = useAuth();
      return !!authUser.value?.isFreeUser;
    },
  },
  mounted() {
    this.trigger();
    this.interval = setInterval(() => {
      this.trigger();
    }, 12 * 60 * 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    setActiveTeam(i) {
      this.activeItem = i;
    },
    async trigger() {
      try {
        const { api } = useApi();
        await api.get2("/");
      } catch (error) {}
    },
    async logout() {
      try {
        const { logout } = useAuth();
        await logout();
      } catch (error) {}
    },
  },
};
</script>
