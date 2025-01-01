<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        >
          <CommandIcon class="size-4" />
        </div>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">No team selected</span>
          <span class="truncate text-xs">Free plan</span>
        </div>
        <ChevronsUpDownIcon class="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      align="start"
      side="bottom"
      :side-offset="4"
    >
      <DropdownMenuLabel class="text-xs text-muted-foreground">
        Teams
      </DropdownMenuLabel>
      <DropdownMenuItem
        v-for="(team, index) in teams"
        :key="team.name"
        class="gap-2 p-2 cursor-pointer"
        @click="setActiveTeam(index)"
      >
        <div class="flex size-6 items-center justify-center rounded-sm border">
          <AudioWaveformIcon class="size-4 shrink-0" />
        </div>
        {{ team.name }}
        <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="gap-2 p-2 cursor-pointer"
        @click="teamModal = true"
      >
        <div
          class="flex size-6 items-center justify-center rounded-md border bg-background"
        >
          <PlusIcon class="size-4" />
        </div>
        <div class="font-medium text-muted-foreground">Add team</div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Sheet :open="teamModal" @update:open="teamModal = false">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new team</SheetTitle>
      </SheetHeader>
      <form class="py-4" @submit.prevent="createTeam">
        <Label for="name"> Name </Label>
        <Input id="name" placeholder="Enter team name" v-model="form.name" />
        <ErrorMessage :error="errors" name="name" />
        <div class="flex justify-end mt-3">
          <Button type="submit" :disabled="loading">
            <Loader2Icon class="animate-spin" v-if="loading" /> Create team
          </Button>
        </div>
      </form>
    </SheetContent>
  </Sheet>
</template>

<script>
import {
  AudioWaveformIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  Loader2Icon,
  PlusIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardTeam",
  components: {
    ChevronsUpDownIcon,
    PlusIcon,
    CommandIcon,
    Loader2Icon,
    AudioWaveformIcon,
  },
  data() {
    return {
      blocked: false,
      loading: false,
      teamModal: false,
      form: { name: "" },
      teams: [],
      errors: {},
    };
  },
  mounted() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const { api } = useApi();
        const { items } = await api.get("/dashboard/team");
        this.teams = items;
      } catch (error) {
        console.error(error);
      }
    },
    async createTeam() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        this.errors = {};
        const { api } = useApi();
        await api.post("/dashboard/team", this.form);
        toast.success("Team created successfully");
        this.teamModal = false;
        this.fetchTeams();
      } catch (error) {
        console.error(error);
        this.errors = error.response._data.errors;
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
  },
};
</script>
