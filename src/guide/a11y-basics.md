# Basics

Web accessibility (also known as a11y) refers to the practice of creating websites that can be used by anyone — be that a person with a disability, a slow connection, outdated or broken hardware or simply someone in an unfavorable environment. For example, adding subtitles to a video would help both your deaf and hard-of-hearing users and your users who are in a loud environment and can't hear their phone. Similarly, making sure your text isn't too low contrast will help both your low-vision users and your users who are trying to use their phone in bright sunlight.

Ready start but aren’t sure where?

Checkout the [Planning and managing web accessibility guide](https://www.w3.org/WAI/planning-and-managing/) provided by [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Content Structure

One of the most important pieces of accessibility is making sure that design can support accessible implementation. Not only should design consider color contrast, font selection, text sizing and language, but also how the content is structured in the application.

### Headings

Users can navigate an application through headings. Having descriptive headings for every section of your application makes it easier for users to predict the content of each section.

- Nest headings in their ranking order: `<h1>` - `<h6>`
- Don’t skip headings within a section
- Use actual heading tags instead of styling text to give the visual appearance of headings

[Read more about headings](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```html
<header role="banner">
    <!-- Header Content -->
    <nav id="nav-main" aria-label="Main">
      <!-- List of Main links -->
    </nav>
</header>

<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Main title</h1>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> Section Title </h2>
    <h3>Subtitle</h3>
    <!-- Content -->
    <h2 id="section-title"> Section Title </h2>
    <h3>Subtitle</h3>
    <!-- Content -->
    <h4>Subtitle</h4>
    <!-- Content -->
    <h4>Subtitle</h4>
    <!-- Content -->
  </section>
</main>

<footer role="contentinfo">
  <nav id="nav-footer" aria-label="Footer">
    <!-- List of Footer links -->
  </nav>
   <!-- Footer Content -->
</footer>
```

### Landmarks

Landmarks provide programmatic access to sections within an application. Users who rely on assistive technology can navigate to each section of the application and skip over content.

| HTML            | ARIA Role                                                         | Landmark Purpose                                                                       |
| --------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| header          | role="banner"                                                     | Prime heading: title of the page                                                       |
| nav             | role="navigation"                                                 | Collection of links suitable for use when navigating the document or related documents |
| main            | role="main"                                                       | The main or central content of the document.                                           |
| footer          | role="contentinfo"                                                | Information about the parent document: footnotes/copyrights/links to privacy statement |
| aside           | role="complementary"                                              | Supports the main content, yet is separate and meaningful on its own content            |
| _Not available_ | role="search"                                                     | This section contains the search functionality for the application                     |
| form            | role="form"                                                       | Collection of form-associated elements                                                 |
| section         | role="region"  | Content that is relevant and that users will likely want to navigate to. Label must be provided for this element                |

:::tip Tip:
It is recommended to use landmark HTML elements with redundant landmark role attributes in order to maximize compatibility with legacy browsers that don’t support the native elements.
:::

[Read more about landmarks](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## Skip link

You should add a link at the top of each page that goes directly to the main content area so users can skip content that is repeated on multiple Web pages.

Typically this is done on the top of `App.vue` as it will be the first focusable element on all your pages:

``` html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">Skip to main content</a>
  </li>
</ul>
```

To hide the link unless it is focused, you can add the following style:

``` css
.skip-links {
  margin: 0;
  list-style: none;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  margin: 1em;
  right: 50%;
  top: 0;
}

.skip-links a {
    display: block;
    opacity: 0;
    font-size: 1em;
    font-weight: bold;
}

.skip-links a:focus {
  opacity: 1;
  background-color: white;
  padding: .5em;
  border: 1px solid black;
}
```

Once a user changes route, bring focus back to the skip link. This can be achieved by calling focus to the `ref` provided above:

``` vue
<script>
export default {
  name: "app",
  watch: {
    $route: function() {
      this.$refs.skipLink.focus();
    }
  }
};
</script>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="LYpvrBw" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y- skip-link">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/LYpvrBw">
  a11y- skip-link</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[Read documentation on skip link to main content](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Routing

There are some things we need to consider when there is a change in route. Since the client-side JavaScript handles routing, we need to make sure we are handling screen reader announcements to notify users of the route change, and manage focus which we have covered in [skip links section](http://localhost:8081/guide/accessibility.html#skip-link).

### Announcements on Route Change

We can use [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) to notify screen readers of the route change. Using [`role=status` to present status messages](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22) will provide:

- `aria-live="polite"` screen-readers will finish reading the current message before announcing the live region update
- `aria-atomic="true"` which always presents the live region as a whole, even if only part of the region changes

We can add a paragraph with `role="status"` that holds a `routeAnnouncement`:

``` html
<p role="status">{{routeAnnouncement}}</p>
```

Create a property for `routeAnnouncement` and a method to update this message based on the route.

``` vue
<script>
export default {
  name: "app",
  data() {
    return {
      routeAnnouncement: ''
    };
  },
  watch: {
    $route: function() {
      // update ARIA live region message
      this.announceRoute({ message: this.$route.name + " page loaded" });
    }
  },
  methods: {
    announceRoute(message) {
      this.routeAnnouncement = message;
    },
  }
};
</script>
```

You can hide the announcement message with:

``` css
[role="status"] {
  height: 0;
  margin: 0;
  overflow: hidden;
}
```

### Set Current Page

When you have a current item in a set of items, you can improve your users' experience by helping them identify current item with by using the [aria-current attribute](https://www.w3.org/TR/wai-aria-1.1/#aria-current). [Vue router `v-lot`](https://router.vuejs.org/api/#v-slot-api-3-1-0) allows us to customize `router-link` and indicate the current page within a set of pagination links with `aria-current="page"`:

``` html
<nav id="nav">
  <ul class="links" ref="links">
    <li v-for="route in routes" :key="route.name">
      <router-link v-slot="{ href, navigate }" :to="route.path">
        <a
          :href="href"
          :aria-current="route.path === $route.path ? 'page' : false"
          @click="navigate">{{ route.name }}</a>
      </router-link>
    </li>
  </ul>
</nav>
```

By doing this, we are setting Home page to the current page. Let's make sure the attribute updates depending on which link is active.

```vue
<script>
export default {
  name: "app",
  data() {
    return {
      routes = []
    };
  },
  created() {
    this.$router.options.routes.forEach(route => {
      this.routes.push({
          name: route.name,
          path: route.path
      })
    })
  }
}
</script>
```

Use `[aria-current]` attribute to set your active style.

```css
#nav [aria-current] {
  color: #006603;
}

#nav a:hover {
  color: #00755D;
}
```

### Page Title

We also have to update the metadata of our application when route changes; having descriptive page titles helps users understand a page’s content.

Add metadata to your routes:

``` javascript
{
  path: "/",
  name: "Home",
  meta: {
    title: "Home Page"
  },
  component: Home
}
```

Update the page title on route change:

``` javascript
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
```

See full example with skip link, title update, announcement message on route change, and current page updates:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="rNObZpy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="a11y-router">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/rNObZpy">
  a11y-router</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
