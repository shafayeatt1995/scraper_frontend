<template>
  <Dashboard>
    <Card>
      <CardHeader>
        <div class="flex justify-between items-start flex-col md:flex-row">
          <div>
            <CardTitle>Sitemap</CardTitle>
            <CardDescription>Extract all links from sitemap</CardDescription>
          </div>
          <DashboardSitemapScraper @refetch="fetchItems" />
        </div>
      </CardHeader>
      <CardContent>
        <TableResponsive :items="items" :fields="fields">
          <template #urls="{ value }">{{ value.length }}</template>
          <template #status="{ value }">
            <Badge :variant="getVariant(value)" class="capitalize">{{
              value
            }}</Badge>
          </template>
          <template #action="{ item }">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost"><EllipsisIcon /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-44">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  class="cursor-pointer"
                  @click="runScraper(item)"
                  ><PlayIcon /> Run scraper</DropdownMenuItem
                >
                <DropdownMenuItem
                  class="cursor-pointer"
                  @click="downloadExcel(item)"
                >
                  <DownloadIcon /> Download Excel
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="cursor-pointer"
                  @click="deleteSitemap(item)"
                >
                  <Trash2Icon /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
        </TableResponsive>
      </CardContent>
    </Card>
  </Dashboard>
</template>

<script>
import {
  DownloadIcon,
  EllipsisIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

export default {
  name: "DashboardSitemap",
  components: { EllipsisIcon, PlayIcon, Trash2Icon, DownloadIcon },
  data() {
    return {
      value: useData().value,
      items: [],
      blocked: false,
      loading: false,
      perPage: 20,
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "status", label: "STATUS", span: "minmax(100PX, 1fr)" },
        { key: "urls", label: "URLS", span: "minmax(100PX, 1fr)" },
        { key: "resultCount", label: "Result", span: "minmax(100PX, 1fr)" },
        { key: "action", label: "action", span: "100PX" },
      ];
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
        if (this.value.activeTeam?._id) {
          this.loading = true;
          const { api } = useApi();
          const { items } = await api.get("/dashboard/sitemap", {
            page: this.page,
            perPage: this.perPage,
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
    loadMore(next) {
      const page = this.page + (next ? 1 : -1);
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.query, page },
      });
    },
    async runScraper(value) {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;
        const { api } = useApi();
        await api.post2("/dashboard/scraper/sitemap-url", { _id: value._id });
        toast.success("Scraper run successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async downloadExcel(value) {
      try {
        if (this.blocked) return;
        this.blocked = true;
        this.loading = true;

        const config = useRuntimeConfig();
        const API_URL = config.public.API_URL;
        const { cookieParse } = useUtils();

        // Retrieve the token
        const parse = cookieParse();
        const token = parse?.authToken || null;
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        };

        // Native fetch for file download
        const response = await fetch(
          `${API_URL}/dashboard/sitemap/download?_id=${value._id}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to download file: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${value.name}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading file:", error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    async deleteSitemap(value) {
      try {
        if (confirm("Are you sure you want to delete this sitemap?")) {
          if (this.blocked) return;
          this.blocked = true;
          this.loading = true;
          const { api } = useApi();
          await api.delete(`/dashboard/sitemap/${value._id}`);
          this.fetchItems();
          toast.success("Sitemap deleted successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
        this.loading = false;
      }
    },
    getVariant(value) {
      if (value === "pending") return "yellow";
      if (value === "complete") return "green";
      if (value === "error") return "rose";
      return "default";
    },
  },
};
</script>
