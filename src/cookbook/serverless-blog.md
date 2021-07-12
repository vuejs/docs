# Create a CMS-Powered Blog

So you've just launched your Vue.js website, congrats! Now you want to add a blog that quickly plugs into your website and you don't want to have to spin up a whole server just to host a Wordpress instance (or any DB-powered CMS for that matter). You want to just be able to add a few Vue.js blog components and some routes and have it all just work, right? What you're looking for is a blog that's powered entirely by API's you can consume directly from your Vue.js application. This tutorial will teach you how to do just that, let's dive in!

We're going to quickly build a CMS-powered blog with Vue.js. It uses [ButterCMS](https://buttercms.com/), an API-first CMS that lets you manage content using the ButterCMS dashboard and integrate our content API into your Vue.js app. You can use ButterCMS for new or existing Vue.js projects.

![Butter Blog Post Editor](https://buttercms.com/static/v2/images/screenshots/features/app-blog-editor-2021.160b62f58181.jpg "Butter Blog Post Editor")

## Install

Run this in your command line:

```bash
npm install buttercms --save
```

Butter can also be loaded using a CDN:

```html
<script src="https://cdnjs.buttercms.com/buttercms-1.2.7.min.js"></script>
```

## Base Example

::: info
You can find your api token on the [settings page](https://buttercms.com/settings/)
:::

Create file `buttercms.js` to create your butter instance using your API token:

```javascript
var butter = require('buttercms')('your_api_token');
module.exports = butter
```

Using ES6:

```javascript
import Butter from 'buttercms';
export const butter = Butter('your_api_token');
```

You could also create your butter instance using CDN:

```html
<script src="https://cdnjs.buttercms.com/buttercms-1.2.7.min.js"></script>
<script>
  var butter = Butter('your_api_token');
</script>
```

Import this file into any component you want to use ButterCMS and add this code snippet to `onMounted`:

```javascript
butter.post.list({page: 1, page_size: 10}).then(function(response) {
  console.log(response)
})
```

This API request fetches your blog posts. Your account comes with one example post which you'll see in the response.

## Display all posts and post details

To display posts we create a `/blog` route (using Vue Router) in our app and fetch blog posts from the Butter API, as well as a `/blog/:slug` route to handle individual posts.

Update routes in `router/index.js`:

```javascript
// ...
import BlogHome from "@/views/BlogHome.vue"
import BlogPost from "@/views/BlogPost.vue"

const routes = [
    // ...
    {
        component: BlogHome,
        name: "Blog",
        path: "/posts",
    },
    {
        component: BlogPost,
        name: "BlogPost",
        path: "/posts/:slug",
    }
]

// ...
```

Then create `views/BlogHome.vue` which will be your blog homepage that lists your most recent posts:

```html
<template>
    <div id="blog-home">
        <h1>Blog</h1>
        <!-- Create `v-for` and apply a `key` for Vue. -->
        <div
            v-for="post in posts"
            :key="post.slug"
        >
        <router-link :to="{ name: 'BlogPost', params: { slug: post.slug } }">
            <article class="media">
            <figure>
                <!-- Bind results using a `:` -->
                <!-- Use a `v-if`/`else` if there is a `featured_image` -->
                <img
                    v-if="post.featured_image"
                    :src="post.featured_image"
                    alt=""
                >
                <img
                    v-else
                    src="http://via.placeholder.com/250x250"
                    alt=""
                >
            </figure>
            <h2>{{ post.title }}</h2>
            <p>{{ post.summary }}</p>
            </article>
        </router-link>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import { butter } from "@/buttercms"


export default defineComponent({
    name: "BlogHome",
    components: {
        RouterLink
    },
    setup () {
        const posts = ref([])

        onMounted( async () => {
            posts.value = (
                await butter.post.list({
                    page: 1,
                    page_size: 10,
                })
            ).data.data            
        })

        return {
            posts,
        }
    },
})
</script>
```

::: info
See the ButterCMS [API reference](https://buttercms.com/docs/api/?javascript#blog-posts) for additional options such as filtering by category or author. The response also includes some metadata that could be used for pagination.
:::

Here's what it looks like (note we added styling using [tailwind](https://tailwindcss.com/)):

![buttercms-blog-list](/images/buttercms-blog-page-screenshot.png)

Now create `views/BlogPost.vue` which will be your Blog Post page to display post details:

```html
<template>
<div
    id="blog-post"
    v-if="loaded"
>
    <h1>{{ post.data.title }}</h1>
    <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
    <div v-html="post.data.body"></div>

    <router-link
        v-if="post.meta.previous_post"
        :to="{ name: 'BlogPost', params: { slug: post.meta.previous_post.slug } }"
    >
        {{ post.meta.previous_post.title }}
    </router-link>
    <router-link
        :to="{ name: 'BlogPost', params: { slug: post.meta.next_post.slug } }"
        v-if="post.meta.next_post"
    >
        {{ post.meta.next_post.title }}
    </router-link>
</div>
</template>

<script>
import { defineComponent, onMounted, ref, unref } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { butter } from "@/buttercms"


export default defineComponent({
    name: "BlogPost",
    components: {
        RouterLink
    },
    setup () {
        const post = ref([])
        const loaded = ref( false )
        const route = useRoute()

        onMounted( () => getPost( route.params.slug ) )

        async function getPost ( postSlug ) {
            loaded.value = false
            post.value = (
                await butter.post.retrieve( postSlug )
            ).data
            document.title = unref( post ).data.title
            loaded.value = true
        }

        return {
            loaded,
            post,
        }
    },
})
</script>
```

Here's a preview:

![buttercms-post-details-page](/images/buttercms-post-details-page.png)

Now our app is pulling all blog posts and we can navigate to individual posts. However, our next/previous post links are not working.

::: info
When the user navigates from `/blog/foo` to `/blog/bar`, the same component instance will be reused. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one.
:::

::: warning
Using the component this way will mean that the lifecycle hooks of the component will not be called. Visit the Vue Router's docs to learn more about [Dynamic Route Matching](https://router.vuejs.org/en/essentials/dynamic-matching.html)
:::

To fix this we need to watch the `route.params.slug` value and call `getPost()` when it changes.

Update `<script>` section in `views/BlogPost.vue`:

```html{26,41}
<template>
<div
    id="blog-post"
    v-if="loaded"
>
    <h1>{{ post.data.title }}</h1>
    <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
    <div v-html="post.data.body"></div>

    <router-link
        v-if="post.meta.previous_post"
        :to="{ name: 'BlogPost', params: { slug: post.meta.previous_post.slug } }"
    >
        {{ post.meta.previous_post.title }}
    </router-link>
    <router-link
        :to="{ name: 'BlogPost', params: { slug: post.meta.next_post.slug } }"
        v-if="post.meta.next_post"
    >
        {{ post.meta.next_post.title }}
    </router-link>
</div>
</template>

<script>
import { defineComponent, onMounted, ref, unref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { butter } from "@/buttercms"


export default defineComponent({
    name: "BlogPost",
    components: {
        RouterLink
    },
    setup () {
        const post = ref([])
        const loaded = ref( false )
        const route = useRoute()

        watch( () => route.params.slug, ( postSlug ) => getPost( postSlug ) )

        onMounted( () => getPost( route.params.slug ) )

        async function getPost ( postSlug ) {
            loaded.value = false
            post.value = (
                await butter.post.retrieve( postSlug )
            ).data
            document.title = unref( post ).data.title
            loaded.value = true
        }

        return {
            loaded,
            post,
        }
    },
})
</script>
```

Now your app has a working blog that can be updated easily in the [Blog posts ButterCMS dashboard](https://buttercms.com/blog_home/).

## Categories, Tags, and Authors

Use Butter's APIs for categories, tags, and authors to feature and filter content on your blog.

See the ButterCMS API reference for more information about these objects:

* [Categories](https://buttercms.com/docs/api/?javascript#categories)
* [Tags](https://buttercms.com/docs/api/?javascript#tags)
* [Authors](https://buttercms.com/docs/api/?javascript#authors)

Here's an example of listing all categories and getting posts by category. Call these methods on the `onMounted` hook inside `setup`:

```javascript
onMounted( async () => {
    const categories = await getCategories()
    const postsByCategory = await getPostsByCategory( "example-category" )

    console.log({ categories, postsByCategory })

    async function getCategories () {
        return ( await butter.category.list() ).data.data
    }

    function getPostsByCategory ( category ) {
        return butter.category.retrieve( category, {
            include: "recent_posts"
        })
    }

    // ...

})
```

## Alternative Patterns

An alternative pattern to consider, especially if you prefer writing only in Markdown, is using something like [Nuxtent](https://nuxtent-module.netlify.com/guide/writing/#async-components). Nuxtent allows you to use `Vue Component` inside of Markdown files. This approach would be akin to a static site approach (i.e. Jekyll) where you compose your blog posts in Markdown files. Nuxtent adds a nice integration between Vue.js and Markdown allowing you to live in a 100% Vue.js world.

## Wrap up

That's it! You now have a fully functional CMS-powered blog running in your app. We hope this tutorial was helpful and made your development experience with Vue.js even more enjoyable :)