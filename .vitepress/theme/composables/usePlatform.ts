import { onMounted, ref } from "vue";

export function usePlatform() {
    const isOSX = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    const altKey = isOSX ? 'Option' : 'Alt';

    return {
        isOSX, altKey
    }
}