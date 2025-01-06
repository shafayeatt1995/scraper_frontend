<template>
  <Sheet :open="modal" @update:open="modal = false">
    <SheetTrigger as-child>
      <Button @click="modal = true"><PlayIcon />Create scraper</Button>
    </SheetTrigger>
    <SheetContent class="w-full">
      <SheetHeader>
        <SheetTitle>Create a scraper</SheetTitle>
      </SheetHeader>
      <div class="py-4 space-y-2" @submit.prevent="createScraper">
        <div>
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="form.name"
            placeholder="Enter scraper name"
          />
          <ErrorMessage :error="errors" name="name" />
        </div>
        <div>
          <Label for="url">URL</Label>
          <div
            v-for="(u, i) in form.urls"
            :key="i"
            class="text-sm flex items-center gap-2 mb-1"
          >
            <p class="w-full">{{ i + 1 }}. {{ u }}</p>
            <Button
              size="icon"
              class="size-6"
              @click="form.urls.splice(i, 1)"
              variant="rose"
              ><XIcon
            /></Button>
          </div>
          <div class="flex gap-1">
            <Input id="url" v-model="url" placeholder="Enter scrape url" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    @click="addUrl"
                    variant="green"
                    class="w-12 h-10"
                    ><CheckIcon
                  /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add url</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ErrorMessage :error="errors" name="urls" />
        </div>
        <div class="flex justify-end">
          <Button @click="createScraper" :loading="loading" :disabled="loading">
            Create scraper
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script>
import { CheckIcon, PlayIcon, XIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
export default {
  name: "DashboardSitemapScraper",
  components: { PlayIcon, CheckIcon, XIcon },
  data() {
    return {
      modal: false,
      value: useData().value,
      form: {
        name: "",
        urls: [],
      },
      url: "",
      errors: {},
      blocked: false,
      loading: false,
    };
  },
  methods: {
    async createScraper() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        this.errors = {};
        const { api } = useApi();
        await api.post2("/dashboard/scraper/sitemap", {
          ...this.form,
          teamID: this.value.activeTeam._id,
        });
        this.modal = false;
        this.$emit("refetch");
        toast.success("Scraper created successfully");
      } catch (error) {
        console.error(error);
        this.errors = error.response._data.errors || {};
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    addUrl() {
      try {
        const url = new URL(this.url);
        if (url.host) {
          this.form.urls.push(this.url);
          this.url = "";
        }
      } catch (error) {
        toast.error("Invalid URL");
      }
    },
  },
};
</script>
