import { ref, onMounted } from 'vue';

const profile = ref(null);

onMounted(async () => {
    const data = await fetch('/profile/');
    profile.value = data;
});

function onSubmit() {
    alert(JSON.stringify(profile.value));
}

// This is a fake fetch implementation.
function fetch(uri) {
    const data = {
        firstName: 'Alice',
        lastName: 'Smith',
    };
    return new Promise(resolve => resolve(data));
}
