<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(link, i) in links" :key="i">
        <BreadcrumbItem class="hidden md:block">
          <NuxtLink :to="link.to" class="capitalize">
            {{ link.name }}
          </NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          class="hidden md:block"
          v-if="i < links.length - 1"
        />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script>
export default {
  name: "DashboardBreadcrumb",
  computed: {
    links() {
      const links = this.$route.path.split("/").slice(1);
      return links.map((link, i) => ({
        name: link,
        to: { name: links.slice(0, i + 1).join("-") },
      }));
    },
  },
};
</script>
