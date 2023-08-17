<script>
  import { _ } from "../locales/";

  export let slug;
  export let href;

  // !!! CHANGE !!!
  // const link = slug ? `https://docs.turbowarp.org/${slug}` : href;
  // const link = slug ? `https://github.com/Mixality/Sidekick#${slug}` : href;
  const link = slug ? `https://menersar.github.io/Sidekick/docs#${slug}` : href;
</script>

<a
  href={link}
  title={$_("options.learnMore")}
  target="_blank"
  rel="noopener noreferrer">(?)</a
>

<style>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
