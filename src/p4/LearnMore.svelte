<script>
  import {_} from '../locales/';

  export let slug;
  export let href;

  // !!! CHANGE !!!
  // const link = slug ? `https://github.com/Mixality/Sidekick#${slug}` : href;
  const link = slug ? `https://github.com/Menersar/Sidekick#${slug}` : href;
</script>

<style>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>

<a href={link} title={$_('options.learnMore')} target="_blank" rel="noopener noreferrer">(?)</a>
