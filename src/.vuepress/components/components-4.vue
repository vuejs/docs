<template>
  <div id="blog-posts-events-demo" class="demo">
    <div :style="{ fontSize: postFontSize + 'em' }">
      <blog-post2
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:title="post.title"
        v-on:enlarge-text="postFontSize += 0.1"
      ></blog-post2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue', content: '...content...' },
        { id: 2, title: 'Blogging with Vue', content: '...content...' },
        { id: 3, title: 'Why Vue is so fun', content: '...content...' }
      ],
      postFontSize: 1
    }
  }
}
</script>
