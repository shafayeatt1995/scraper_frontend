<template>
  <Dashboard>
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription> Manage team members </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="flex space-x-2" @submit.prevent="addUser">
          <Input v-model="form.email" placeholder="Enter email" />
          <Button variant="secondary" class="shrink-0">
            <PlusIcon /> Add user
          </Button>
        </form>
        <Separator class="my-4" />
        <div class="space-y-4">
          <h4 class="text-sm font-medium">People in this team</h4>
          <div class="flex justify-center items-center h-60" v-if="loading">
            <Loader2Icon class="animate-spin" />
          </div>
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6" v-else>
            <div
              class="flex items-center justify-between space-x-4"
              v-for="(item, i) in items.admins"
              :key="i"
            >
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage :src="item.avatar" />
                  <AvatarFallback>{{
                    item.name.split(" ").slice(0, 2).join("").toUpperCase()
                  }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium leading-none">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-muted-foreground">Admin</p>
                </div>
              </div>
              <!-- <DropdownMenu v-if="isAdmin && item._id !== authUser._id">
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="icon">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-40" align="end">
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="cursor-pointer"
                    @click="makeAdmin(item)"
                  >
                    Make admin
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer">
                    Remove from team
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> -->
            </div>
            <div
              class="flex items-center justify-between space-x-4"
              v-for="(item, i) in items.members"
              :key="i"
            >
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage :src="item.avatar" />
                  <AvatarFallback>{{
                    item.name.split(" ").slice(0, 2).join("").toUpperCase()
                  }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium leading-none">
                    {{ item.name }}
                  </p>
                  <p class="text-sm text-muted-foreground">Member</p>
                </div>
              </div>

              <DropdownMenu v-if="isAdmin">
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="icon">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-40" align="end">
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="cursor-pointer"
                    @click="makeAdmin(item)"
                  >
                    Make admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="cursor-pointer"
                    @click="removeUser(item)"
                  >
                    Remove from team
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </Dashboard>
</template>

<script>
import { EllipsisVerticalIcon, Loader2Icon, PlusIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardTeam",
  components: { PlusIcon, Loader2Icon, EllipsisVerticalIcon },
  data() {
    return {
      value: useData().value,
      form: { email: "" },
      blocked: false,
      loading: false,
      items: {},
      authUser: useAuth().authUser,
    };
  },
  computed: {
    isAdmin() {
      return this.items.admins.find((item) => item._id === this.authUser._id);
    },
  },
  watch: {
    "value.activeTeam"() {
      this.fetchItems();
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        if (this.value.activeTeam?._id) {
          const { api } = useApi();
          const { items } = await api.get("/dashboard/team/full", {
            teamID: this.value.activeTeam?._id,
          });
          this.items = items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async addUser() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        await api.post("/dashboard/team/add-user", this.form);
        this.form.email = "";
        this.fetchItems();
        toast.success("User added successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async makeAdmin(item) {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        await api.post("/dashboard/team/make-admin", {
          teamID: this.value.activeTeam?._id,
          userID: item._id,
        });
        this.fetchItems();
        toast.success("User made admin successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async removeUser(item) {
      try {
        if (confirm("Are you sure you want to remove this user?")) {
          if (this.blocked) return;
          this.blocked = true;
          this.loading = true;
          const { api } = useApi();
          await api.post("/dashboard/team/remove-user", {
            teamID: this.value.activeTeam?._id,
            userID: item._id,
          });
          this.fetchItems();
          toast.success("User removed successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
  },
};
</script>
