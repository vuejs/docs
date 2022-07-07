import { ref, onMounted } from 'vue';

interface Post {
  firstName: string;
  lastName: string;
}

const profile = ref<Post | null>(null);

onMounted(async () => {
  const data = await fetch('/profile/');
  profile.value = data;
});

function onSubmit() {
  alert(JSON.stringify(profile.value));
}

// This is a fake fetch implementation.
function fetch(uri: string): Promise<Post> {
  const data: Post = {
    firstName: 'Alice',
    lastName: 'Smith',
  };
  return new Promise(resolve => resolve(data));
}
