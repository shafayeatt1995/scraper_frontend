<template>
  <div>
    <slot />
    <SocialLogin />
    <Toaster position="bottom-center" :expand="false" closeButton richColors />
  </div>
</template>
<script>
import { Toaster } from "@/components/ui/sonner";

export default {
  name: "DefaultLayout",
  components: {
    Toaster,
  },
  data() {
    return {
      interval: null,
    };
  },
  mounted() {
    this.trigger();
    const { value } = useData();
    value.isTablet = window.innerWidth < 1024;
    value.isMobile = window.innerWidth < 768;
    window.addEventListener("resize", (data) => {
      value.isTablet = data.target.innerWidth < 1024;
      value.isMobile = data.target.innerWidth < 768;
    });
    this.interval = setInterval(() => {
      this.trigger();
    }, 12 * 60 * 1000);
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
  methods: {
    async trigger() {
      try {
        const { api } = useApi();
        await api.get2("/");
      } catch (error) {}
    },
  },
};
</script>
