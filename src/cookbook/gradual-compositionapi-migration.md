# Gradual Composition API Migration

The Composition API is an advanced feature introduced in Vue 3. It is purely addititive, the Options API is not legacy, however you may find that the Composition API can be a useful feature for more flexible large-scale architectures. So how would we go about introducing it in a larger system, gradually? The following is merely a recommendation, there are many ways of going about this.

Due to the flexbility of the Composition API, you may need to be more explicit about organization so that future maintainers can quickly understand intended purpose of pieces of the application.
